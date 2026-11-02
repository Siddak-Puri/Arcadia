#modules
import webview
from datetime import datetime
import subprocess
from pathlib import Path

#PathLib(refer to test_scanner.py)
BASE_DIR = Path(__file__).resolve().parent
ROM_DIR = BASE_DIR / "roms"
htmlFile = BASE_DIR / "UI" / "index.html"
RETROARCH_DIR = Path("D:/Projects/RetroArch")
RETROARCH_EXE = RETROARCH_DIR / "retroarch.exe"
CORES_DIR = RETROARCH_DIR / "CORES"

CORES = {
    "snes":"snes9x_libretro.dll",
    "nes":"nestopia_libretro.dll",
    "n64":"mupen64plus_next_libretro.dll",
    "gba":"mgba_libretro.dll",
    "nds":"melonds_libretro.dll",
    "wii":"dolphin_libretro.dll",
    "gamecube":"dolphin_libretro.dll",
    "cps3":"fbalpha2012_cps3_libretro.dll",
    "dreamcast":"flycast_libretro.dll",
    "32x":"picodrive_libretro.dll",
    "genesis":"picodrive_libretro.dll",
    "megadrive":"picodrive_libretro.dll",
    "saturn":"mednafen_saturn_libretro.dll",
    "ps":"mednafen_psx_hw_libretro.dll",
    "psp":"ppsspp_libretro.dll",
    "ps2":"pcsx2_libretro.dll"
}
# Launcher
class launcherApi:
    def get_games(self):
        games_list = []

        for file in ROM_DIR.rglob("*"):

            if file.is_file():

                extension = file.parent.name.lower()
                if extension in CORES:
                    games_list.append({
                        "title": file.stem,
                        "system": extension,
                        "path" : str(file.resolve())
                    })
        return games_list
            

    def launch_game(self,extension,rom_path):
        core_file = CORES.get(extension)
        if not core_file:
            return
        
        core_path = CORES_DIR / core_file

        cmd = [
            str(RETROARCH_EXE), "-L", str(core_path),rom_path,"-f"
        ]

        subprocess.run(cmd)

    def shutdown(self):
        subprocess.run(["sudo","poweroff"])

    def reboot(self):
        subprocess.run(["sudo","reboot"])

                #the code block below are kept because of fraud checks, the block is no more in use due to iso conflicts
                #emulatorName = None
                #if extension == ".sfc" or extension == ".smc" or extension == ".swc" or extension == ".fig":
                #    emulatorName = "snes"
                #elif extension == ".nes" or extension == ".fds" or extension == ".unf" or extension == ".unif":
                #    emulatorName = "nes"
                #elif extension == ".z64" or extension == ".n64" or extension == ".v64":
                #    emulatorName = "n64"
                #elif extension == ".gba":
                #    emulatorName = "gba"
                #elif extension == ".nds" or extension == ".ids":
                #    emulatorName = "nds"
                #elif extension == ".gcm" or extension == ".gcz":
                #    emulatorName = "gamecube"
                #elif extension == ".wbfs" or extension == ".iso" or extension == ".rvz" or extension == ".wad":
                #    emulatorName = "wii"
                #elif extension == ".chd" or extension == ".cue" or extension == ".cue":
                #    emulatorName = "ps"
                #if emulatorName is not None:
                    #game_info={
                        #"title": file.stem,
                        #"system": emulatorName,
                        #"path" : str(file.resolve())
                    #}
                    #games_list.append(game_info)
                #for game in games_list:
                    #print(f"Title:{game['title']}, Console:{game['system']}")

#WebView
api = launcherApi()

window = webview.create_window(
    title = "Arcadia",
    url= str(htmlFile),
    width = 800,
    height = 600,
    js_api = api
)

webview.start(debug=True)
