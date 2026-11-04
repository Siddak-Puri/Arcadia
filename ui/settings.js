( function () {
    var DEFAULTS = { volume: 80, fullscreen: false, skip_intro: false, rom_dir: "" };
    var S = JSON.parse(JSON.stringify(DEFAULTS));

    var tabs    = document.querySelectorAll(".s-tab");
    var panels  = document.querySelectorAll(".s-panel");
    var vol     = document.getElementById("s-vol");
    var fill    = document.getElementById("s-vol-fill");
    var volTxt  = document.getElementById("s-vol-text");
    var fsBtn   = document.getElementById("s-fullscreen");
    var skBtn   = document.getElementById("s-skip");
    var romTxt  = document.getElementById("s-rom-path");

    function api() { return window.pywebview && window.pywebview.api; }

    function save() {
        window.ARCADIA_SETTINGS = S;
        if (api() && api().save_settings) api().save_settings(S);
    }

    function render() {
        fill.style.width = S.volume + "%";
        volTxt.textContent = "VOLUME " + S.volume;
        fsBtn.textContent = S.fullscreen ? "ON" : "OFF";
        fsBtn.className = "s-btn" + (S.fullscreen ? " on" : "");
        skBtn.textContent = S.skip_intro ? "ON" : "OFF";
        skBtn.className = "s-btn" + (S.skip_intro ? " on" : "");
        romTxt.textContent = S.rom_dir || "not set";
    }

    function selectTab(name) {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.toggle("active", tabs[i].getAttribute("data-tab") === name);
        }
        for (var j = 0; j < panels.length; j++) {
            panels[j].classList.toggle("active", panels[j].id === "panel-" + name);
        }
    }
})