let countdown;
const timerDisplay = document.querySelector('.time-left');
const endTime = document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) { 
  clearInterval(countdown); //to clear timers if any exist

  const now = Date.now();
  const then = now + seconds * 1000;
  timeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); //to calculate how many seconds left
 
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    timeLeft(secondsLeft);
  }, 1000);
}

function timeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function start() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', start));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
