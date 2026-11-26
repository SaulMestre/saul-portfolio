"""Verify the managed Spec Kit installation and its core Python workflow."""

import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class SpecKitTests(unittest.TestCase):
    def test_managed_files(self):
        manifests = ROOT / ".specify/integrations"
        expected = {"copilot.manifest.json": 9, "speckit.manifest.json": 20}
        for name, count in expected.items():
            manifest = json.loads((manifests / name).read_text(encoding="utf-8"))
            self.assertEqual(manifest["version"], "1.4.4")
            self.assertEqual(len(manifest["files"]), count)
            for relative, digest in manifest["files"].items():
                with self.subTest(path=relative):
                    path = (ROOT / relative).resolve()
                    self.assertTrue(path.is_relative_to(ROOT))
                    self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(), digest)
        state = json.loads((ROOT / ".specify/integration.json").read_text())
        self.assertEqual(state["default_integration"], "copilot")
        self.assertEqual(state["version"], "1.4.4")

    def test_feature_workflow(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / ".specify", root / ".specify")
            env = {key: value for key, value in os.environ.items()
                   if not key.startswith("SPECIFY_")}
            env.update(SPECIFY_INIT_DIR=str(root), SPECIFY_FEATURE_NO_PERSIST="1",
                       PYTHONDONTWRITEBYTECODE="1")

            def run(name, *args, success=True):
                result = subprocess.run(
                    [sys.executable, str(root / ".specify/scripts/python" / name), *args],
                    cwd=root, env=env, capture_output=True, text=True,
                    encoding="utf-8", timeout=20, check=False,
                )
                if success:
                    self.assertEqual(result.returncode, 0, result.stderr)
                    return json.loads(result.stdout)
                self.assertNotEqual(result.returncode, 0)
                return result.stderr

            created = run("create_new_feature.py", "--json", "--short-name",
                          "smoke-test", "Synthetic feature for verification")
            feature = Path(created["SPEC_FILE"]).parent
            self.assertTrue(feature.is_relative_to(root / "specs"))
            self.assertTrue((feature / "spec.md").is_file())
            env.update(SPECIFY_FEATURE_DIRECTORY=str(feature),
                       SPECIFY_FEATURE=created["BRANCH_NAME"])
            self.assertIn("plan.md", run("check_prerequisites.py", "--json",
                                         "--require-spec", success=False))
            run("setup_plan.py", "--json")
            self.assertTrue((feature / "plan.md").is_file())
            result = run("setup_tasks.py", "--json")
            self.assertIn("Tests are REQUIRED", result["TASKS_TEMPLATE_CONTENT"])
            self.assertIn("tasks.md", run("check_prerequisites.py", "--json",
                                          "--require-spec", "--require-tasks",
                                          success=False))
            (feature / "tasks.md").write_text(
                "# Synthetic tasks\n- [ ] T001 Verify fixture\n", encoding="utf-8")
            result = run("check_prerequisites.py", "--json", "--require-spec",
                         "--require-tasks", "--include-tasks")
            self.assertIn("tasks.md", result["AVAILABLE_DOCS"])
            self.assertFalse((root / ".specify/feature.json").exists())


if __name__ == "__main__":
    unittest.main(verbosity=2)
