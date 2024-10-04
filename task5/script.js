let timer;
let countdownTime = 0;
let isRunning = false;
let fireworkInterval;

function setTime() {
    const hrs = parseInt(document.getElementById("hours").value) || 0;
    const mins = parseInt(document.getElementById("minutes").value) || 0;
    const secs = parseInt(document.getElementById("seconds").value) || 0;
    countdownTime = (hrs * 3600) + (mins * 60) + secs;
    document.getElementById("timer").textContent = formatTime(countdownTime);
}

function startTimer() {
    if (!isRunning && countdownTime > 0) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    clearInterval(fireworkInterval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    countdownTime = 0;
    document.getElementById("timer").textContent = formatTime(countdownTime);
    document.getElementById("hours").value = '';
    document.getElementById("minutes").value = '';
    document.getElementById("seconds").value = '';
}

function updateTimer() {
    if (countdownTime > 0) {
        countdownTime--;
        document.getElementById("timer").textContent = formatTime(countdownTime);
    } else {
        stopTimer();
        // Delay the fireworks by 1 second
        setTimeout(triggerFireworks, 1000);
    }
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

document.getElementById("timer").textContent = formatTime(countdownTime);

// Fireworks animation code
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function triggerFireworks() {
    fireworkInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createFirework();
        }
    }, 1);

    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 60000);

    animateFireworks();
}

function createFirework() {
    const firework = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        radius: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speedX: (Math.random() - 0.5) * 5,
        speedY: Math.random() * -10 - 10,
        gravity: 0.0
    };
    fireworks.push(firework);
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.x += firework.speedX;
        firework.y += firework.speedY;
        firework.speedY += firework.gravity;
        firework.radius *= 0.98;

        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();

        if (firework.radius < 0.5) {
            fireworks.splice(index, 1);
        }
    });

    if (fireworks.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}
