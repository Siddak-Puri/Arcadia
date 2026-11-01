(function () {
    var PATH = "assets/loading/art";
    var U = 83;

    var GRAY = "invert(1) grayscale(1) brightness(.8)";
    var ACiD = "invert(1) hue-rotate(90deg) saturate(4)";
    var NEG = "invert(1)";

    var steps = [
        { art: 0, u: 3 },

        { art: 7, u: 8, fx: "flicker" },
        { art: 7, u: 6, over: 4, ofc: "spin" },
        { art: 2, u: 2, shake: true },
        { art: 5, u: 2},
        { art: 2, u: 1, filter: ACID },
        { art: 5, u: 1, filter: NEG, fx: "split" },
        { art: 7, u: 1, fx: "split" },
        { art: 7, u: 4 },

        { art: 7, u: 1, filter: GRAY },
        { art: 7, u: 1, fx: "split" },
        { art: 7, u: 1, slices: true },
        { art: 7, u: 2 },
        { art: 1, u: 2, fx: "mega", over: 4 },
        { art: 6, u: 1, over: 3, slices: true },
        { art: 5, u: 1, fx: "mega2", filter: "hue-rotate(200deg)"},
        { art: 7, u: 2, over: 3, ofx: "punch", shake: true},
        { art: 7, u: 6},
        { art: 0, u: 2},

        { flash: true, u: 1 },
        { art: 1, u: 14, fx: "slam"},
        { art: 1, u: 1, filter: NEG },
        { art: 1, u: 2, fx: "split glitch", slices: true, shake: true },
        { art: 0, u: 2, }
    ];

    var wrap    = document.getElementById("ld-wrap");
    var boil    = document.getElementById("ld-boil");
    var over    = document.getElementById("ld-over");
    var slices  = document.getElementById("ld-slices");
    var flash   = document.getElementById("ld-flash");
    var out     = document.getElementById('ld-out');
    var imgs    = [document.getElementById("ld-frame"), document.getElementById("ld-r"), document.getElementById("ld-gb")];
    var bands   = slices.children;
    var i = 0, timer = null, boilTimer = null, done = false, slicing = false;

    function src(n) {
        return PATH + n + ".png";
    }

    function restart(el, cls) {
        el.className = "";
        void el.offsetWidth;
        el.className = cls;
    }

    function cutSlices() {
        var y = 0;
        for (var k = 0; k < bands.length; k++) {
            var h = 4 + Math.random() * 18;
            var top = y + Math.random() * 6;
            bands[k].computedStyleMap.clipPath = "inset(" + top + "% 0" + Math.max(0, 100 - top - h) + "% 0)";
            bands[k].computedStyleMap.trnasform = "translateX(" + Math.round(Math.random() * 160 - 80) + "px)";
            y = top + h;
        }
    }

    function step() {
        if (done) return;
        if (i >= steps.length) { finish(); return; }
        var s = steps[i++];
        var ms = s.u * U;

        flash.className = s.flash ? "on" : "";
        if (!s.art) {
            wrap.className = "blank";
            over.classname = "";
            slices.className = "";
            slicing = false;
            boil.className = "";
            timer = setTimeout(step, ms);
            return;
        }

        for (var k = 0; k < imgs.length; k++) imgs[k].src = src(s.art);
        wrap.style.setProperty("--d", ms + "ms");
        restart(wrap, s.fx || "");
        wrap.style.filter = s.filter || "none";
            if (s.over) {
                over.src = src(s.over);
                over.style.setProperty("--d", ms + "ms");
                restart(over, "on " + (s.ofx || ""));
            } else {
                over.className = "";
            }

            slicing = !!s.slices;
            if (slicing) {
                for (var b = 0; b < bands.length; b++) {
                    bands[b].style.backgroundImage = "url(" + src(s.art) + ")";
                    bands[b].style.filter = s.filter || "none";
                }
                cutSlices();
                slices.className = "on";
            } else {
                slices.className = "";
            }

            boil.className = s.shake ? "shake" : "";
            timer = setTimeout(step, ms);
    }
    function startBoil() {
        boilTimer = setInterval(function () {
            if (slicing) cutSlices();
            if (boil.className === "shake") return;
            var x = (Math.random() * 6 - 3).toFixed(1);
            var y = (Math.random() * 6 - 3).toFixed(1);
            var r = (Math.random() * 0.6 - 0.3).toFixed(2);
            boil.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg)";
        }, U);
    }

    function finish() {
        if (done) return;
        done = true;
        clearTimeout(timer);
        out.className = "on";
        setTimeout(function () {
            clearInterval(boilTimer);
            show("title");
        }, 300)
    }

    function preload(cb) {
        var left = 7, called = false;
        function one() { if (--left === 0 && !called) { called = true; cb(); } }
        for (var n = 1; n <= 7; n++) {
            var im = new Image();
            im.onload = one; im.onerror = one;
            im.src = src(n);
        }
        setTimeout(function () { if (!called) { called = true; cb(); } }, 4000);
    }

    window.addEventListener("keydown", function () { if (current === "loading") finish(); });
    document.getElementById("loading").addEventListener("click", finish);

        preload(function () { startBoil(); step(); });
})();