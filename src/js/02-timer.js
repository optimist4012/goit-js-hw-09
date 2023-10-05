import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]')
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
let timerId = null;
startBtn.disabled = true;
const datePicker = flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future', {position: 'center-top', distance: '100px', });
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
}
});
startBtn.addEventListener('click', onStart);
function onStart() {
  timerId = setInterval(() => {
    const currentDate = Date.now();
    const selectedDate = new Date(datePicker.selectedDates[0]).getTime();
    const deltaTime = selectedDate - currentDate;
    startBtn.disabled = true;
    dateInput.disabled = true;
    resetBtn.disabled = false;
    if (deltaTime < 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Countdown finished!', {position: 'center-top',distance: '100px'});  
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);
  }
    , 1000)
  function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
};
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }
const resetBtn = document.querySelector('[data-reset]');
resetBtn.disabled = true;
resetBtn.addEventListener('click', onReset);
function onReset() {
  clearInterval(timerId); 
  Notiflix.Notify.info('Please choose a new date', {position: 'center-top',distance: '100px'});
  day.textContent = '00';
  hour.textContent = '00';
  min.textContent = '00';
  sec.textContent = '00';
  dateInput.disabled = false;
  startBtn.disabled = true;
  datePicker.clear();
}