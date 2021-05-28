import { newNewWeather } from './render-five-day-forecast';
import moreInfoTpl from '../templates/more-info.hbs';

const fiveDaysHourListRef = document.querySelector('.five-days__hour-list');
const fiveDaysWeatherWeekRef = document.querySelector('.five-days__weather-week');
const buttonNext = document.querySelector('.next');
const buttonPrev = document.querySelector('.prev');

// =================== Получить массив данных из секции FiveDays,
// создать из него новый массив только из нужных данных,
// /, вызвать отрисовку страницы.=================================================================
function getHourlyData(event) {
  const day = event.target.dataset.action;
  const dayInfo = newNewWeather.find(({ date }) => date === +day).moreInfo;
  console.log(newNewWeather);

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
}

function renderHourlyData(chosenHourlyData) {
  console.log(chosenHourlyData);
  fiveDaysHourListRef.innerHTML = moreInfoTpl(chosenHourlyData);
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

fiveDaysWeatherWeekRef.addEventListener('click', showOrHide);

const fiveDaysWeatherRef = document.querySelector('.five-days__weather');

// ================ Показ или скрытие More Info ==========================
function showOrHide(event) {
  if (
    event.target.tagName === 'BUTTON' &&
    fiveDaysHourListRef.children.length > 0 &&
    fiveDaysHourListRef.firstElementChild.dataset.date === event.target.dataset.action
  ) {
    hideMoreInfo(event);
  } else if (event.target.tagName === 'BUTTON') {
    getHourlyData(event);
    buttonNext.classList.add('show-button');
    buttonNext.addEventListener('click', scrollRight);
    buttonPrev.addEventListener('click', scrollLeft);

    event.target.parentNode.firstElementChild.classList.add('five-days__weather-week-title-active');
    // event.target.nextElementSibling.parentNode.classList.remove(
    //   'five-days__weather-week-title-active',
    // );
  }
}

function hideMoreInfo(event) {
  fiveDaysHourListRef.innerHTML = '';
}

function scrollRight() {
  setTimeout(() => {
    fiveDaysHourListRef.scrollTo({
      left: 1000,
      behavior: 'smooth',
    });
  }, 500);
  buttonPrev.classList.add('show-button');
  buttonNext.classList.remove('show-button');
}

function scrollLeft() {
  setTimeout(() => {
    fiveDaysHourListRef.scrollTo({
      left: -1000,
      behavior: 'smooth',
    });
  }, 500);
  buttonPrev.classList.remove('show-button');
  buttonNext.classList.add('show-button');
}

export { hideMoreInfo };

// fiveDaysWeatherWeekTitle.classList.remove('five-days__weather-week-title-active');

// const fiveDaysWeatherWeekTitle = document.querySelector('five-days__weather-week-title');

// function findParent(event){
// if (fiveDaysWeatherWeekTitle.lastElementChild !== event.target) {
//   fiveDaysWeatherWeekTitle.classList.remove('five-days__weather-week-title-active');
// }}
