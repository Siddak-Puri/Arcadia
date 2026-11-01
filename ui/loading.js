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
    ]
})