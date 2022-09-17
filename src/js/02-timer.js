import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputField: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysVal: document.querySelector('[data-days]'),
  hoursVal: document.querySelector('[data-hours]'),
  minutesVal: document.querySelector('[data-minutes'),
  secondsVal: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.warning('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', function () {
        timerStart(selectedDates[0]);
        refs.startBtn.disabled = true;
        refs.inputField.disabled = true;
      });
    }
  },
};

flatpickr(refs.inputField, options);


function timerStart(selectedDate) {
  const timerId = setInterval(() => {
    const currentTime = new Date();
    const timerActualValue = selectedDate - currentTime;
    if (timerActualValue < 0) {
      clearTimeout(timerId);
      refs.inputField.disabled = false;
      return;
    }
    const timerEndTime = convertMs(timerActualValue);
    refs.daysVal.textContent = addLeadingZero(timerEndTime.days);
    refs.hoursVal.textContent = addLeadingZero(timerEndTime.hours);
    refs.minutesVal.textContent = addLeadingZero(timerEndTime.minutes);
    refs.secondsVal.textContent = addLeadingZero(timerEndTime.seconds);
  }, 1000);
}



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
