let pacmanHead = document.getElementsByClassName("pacman-head");
let gameAudio = document.querySelector('.game-audio')
let audioOn = false
const startGameAudio = new Audio('./sounds/game_start.wav');
//colors array
const colors = ["cyan", "#FFB8FF", "#FFB852", "red"];

//change color of heading
setInterval(function changeHeadColor() {
  var i;
  for (i = 0; i < pacmanHead.length; i++) {
    let idx = Math.floor(Math.random() * 4);
    let randomColor = colors[idx];
    let pacSpan = pacmanHead[i];
    pacSpan.style.color = randomColor;
  }
}, 100);

let username=document.getElementById("username");
//start the game
function start() {
  console.log(username);
		window.location='game.html';
  }	

gameAudio.addEventListener('click', function(){
  audioOn = !audioOn
  if(audioOn)
  {
    startGameAudio.play();
    gameAudio.src = "./Assets/audio-icon.png"
  }
  else
  {
    startGameAudio.pause()
    gameAudio.src = "./Assets/audio-mute.png"
  }
})