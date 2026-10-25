import webview

class Api:
    def shutdown(self):
        webview.windows[0].destroy()

if __name__ == "__main__":
    webview.create_window(
        "Arcadia",
        "ui/index.html",
        js_api=Api(),
        width=1440, height=1024,
        min_size=(720, 512),
        background_color="#000000",
    )
    webview.start(debug=True)