const DEBUG = false; 

canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
// set canvas to be a tab stop
canvas.setAttribute('tabindex','0');
// set focus to the canvas so keystrokes are immediately handled
canvas.focus();

//game
let score = 0;
scoreNumber = document.getElementById('scoreNumber');
scoreNumber.textContent=(score);

//snake head and body coordinates
let snake = [
  {
    x : 100,
    y : 100, 
  },
]

//snake attributes
let snakeWidth = 18;
let snakeHeight = 18;
const SNAKE_MOVEMENT = 20;
let snakeDirection = ''; //set to '' to have snake idle at start of game
let snakeSkinColor = '#FF69B4';
let snakeEyeSize = 5;
let snakeEyeA = 2;
let snakeEyeB = 11; 
let snakeEyeColor = '#000000';

//fly attributes
let flyX;
let flyY;
const FLY_WIDTH = 18;
const FLY_HEIGHT = 18;  
let randomLoc = Math.floor(Math.random() * 19);
let flyPIX = document.getElementById('flyPIX');

initializeGame();

function initializeGame() {
window.onload = function() {
    canvas.addEventListener('keydown', setSnakeDirectionVariable);
    
    console.log("set interval #1 is running");
  
  setInterval(function() {
    updateCanvas();
  }, 100);

  if (DEBUG) {
    snakeDirection = 'right'
    flyX = 220;
    flyY = 100;
  } else {
    flySpawn();
    console.log("set interval #2 is running");
    setInterval(function() {
      flyMovement();
    }, 500);
  }
}
}

function drawGame() {
  drawBackground();
  drawGrid(); 
}

function drawBackground() {
  var gradient = ctx.createRadialGradient(200, 200, 100, 200, 200, 250);
  gradient.addColorStop(0, '#934B22');
  gradient.addColorStop(1, '#562E17');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width,canvas.height);
}

function drawGrid() {
  for (var i=19; i<=800; i += 20)
  {
    //vertical lines
    ctx.moveTo(i,0);
    ctx.lineTo(i,805);

    //horizontal lines
    ctx.moveTo(0,i);
    ctx.lineTo(805,i);

    ctx.strokeStyle='#000000'; //other color of choice = #5A2E11
    ctx.stroke();
  }
}

function updateCanvas () {
  drawGame();
  useSnakeDirectionVariableToMoveSnake();
  drawSnakeHead();
  drawSnakeEyes();
  drawFly();
  eatFly();
  // gameOver();
}

function reset() {
  if (DEBUG) {
    snakeDirection = 'right';
    snake[0].y = 100;
    snake[0].x = 100;
    flyX = 220;
    flyY = 100;
  }
  
  alert ("game over");
  snakeDirection = '';
  snake[0].y = 100;
  snake[0].x = 100;
  scoreNumber.textContent=(score = 0);
}

function gameOver() {
  if (snake[0].x < 0) {
    reset();
    } else if (snake[0].x > 380) {
      reset();
    } else if (snake[0].y > 380) {
      reset();
    } else if (snake[0].y < 0) {
      reset();
    } 
  }

//fly coordinate generation


function flyMovement() {
  var flyCoordinatesArray = ['up', 'down', 'left', 'right']
    let flyCoordinates = flyCoordinatesArray[Math.floor(Math.random() * flyCoordinatesArray.length)];
    if (flyCoordinates === 'up') {
      flyY = flyY - 20;
    } else if (flyCoordinates === 'down') {
      flyY = flyY + 20;
    } else if (flyCoordinates === 'left') {
      flyX = flyX - 20;
    } else if (flyCoordinates === 'right') {
      flyX = flyX + 20;
    }

    //prevent fly from going out of bounds
    if (flyY < 0) {
      flyY = flyY + 20;
    } else if (flyY > 380) {
      flyY = flyY - 20;
    } else if (flyX < 0) {
      flyX = flyX + 20;
    } else if (flyX > 380) {
      flyX = flyX - 20;
    }
}

function flySpawn() {
    const flyCoordinate = 20;
    const specialRandom = (num = 1, limit = 380) => {
    const random = Math.random() * limit;
    const res = Math.round( random / num ) * num;
    return res;
    };

  if (flyX == snake[0].x || flyY == snake[0].y) {
  flyY = specialRandom(flyCoordinate);
  flyX = specialRandom(flyCoordinate);
  } else {
    flyY = specialRandom(flyCoordinate);
    flyX = specialRandom(flyCoordinate);
  }
}

function drawFly() {
  // drawSnakeRectangles(flyX,flyY,FLY_WIDTH,FLY_HEIGHT,'#2E2B29');
  ctx.drawImage(flyPIX,flyX,flyY,FLY_WIDTH,FLY_HEIGHT);
}

function isDirection(x, y) {
  if (snakeDirection === x || snakeDirection === y) {
    return true; 
  } 
  return false; 
}

function drawSnakeHead() { 
  drawSnakeRectangles(snake[0].x,snake[0].y,snakeWidth,snakeHeight, snakeSkinColor);
}

function setSnakeDirectionVariable(event) {
  switch(event.keyCode) {
    case 38:
      if (!isDirection('down', 'up')) { //snakeDirection === 'down' || snakeDirection === 'up'
        snakeDirection = 'up';
      } 
      break;
    case 40:
      if (!isDirection('down', 'up')) {
        snakeDirection = 'down';
      }
      break;
    case 37:
      if (!isDirection('right', 'left')) {
        snakeDirection = 'left';
      }
      break;
    case 39:
      if (!isDirection('right', 'left')) {
        snakeDirection = 'right';
      }
  }
}

function useSnakeDirectionVariableToMoveSnake () {
  if (snakeDirection === '') {
    return;
  } 
  if (snakeDirection === 'up') {
    snake[0].y += -SNAKE_MOVEMENT;
  }
  if (snakeDirection === 'down') {
    snake[0].y += SNAKE_MOVEMENT;
  }
  if (snakeDirection === 'left') {
    snake[0].x += -SNAKE_MOVEMENT;
  }
  if (snakeDirection === 'right') {
    snake[0].x += SNAKE_MOVEMENT;
  } 
}

function drawSnakeRectangles(leftX, topY, width, height, drawColor) {
  
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height); 
}

function drawSnakeEyes() {
  if (snakeDirection === 'up') {
    drawSnakeRectangles(snake[0].x + snakeEyeA,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (snakeDirection === 'down') {
    drawSnakeRectangles(snake[0].x + snakeEyeA,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (snakeDirection === 'left') {
    drawSnakeRectangles(snake[0].x + snakeEyeA,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    drawSnakeRectangles(snake[0].x + snakeEyeA,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (snakeDirection === 'right') {
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else {
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    drawSnakeRectangles(snake[0].x + snakeEyeB,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  }
}

function eatFly() {
  if (snake[0].x == flyX && snake[0].y == flyY) {
    flySpawn();
    score++;
    scoreNumber.textContent=(score);
    drawSnakeRectangles(100,100,100,100, snakeSkinColor);

    snake[0].x = snake[0].x;
    console.log(snake[0].x);
    
    snakeCopy = [...snake];
    snakeCopy.push({x : snake[0].x, y : snake[0].y});
    console.log(snake, snakeCopy);
  }
}