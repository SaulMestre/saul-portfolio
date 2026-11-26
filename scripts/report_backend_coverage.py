"""Read the single Cobertura report from the backend coverage run."""

from pathlib import Path
import sys
import xml.etree.ElementTree as ET

reports = sorted(Path(sys.argv[1]).rglob("*.cobertura.xml"))
if len(reports) != 1:
    raise SystemExit(f"Expected one Cobertura report, found {len(reports)}")
root = ET.parse(reports[0]).getroot()
lines = int(root.attrib["lines-valid"])
covered = int(root.attrib["lines-covered"])
if not 0 <= covered <= lines or lines == 0 or covered == 0:
    raise SystemExit("No valid nonzero application coverage")
print(f"Backend line coverage: {100 * covered / lines:.2f}% ({covered}/{lines})")

if 100 * covered / lines < 100:
    raise SystemExit("Backend line coverage regressed below the initial 100% baseline")
