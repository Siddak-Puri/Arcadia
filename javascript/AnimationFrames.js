const element = document.getElementById('list');

let start;

function step(timestamp){
    if (start === undefined){
        start = timestamp;
    }
    const elapsed = timestamp - start;

    const shift = 200;
    element.style.transform = `translateX(${shift}px)`;
    if (shift < 200) {
        requestAnimationFrame(step);
    }
}

requestAnimationFrame(step);