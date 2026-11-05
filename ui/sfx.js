var Sfx = (function () {
    var ctx = null;

    function vol() {
        var s = window.ARCADIA_SETTINGS;
        return (s ? s.volume  : 80) / 100;
    }

    function audio() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === "suspended") ctx.resume();
        return ctx;
    }

    function blip() {
        var v = vol();
        if (!v) return;
        var c = audio(), t = c.currentTime;
        var osc = c.createOscillator(), gain = c.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1320, t + .05);
        gain.gain.setValueAtTime(.08 * v, t);
        gain.gain.exponentialRampToValueAtTime(.0001, t + 0.09);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + .1);
    }

    function glitch(ms) {
        var v = vol();
        if (!v) return;
        var c = audio(), t = c.currentTime;
        var len = Math.floor(c.sampleRate * (ms || 400) / 1000);
        var buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
        var hold = 0, val = 0;
        for (var i = 0; i < len; i++) {
            if (hold-- <= 0) { val = Math.random() * 2 - 1; hold = Math.random() * 400 }
            d[i] = val * (Math.random() < .5 ? 1 : .3);
        }
        var src = c.createBufferSource(), filter = c.createBiquadFilter(), gain = c.createGain();
        src.buffer = buf;
        filter.type = "bandpass";
        filter.frequency.value = 1200;
        filter.Q.value = .7;
        gain.gain.setValueAtTime(.25 * v, t);
        gain.gain.linearRampToValueAtTime(0, t + len / c.sampleRate);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(c.destination);
        src.start(t);
    }

    document.addEventListener("click", function (e) {
        if (e.target.closest("button")) blip();
    });

    return { blip: blip, glitch: glitch };
})();