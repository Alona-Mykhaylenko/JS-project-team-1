import dateToday from '../templates/date.hbs';
import { fetchWeatherDataOneDay } from './api-service';
import sansetImg from '../images/svg/sunset.svg';
import sunriseImg from '../images/svg/sunrise.svg';
const dateRef = document.querySelector('.today__date');

// --------------------------------------
const th = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

function renderDate() {
  const date = new Date();

  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

  const dayNow = date.getDate();

  const MonthNow = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

  let result = date.getHours() + ':' + date.getMinutes() + ':' + pad(date.getSeconds());

  dateRef.innerHTML = dateToday({
    sansetImg,
    sunriseImg,
    month: MonthNow,
    time: result,
    date: dayNow,
    weekDay: weekDayNow,
    th: th(),
  });
}
renderDate();

setInterval(renderDate, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}
//----------------------------------------------------
