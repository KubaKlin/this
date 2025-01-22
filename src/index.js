import './style.css';

const buttonStart = document.querySelector('.button-start');
const buttonStop = document.querySelector('.button-stop');
const stopWatchScreen = document.querySelector('.stop-watch-screen');
if (buttonStop) {
  buttonStop.disabled = true;
}

class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.running = true;
      this.timer = setInterval(() => this.update(), 1000);
      if (buttonStop) {
        buttonStop.disabled = false;
        buttonStop.innerText = 'Stop';
      }
    }
  }

  stop() {
    if (this.running) {
      clearInterval(this.timer);
      this.running = false;
    }
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.updateDisplay();
    if (buttonStop) {
      buttonStop.disabled = true;
    }
  }

  update() {
    if (this.running) {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateDisplay();
    }
  }

  getTime() {
    const time = new Date(this.elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  updateDisplay() {
    if (stopWatchScreen) {
      stopWatchScreen.textContent = this.getTime();
    }
  }
}

const stopwatch = new Stopwatch();

buttonStart?.addEventListener('click', () => {
  stopwatch.start();
});

buttonStop?.addEventListener('click', () => {
  if (!stopwatch.running) {
    stopwatch.reset();
    buttonStop.innerText = 'Stop';
  } else {
    stopwatch.stop();
    buttonStop.innerText = 'Reset';
  }
});
