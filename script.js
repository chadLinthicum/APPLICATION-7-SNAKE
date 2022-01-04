canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
// set canvas to be a tab stop
canvas.setAttribute('tabindex','0');
// set focus to the canvas so keystrokes are immediately handled
canvas.focus();

//game
let playerScore = 0;
let showingWinScreen = false;

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
let snakeSpeed = 100;
let direction = '';
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
let flySpeed = 1000;

window.onload = function () {
     
  flySpawn();

  // setInterval(function() {
  //   flyMovement();
  // }, flySpeed);

  setInterval(function() {
    drawEverything();
  }, snakeSpeed);

  canvas.addEventListener('keydown', handleKeyPress);
}

function drawEverything () {

  //game board
  var gradient = ctx.createRadialGradient(200, 200, 100, 200, 200, 250);
  gradient.addColorStop(0, '#934B22');
  gradient.addColorStop(1, '#562E17');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width,canvas.height);

  //grid
  grid();

  snakeMovement ();

  // snake head  
  colorRect(snake[0].x,snake[0].y,snakeWidth,snakeHeight, snakeSkinColor);

  // snake eyes
  if (direction === 'up') {
    colorRect(snake[0].x + snakeEyeA,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === 'down') {
    colorRect(snake[0].x+snakeEyeA,snake[0].y+snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snake[0].x + snakeEyeB,snake[0].y+snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === 'left') {
    colorRect(snake[0].x + snakeEyeA,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snake[0].x + snakeEyeA,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === 'right') {
    colorRect(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snake[0].x + snakeEyeB,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else {
    colorRect(snake[0].x + snakeEyeB,snake[0].y + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snake[0].x + snakeEyeB,snake[0].y + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  }
  
  //fly
  colorRect(flyX,flyY,FLY_WIDTH,FLY_HEIGHT,'#2E2B29');

  //eat fly
  if (snake[0].x == flyX && snake[0].y == flyY) {
    flyX = specialRandom(flyCoordinate); 
    flyY = specialRandom(flyCoordinate); 
    score++;
    scoreNumber.textContent=(score);
    snakeSpeed -= 1000;
    console.log(snakeSpeed)
  }

  gameOver();
}

function reset() {
  alert('game over');
  direction = '';
  snake[0].y = 100;
  snake[0].x = 100;
  scoreNumber.textContent=(score = 0);
}

function gameOver() {
  if (snake[0].x < 0) {
    console.log(snake[0].x)
    reset();
    } else if (snake[0].x > 380) {
      console.log(snake[0].x)
      reset();
    } else if (snake[0].y > 380) {
      console.log(snake[0].y)
      reset();
    } else if (snake[0].y < 0) {
      console.log(snake[0].y)
      reset();
    } 
  }


//fly coordinate generation
const flyCoordinate = 20;
const specialRandom = (num = 1, limit = 380) => {
   const random = Math.random() * limit;
   const res = Math.round( random / num ) * num;
   return res;
};

//handle fly movement
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
  if (flyX == snake[0].x || flyY == snake[0].y) {
  flyY = specialRandom(flyCoordinate);
  flyX = specialRandom(flyCoordinate);
  } else {
    flyY = specialRandom(flyCoordinate);
    flyX = specialRandom(flyCoordinate);
  }
}

// set direction variable
function handleKeyPress(event) {
  switch(event.keyCode) {
    case 38:
      if (direction === 'down' || direction === 'up') {
        return;
      } else {
          direction = 'up';
      }
      break;
    case 40:
      if (direction === 'up' || direction === 'down') {
        return;
      } else {
          direction = 'down';
      }
      break;
    case 37:
      if (direction === 'right' || direction === 'left') {
        return;
      } else {
          direction = 'left';
      }
      break;
    case 39:
      if (direction === 'left' || direction === 'right') {
        return;
      } else {
          direction = 'right';
      }
  }
}

// use direction variable to move snake
function snakeMovement () {
  if (direction === '') {
    return;
  } else if (direction === 'up') {
    snake[0].y += -SNAKE_MOVEMENT;
  } else if (direction === 'down') {
    snake[0].y += SNAKE_MOVEMENT;
  } else if (direction === 'left') {
    snake[0].x += -SNAKE_MOVEMENT;
  } else if (direction === 'right') {
    snake[0].x += SNAKE_MOVEMENT;
  } 
}

function grid() {
  for (var i=19; i<=800; i += 20)
  {
    //vertical lines
    ctx.moveTo(i,0);
    ctx.lineTo(i,805);

    //horizontal lines
    ctx.moveTo(0,i);
    ctx.lineTo(805,i);

    ctx.strokeStyle='#000000';
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

