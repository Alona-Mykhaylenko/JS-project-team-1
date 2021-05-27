import Chart from 'chart.js/auto';
import refs from '../js/refs';
import { fetchWeatherDataFiveDays } from '../js/api-service';

// const moment = require('moment-timezone');
const ctx = document.getElementById('myChart').getContext('2d');

let chartData = {};

const average = (req, data) => {
  const values = data.map(e => e[req]);
  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};
// const getChartData = async () => {
//   const data = await fetchWeatherDataFiveDays();
//   chartData.days = [5, 6, 7, 2, 5];
//   chartData.temp = [5, 6, 7, 2, 5];
//   chartData.humidity = [5, 6, 7, 2, 5];
//   chartData.pressure = [5, 6, 7, 2, 5];
//   chartData.speed = [5, 6, 7, 2, 5];
//   chartData.days = data.map(e => moment(e.date * 1000).format('ll'));
//   chartData.temp = data.map(e => average('temp', e.forecast));
//   chartData.humidity = data.map(e => average('humidity', e.forecast));
//   chartData.pressure = data.map(e => average('pressure', e.forecast));
//   chartData.speed = data.map(e => average('speed', e.forecast));
// };

// const renderChart = async () => {

// getChartData();

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [5, 6, 7, 2, 5],
    datasets: [
      {
        label: ' — Temperature, C°',
        backgroundColor: 'rgb(255, 107, 8)',
        borderColor: 'rgb(255, 107, 8)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' —  Humidity, %',
        backgroundColor: 'rgb(10, 6, 234)',
        borderColor: 'rgb(10, 6, 234)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' —  Speed, m/s',
        backgroundColor: 'rgb(235, 155, 5)',
        borderColor: 'rgb(235, 155, 5)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' —  Pressure, m/m',
        backgroundColor: 'rgb(5, 120, 6)',
        borderColor: 'rgb(5, 120, 6)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
    ],
  },

  // options: {
  //   title: {
  //     display: true,
  //     text: 'Value of indicators',
  //     position: 'left',
  //   },
  //   legend: {
  //     display: true,
  //     align: 'start',

  //     labels: {
  //       boxWidth: 13,
  //       boxHeight: 12,
  //       defaultFontColor: 'rgb(5, 120, 6)',
  //       padding: 10,
  //     },
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.541)',
  //         },
  //         ticks: {
  //           padding: 20,
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.541)',
  //           stepSize: 0.5,
  //           zeroLineColor: 'rgba(255, 255, 255, 0.541)',
  //         },
  //         ticks: {
  //           padding: 18,
  //         },
  //       },
  //     ],
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  // },
});
// };
// const btnShowChart = document.querySelector('.show-chart-btn-js');
// const btnHideChart = document.querySelector('.hide-chart-btn-js');
// const headerOfShowChart = document.querySelector('.show-chart-header-js');
// const headerOfHideChart = document.querySelector('.hide-chart-header-js');
// const boxOfShowChart = document.querySelector('.show-chart-box');
// const chartBox = document.querySelector('.chart-container');

// btnShowChart.addEventListener('click', onShowChartClick);
// headerOfShowChart.addEventListener('click', onShowChartClick);
// btnHideChart.addEventListener('click', onHideChartClick);
// headerOfHideChart.addEventListener('click', onHideChartClick);
// Слушаем кнопки Today
// btnOneDay[0].addEventListener('click', onHideChartClick);
// btnOneDay[1].addEventListener('click', onHideChartClick);

// function onShowChartClick() {
//   boxOfShowChart.classList.add('hidden') & chartBox.classList.add('visible');
//   renderChart();
// }

// function onHideChartClick() {
//   chartBox.classList.remove('visible') & boxOfShowChart.classList.remove('hidden');
// }
// _____________________________________________________________________________________________________________;
// let location = '';
// let req = '';
// let oneDayData = {};
// let fiveDayData = {};
// let moreInfoData = {};

// // Переменные для api
// const OWM = 'https://api.openweathermap.org/data/2.5/';
// const apiKey = '48f3906fa74131a752b29b56bb64ec12';

// // Получаем правильную ссылку
// const GetOWM_Request = RequestType => OWM + RequestType + '?q=' + location + '&appid=' + apiKey;

// // Делаем запрос на сервер и получаем данные
// const getWeatherData = async url => axios.get(url);

// // Функции для получения данных с api
// const getOneDayData = searchName => {
//   location = searchName;
//   req = GetOWM_Request('weather');
//   return getWeatherData(req).then(response => dataProcessingOneDay(response.data));
// }; // на один день

// const getFiveDayData = () => {
//   req = GetOWM_Request('forecast');
//   return getWeatherData(req).then(response => dataProcessingFiveDays(response.data));
// }; // на 5 дней

// // Получаем день недели
// const weekDayNow = data => {
//   const date = new Date(data * 1000);
//   const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
//   return weekDay;
// };

// // Получаем месяц
// const monthNow = data => {
//   const date = new Date(data * 1000);
//   const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
//   return month;
// };

// // Получаем обьект icon data
// const getIconData = data => {
//   const date = new Date(data[0].dt * 1000);
//   date.setMilliseconds(0);
//   date.setSeconds(0);
//   date.setMinutes(0);
//   date.setHours(12);
//   const getTimeObj = data.find(e => e.dt == date.getTime() / 1000);
//   const iconInfo = {};
//   if (getTimeObj) {
//     const weather = getTimeObj.weather[0];
//     const icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
//     iconInfo.icon = icon;
//     iconInfo.iconDescription = weather.description;
//     return iconInfo;
//   } else {
//     let weather = {};
//     if (data[3]) {
//       weather = data[3].weather[0];
//     } else {
//       weather = data[0].weather[0];
//     }
//     const icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
//     iconInfo.icon = icon;
//     iconInfo.iconDescription = weather.description;
//     return iconInfo;
//   }
// };

// // Расчет мин/макс температуры
// const mathTemp = data => {
//   data = data.map(e => Math.floor(e.main.temp - 273.15));
//   const temp = {
//     TempMin: Math.min(...data),
//     TempMax: Math.max(...data),
//   };
//   return temp;
// };

// // Конвертация в цельсий
// const conToCel = data => Math.floor(data - 273.15);

// // Добавляем недостающий 0
// function addZero(i) {
//   if (i < 10) {
//     i = '0' + i;
//   }
//   return i;
// }

// // Получить текущее время
// const getCurrentTime = data => {
//   const dataTime = new Date(data * 1000);
//   return addZero(dataTime.getHours()) + ':' + addZero(dataTime.getMinutes());
// };

// // Обработка данных на один день
// const dataProcessingOneDay = response => {
//   const main = response.main;
//   const sys = response.sys;
//   const weather = response.weather[0];
//   oneDayData.city = response.name;
//   oneDayData.countryCode = response.sys.country;
//   oneDayData.temp = conToCel(main.temp);
//   oneDayData.tempMin = conToCel(main.temp_min);
//   oneDayData.tempMax = conToCel(main.temp_max);
//   oneDayData.sunrise = new Date(sys.sunrise * 1000);
//   oneDayData.sunset = new Date(sys.sunset * 1000);
//   oneDayData.icon = 'http://openweathermap.org/img/wn/' + weather.icon + '.png';
//   oneDayData.iconDescription = weather.description;
//   oneDayData.timezone = response.timezone;
//   return oneDayData;
// };

// // Обработка данных на 5 дней
// const getDate = data => new Date(data.dt * 1000).getDate();
// const dataProcessingFiveDays = response => {
//   const dates = response.list
//     .map(element => getDate(element))
//     .filter((el, idx, arr) => arr.indexOf(el) === idx);
//   const list = dates
//     .map(el => response.list.filter(elem => getDate(elem) === el))
//     .map(element => ({
//       DayNum: getDate(element[0]),
//       Day: weekDayNow(element[0].dt),
//       Month: monthNow(element[0].dt),
//       date: element[0].dt,
//       icon: getIconData(element),
//       forecast: element,
//       temp: mathTemp(element),
//     }));
//   if (list[5]) {
//     list.shift();
//   }
//   const changedData = {
//     ...response,
//     list,
//   };
//   fiveDayData = changedData;
//   return fiveDayData;
// };

// // Обработка данных для блока more info
// const dataProcessingMoreInfo = () => {
//   moreInfoData = fiveDayData.list.map(e => ({
//     date: e.date,
//     DayNum: e.DayNum,
//     forecast: e.forecast.map(e => ({
//       time: getCurrentTime(e.dt),
//       temp: Math.floor(e.main.temp - 273.15),
//       humidity: e.main.humidity,
//       pressure: e.main.pressure,
//       speed: Number(e.wind.speed.toFixed(1)),
//       icon: 'http://openweathermap.org/img/wn/' + e.weather[0].icon + '.png',
//       iconDescription: e.weather[0].description,
//     })),
//   }));
//   return moreInfoData;
// };
