import { ImageProxy } from "./ImageProxy";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = 800;
canvas.height = 600;

const proxy = new ImageProxy("src/lab_4/TestImage.jpeg", 200, 150);

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let boxX = 100;
let boxY = 100;

let lastRightClickTime = 0;
const DOUBLE_CLICK_THRESHOLD = 300; // ms

function isInsideBox(px: number, py: number): boolean {
  return (
    px >= boxX &&
    px <= boxX + proxy.getWidth() &&
    py >= boxY &&
    py <= boxY + proxy.getHeight()
  );
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  proxy.draw(ctx, boxX, boxY);
  requestAnimationFrame(render);
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (e.button === 0) {
    if (isInsideBox(mx, my)) {
      const now = Date.now();
      if (now - lastRightClickTime < DOUBLE_CLICK_THRESHOLD) {
        proxy.loadImage();
        lastRightClickTime = 0;
      } else {
        lastRightClickTime = now;
      }

      isDragging = true;
      dragOffsetX = mx - boxX;
      dragOffsetY = my - boxY;
      canvas.style.cursor = "grabbing";
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  boxX = mx - dragOffsetX;
  boxY = my - dragOffsetY;
});

canvas.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    canvas.style.cursor = "default";
  }
});

canvas.addEventListener("contextmenu", (e) => e.preventDefault());

render();
