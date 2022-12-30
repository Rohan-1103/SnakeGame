//constants and variables
let inputDir = { x: 0, y: 0 };
const backgroundSound = new Audio('Sounds/background_music.mp3');
const foodSound = new Audio('Sounds/eating.mp3');
const moveSound = new Audio('Sounds/move_sound.mp3');
const gameoverSound = new Audio('Sounds/game_over.mp3');
const inputSound = new Audio('Sounds/input.mp3');
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 2, y: 9 }
]
food = { x: 15, y: 4 };


//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main); //Game loop
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    //snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //bumps to wall
    if (snake[0].x > 20 || snake[0].x <= 0 || snake[0].y > 20 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: updating the snake array
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        backgroundSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over...Press any key to start again")
        snakeArr = [{ x: 2, y: 9 }];
        backgroundSound.play();
        score = 0;
    }
    //if the food is eaten, increase the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x)//collision of head n food
    {
        foodSound.play();
        score += 5;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 19;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    //moving head furthur
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    // Display the food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the snake
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //Starts the game
    backgroundSound.play();
    moveSound.play();
    inputSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
