const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50, y = 50;
const speed = 5;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") y -= speed;
    if (event.key === "ArrowDown") y += speed;
    if (event.key === "ArrowLeft") x -= speed;
    if (event.key === "ArrowRight") x += speed;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 20, 20);
    requestAnimationFrame(gameLoop);
}

gameLoop();
