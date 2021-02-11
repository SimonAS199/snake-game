let velocity = 150;
let direction;
let score = 0;
let newSegments = 0;

const SNAKE_SPEED = 1;
const EXPANSION_RATE = 2;

const gameScreen = document.getElementById("gameScreen");
const scoreBoard = document.getElementById("scoreboard");
const foodItem = document.createElement("DIV");
const snake = [{x: 11, y: 11}];
const food = {x: Math.floor(Math.random() * (20 - 1) + 1), y: Math.floor(Math.random() * (20 - 1) + 1)}

foodItem.classList.add("food");

const startGame = () => {

    draw();
    updateGameState();

}

const updateGameState = () => {

    setInterval(() => {
        moveInGivenDirection(direction);
        outOfBounds();
        foodCollision();
        draw();
        console.log("gamestate updated");

    }, velocity)

    setInterval(() => {
        console.log(snake);
    },3000)

}

const draw = () => {
    gameScreen.innerHTML = "";
    gameScreen.appendChild(foodItem);
    for (let i = 0; i < snake.length; i++){

        const newBodyPart = document.createElement("DIV");
        newBodyPart.classList.add("snakeBody");
        newBodyPart.style.gridRowStart = snake[i].y.toString();
        newBodyPart.style.gridColumnStart = snake[i].x.toString();
        gameScreen.appendChild(newBodyPart);

    }

    foodItem.style.gridRowStart = food.y.toString();
    foodItem.style.gridColumn = food.x.toString();

    scoreBoard.innerText = "Score: " + score.toString();

}

const createNewFoodItem = () => {

    food.x = Math.floor(Math.random() * (20 - 1) + 1);
    food.y = Math.floor(Math.random() * (20 - 1) + 1);

}

//COLLISION DETECTION
const foodCollision = () => {

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        newSegments += EXPANSION_RATE;
        expandSnake(newSegments);
        createNewFoodItem();
    }

}

const outOfBounds = () => {

    if (snake[0].x === 0 || snake[0].x === 22 ||
        snake[0].y === 0 || snake[0].y === 22) {

        restartGame();

    }

}

const expandSnake = (newSegments) => {

    for (i = 0; i < newSegments; i++){
        snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
    }

}

//CONTROLS
let previousDirection;
window.addEventListener("keydown", (k) => {

    switch (k.keyCode) {

        case 37: //LEFT
            direction = "LEFT";
            break;
        case 38: //UP
            direction = "UP";
            break;
        case 39: //RIGHT
            direction = "RIGHT";
            break;
        case 40: //DOWN
            direction = "DOWN";
            break;

    }
})

const moveInGivenDirection = (dir) => {

    switch (dir) {
        case "LEFT":
            snake.forEach(segment => {
                segment.x -= SNAKE_SPEED;
            })
            break;
        case "UP":
            snake.forEach(segment => {
                segment.y -= SNAKE_SPEED;
            })
            break;
        case "RIGHT":
            snake.forEach(segment => {
                segment.x += SNAKE_SPEED;
            })
            break;
        case "DOWN":
            snake.forEach(segment => {
                segment.y += SNAKE_SPEED;
            })
            break;
        default:
            return;
    }

}

//STARTING GAME ON LOAD
startGame();

const restartGame = () => {
    alert("Game Over!")
    //location.reload();
}