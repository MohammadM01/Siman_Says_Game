const container = document.querySelector(".container");
const h2 = document.querySelector(".level-title");
const red = document.querySelector(".box.red");
const green = document.querySelector(".box.green");
const orange = document.querySelector(".box.orange");
const blue = document.querySelector(".box.blue");
const box = document.querySelectorAll(".box");

let highestScoreT = document.querySelector(".highestScoreT");
let highestScore = localStorage.getItem("highestScore") || 0;
let color = [red, green, orange, blue];
let gSeq = [];
let uSeq = [];
let level = 0;
let gameStarted = false;

highestScore = Number(highestScore);
highestScoreT.textContent = `Highest Score🔥: ${highestScore}`;

document.addEventListener("dblclick", function () {
  if (gameStarted === false) {
    gameStarted = true;
    console.log("Game has started");
    levelUp();
  }
});

function score() {
  level > highestScore
    ? ((highestScore = level),
      localStorage.setItem("highestScore", highestScore))
    : highestScore;
}

box.forEach(function (btn) {
  btn.addEventListener("click", function () {
    flash(btn);
    if (gameStarted) {
      uSeq.push(btn);
      if (btn === gSeq[uSeq.length - 1]) {
        if (uSeq.length === gSeq.length) {
          setTimeout(levelUp, 1000);
        }
        console.log(btn.classList[1]);
        score();
      } else {
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
          document.body.style.backgroundColor = "";
        }, 200);
        reset();
      }
    }
  });
});

function reset() {
  gameStarted = false;
  gSeq = [];
  uSeq = [];
  level = 0;
  h2.innerHTML =
    '<span style="color: red">Game over !!!</span> <br>Double click to restart';
  highestScoreT.textContent = `Highest Score🔥: ${highestScore}`;
}

function levelUp() {
  uSeq = [];
  level++;
  let random = Math.floor(Math.random() * color.length);
  let box = color[random];
  h2.textContent = `Level ${level}`;
  flash(box);
  gSeq.push(box);
  console.log(box);
}

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}
