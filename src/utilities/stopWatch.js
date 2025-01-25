export class Stopwatch {
  constructor() {
    this.buttonStart = document.querySelector('.button-start');
    this.buttonStop = document.querySelector('.button-stop');
    this.stopWatchScreen = document.querySelector('.stop-watch-screen');

    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.timer = null;
    this.initEventListeners();
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.timer = setInterval(this.update, 1000);
    }
    if (this.buttonStop) {
      this.buttonStop.disabled = false;
      this.buttonStop.innerText = 'Stop';
    }
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.updateDisplay();
    if (this.buttonStop) {
      this.buttonStop.disabled = true;
    }
  }

  update = () => {
    if (this.isRunning) {
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
    if (this.stopWatchScreen) {
      this.stopWatchScreen.textContent = this.getTime();
    }
  }

  initEventListeners() {
    if (this.buttonStart) {
      this.buttonStart.addEventListener('click', () => this.start());
    }
    if (this.buttonStop) {
      this.buttonStop.addEventListener('click', () => {
        if (!this.isRunning) {
          this.reset();
          this.buttonStop.innerText = 'Stop';
        } else {
          this.stop();
          this.buttonStop.innerText = 'Reset';
        }
      });
    }
  }
}