const addTimerButton = document.getElementById('add-timer');
const timeInput = document.getElementById('time-input');
const timersList = document.getElementById('timers');

const timers = [];

const createTimer = (initialTime) => {
  let time = initialTime;
  let intervalId;

  const start = () => {
    intervalId = setInterval(() => {
      time -= 1;
      updateDisplay();
      if (time <= 0) {
        stop();
        removeTimerElement();
      }
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalId)
  };

  const updateDisplay = () => {
    timerElement.querySelector('.timer-time').innerText = time
  };

  const removeTimerElement = () => {
    timerElement.remove()
    stop();
    const index = timers.indexOf(timer)
    if (index !== -1) {
      timers.splice(index, 1);
    }
  };

  const timerElement = document.createElement('li')
  timerElement.className = 'timer-item';
  timerElement.innerHTML = `
    <span class="timer-time">${time}</span>
    <button class="delete-btn">Удалить</button>
  `;

  timerElement.querySelector('.delete-btn').addEventListener('click', removeTimerElement);

  return {
    start,
    stop,
    timerElement,
  };
};

const addTimer = () => {
    const time = parseInt(timeInput.value, 10)
    if (isNaN(time) || time <= 0) {
      alert('Введите корректное время в секундах.');
      return;
    }
  
    const timer = createTimer(time)
    timers.push(timer)
    timersList.appendChild(timer.timerElement)
    timer.start();
    timeInput.value = ''
  };
  
  addTimerButton.addEventListener('click', addTimer)