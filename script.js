const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("result");

const prizes = ["รางวัลที่ 1", "รางวัลที่ 2", "รางวัลที่ 3", "รางวัลที่ 4", "รางวัลที่ 5", "รางวัลที่ 6"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#FFD700"];

let startAngle = 0;
const arc = (2 * Math.PI) / prizes.length;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(prizes[i], canvas.width / 2 + Math.cos(angle + arc / 2) * 120, canvas.height / 2 + Math.sin(angle + arc / 2) * 120);
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spinTime = 3000;
    let finalAngle = Math.random() * 360;
    let totalRotation = 360 * 5 + finalAngle;
    let startTime = null;

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        let elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / spinTime, 1);
        let easeOutProgress = Math.pow(1 - progress, 3);
        let rotation = totalRotation * easeOutProgress;
        startAngle = rotation * (Math.PI / 180);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            spinning = false;
            let selectedPrizeIndex = Math.floor(((360 - finalAngle) / 360) * prizes.length) % prizes.length;
            resultText.textContent = "คุณได้: " + prizes[selectedPrizeIndex];
            resultText.style.display = "block";
        }
    }

    requestAnimationFrame(animateSpin);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();