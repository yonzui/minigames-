
const cardArray = [
    {
        name: 'fries',
        img: 'ASSETS/fries.png',
    },
    {
        name: 'cheese',
        img: 'ASSETS/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'ASSETS/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'ASSETS/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'ASSETS/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'ASSETS/pizza.png'
    },
    {
        name: 'fries',
        img: 'ASSETS/fries.png',
    },
    {
        name: 'cheese',
        img: 'ASSETS/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'ASSETS/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'ASSETS/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'ASSETS/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'ASSETS/pizza.png'
    },

]
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'ASSETS/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
        
        
    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    console.log(cards)
    console.log('check for match!')
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'ASSETS/blank.png')
        cards[optionTwoId].setAttribute('src', 'ASSETS/blank.png')
        alert('u clicked the same image!')
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('u found a match!')
        cards[optionOneId].setAttribute('src', 'ASSETS/white.png')
        cards[optionTwoId].setAttribute('src', 'ASSETS/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'ASSETS/blank.png')
        cards[optionTwoId].setAttribute('src', 'ASSETS/blank.png')
        alert('try again...')
    }
    resultDisplay.textContent = cardsWon.length
        cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.innerHTML = 'yay! you found them all!'
    }

}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    console.log(cardsChosen)
    console.log(cardsChosenIds)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500)
    }
}








// MEMORY GAME END








// ROCK-PAPER-SCISSORS
const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
cpuResult = document.querySelector(".cpu_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");


optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        userResult.src = cpuResult.src = "ASSETS/images/rock.png"
        result.textContent = "wait..."


        optionImages.forEach ((image2, index2) => {

            
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        
        let time = setTimeout(() =>{
            gameContainer.classList.remove("start");

        let imageSrc = e.target.querySelector("img").src;

        userResult.src = imageSrc;

        
        let randomNumber = Math.floor(Math.random() * 3);

        let cpuImages = ["ASSETS/images/rock.png", "ASSETS/images/paper.png", "ASSETS/images/scissors.png"];
        cpuResult.src = cpuImages[randomNumber];



        let cpuValue = ["R", "P", "S"][randomNumber];
        
        let userValue = ["R", "P", "S"][index];


      let outcomes = {
        RR: "draw",
        RP: "computer",
        RS: "you",
        PP: "draw!",
        PR: "you",
        PS: "computer",
        SS: "draw",
        SR: "computer",
        SP: "you",
      };
      
      
      let outComeValue = outcomes[userValue + cpuValue];

      result.textContent = userValue === cpuValue ? "match draw..." : `${outComeValue} won!`
      console.log(outComeValue);
      
        },2500)

    });
});





// RPS END















// PONG


const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtnPong = document.querySelector("#resetBtnPong")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const paddle1Color = "white";
const paddle2Color = "white";
const paddleBorder = "black";
const ballColor = "red";
const ballBorderColor = "darkred";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtnPong.addEventListener("click", resetGame);

gameStart();


function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
       clearBoard(); 
       drawPaddles();
       moveBall();
       drawBall(ballX, ballY);
       checkCollision();
       nextTick();
    }, 10)
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

};

function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    } 
    if(ballX <= 0){
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX >= gameWidth){
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX <=(paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed +=1;
        }
    }
    if(ballX >=(paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed +=1;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
                break;
        case(paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
    }
};
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};

// PONG END





// MG START

