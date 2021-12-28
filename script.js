let canvas;
let canvasContext;

scorePlacement = 200;

let playerScore = 0;

let showingWinScreen = false;

let snakeX = 0;
let snakeY = 20;
let snakeWidth = 20;
let snakeHeight = 20;
let snakeSpeed = 20;

let appleX = 20;
let appleY = 0;
const APPLE_WIDTH = 20;
const APPLE_HEIGHT = 20;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;

  setInterval(function() {
    drawEverything();
    moveEverything();
  }, 20000/framesPerSecond);

}

function drawEverything () {
  //game board
  colorRect(0,0,canvas.width,canvas.height,'#9E9E9E'); 

  //snake
  colorRect(snakeX,snakeY,snakeWidth,snakeHeight,'#70FF59');
  
  //apple
  colorRect(appleX,appleY,APPLE_WIDTH,APPLE_HEIGHT,'#FF6259');
}


function moveEverything() {

  snakeX += snakeSpeed;
  
  // //left wall
  // if (ballX < 10) {
  //   if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
  //     ballSpeedX = -ballSpeedX;
  //     let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
  //     ballSpeedY = deltaY * 0.35;
  //   } else {
  //       player2Score++; //must be before ball reset
  //       ballReset();
  //   }
  // }

  // //right wall
  // if (ballX > canvas.width - 10) { //additional -10 so ball does not go past edge
  //   if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
  //     ballSpeedX = -ballSpeedX;
  //     let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
  //     ballSpeedY = deltaY * 0.35;
  //   } else {
  //       player1Score++; //must be before ball reset
  //       ballReset();
  //   }
  // }

  // //top wall
  // if (ballY < 10) {
  //   ballSpeedY = -ballSpeedY;
  // }

  // //bottom wall
  // if (ballY > canvas.height - 10) { 
  //   ballSpeedY = -ballSpeedY;
  // } 
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height); 
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}


// function resetBall() {
//   ballX = 25;
// }


// function drawFly () {
//   canvasContext.beginPath();
//   canvasContext.arc(110, 65, 5, 0, 2 * Math.PI);
//   canvasContext.stroke();
//   canvasContext.fillStyle = 'white';
//   canvasContext.fill();
//   canvasContext.beginPath();
//   canvasContext.arc(90, 65, 5, 0, 2 * Math.PI);
//   canvasContext.stroke();
//   canvasContext.fillStyle = 'white';
//   canvasContext.fill();
//   canvasContext.beginPath();
//   canvasContext.arc(100, 75, 10, 0, 2 * Math.PI);
//   canvasContext.stroke();
//   canvasContext.fillStyle = 'black';
//   canvasContext.fill();
// }
