let grid = document.querySelector(".grid");
let scoreSpan = document.querySelector('.score span')
let pacmanLivesDiv = document.querySelector('.pacman-lives')
const pacdotAudio = new Audio('./sounds/munch.wav')
const powerpillAudio = new Audio('./sounds/pill.wav')
const gameStartAudio = new Audio('./sounds/game_start.wav')
const eatGhostAudio = new Audio('./sounds/eat_ghost.wav')
const dieAudio = new Audio('./sounds/death.wav')
let gameDetails = document.querySelector('.details-wrap')

let PATH = 0;
let WALL = 1;
let GHOSTHOME = 2;
let POWERPILL = 3;
let pacdotCount = 0;
let pacmanLifeCount = 3;
let gridLevel = []
let gridWidth = 0
let score = 0;
let pacmanStart = 0;
let pacCurrIdx = 0;
let pacRotate = 0;
let blinkyStart
let pinkyStart
let inkyStart
let clydeStart
const lvl = 0

const gridLayout = [];
const LEVELS = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,
    1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,
    1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,
    1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,
    1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,
    0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,
    1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,
    1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,
    1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,
    1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,
    1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
      1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1,
      1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,
      1,0,0,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,
      1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,
      1,0,0,0,1,0,1,1,1,0,1,0,1,1,1,2,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,
      1,0,1,1,1,0,0,0,0,0,0,0,1,2,2,2,2,2,1,0,0,0,0,0,0,0,1,1,1,0,1,
      1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,
      1,1,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,
      1,0,0,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,0,0,1,
      1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,
      1,0,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,
      1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,
      1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
      1,0,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
      1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//0 = easy, 1 = medium, 2 = hard
setDimGrid(lvl)
function setDimGrid(level){
  gridLevel = LEVELS[level]
  if(level===0)
  {
    gridWidth=19
    pacmanStart = 256
    pacCurrIdx = 256
    blinkyStart = 20
    pinkyStart = 36
    inkyStart = 340
    clydeStart = 324
  }
  else if(level===1)
  {
    gridWidth=31
    pacmanStart = 324
    pacCurrIdx = 324
    blinkyStart = 230
    pinkyStart = 231
    inkyStart = 232
    clydeStart = 233
  }
  else
  {
    gridWidth=28
    pacmanStart = 489
    pacCurrIdx = 489
    blinkyStart = 375
    pinkyStart = 380
    inkyStart = 436
    clydeStart = 431
  }
    grid.style = `grid-template-columns: repeat(${gridWidth}, 2vw);`
    gameDetails.style.width = `${gridWidth * 2}vw`

}

  //create random power pellets
function generatePowerPill(){
  for(i = 0; i < 4; i++)
  {
    let randNum = Math.floor(Math.random() * gridLevel.length);
    if(gridLevel[randNum] === PATH)
      gridLevel[randNum] = POWERPILL;
    else i--;
  }
}


makeGrid();
function makeGrid() {
  // gameStartAudio.play();
  generatePowerPill();
  for (i = 0; i < gridLevel.length; i++) {
  let newCell = document.createElement("div");
  grid.appendChild(newCell).className = "cell";
  gridLayout.push(newCell);

  if (gridLevel[i] === WALL) gridLayout[i].classList.add("wall");
  else if (gridLevel[i] === PATH) {
    let pacDot = document.createElement("div");
    newCell.appendChild(pacDot).className = "pac-dot";
    pacdotCount++;
  }
  else if(gridLevel[i] === POWERPILL)
  {
    let pacPill = document.createElement("div");
    newCell.appendChild(pacPill).className = "power-pill";
    pacdotCount++;
  }
}
  drawLives();
}

gridLayout[pacCurrIdx].removeChild(gridLayout[pacCurrIdx].childNodes[0])
gridLayout[pacCurrIdx].classList.add('pacman')

var interval = window.setInterval(function () {

  gridLayout[pacCurrIdx].classList.remove('pacman')

  nextStep = pacCurrIdx - gridWidth;
  pacRotate = 270

  if(gridLevel[nextStep] !== WALL && gridLevel[nextStep] !== GHOSTHOME)
    pacCurrIdx = nextStep;
  else
    nextStep = pacCurrIdx;

  //add pacman to next step
  gridLayout[nextStep].classList.add('pacman');
  gridLayout[nextStep].style.transform = `rotate(${pacRotate}deg)`
  pacdotEaten();
  powerPelletEaten();
  checkCollision();
  checkWin()
}, 400);

function movePacman(event) {
  window.clearInterval(interval);
  gridLayout[pacCurrIdx].classList.remove('pacman')
  // 37 = left | 39 = right | 40 = down | 38 = up
  let nextStep

  switch(event.keyCode){
    case 37:
      nextStep = pacCurrIdx-1;
      if(lvl == 1 && pacCurrIdx - 1 == 170)
         nextStep = 189
      pacRotate = 180
      break
    case 39:
      nextStep = pacCurrIdx + 1;
      if(lvl == 1 && pacCurrIdx + 1 == 190)
         nextStep = 171
      pacRotate = 0
      break
    case 38:
      nextStep = pacCurrIdx - gridWidth;
      pacRotate = 270
      break
    case 40:
      nextStep = pacCurrIdx + gridWidth;
      pacRotate = 90
      break
  }

  if(gridLevel[nextStep] !== WALL && gridLevel[nextStep] !== GHOSTHOME)
    pacCurrIdx = nextStep;
  else
  nextStep = pacCurrIdx;

  //add pacman to next step
  gridLayout[nextStep].classList.add('pacman');
  gridLayout[nextStep].style.transform = `rotate(${pacRotate}deg)`
  
  pacdotEaten();
  powerPelletEaten();
  checkCollision();
  checkWin()
}   //movepaman close

document.addEventListener('keydown', movePacman)

function pacdotEaten(){
  if(gridLayout[pacCurrIdx].childElementCount && gridLayout[pacCurrIdx].childNodes[0].className == "pac-dot")
  {
    score += 10
    scoreSpan.innerText = score;
    let currentCell = gridLayout[pacCurrIdx];
    currentCell.removeChild(currentCell.childNodes[0])
    pacdotCount--;
    pacdotAudio.play();
  }
}

function powerPelletEaten(){
  if(gridLayout[pacCurrIdx].childElementCount && gridLayout[pacCurrIdx].childNodes[0].className == "power-pill")
  {
    score += 50
    scoreSpan.innerText = score;
    let currentCell = gridLayout[pacCurrIdx];
    currentCell.removeChild(currentCell.childNodes[0])
    pacdotCount--;
    powerpillAudio.play();
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhost, 10000)
  }
}

function unScareGhost(){
  ghosts.forEach(ghost => ghost.isScared = false)
}

//ghost class
class GHOST{
  constructor(className, startIdx, speed){
    this.className = className
    this.startIdx = startIdx
    this.speed = speed
    this.currIdx = startIdx
    this.timerId = NaN
    this.isScared = false
  }
}

ghosts = [
  new GHOST('blinky',blinkyStart, 400),
  new GHOST('pinky',pinkyStart,450),
  new GHOST('inky',inkyStart,550),
  new GHOST('clyde',clydeStart,600),
]

ghosts.forEach(ghost => {
  gridLayout[ghost.currIdx].classList.add(ghost.className, 'ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost)
{
  const directions = [1,-1, gridWidth, -gridWidth]
  let nextPos = directions[Math.floor(Math.random() * directions.length)]
  ghost.timerId = setInterval(function (){
    if(!gridLayout[ghost.currIdx + nextPos].classList.contains('wall') &&
    !gridLayout[ghost.currIdx + nextPos].classList.contains('ghost'))
    {
      gridLayout[ghost.currIdx].classList.remove('ghost', ghost.className, 'scared-ghost')
      ghost.currIdx += nextPos
      gridLayout[ghost.currIdx].classList.add('ghost', ghost.className)
    }

    else
    nextPos = directions[Math.floor(Math.random() * directions.length)]


    if(ghost.isScared)
      gridLayout[ghost.currIdx].classList.add('scared-ghost')
    eatenGhost(ghost);
    checkCollision();
  }, ghost.speed)
}

function eatenGhost(ghost){
  if(ghost.isScared && gridLayout[ghost.currIdx].classList.contains('pacman')){
    eatGhostAudio.play();
    ghost.isScared = false
    gridLayout[ghost.currIdx].classList.remove(ghost.className, 'ghost', 'scared-ghost')
    ghost.currIdx = ghost.startIdx
    score += 100
    gridLayout[ghost.currIdx].classList.add(ghost.className, 'ghost')
  }
}

function checkCollision(){
  if(gridLayout[pacCurrIdx].classList.contains('ghost')
  && !gridLayout[pacCurrIdx].classList.contains('scared-ghost'))
  {
    if(pacmanLivesDiv.childElementCount)
    {
      // ghosts.forEach(ghost => clearInterval(ghost.timerId))
      gridLayout[pacCurrIdx].classList.remove('pacman')
      gridLayout[pacmanStart].classList.add('pacman')
      pacCurrIdx = pacmanStart
      --pacmanLifeCount;
      dieAudio.play();
      pacmanLivesDiv.removeChild(pacmanLivesDiv.firstChild)
    }
    else
    {
      // game getting over after 4 rounds instead of 3
      //pacman getting lost if key other than the 4 main pressed
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keydown', movePacman)
<<<<<<< Updated upstream
      //alert("Game Over");
      //setTimeout(function(){console.log("Game Over");}, 500)
      // setTimeout(function(){
      //   console.log("Game Over");
         window.open('./gameOver.html', 'Game Over', 'width=480,height=420,left=380,top=110,scrollbars=yes');
      // }, 500)

      // gameOver();
=======
      
      gameOverModal.style.display = "flex";
     
>>>>>>> Stashed changes
  }
  }
}
checkWin()
function checkWin(){
  if (pacdotCount === 1) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){ alert("You have WON!"); }, 500)
  }
}

function drawLives()
{
  for(i=pacmanLifeCount; i>0; i--)
  {
    let pacLife = document.createElement('img');
    pacLife.src = "./Assets/pacman-life.png"
    pacLife.classList.add('pacLife');
    pacmanLivesDiv.appendChild(pacLife);
  }
}


function exit(){
  window.location='index.html';
}

function restart(){ 
		window.location='game.html';
 
}
