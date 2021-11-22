let pacmanHead = document.getElementsByClassName("pacman-head");
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

window.onload = function (){
  startGameAudio.play();
  // startGameAudio.loop = true;
}