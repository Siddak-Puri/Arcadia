(function () {
  var A = "assets/main/";
  var TICK = 83;

  var GAMES = {
    mario:   { name: "Super Mario World",   src: "game-mario.png" },
    metroid: { name: "Super Metroid",       src: "game-metroid.png" },
    zelda:   { name: "The Legend of Zelda", src: "game-zelda.png" }
  };

  var ELS = [
    { id: "bg1", src: "bg1.png", s1: [-43, -12, 1483, 1049] },
    { id: "bg2", src: "bg2.png", s2: [-43, -12, 1483, 1049], s3: [-43, -12, 1483, 1049] },
    { id: "dim", s1: [0, 0, 1440, 1024] },
    { id: "graffiti", src: "graffiti.png", s2: [699, 1, 829, 1024], s3: [331, -226, 1197, 1478] },
    { id: "star-in",  src: "star-inner.png", s3: [1248, 73, 119, 115] },
    { id: "star-out", src: "star-outer.png", s3: [1200, 34, 198, 197] },
    { id: "dark", src: "dark.png", s1: [806, -535, 1181, 2093], s2: [211, -715, 1181, 2093], s3: [-461, -720, 1181, 2093] },

    { id: "snes", src: "logo-snes.png", console: "snes", s1: [1261, 241, 476, 119, .3], s2: [588, 191, 476, 119, 1],   s3: [-84, 186, 476, 119] },
    { id: "nes",  src: "logo-nes.png",  console: "nes",  s1: [1237, 467, 455, 166, .3], s2: [564, 417, 455, 166, 1],   s3: [-108, 412, 455, 166] },
    { id: "gb",   src: "logo-gb.png",   console: "gb",   s1: [1208, 693, 433, 169, .3], s2: [535, 643, 433, 169, 1],   s3: [-137, 638, 433, 169] },
    { id: "ps",   src: "logo-ps.png",   console: "ps",   s1: [1376, -105, 283, 215], s2: [720, -107, 283, 215], s3: [48, -112, 283, 215] },
    { id: "gbc",  src: "logo-gbc.png",  console: "gbc",  s1: [1214, 947, 376, 154], s2: [564, 908, 376, 154], s3: [-108, 903, 376, 154] },

    { id: "star-x", src: "star-x.png", s3: [1271, 105, 58, 50] },

    { id: "frame1", src: "frame-a.png", s3: [593, 230, 450, 301] },
    { id: "frame2", src: "frame-b.png", s3: [597, 578, 450, 301] },
    { id: "frame3", src: "frame-a.png", s3: [597, 906, 450, 301] },
    { id: "g-mario",   src: "game-mario.png",   game: "mario",   s3: [617, 268, 378, 263] },
    { id: "g-metroid", src: "game-metroid.png", game: "metroid", s3: [613, 616, 379, 263] },
    { id: "g-zelda",   src: "game-zelda.png",   game: "zelda",   s3: [617, 935, 376, 263] },

    { id: "files-back", src: "icon-files-back.png", shadow: true, s1: [19, 18, 220, 191] },
    { id: "files",    src: "icon-files.png",      shadow: true, s1: [23, 18, 220, 191],  s2: [18, 17, 220, 191] },
    { id: "settings", src: "icon-settings.png",   shadow: true, s1: [22, 213, 159, 138], s2: [17, 212, 159, 138] },
    { id: "pad",      src: "icon-controller.png", shadow: true, s1: [33, 357, 139, 121], s2: [28, 356, 139, 121] },
    { id: "barcode", text: "ARCadia", s1: [22, 969], s2: [17, 968] }
  ];

  var PAD_Y = [233, 332, 432, 531, 630, 730, 828, 925];
  for (var p = 0; p < PAD_Y.length; p++) {
    ELS.push({ id: "slot" + p, src: p < 2 ? "pad-on.png" : "pad-off.png", shadow: true, s3: [1300, PAD_Y[p], 114, 99] });
  }

  var world  = document.getElementById("m-world");
  var black  = document.getElementById("m-black");
  var gload  = document.getElementById("m-gameload");
  var glCover = document.getElementById("m-gl-cover");
  var glName  = document.getElementById("m-gl-name");

  var state = 1, selected = "snes", busy = false, playing = null;

  function build() {
    for (var i = 0; i < ELS.length; i++) {
      var s = ELS[i];
      var clickable = s.console || s.game;
      var d = document.createElement(clickable ? "button" : "div");
      d.id = "m-" + s.id;
      d.className = "m-el" + (clickable ? " m-hit" : "") + (s.shadow ? " m-shadow" : "");
      if (s.text) d.textContent = s.text;
      if (s.src) {
        var img = document.createElement("img");
        img.src = A + s.src;
        img.alt = "";
        d.appendChild(img);
      }
      if (s.console) d.setAttribute("data-console", s.console);
      if (s.game) d.setAttribute("data-game", s.game);
      if (clickable) d.addEventListener("click", onClick);
      world.appendChild(d);
      s.node = d;
    }
  }

  function applyState(n, animate) {
    for (var i = 0; i < ELS.length; i++) {
      var s = ELS[i], d = s.node, g = s["s" + n];
      if (!g) {
        d.style.opacity = 0;
        d.style.visibility = "hidden";
        d.style.pointerEvents = "none";
        s.shown = false;
        continue;
      }
      var jump = !animate || !s.shown;
      if (jump) d.style.transition = "none";
      d.style.left = g[0] + "px";
      d.style.top = g[1] + "px";
      if (g[2] != null) {
        d.style.width = g[2] + "px";
        d.style.height = g[3] + "px";
      }
      var op = g[4] == null ? 1 : g[4];
      if (n === 3 && s.console && s.console !== "ps" && s.console !== "gbc") op = s.console === selected ? 1 : .67;
      d.style.opacity = op;
      d.style.visibility = "visible";
      d.style.pointerEvents = "";
      if (jump) { void d.offsetWidth; d.style.transition = ""; }
      s.shown = true;
    }
    state = n;
  }

  function centerOf(el) {
    var st = document.getElementById("stage").getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var k = st.width / 1440;
    return {
      x: Math.max(80, Math.min(1360, (r.left + r.width / 2 - st.left) / k)),
      y: Math.max(80, Math.min(944, (r.top + r.height / 2 - st.top) / k))
    };
  }

  function onClick(e) {
    if (busy) return;
    var el = e.currentTarget, c = centerOf(el);
    var con = el.getAttribute("data-console");
    var game = el.getAttribute("data-game");
    if (con) {
      selected = con;
      var next = state === 1 ? 2 : 3;
      busy = true;
      Glitch.run({ x: c.x, y: c.y, dur: 700, peak: 300,
        onPeak: function () { applyState(next, true); },
        onDone: function () { busy = false; } });
    } else if (game) {
      launch(game, c);
    }
  }

  function launch(game, c) {
    busy = true;
    playing = game;
    Glitch.run({ x: c.x, y: c.y, dur: 600, peak: 330,
      onPeak: function () { black.className = "on"; },
      onDone: function () {
        setTimeout(function () {
          Glitch.run({ x: 720, y: 512, dur: 420, peak: 170, onDone: function () {
            setTimeout(function () {
              Glitch.run({ x: 720, y: 512, dur: 560, peak: 250,
                onPeak: function () {
                  glCover.src = A + GAMES[game].src;
                  glName.textContent = GAMES[game].name;
                  gload.className = "on";
                },
                onDone: function () {
                  busy = false;
                  setTimeout(function () {
                    if (playing === game && window.pywebview && window.pywebview.api.launch_game) {
                      window.pywebview.api.launch_game(selected, game);
                    }
                  }, 1500);
                } });
            }, 250);
          } });
        }, 250);
      } });
  }

  function back() {
    if (busy) return;
    if (gload.className === "on" || black.className === "on") {
      playing = null;
      busy = true;
      Glitch.run({ x: 720, y: 512, dur: 600, peak: 260,
        onPeak: function () { gload.className = ""; black.className = ""; },
        onDone: function () { busy = false; } });
    } else if (state > 1) {
      var next = state - 1;
      busy = true;
      Glitch.run({ x: 720, y: 512, dur: 700, peak: 300,
        onPeak: function () { applyState(next, true); },
        onDone: function () { busy = false; } });
    }
  }

  window.addEventListener("keydown", function (e) {
    if (current === "main" && e.key === "Escape") back();
  });

  var Glitch = (function () {
    var cv = document.getElementById("m-glitch");
    var ctx = cv.getContext("2d");
    var W = 1440, H = 1024;
    var PAL = ["#2ef2e0", "#ff2bd6", "#ff2a2a", "#2333ff", "#0d0b18", "#ffffff", "#ffd21f", "#8a2bff", "#19ffa0"];
    var PATS = [];
    for (var i = 0; i < PAL.length; i++) {
      var pc = document.createElement("canvas");
      pc.width = 8; pc.height = 5;
      var px = pc.getContext("2d");
      px.fillStyle = PAL[i]; px.fillRect(0, 0, 8, 5);
      px.fillStyle = "rgba(0,0,0,.5)"; px.fillRect(0, 0, 8, 2);
      PATS.push(ctx.createPattern(pc, "repeat"));
    }

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function shard(cx, cy, spread, size) {
      var x = cx + rnd(-1, 1) * spread, y = cy + rnd(-1, 1) * spread * .75;
      var ang = rnd(0, Math.PI * 2), len = size * rnd(.5, 2.1), wid = size * rnd(.12, .55);
      var n = 3 + Math.floor(rnd(0, 3));
      ctx.beginPath();
      for (var k = 0; k < n; k++) {
        var t = k / n * Math.PI * 2 + rnd(-.45, .45);
        var rx = Math.cos(t) * len * rnd(.5, 1), ry = Math.sin(t) * wid * rnd(.5, 1);
        var qx = x + rx * Math.cos(ang) - ry * Math.sin(ang);
        var qy = y + rx * Math.sin(ang) + ry * Math.cos(ang);
        if (k) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy);
      }
      ctx.closePath();
      var c = Math.floor(rnd(0, PAL.length));
      ctx.globalAlpha = rnd(.75, 1);
      ctx.fillStyle = Math.random() < .45 ? PATS[c] : PAL[c];
      ctx.fill();
      if (Math.random() < .3) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = rnd(1, 2.5);
        ctx.stroke();
      }
    }

    function cracks(cx, cy, spread, n) {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#fff";
      for (var i = 0; i < n; i++) {
        ctx.lineWidth = rnd(.8, 2);
        ctx.beginPath();
        var x = cx + rnd(-1, 1) * spread, y = cy + rnd(-1, 1) * spread * .7;
        ctx.moveTo(x, y);
        ctx.lineTo(x + rnd(-260, 260), y + rnd(-120, 120));
        ctx.stroke();
      }
    }

    function streaks(cx, cy, spread, n) {
      for (var i = 0; i < n; i++) {
        var y = cy + rnd(-1, 1) * spread * .7, x = cx + rnd(-1, 1) * spread;
        var w = rnd(80, 420), h = rnd(6, 26);
        ctx.globalAlpha = rnd(.5, .9);
        ctx.fillStyle = PATS[Math.floor(rnd(0, PATS.length))];
        ctx.fillRect(x - w / 2, y, w, h);
      }
    }

    function draw(cx, cy, k) {
      ctx.clearRect(0, 0, W, H);
      if (k <= 0) return;
      var spread = 90 + k * 950;
      var size = 50 + k * 230;
      var count = Math.floor(8 + k * 110);
      for (var i = 0; i < count; i++) shard(cx, cy, spread * Math.sqrt(Math.random()), size);
      streaks(cx, cy, spread, Math.floor(k * 14));
      cracks(cx, cy, spread * .8, Math.floor(2 + k * 10));
      ctx.globalAlpha = 1;
    }

    function shake(k) {
      if (k < .25) { world.style.transform = ""; world.style.filter = ""; return; }
      world.style.transform = "translate(" + rnd(-30, 30) * k + "px," + rnd(-12, 12) * k + "px) skewX(" + rnd(-4, 4) * k + "deg)";
      var f = "hue-rotate(" + Math.round(rnd(-160, 160) * k) + "deg) saturate(" + (1 + k * 2).toFixed(2) + ")";
      if (Math.random() < k * .3) f += " invert(1)";
      world.style.filter = f;
    }

    function run(o) {
      var t0 = Date.now(), peaked = false;
      function tick() {
        var t = Date.now() - t0;
        var k = t < o.peak ? t / o.peak : 1 - (t - o.peak) / (o.dur - o.peak);
        k = Math.max(0, Math.min(1, k));
        k = Math.pow(k, .6);
        if (!peaked && t >= o.peak) {
          peaked = true;
          if (o.onPeak) o.onPeak();
        }
        if (t >= o.dur) {
          draw(0, 0, 0);
          shake(0);
          if (o.onDone) o.onDone();
          return;
        }
        draw(o.x, o.y, k);
        shake(k);
        setTimeout(tick, TICK);
      }
      tick();
    }

    return { run: run };
  })();

  window.Glitch = Glitch;
  build();
  applyState(1, false);
})();