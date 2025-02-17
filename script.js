const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const moneyInput = document.getElementById("money");
const messageDiv = document.getElementById("message");
const resultDiv = document.getElementById("result");
const settingsIcon = document.getElementById("settingsIcon");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.querySelector(".close");
const verifyKeyButton = document.getElementById("verifyKey");
const keyInput = document.getElementById("keyInput");
const settingsForm = document.getElementById("settingsForm");
const prizeSettingsDiv = document.getElementById("prizeSettings");
const saveSettingsButton = document.getElementById("saveSettings");

let angle = 0;
let isSpinning = false;

// รางวัลและโอกาส (ค่าเริ่มต้น)
let rewards = ["ผมเป็นสุดยอดเก..🥵", "อาบัตตาคัม อ๊าส์~ 🗿", "นิสสสานนน!!💦", "หนมน้าๆ 😳"];
let probabilities = [5, 15, 30, 50];
let colors = ["gold", "red", "blue", "green"];

// เปิดหน้าต่างตั้งค่า
settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block";
});

// ปิดหน้าต่างตั้งค่า
closeModal.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

// ตรวจสอบ Key
verifyKeyButton.addEventListener("click", () => {
    if (keyInput.value === "Zraffer_g6") {
        settingsForm.style.display = "block";
        loadSettingsForm();
    } else {
        alert("Key ไม่ถูกต้อง!");
    }
});

// โหลดฟอร์มตั้งค่า
function loadSettingsForm() {
    prizeSettingsDiv.innerHTML = "";
    for (let i = 0; i < rewards.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<label>${rewards[i]}: <input type="number" value="${probabilities[i]}" min="0" max="100" class="probabilityInput"></label>`;
        prizeSettingsDiv.appendChild(div);
    }
}

// บันทึกค่าโอกาสใหม่
saveSettingsButton.addEventListener("click", () => {
    let inputs = document.querySelectorAll(".probabilityInput");
    let total = 0;

    for (let i = 0; i < inputs.length; i++) {
        probabilities[i] = parseInt(inputs[i].value);
        total += probabilities[i];
    }

    if (total !== 100) {
        alert("โอกาสรวมต้องเท่ากับ 100%");
        return;
    }

    settingsModal.style.display = "none";
    drawWheel();
});

// เริ่มต้นวาดวงล้อ
drawWheel();
spinButton.addEventListener("click", spinWheel);
