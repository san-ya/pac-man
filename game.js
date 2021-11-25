let grid = document.querySelector(".grid");
let scoreSpan = document.querySelector('.score span')

const gridSize = [
  {
    level: "easy",
    gridRow: 19,
    gridCol: 19,
  },
  {
    level: "medium",
    grid: 19,
  },
  {
    level: "hard",
    gridRow: 28,
    gridCol: 31,
  },
];

let PATH = 0;
let WALL = 1;
let GHOSTHOME = 2;
let POWERPILL = 3;

const easy = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,
    1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,
    1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,
    1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,
    1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,
    1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,
    1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,
    1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,
    1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,
    1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,
    1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,
    1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

const hard = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
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
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,11,1,1,,1,0,1,1,1,1,0,1,
    1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];


const gridLayout = [];

makeGrid(19 * 19);
function makeGrid(noc) {
    for(i = 0; i<4; i++)
    {
        let randNum = Math.floor(Math.random() * easy.length);
        if(easy[randNum] === PATH)
        {
            easy[randNum] = POWERPILL;
        }
        else
        {
            i--;
        }
    }
  for (i = 0; i < noc; i++) {
    let newCell = document.createElement("div");
    grid.appendChild(newCell).className = "cell";
    gridLayout.push(newCell);

    if (easy[i] === WALL) gridLayout[i].classList.add("wall");
    else if (easy[i] === PATH) {
      let pacDot = document.createElement("div");
      newCell.appendChild(pacDot).className = "pac-dot";
    }
    else if(easy[i] === POWERPILL)
    {
    let pacPill = document.createElement("div");
      newCell.appendChild(pacPill).className = "power-pill";
    }
  }
}

let score = 0;
let pacmanStart = 256;
// gridLayout[pacmanStart].classList.remove('power-pill')
gridLayout[pacmanStart].classList.add('pacman')

function movePacman(event){
  gridLayout[pacmanStart].classList.remove('pacman')
  // 37 = left
  // 39 = right
  // 40 = down
  // 38 = up
  let nextStep
  
  switch(event.keyCode){
    case 37:
      nextStep = pacmanStart-1;
      break
    case 39:
      nextStep = pacmanStart + 1;
      break
    case 38:
      nextStep = pacmanStart - 19;
      break
    case 40:
      nextStep = pacmanStart + 19;
      break
  }

  if(easy[nextStep] === PATH || easy[nextStep] ===POWERPILL)
  { 
    if(gridLayout[pacmanStart].children.length>=1)
    {
      if(easy[nextStep] === PATH)
         score += 10;
      else
         score+=50;
      scoreSpan.innerText = score;
      if(gridLayout[pacmanStart].children.length>=1)
      {
        let currentCell = gridLayout[pacmanStart];
        currentCell.removeChild(currentCell.childNodes[0])
      }
    }
    pacmanStart = nextStep;
    gridLayout[nextStep].classList.add('pacman'); 
  }
  else if(easy[nextStep] === WALL)
  gridLayout[pacmanStart].classList.add('pacman')
}
document.addEventListener('keyup', movePacman)