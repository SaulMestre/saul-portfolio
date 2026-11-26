"""Exercise real quality gates with temporary negative fixtures in CI."""

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def expect_failure(path, content, command, cwd, marker):
    if path.exists():
        raise RuntimeError(f"Refusing to overwrite {path}")
    try:
        path.write_text(content, encoding="utf-8")
        result = subprocess.run(command, cwd=cwd, capture_output=True, text=True,
                                encoding="utf-8", timeout=180, check=False)
        output = result.stdout + result.stderr
        if result.returncode == 0 or marker not in output:
            raise RuntimeError(f"Expected specific failure: {marker}\n{output}")
        print(f"Confirmed rejection: {marker}")
    finally:
        path.unlink(missing_ok=True)


def frontend():
    root = ROOT / "frontend"
    expect_failure(
        root / "src/quality-gate-probe.ts",
        'export const probe: number = "invalid";\n',
        ["npm", "run", "typecheck"], root, "Type error",
    )
    expect_failure(
        root / "src/quality-gate-probe.test.ts",
        'import { expect, it } from "vitest";\nit("quality gate probe", () => expect(true).toBe(false));\n',
        ["npm", "test", "--", "src/quality-gate-probe.test.ts"], root,
        "quality gate probe",
    )


def backend():
    expect_failure(
        ROOT / "backend/tests/Portfolio.Tests/QualityGateProbe.cs",
        'using Xunit;\nnamespace Portfolio.Tests;\npublic sealed class QualityGateProbe { [Fact] public void RejectsInvalidBehavior() => Assert.Equal(1, 2); }\n',
        ["dotnet", "test", "backend/Portfolio.slnx", "--no-restore",
         "--configuration", "Release", "--filter",
         "FullyQualifiedName~QualityGateProbe.RejectsInvalidBehavior"],
        ROOT, "Failed Portfolio.Tests.QualityGateProbe.RejectsInvalidBehavior",
    )


if __name__ == "__main__":
    {"frontend": frontend, "backend": backend}[sys.argv[1]]()
