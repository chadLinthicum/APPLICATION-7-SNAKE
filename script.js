//canvas
let canvas;
let ctx;

//game
let playerScore = 0;
let showingWinScreen = false;

//snake
let snakeX = 1;
let snakeY = 1;
let snakeWidth = 18;
let snakeHeight = 18;
const SNAKE_MOVEMENT = 20;
let snakeSpeed = 10000;

//apple
let appleX = 21;
let appleY = 1;
const APPLE_WIDTH = 18;
const APPLE_HEIGHT = 18;  

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  let framesPerSecond = 30;

  setInterval(function() {
    drawEverything();
    moveEverything();
  }, snakeSpeed/framesPerSecond);

  canvas.addEventListener('keydown', handleKeyPress);
}

function drawEverything () {
  //game board
  var gradient = ctx.createRadialGradient(200, 200, 100, 200, 200, 250);
  gradient.addColorStop(0, "#934B22");
  gradient.addColorStop(1, "#562E17");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width,canvas.height);

  //grid
  grid();
  colorRect(0,0,1,600,'black');
  colorRect(0,0,600,1,'black');

  //snake
  colorRect(snakeX,snakeY,snakeWidth,snakeHeight,'#70FF59');
  
  //apple
  colorRect(appleX,appleY,APPLE_WIDTH,APPLE_HEIGHT,'#FF6259');

  //fly
  // colorCircle(30, 30, 5, 'black');
  // colorCircle(25, 25, 2, 'white');
  // colorCircle(35, 25, 2, 'white');
}

function moveEverything() {

  // snakeY += SNAKE_MOVEMENT;
  // snakeSpeed -= 10000;
  
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

function handleKeyPress(event) {
  switch(event.keyCode) {
    case 38:
      up();
      break;
    case 40:
      down();
      break;
    case 37:
      left();
      break;
    case 39:
      right();
  }
}

function up() {
  snakeY -= SNAKE_MOVEMENT;
}

function down() {
  snakeY += SNAKE_MOVEMENT;
}

function right() {
  snakeX += SNAKE_MOVEMENT;
}

function left() {
  snakeX -= SNAKE_MOVEMENT;
}

function grid() {
  for (var i=20; i<=800; i += 20)
  {
    //vertical lines
    ctx.moveTo(i,0);
    ctx.lineTo(i,805);

    //horizontal lines
    ctx.moveTo(0,i);
    ctx.lineTo(805,i);

    ctx.strokeStyle='black';
    ctx.stroke();
  }
}

function colorRect(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height); 
}

function colorCircle(centerX, centerY, radius, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill();
}

