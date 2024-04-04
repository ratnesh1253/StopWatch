let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startPause() {
  if (!isRunning) {
    start();
  } else {
    pause();
  }
}

function start() {
  isRunning = true;
  startPauseBtn.textContent = "Pause";
  startTime = Date.now() - (lapCount > 1 ? lapCount - 1 : 0);
  timer = setInterval(updateDisplay, 10);
}

function pause() {
  isRunning = false;
  startPauseBtn.textContent = "Start";
  clearInterval(timer);
}

function reset() {
  pause();
  display.textContent = "00:00:00";
  lapCount = 1;
  lapsList.innerHTML = "";
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
}

function padTime(val) {
  return val < 10 ? `0${val}` : val;
}

function lap() {
  const lapTime = display.textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapsList.prepend(lapItem);
  lapCount++;
}
