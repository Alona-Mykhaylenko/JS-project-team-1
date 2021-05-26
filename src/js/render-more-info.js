import moreInfoTpl from '../templates/more-info.hbs';
import weatherFiveDaysTpl from '../templates/weather-five-days.hbs';
import { fetchWeatherDataFiveDays } from './api-service.js';

const fiveDaysHourListRef = document.querySelector('.five-days__hour-list');
const moreInfoBtnRef = document.querySelector('.five-days__weather-more-btn');

// Получить массив данных с АПИ, создать из него новый массив только из нужных данных,
// сократить к-во элементов массива по текущей дате, вызвать отрисовку страницы.
const getHourlyData = event => {
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
};

// .reduce((dayHours, item) =>
// if (item.dt = event.target.dataset.date) {
//     dayHours.push(item)}, []);

// Проверить, открыта ли секция подробной тнформации вставить в ивент листенер)
// function isMoreInfoOpen(event){
//     if (event.target.elements){
//         hideMoreInfo()
//     } else {getHourlyData()}
// }

// Спрятать подробную информацию
// funtion hideMoreInfo() {
//     fiveDaysHourListRef.innerHTML = '';
// }

// Открытие или закрытие секции по нажатию на кнопку
// moreInfoBtnRef.addEventListener('click', isMoreInfoOpen);

moreInfoBtnRef.addEventListener('click', getHourlyData);

function renderHourlyData(chosenHourlyData) {
  console.log(chosenHourlyData);
  fiveDaysHourListRef.innerHTML = moreInfoTpl(chosenHourlyData);
}

function ConverterToDate(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months[newDate.getMonth()];
  let date = newDate.getDate();
  let CurrentDate = date + ' ' + month;
  return CurrentDate;
}

function ConverterToHour(UNIX_timestamp) {
  let newDate = new Date(UNIX_timestamp * 1000);
  let hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
  let min = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
  let CurrentHour = `${hour}:${min}`;
  return CurrentHour;
}

// Get an array of only dates/hours

// let onlyDates = [];
// fetchWeatherDataFiveDays().then(({ list }) => {
//   onlyDates = list.map(item => item.dt).map(oldDate => timeConverter(oldDate));
//   return console.log(onlyDates);
// });

// change VALUES of these dateshours
// Go through an original array, leaving only
// fields I need, and re-write some of them with
// the values of date/hours I made.
