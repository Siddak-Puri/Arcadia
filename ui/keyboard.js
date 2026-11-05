/*Input handling is copied from gamepad.js*/
let controllerIndex = null;
let focusIndex = 0;
let buttonStates = {a:false, b:false , up:false , down:false , left:false , right:false};

function clickableElements(){
    return Array.from(document.querySelectorAll('.m-hit')).filter(event =>{
        return window.getComputedStyle(event).opacity > 0 && window.getComputedStyle(event).pointerEvents !== "none";
    })
}

function updateFocus(elements){
    elements.forEach(event => {
        if (event.querySelector("img")) {
            event.querySelector("img").style.transform ='';
            event.querySelector("img").style.filter = '';
        }
    });

    if (elements[focusIndex] && elements[focusIndex].querySelector('img')){
        let img = elements[focusIndex].querySelector('img');
        img.style.transform = 'scale(1.04)';
        img.style.filter = 'brightness(1.15) drop-shadow(0 0 14px rgba(255,255,255,.25))';
    }
}

function moveAround(xx,yy){
    let clickables = clickableElements()
    if (clickables.length === 0) return;

    if (focusIndex >= clickables.length) focusIndex = 0;

    const currentRect = clickables[focusIndex].getBoundingClientRect();
    const currentCenter = {
        x: currentRect.left + currentRect.width / 2,
        y: currentRect.top + currentRect.height / 2
    };

    let bestIndex = focusIndex;
    let minScore = Infinity;

    clickables.forEach((e,index) => {
        if (index === focusIndex) return;

        const rect = e.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        const diffX = center.x - currentCenter.x;
        const diffY = center.y - currentCenter.y;

        let valid = false;
        
        if (xx === 1 && diffX > 30) valid = true;
        if (xx === -1 && diffX < -30) valid = true;
        if(yy === 1 && diffY > 30) valid = true;
        if (yy === -1 && diffY < -30) valid = true;

        if(valid) {
            let score;
            if (xx !== 0) {
                score = Math.abs(diffX) + (Math.abs(diffY)*10)
            } else {
                score = Math.abs(diffY) + (Math.abs(diffX)*10)
            }

            if (score < minScore) {
                minScore = score;
                bestIndex = index;
            }
        }
    });
    
    if (bestIndex !== focusIndex) {
        focusIndex = bestIndex;
        updateFocus(clickables);
    if (yy !== 0){
        const mainElement = document.getElementById("main");
        const newRect = clickables [focusIndex].getBoundingClientRect();
        if (mainElement) {
            mainElement.dispatchEvent(new WheelEvent("wheel",{
                clientX: newRect.left + newRect.width / 2,
                clientY: newRect.top + newRect.height / 2,
                deltaY: yy * 210,
                bubbles:true
            }));
        }
    }
}
}

function keebLoop(){
    window.addEventListener("keydown",(e) =>{
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
        if (e.key === "ArrowLeft") moveAround(-1,0);
        })
}