import dateToday from '../templates/date.hbs';
import { fetchWeatherDataOneDay } from './api-service';
import sansetImg from '../images/svg/sunset.svg';
import sunriseImg from '../images/svg/sunrise.svg';
const dateRef = document.querySelector('.today__date');

function box() {
  fetchWeatherDataOneDay().then(data => {
    dateRef.innerHTML = dateToday({ sansetImg, sunriseImg });
  });
}

box();

// 1.Показать текущею дату и время !

// data.timeZone
