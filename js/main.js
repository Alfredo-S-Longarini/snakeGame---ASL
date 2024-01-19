const playBoard = document.querySelector(".playBoard");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");
const controls = document.querySelectorAll(".controls i");


let foodX, foodY;

let gameOver = false;

let snakeX = 5, snakeY = 10;
let snakeBody = [];

let velocityX = 0, velocityY = 0;
let setIntervalId;

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Presiona OK para continuar");
    location.reload();
}


controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})

const initGame = () => {

    if (gameOver) return handleGameOver();

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        scoreElement.innerText = `Score: ${score}`;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        highScoreElement.innerText = `High Score: ${highScore}`;

    };

    snakeX += velocityX;
    snakeY += velocityY;

    let htmlContent = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    snakeBody[0] = [snakeX, snakeY];

    for (let i = 0; i < snakeBody.length; i++) {
        htmlContent += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        };
    };

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    };

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    };

    playBoard.innerHTML = htmlContent;
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    initGame();
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);