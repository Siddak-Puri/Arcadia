document.addEventListener(
    "keydown" , event =>{
        if (event.key.startsWith("Arrow"))
            switch(event.key){
                case "ArrowUp":
                    console.log(event);
                case "ArrowDown":
                    console.log(event);
                case "ArrowLeft":
                    console.log(event);
                case "ArrowRight":
                    console.log(event);
            }
    }
);

