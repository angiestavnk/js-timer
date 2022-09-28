const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const minutePrefix = document.getElementById('minute-prefix');
const secondsPrefix = document.getElementById('second-prefix');
const resetBtn = document.querySelector('.reset-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resumeBtn = document.querySelector('.resume-btn');

let currentTimer;
let paused = false;

const sound = new Audio('./bell.wav');

window.onload = () => {
  setupTimer();
}

function setupTimer() {
  currentTimer = setInterval(changeSeconds, 1000);
}

let secondsCount = 0;

function changeSeconds() {
  secondsCount += 1;
  setValueToNodes(secondsCount);
}

function setValueToNodes(sec) {
  let secCalc = Math.floor(sec % 60);
  let minCalc = Math.floor(sec / 60);
  seconds.innerHTML = secCalc;
  minutes.innerHTML = minCalc;
  minutePrefix.innerHTML = minutes.innerHTML > 1 ? 's' : '';
  secondsPrefix.innerHTML = seconds.innerHTML > 1 ? 's' : '';

  secCalc == 0 && minCalc != 0 && sound.play();
}

function resetTimer() {
  secondsCount = 0;
  clearInterval(currentTimer);
  setValueToNodes(secondsCount);
  sound.pause();
  sound.currentTime = 0;
  !paused && setupTimer()
};

function pauseTimer() {
  clearInterval(currentTimer);
  paused = true;
  sound.pause();
  updateButtonsVisibility();
}

function resumeTimer() {
  setValueToNodes(secondsCount);
  setupTimer();
  paused = false;
  updateButtonsVisibility();
}

function updateButtonsVisibility() {
  pauseBtn.style.display = paused ? "none" : 'inline-block';
  resumeBtn.style.display = paused ? "inline-block" : 'none';
}

resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);