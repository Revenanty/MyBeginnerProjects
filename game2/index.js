const grid = document.querySelector(".grid")
let currentShoter = 222;
const resultDisplay = document.querySelector(".results")
let width = 15;
let direction  = 1;
let invaderId;
let goingRight = true;
let alienaRemoved = [];
let result = 0;
for (let i = 0; i < 225; i++) {
      const square = document.createElement("div");
      grid.append(square)    
}
const squares = Array.from(document.querySelectorAll(".grid div"))
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,14,
    15,16,17,18,19,20,21,22,23,24,25,26,
    30,31,32,33,34,35,36,37,38,39,40,41
]
function draw(){
    for (let i = 0; i < alienInvaders.length; i++) {
        if(!alienaRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add("invader")
        }
    }
}
draw()
function remove(){
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}
squares[currentShoter].classList.add("shoter")

function moveShoter(e){
    squares[currentShoter].classList.remove("shoter")
    switch (e.key) {
        case "ArrowLeft":
            if(currentShoter % width !== 0) currentShoter -= 1
            break;
    
        case "ArrowRight":
            if(currentShoter % width < width - 1) currentShoter += 1 
            break;
    }
    squares[currentShoter].classList.add("shoter")
}
document.addEventListener("keydown",moveShoter)

function moveInvader(){
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();
    if(rightEdge && goingRight){
        for (let i = 0; i < alienInvaders.length; i++) {
           alienInvaders[i] += width + 1;
           direction = -1
           goingRight = false
        }
    }
    if(leftEdge && !goingRight){
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true
        }
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()
    if(squares[currentShoter].classList.contains("invader","shoter")){
        resultDisplay.innerHTML = "Game Over"
        clearInterval(invaderId)
    }
    for (let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i] >  (squares.length + width)){
            resultDisplay.innerHTML = "Game Over";
            clearInterval(invaderId)
        }
    }
    if(alienaRemoved.length === alienInvaders.length){
        resultDisplay.innerHTML = "You won";
        clearInterval(invaderId)
    }
}
invaderId = setInterval(moveInvader,300);

function shoot(e){
    let laserId;
    let curretnLaserIndex = currentShoter;
    function moveLaser(){
        squares[curretnLaserIndex].classList.remove("laser");
        curretnLaserIndex -= width
        squares[curretnLaserIndex].classList.add("laser");

        if(squares[curretnLaserIndex].classList.contains("invader")){
            squares[curretnLaserIndex].classList.remove("laser");
            squares[curretnLaserIndex].classList.remove("invader");
            squares[curretnLaserIndex].classList.add("boom");

            setTimeout(() => squares[curretnLaserIndex].classList.remove("boom"),300)
            clearInterval(laserId)

            const alienRemoval = alienInvaders.indexOf(curretnLaserIndex);
            alienaRemoved.push(alienRemoval);
            result++ 
            resultDisplay.innerHTML = result
            
        }
        
    }
 
    switch (e.key) {
        case "ArrowUp":
            laserId  = setInterval(moveLaser,100)
            break;
    }
}
document.addEventListener("keyup",shoot)