/*document.addEventListener(
    "keydown" , event =>{
        if (event.key.startsWith("Arrow")){
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
        else if (event.key.toLowerCase()) {
            switch(event.key){
                case "w":
                    console.log(event);
                case "s":
                    console.log(event);
                case "a":
                    console.log(event);
                case "d":
                    console.log(event);
            }
        }
    }
);*/

const items = document.querySelectorAll(".item");

let currentindex = 0;


function updateActive(){
    items.forEach(function(item){
        item.classList.remove('active');
    });

    items[currentindex].classList.add('active');
}

document.addEventListener("keydown",function(event){

    if(event.key === "ArrowDown" || event.key === "s"){
        currentindex = currentindex+1; 
        if(currentindex >= items.length){
            currentindex = 0;
        }
        updateActive();
    }

    else if(event.key === "ArrowUp" || event.key === "w"){

        currentindex = currentindex -1

        if (currentindex < 0){
            currentindex = items.length - 1;
        }
        updateActive();
    }
})