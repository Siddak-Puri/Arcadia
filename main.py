#modules
import webview
from datetime import datetime
import subprocess
from pathlib import Path
#SubProcess
subprocess.run([|"sudo","poweroff"])
subprocess.run({"sudo","reboot"})

#PathLib(refer to test_scanner.py)
ASE_DIR = Path(__file__).resolve().parent
ROM_DIR = BASE_DIR / "roms"

games_list = []

for file in ROM_DIR.rglob("*"):

    if file.is_file():

        extension = file.suffix.lower()

        emulatorName = None
        if extension == ".sfc" or extension == ".smc":
            emulatorName = "SNES"
        elif extension == ".nes":
            emulatorName = "NES"
        elif extension == ".gba":
            emulatorName = "GBA"

        if emulatorName is not None:
            game_info= {
                "title": file.stem,
                "system": emulatorName,
                "path" : str(file.resolve())
            }
            games_list.append(game_info)

for game in games_list:
    print(f"Title:{game['title']}, Console:{game['system']}")
