let controllerIndex = null;
let focusIndex = 0;
let buttonStates = {a:false, b:false , up:false , down:false , left:false , right:false};

window.addEventListener("gamepadconnected", (event)=>{
    controllerIndex = event.gamepad.index;
    console.log("connect :",event.gamepad.id);
    requestAnimationFrame(gamepadLoop);
});

window.addEventListener("gamepaddisconnected", (event) =>{
    if (event.gamepad.index === controllerIndex){
        controllerIndex  = null;
        console.log("disconnected");
    }
});

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

function gpLoop(){
    if(controllerIndex !== null){
        const gamepad = navigator.getGamepads()[controllerIndex];
        const stickDeadZone = 0.4;

        const aPressed = gamepad.buttons[0].pressed;
        const bPressed = gamepad.buttons[1].pressed;
        const upPressed = gamepad.buttons[12].pressed || gamepad.axes[1] <= -stickDeadZone;
        const downPressed = gamepad.buttons[13].pressed || gamepad.axes[1] >= stickDeadZone;
        const leftPressed = gamepad.buttons[14].pressed || gamepad.axes[0] <= -stickDeadZone;
        const rightPressed = gamepad.buttons[15].pressed || gamepad.axes[0] >= stickDeadZone;
    
        if (bPressed && !buttonStates.b){
            window.dispatchEvent(new KeyboardEvent("keydown" , {key:"Escape"}));
            focusIndex = 0;
        }
        buttonStates.b = bPressed

        if (aPressed && !buttonStates.a) {
            if (typeof current !== "undefined" && current === "title") {
                document.getElementById("title").click();
            } else {
                let clickables = clickableElements()
                if (clickables[focusIndex]) {
                    clickables[focusIndex].click();
                    focusIndex = 0;
                }
            }
        }
        buttonStates.a = aPressed;

        let clickables = clickableElements()

        if (leftPressed && !buttonStates.left){
            if (clickables.length > 0){
                focusIndex = (focusIndex - 1 + clickables.length) % clickables.length;
                updateFocus(clickables);
            }
        }
        buttonStates.left = leftPressed;

        if (rightPressed && !buttonStates.right){
            if (clickables.length > 0){
                focusIndex = (focusIndex + 1 ) % clickables.length;
                updateFocus(clickables);
            }
        }
        buttonStates.right = rightPressed;

        if (controllerIndex !== null) {
            requestAnimationFrame(gpLoop);
        }
    }
}