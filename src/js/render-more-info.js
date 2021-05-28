import moreInfoTpl from '../templates/more-info.hbs';

import { fetchWeatherDataFiveDays } from './api-service.js';
import Siema from 'siema';

const fiveDaysHourListRef = document.querySelector('.five-days__hour-list');
// const moreInfoBtnRef = document.querySelector('.five-days__weather-more-btn');
// const fiveDaysRef = document.querySelector('five-days__weather-week-list');
const fiveDaysWeatherWeekRef = document.querySelector('.five-days__weather-week');
const moreInfoScroll = document.querySelector('.next');

// function isFiveDaysEmpty() {
//   if (fiveDaysRef.elements) {

//   }
// }

// Получить массив данных с АПИ, создать из него новый массив только из нужных данных,
// сократить к-во элементов массива по текущей дате, вызвать отрисовку страницы.
function getHourlyData() {
  fetchWeatherDataFiveDays().then(({ list }) => {
    const chosenHourlyData = list.map(hourData => ({
      temp: Math.round(hourData.main.temp),
      pressure: hourData.main.pressure,
      windSpeed: hourData.wind.speed,
      humidity: hourData.main.humidity,
      icon: `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`,
      dt: ConverterToDate(hourData.dt),
      hour: ConverterToHour(hourData.dt),
    }));

    renderHourlyData(chosenHourlyData);
  });
}

// getHourlyData();

fiveDaysWeatherWeekRef.addEventListener('click', isMoreInfoOpen);

// .reduce((dayHours, item) =>
// if (item.dt === event.target.dataset.date) {
//     dayHours.push(item)}, []);

// Проверить, открыта ли секция подробной тнформации вставить в ивент листенер)
function isMoreInfoOpen(event) {
  if (event.target.tagName === 'BUTTON' && fiveDaysHourListRef.children.length > 0) {
    hideMoreInfo();
    moreInfoScroll.classList.add('hide-button');
  } else {
    getHourlyData();
    moreInfoScroll.classList.remove('hide-button');
  }
}

// Спрятать подробную информацию
function hideMoreInfo() {
  fiveDaysHourListRef.innerHTML = '';
}

// Открытие или закрытие секции по нажатию на кнопку
// moreInfoBtnRef.addEventListener('click', isMoreInfoOpen);


// moreInfoBtnRef.addEventListener('click', getHourlyData);

// function renderHourlyData(chosenHourlyData) {
//   console.log(chosenHourlyData);
//   fiveDaysHourListRef.innerHTML = moreInfoTpl(chosenHourlyData);
// }


function renderHourlyData(chosenHourlyData) {
  console.log(chosenHourlyData);
  fiveDaysHourListRef.innerHTML = moreInfoTpl(chosenHourlyData);
  const mySiema = new Siema({
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    loop: true,
    perPage: {
      279: 2,
      768: 4,
      1280: 7,
    },
    draggable: true,
  });

  if (window.innerWidth >= 768) {
    document.querySelector('.next').addEventListener('click', () => mySiema.next());
  } else {
    fiveDaysHourListRef.classList.remove('siema');
    // moreInfoScroll.classList.add('hide-button');
  }
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

export { getHourlyData };

// Повесить ивент листенер на контейнер, но слушать кнопку

// function scroll() {
//   const pageHeight = document.documentElement.scrollHeight;
//   console.log(pageHeight);
//   setTimeout(() => {
//     window.scrollTo({
//       top: pageHeight,
//       behavior: 'smooth',
//     });
//   }, 500);
// }

if (screen.width > 768) {
}
