import { newNewWeather } from './render-five-day-forecast';
import moreInfoTpl from '../templates/more-info.hbs';

// import Siema from 'siema';

const fiveDaysHourListRef = document.querySelector('.five-days__hour-list');

const fiveDaysWeatherWeekRef = document.querySelector('.five-days__weather-week');
// const moreInfoScroll = document.querySelector('.next');

// Получить массив данных с АПИ, создать из него новый массив только из нужных данных,
// сократить к-во элементов массива по текущей дате, вызвать отрисовку страницы.
function getHourlyData(event) {
  if (event.target.tagName === 'BUTTON') {
    // moreInfoScroll.classList.remove('hide-button');
    const day = event.target.dataset.action;
    const dayInfo = newNewWeather.find(({ date }) => date === +day).moreInfo;
    console.log(newNewWeather);
    // console.log(day);

    const chosenHourlyData = dayInfo.map(hourData => ({
      temp: Math.round(hourData.main.temp),
      pressure: hourData.main.pressure,
      windSpeed: hourData.wind.speed,
      humidity: hourData.main.humidity,
      icon: `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`,
      hour: ConverterToHour(hourData.dt),
      dt: ConverterToDate(hourData.dt),
    }));
    renderHourlyData(chosenHourlyData);
  } else {
    // getHourlyData();
  }
}

fiveDaysWeatherWeekRef.addEventListener('click', getHourlyData);

const fiveDaysWeatherRef = document.querySelector('five-days__weather');
fiveDaysWeatherRef.addEventListener('click', hideMoreInfo);

// // Спрятать подробную информацию
function hideMoreInfo(event) {
  if (
    event.target.tagName === 'BUTTON' &&
    fiveDaysHourListRef.children.length > 0 &&
    fiveDaysHourListRef.firstElementChild.dataset.date === event.target.dataset.action
  ) {
    fiveDaysHourListRef.innerHTML = '';
  }
}

function renderHourlyData(chosenHourlyData) {
  console.log(chosenHourlyData);
  fiveDaysHourListRef.innerHTML = moreInfoTpl(chosenHourlyData);
  // const mySiema = new Siema({
  //   selector: '.siema',
  //   duration: 200,
  //   easing: 'ease-out',
  //   // loop: true,
  //   perPage: {
  //     279: 2,
  //     768: 4,
  //     1280: 7,
  //   },
  //   draggable: true,
  // });

  // if (window.innerWidth >= 768) {
  //   document.querySelector('.next').addEventListener('click', () => mySiema.next());
  // } else {
  //   fiveDaysHourListRef.classList.remove('siema');
  //   moreInfoScroll.classList.add('hide-button');
  // }
}

function ConverterToDate(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months[newDate.getMonth()];
  let date = newDate.getDate();
  let CurrentDate = date;
  return CurrentDate;
}

function ConverterToHour(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
  let min = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
  let CurrentHour = `${hour}:${min}`;
  return CurrentHour;
}
