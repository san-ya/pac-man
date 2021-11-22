let grid = document.querySelector(".grid");
// let pacmanHead = document.querySelectorAll("h1").children;
// let pacmanChild = pacmanHead.children;
let pacmanHead = document.getElementsByClassName("pacman-head");

//color
const colors = ["cyan", "#FFB8FF", "#FFB852", "red"];

setInterval(function changeHeadColor() {
  var i;
  for (i = 0; i < pacmanHead.length; i++) {
    let idx = Math.floor(Math.random() * 4);
    let randomColor = colors[idx];
    let pacSpan = pacmanHead[i];
    pacSpan.style.color = randomColor;
  }
},
100
);