import webview

class Api:
    """Python functions the UI can call later, e.g. launching emulators."""
    pass

if __name__ == "__main__":
    webview.create_window(
        "Arcadia",
        "ui/index.html",
        js_api=Api(),
        width=140, height=900,
        min_size=(900, 600),
        background_color = "#32302E",
    )
    webview.start(debug=True)

