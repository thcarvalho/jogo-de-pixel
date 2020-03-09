var container = document.getElementById('container');
var score = document.getElementById('score');
var speed = document.getElementById('speed');



var intervalLeft;
var intervalDown;
var intervalRight;
var intervalUp;
var gameInterval;

var fruit = {
  fruitsScore: 0
};

var obstacles = [];

var time = 50;

score.innerText = fruit.fruitsScore;
speed.innerText = time + ' milisegundos';

function createPixel() {
  var pixel = document.createElement('div')
  pixel.setAttribute('class', 'pixel');
  return pixel;
}

// var pixel = createPixel()

var player = {
  ref: createPixel(),
  i: 50,
  j: 50,
}

container.appendChild(player.ref);

function moveLeft() {
  player.j -= 10
  player.ref.style.left = player.j + "px";
  if (player.j === 40) {
    player.j = 940
    player.ref.style.left = player.j + "px";
  }
}
function moveRight() {
  player.j += 10
  player.ref.style.left = player.j + "px";
  if (player.j === 950) {
    player.j = 50
    player.ref.style.left = player.j + "px";
  }
}
function moveDown() {
  player.i += 10;
  player.ref.style.top = player.i + "px";
  if (player.i === 750) {
    player.i = 50
    player.ref.style.top = player.i + "px";
  }
}
function moveUp() {
  player.i -= 10
  player.ref.style.top = player.i + "px";
  if (player.i === 40) {
    player.i = 740
    player.ref.style.top = player.i + "px";
  }
}

function generateFruit() {
  let randomNumberI = Math.random() * (750 - 50) + 50;
  let randomNumberJ = Math.random() * (950 - 50) + 50;

  let leftOverI = randomNumberI % 10;
  let leftOverJ = randomNumberJ % 10;

  fruit.i = randomNumberI - leftOverI;
  fruit.j = randomNumberJ - leftOverJ

  fruit.ref = createPixel();
  container.appendChild(fruit.ref);
  fruit.ref.style.top = randomNumberI - leftOverI + "px";
  fruit.ref.style.left = randomNumberJ - leftOverJ + "px";
  fruit.ref.style.backgroundColor = '#008000';

}

setInterval(() => {
  speed.innerText = time + ' milisegundos';
  if (time > 10) {
    return time -= 10
  }
}, 10000)

function createObstacle() {
  let randomNumberI = Math.random() * (750 - 50) + 50;
  let randomNumberJ = Math.random() * (950 - 50) + 50;

  let leftOverI = randomNumberI % 10;
  let leftOverJ = randomNumberJ % 10;

  obstaclePixel = {
    ref: createPixel(),
    i: randomNumberI - leftOverI,
    j: randomNumberJ - leftOverJ,
  }

  obstaclePixel.ref.style.backgroundColor = '#f00';
  obstaclePixel.ref.style.top = obstaclePixel.i + "px";
  obstaclePixel.ref.style.left = obstaclePixel.j + "px";
  container.appendChild(obstaclePixel.ref);
  obstacles.push(obstaclePixel);
}

obstacleInterval = setInterval(createObstacle, 10000)

function resetGame() {
  clearInterval(intervalLeft);
  clearInterval(intervalDown);
  clearInterval(intervalRight);
  clearInterval(intervalUp);
  clearInterval(gameInterval);

  time = 50;
  fruit.fruitsScore = 0;
  score.innerText = fruit.fruitsScore;
  
  obstacles.map((obstacle, index) => {
    container.removeChild(obstacles[index].ref);
  });

  player.ref.style.top = 50 + "px";
  player.ref.style.left = 50 + "px";
  player.i = 50;
  player.j = 50;

  obstacles = [];

  gameInterval = setInterval(checkPixels, 10);
  container.removeChild(fruit.ref);
  generateFruit();
}

function checkPixels() {
  if (fruit.i === player.i && fruit.j === player.j) {
    console.log('Chegou aqui');
    container.removeChild(fruit.ref)
    generateFruit();
    fruit.fruitsScore++
    score.innerText = fruit.fruitsScore;
    
  }
  obstacles.map(obstacle => {
    if (obstacle.i === player.i && obstacle.j === player.j) {
      resetGame();
    }
  })
}

gameInterval = setInterval(checkPixels, 10);


generateFruit();
console.log(fruit);
console.log(player);

function tecla() {
  switch (event.keyCode) {
    case 97:
      clearInterval(intervalLeft);
      intervalLeft = setInterval(moveLeft, time);
      clearInterval(intervalDown);
      clearInterval(intervalRight);
      clearInterval(intervalUp);
      break;
    case 115:
      clearInterval(intervalDown);
      intervalDown = setInterval(moveDown, time);
      clearInterval(intervalLeft);
      clearInterval(intervalRight);
      clearInterval(intervalUp);
      break;
    case 100:
      clearInterval(intervalRight);
      intervalRight = setInterval(moveRight, time);
      clearInterval(intervalDown);
      clearInterval(intervalLeft);
      clearInterval(intervalUp);
      break;
    case 119:
      clearInterval(intervalUp);
      intervalUp = setInterval(moveUp, time);
      clearInterval(intervalDown);
      clearInterval(intervalLeft);
      clearInterval(intervalRight);
      break;
    case 112:
      clearInterval(intervalUp);
      clearInterval(intervalDown);
      clearInterval(intervalLeft);
      clearInterval(intervalRight);
      break;
    default:
      console.log(event.keyCode);
      break;
  }

}

document.body.onkeypress = tecla;