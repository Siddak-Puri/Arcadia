let controllerIndex = null;

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
        }
        buttonStates.b = bPressed

        if (aPressed && !buttonStates.a) {
            if (typeof current !== "undefined" && current === "title") {
                document.getElementById("title").click();
            } else {
            
            }
        }
        buttonStates.a = aPressed;

        if (leftPressed && !buttonStates.left){
            console.log("Left");
        }
        buttonStates.left = leftPressed;

        if (rightPressed && !buttonStates.right){
            console.log("Right")
        }
        buttonStates.right = rightPressed;

        (controllerIndex !== null) {
            requestAnimationFrame(gamepadLoop);
        }
    }
}