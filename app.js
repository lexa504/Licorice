let licoriceImg;
let lolipopImg;
let candyCornImg;
let chompAudio;
let chocolateImg;
let canvas;
let context;
let dirs = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let headCell = { x: 0, y: 0 };
let numCells = 17;
let cellSize;
let hasCrossed = false;
let vels = { x: 0, y: 0 };

window.onload = init;

function init() {
  licoriceImg = document.getElementById("licorice");
  lolipopImg = document.getElementById("lolipop");
  candyCornImg = document.getElementById("candy-corn");
  chompAudio = document.getElementById("chompAudio");
  chocolateImg = document.getElementById("chocolate");
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  window.addEventListener("keydown", handleKD);
  window.addEventListener("keyup", handleKU);

  window.onresize = resize;
  resize();
  pos.x = canvas.width / 2;
  pos.y = canvas.height / 2;
  headCell.x = Math.floor(pos.x / cellSize);
  headCell.y = Math.floor(pos.y / cellSize);
  pos.x = (headCell.x + 0.5) * cellSize;
  pos.y = (headCell.y + 0.5) * cellSize;

  requestAnimationFrame(animate);
}

function resize() {
  let size = Math.min(window.innerWidth, window.innerHeight);
  let left = (window.innerWidth - size) / 2;
  let top = (window.innerHeight - size) / 2;
  canvas.width = canvas.height = size;
  canvas.style.left = left + "px";
  canvas.style.top = top + "px";

  cellSize = size / numCells;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(numCells);
  context.drawImage(
    lolipopImg,
    0.25 * canvas.width,
    0.15 * canvas.height,
    0.05 * canvas.width,
    0.1 * canvas.height
  );
  context.drawImage(
    chocolateImg,
    0.5 * canvas.width,
    0.15 * canvas.height,
    0.1 * canvas.width,
    0.1 * canvas.height
  );
  context.drawImage(
    candyCornImg,
    0.75 * canvas.width,
    0.15 * canvas.height,
    0.1 * canvas.width,
    0.1 * canvas.height
  );

  drawPlayer();
}

function handleKD(e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowDown":
      // to do
      dirs.y = 1;
      dirs.x = 0;
      break;
    case "ArrowUp":
      // to do
      dirs.y = -1;
      dirs.x = 0;
      break;
    case "ArrowLeft":
      // to do
      dirs.y = 0;
      dirs.x = -1;
      break;
    case "ArrowRight":
      // to do
      dirs.y = 0;
      dirs.x = 1;
      break;
  }
}

function handleKU(e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowDown":
      // to do
      console.log("KU down");
      break;
    case "ArrowUp":
      // to do
      console.log("KU up");
      break;
    case "ArrowLeft":
      // to do
      console.log("KU left");
      break;
    case "ArrowRight":
      // to do
      console.log("KU right");
      break;
  }
}

function animate() {
  pos.x += vels.x;
  pos.y += vels.y;
  if (Math.floor(pos.x / cellSize + 0.5 * cellSize) !== headCell.x && dirs.y !== 0) {
    vels.x = 0;
    vels.y = dirs.y;
    pos.x = headCell.x * cellSize;
    pos.y = headCell.y * cellSize;
  } else if (Math.floor(pos.y / cellSize + 0.5 * cellSize) !== headCell.y && dirs.x !== 0) {
    vels.y = 0;
    vels.x = dirs.x;
    pos.x = headCell.x * cellSize;
    pos.y = headCell.y * cellSize;
  }
  headCell.x = Math.floor(pos.x / cellSize);
  headCell.y = Math.floor(pos.y / cellSize);
  draw();
  requestAnimationFrame(animate);
}

function drawPlayer() {
  context.fillStyle = "red";
  context.translate(pos.x, pos.y);
  context.fillRect(-0.5 * cellSize, -0.5 * cellSize, cellSize, cellSize);
  context.translate(-pos.x, -pos.y);
}

function drawGrid(n) {
  let lightColor = "antiquewhite";
  let darkColor = "burlywood";
  let color = lightColor;
  let startColor = lightColor;
  let isLight = true;
  let size = canvas.width / n;
  for (let y = 0; y < n; ++y) {
    for (let x = 0; x < n; ++x) {
      context.fillStyle = color;
      context.fillRect(x * size, y * size, size, size);
      if (isLight) {
        isLight = false;
        color = darkColor;
      } else {
        isLight = true;
        color = lightColor;
      }
    }
    if (color === startColor) {
      if (isLight) {
        isLight = false;
        color = darkColor;
        startColor = darkColor;
      } else {
        isLight = true;
        color = lightColor;
        startColor = lightColor;
      }
    } else {
      startColor = color;
    }
  }
}
