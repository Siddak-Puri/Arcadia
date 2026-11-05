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
    for (var t = 0; t <  tabs.length; t++) {
        tabs[t].addEventListener("click", function () { selectTab(this.getAttribute("data-tab")); });
    }

    function setVolume(v) {
        S.volume = Math.max(0, Math.min(100, Math.round(v)));
        render();
    }

    var dragging = false;
    function volFromMouse(e) {
        var r = vol.getBoundingClientRect();
        setVolume((e.clientX - r.left) / r.width * 100);
    }
    vol.addEventListener("mousedown", function (e) { dragging = true; volFromMouse(e); });
    window.addEventListener("mousemove", function (e) { if (dragging) volFromMouse(e); });
    window.addEventListener("mouseup", function () { if (dragging) { dragging = false; save(); Sfx.blip(); } });
    fsBtn.addEventListener("click", function () {
        S.fullscreen = !S.fullscreen;
        render();
        save();
        if (api() && api().toggle_fullscreen) api().toggle_fullscreen();
    });
    skBtn.addEventListener("click", function () {
        S.skip_intro = !S.skip_intro;
        render();
        save();
    });
    document.getElementById("s-rom-change").addEventListener("click", function () {
        if (!api() || !api().pick_rom_folder) return;
        api().pick_rom_folder().then(function (path) {
            if (path) { S.rom_dir = path; render(); save(); }
        });
    });
    document.getElementById("s-reset").addEventListener("click", function () {
        var wasFull = S.fullscreen;
        S = JSON.parse(JSON.stringify(DEFAULTS));
        render();
        save();
        if (wasFull && api() && api().toggle_fullscreen) api().toggle_fullscreen();
    });

    function open() {
        if (current !== "main") return;
        var go = function () { show("settings"); };
        if (window.Glitch) window.Glitch.run({ x: 100, y: 280, dur: 700, peak: 300, onPeak: go });
        else go();
    }
    function close() {
        var go = function () { show("main"); };
        if (window.Glitch) window.Glitch.run({ x: 720, y: 512, dur: 700, peak: 300, onPeak: go });
        else go();
    }
    document.getElementById("m-settings").addEventListener("click", open);
    document.getElementById("s-back").addEventListener("click", close);

    window.addEventListener("keydown", function (e) {
        if (current !== "settings") return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight" && document.getElementById("panel-sound").classList.contains("active")) { setVolume(S.volume + 5); save(); Sfx.blip(); }
        if (e.key === "ArrowLeft"  && document.getElementById("panel-sound").classList.contains("active")) { setVolume(S.volume - 5); save(); Sfx.blip(); }    });

    window.addEventListener("pywebviewready", function () {
        if (!api().get_settings) return;
        api().get_settings().then(function (saved) {
            for (var k in saved) S[k] = saved[k];
            window.ARCADIA_SETTINGS = S;
            render();
            if (S.skip_intro && current === "loading") {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
            }
        });
    });

    selectTab("sound");
    render();
})();