let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;
let mode = 'medium';
let flashDurations = { easy: 500, medium: 250, hard: 100 };
const modeSelect = document.getElementById('mode-select');
modeSelect.addEventListener('change', function() {
    mode = this.value;
    // Restart the game on mode change
    reset();
    started = true;
    levelUp();
});

let h2 = document.querySelector("h2");
let highScore = localStorage.getItem("simonHighScore") || 0;
let highScoreDiv = document.getElementById("high-score");
function updateHighScoreDisplay() {
    highScoreDiv.textContent = `Highest Score: ${highScore}`;
}
updateHighScoreDisplay();

const startBtn = document.getElementById('start-btn');

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function showStartBtn() {
    if (isMobile()) {
        startBtn.style.display = 'inline-block';
    } else {
        startBtn.style.display = 'none';
    }
}
function hideStartBtn() {
    startBtn.style.display = 'none';
}

function startGame() {
    if (!started) {
        started = true;
        hideStartBtn();
        levelUp();
    }
}

// Show button on load if not started and on mobile
if (!started) {
    showStartBtn();
}

// Start game on button click (mobile only)
startBtn.addEventListener('click', function() {
    if (isMobile()) startGame();
});

// Start game on keydown (desktop)
document.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === 'n') {
        alert(`Highest Score: ${highScore}`);
        return;
    }
    startGame();
});

// Update h2 for mobile users
document.addEventListener('DOMContentLoaded', function() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        h2.innerText = 'Tap "Start Game" to begin';
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, flashDurations[mode]);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    h2.classList.add("level-up");
    setTimeout(() => h2.classList.remove("level-up"), 500);
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(randColor);

    btnFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);  // Corrected this line
        }
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighScore", highScore);
            updateHighScoreDisplay();
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;     // FIXED: removed 'let'
    gameSeq = [];
    userSeq = [];
    level = 0;
    showStartBtn();
}

// Toggle instructions box
const toggleBtn = document.getElementById('toggle-instructions-btn');
const instructionsBox = document.querySelector('.instructions');
toggleBtn.addEventListener('click', function() {
    if (instructionsBox.style.display === 'none' || instructionsBox.style.display === '') {
        instructionsBox.style.display = 'block';
        toggleBtn.textContent = 'Hide Instructions';
    } else {
        instructionsBox.style.display = 'none';
        toggleBtn.textContent = 'Show Instructions';
    }
});
