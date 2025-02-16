const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const moneyInput = document.getElementById("money");
const messageDiv = document.getElementById("message");
const resultDiv = document.getElementById("result");

let angle = 0;
let isSpinning = false;

// รางวัลและโอกาส
const rewards = ["ผมเป็นสุดยอดเก..🥵", "อาบัตตาคัม อ๊าส์~ 🗿", "นิสสสานนน!!💦", "หนมน้าๆ 😳"];
const probabilities = [5, 15, 30, 50]; 
const colors = ["gold", "red", "blue", "green"];

// วาดวงล้อ
function drawWheel() {
    const numSlices = rewards.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    for (let i = 0; i < numSlices; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, sliceAngle * i, sliceAngle * (i + 1));
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(rewards[i], 140 + 100 * Math.cos(sliceAngle * (i + 0.5)), 180 + 100 * Math.sin(sliceAngle * (i + 0.5)));
    }
}

// ฟังก์ชันหมุนวงล้อ
function spinWheel() {
    if (isSpinning) return;

    let money = parseInt(moneyInput.value);
    if (money < 20) {
        messageDiv.innerHTML = "จำนวนเหรียญคัมไม่พอ";
        return;
    }

    moneyInput.value = money - 20;
    messageDiv.innerHTML = "";
    resultDiv.innerHTML = "กำลังหมุน...";

    let spinTime = 3000; 
    let startTime = Date.now();
    let randomTargetAngle = Math.random() * 360 + 1440; // หมุน 4 รอบ + สุ่ม

    isSpinning = true;

    function animateSpin() {
        let elapsed = Date.now() - startTime;
        let progress = elapsed / spinTime;
        if (progress > 1) progress = 1;
        
        let currentAngle = easeOut(progress) * randomTargetAngle;
        angle = currentAngle % 360;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-200, -200);
        drawWheel();
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            isSpinning = false;
            let finalIndex = getWinningIndex(angle);
            resultDiv.innerHTML = `คุณได้ ${rewards[finalIndex]}!`;
        }
    }

    animateSpin();
}

// ฟังก์ชันช่วยให้การหมุนช้าลง
function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

// หาว่าช่องไหนชนะ
function getWinningIndex(finalAngle) {
    let numSlices = rewards.length;
    let sliceAngle = 360 / numSlices;
    let index = Math.floor(((360 - finalAngle) % 360) / sliceAngle);
    return index;
}

// เริ่มต้นวาดวงล้อ
drawWheel();
spinButton.addEventListener("click", spinWheel);
