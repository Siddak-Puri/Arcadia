import json
from pathlib import Path
import webview

BASE = Path(__file__).resolve().parent
SETTINGS_FILE = BASE / "settings.json"
DEFAULTS = {"volume": 80, "fullscreen": False, "skip_intro": False, "rom_dir": str(BASE / "roms")}


def load_settings():
    data = dict(DEFAULTS)
    if SETTINGS_FILE.exists():
        try:
            data.update(json.loads(SETTINGS_FILE.read_text()))
        except ValueError:
            pass
    return data

class Api:
    def shutdown(self):
        webview.windows[0].destroy()

    def launch_game(self, console, game):
        print("LAUNCH", console, game)

    def get_settings(self):
        return load_settings()

    def save_settings(self, data):
        SETTINGS_FILE.write_text(json.dumps(data, indent=2))

    def toggle_fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def pick_rom_folder(self):
        result = webview.windows[0].create_file_dialog(webview.FOLDER_DIALOG)
        return result[0] if result else None

if __name__ == "__main__":
    settings = load_settings()
    webview.create_window(
        "Arcadia",
        "ui/index.html",
        js_api=Api(),
        width=1440, height=1024,
        min_size=(720, 512),
        background_color="#000000",
        fullscreen=settings["fullscreen"],
    )
    webview.start(debug=True)