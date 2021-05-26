import dateToday from '../templates/date.hbs';
import { fetchWeatherDataOneDay } from './api-service';

const dateRef = document.querySelector('.today__date');

function box() {
  fetchWeatherDataOneDay().then(data => {
    dateRef.innerHTML = dateToday();
  });
}

box();
