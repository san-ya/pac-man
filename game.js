let grid = document.querySelector(".grid");
let scoreSpan = document.querySelector('.score span')

let PATH = 0;
let WALL = 1;
let GHOSTHOME = 2;
let POWERPILL = 3;
let pacdotCount = 0;

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

let gridLevel = LEVELS[0]
const gridLayout = [];

  //create random power pellets
function generatePowerPill(){
  for(i = 0; i<4; i++)
  {
    let randNum = Math.floor(Math.random() * gridLevel.length);
    if(gridLevel[randNum] === PATH)
      gridLevel[randNum] = POWERPILL;
    else i--;
  }
}


makeGrid();
function makeGrid() {
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
}

let score = 0;
let pacmanStart = 256;
gridLayout[pacmanStart].removeChild(gridLayout[pacmanStart].childNodes[0])
gridLayout[pacmanStart].classList.add('pacman')

function movePacman(event){
  gridLayout[pacmanStart].classList.remove('pacman')
  // 37 = left | 39 = right | 40 = down | 38 = up
  let nextStep

  switch(event.keyCode){
    case 37:
      nextStep = pacmanStart-1;
      if(pacmanStart - 1 == 170)
      nextStep = 189
      break
    case 39:
      nextStep = pacmanStart + 1;
      if(pacmanStart + 1 == 190)
      nextStep = 171
      break
    case 38:
      nextStep = pacmanStart - 19;
      break
    case 40:
      nextStep = pacmanStart + 19;
      break
  }

  if(gridLevel[nextStep] !== WALL && gridLevel[nextStep] !== GHOSTHOME)
  { 
    pacmanStart = nextStep;
    // if(gridLayout[nextStep].childElementCount)
    // {
    //   increase score
    //   if(gridLevel[nextStep] === PATH)
    //     score += 10;
    //   else
    //     {
    //       score+=50;
    //       ghosts.forEach(ghost => {
    //         ghosts.isScared = true
    //         console.log("ghosts have been scared");
    //       })
    //       setTimeout(unScareGhost, 10000)
    //     }

      
    //   remove pac-dot and power-pill
      
    // }

  }
  else
  nextStep = pacmanStart

  //add pacman to next step
  gridLayout[nextStep].classList.add('pacman');
  pacdotEaten();
  powerPelletEaten();
}
document.addEventListener('keydown', movePacman)


function pacdotEaten(){
  if(gridLayout[pacmanStart].childElementCount && gridLayout[pacmanStart].childNodes[0].className == "pac-dot")
  {
    score += 10
    scoreSpan.innerText = score;
    let currentCell = gridLayout[pacmanStart];
    currentCell.removeChild(currentCell.childNodes[0])
    pacdotCount--;
  } 
}

function powerPelletEaten(){
  if(gridLayout[pacmanStart].childElementCount && gridLayout[pacmanStart].childNodes[0].className == "power-pill")
  {
    score += 50
    scoreSpan.innerText = score;
    let currentCell = gridLayout[pacmanStart];
    currentCell.removeChild(currentCell.childNodes[0])
    pacdotCount--;
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
  new GHOST('blinky', 20, 400),
  new GHOST('pinky',36,450),
  new GHOST('inky',340,550),
  new GHOST('clyde',324,600),
]

ghosts.forEach(ghost => {
  gridLayout[ghost.currIdx].classList.add(ghost.className, 'ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost)
{
  const directions = [1,-1, 19, -19]
  let nextPos = directions[Math.floor(Math.random() * directions.length)]

  setInterval(function (){
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
    {
      gridLayout[ghost.currIdx].classList.add('scared-ghost')
      console.log('ghost is scared');
    }
    eatenGhost(ghost)
    checkGameOver()
  }, ghost.speed)
}

function eatenGhost(ghost){
  if(ghost.isScared && gridLayout[ghost.currIdx].classList.contains('pacman')){
    ghost.isScared = false
    gridLayout[ghost.currIdx].classList.remove(ghost.className, 'ghost', 'scared-ghost')
    ghost.currIdx = ghost.startIdx
    score += 100
    gridLayout[ghost.currIdx].classList.add(ghost.className, 'ghost')
  }
}

function checkGameOver(){
  if(gridLayout[pacmanStart].classList.contains('ghost')
  && !gridLayout[pacmanStart].classList.contains('scared-ghost'))
  {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keydown', movePacman)
    setTimeout(function(){console.log("Game Over");}, 500)
  }
}

function checkWin(){
  if (score === 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){ alert("You have WON!"); }, 500)
  }
}