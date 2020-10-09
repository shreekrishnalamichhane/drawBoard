const canvas = document.querySelector("#canvas");
const eraserBtn = document.querySelector("#eraser");
const pencilBtn = document.querySelector("#pencil");
const clearCanvas = document.querySelector("#clearCanvas");
const zoomIn = document.querySelector("#zoom-in");
const zoomOut = document.querySelector("#zoom-out");

const ctx = canvas.getContext("2d");

const inMemCanvas = document.createElement("canvas");
const inMemCtx = inMemCanvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  inMemCanvas.width = canvas.width;
  inMemCanvas.height = canvas.height;
  inMemCtx.drawImage(canvas, 0, 0);
  console.log(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.drawImage(inMemCanvas, 0, 0);
});

console.log(pencilBtn.firstElementChild.id);

let colorPicker = document.querySelector("#color-picker");

canvas.style.backgroundColor = "white";
// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

if (canvas.style.backgroundColor == "black") {
  canvas.classList.add("pencil-cursor-white");

  if (canvas.classList.contains("pencil-cursor"))
    canvas.classList.remove("pencil-cursor");
} else {
  canvas.classList.add("pencil-cursor");
  if (canvas.classList.contains("pencil-cursor-white"))
    canvas.classList.remove("pencil-cursor-white");
}

let drawing = false;
let eraser = false;

function setDrawTrue(e) {
  drawing = true;
  draw(e);
}
function setDrawFalse() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (drawing) {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = 5;

    if (eraser == true) {
      ctx.strokeStyle = canvas.style.backgroundColor;
      ctx.lineWidth = 100;
    }
    console.log(colorPicker.value);
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}

canvas.addEventListener("mousedown", setDrawTrue);
canvas.addEventListener("mouseup", setDrawFalse);
canvas.addEventListener("mousemove", draw);

eraserBtn.addEventListener("click", () => {
  eraser = true;
  console.log(eraser);

  if (canvas.style.backgroundColor == "black") {
    canvas.classList.add("erasor-cursor-white");
    if (canvas.classList.contains("pencil-cursor-white"))
      canvas.classList.remove("pencil-cursor-white");
  } else {
    canvas.classList.add("erasor-cursor");
    if (canvas.classList.contains("pencil-cursor"))
      canvas.classList.remove("pencil-cursor");
  }
});

pencilBtn.addEventListener("click", () => {
  eraser = false;
  ctx.strokeStyle = colorPicker.value;

  if (canvas.style.backgroundColor == "black") {
    canvas.classList.add("pencil-cursor-white");
    if (canvas.classList.contains("erasor-cursor-white"))
      canvas.classList.remove("erasor-cursor-white");
  } else {
    canvas.classList.add("pencil-cursor");
    if (canvas.classList.contains("erasor-cursor"))
      canvas.classList.remove("erasor-cursor");
  }
});

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
