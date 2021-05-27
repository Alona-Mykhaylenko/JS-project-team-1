import fivedays from '../templates/weather-five-days.hbs';
import { fetchWeatherDataFiveDays } from './api-service';
import { getHourlyData } from './render-more-info';

const ulRef = document.querySelector('.five-days__weather-week-list');

function a() {
  fetchWeatherDataFiveDays().then(data => {
    ulRef.innerHTML = fivedays(data);
  });
}

a();

const UNIX_timestamp = 1621998000;

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + ' ' + month;
  return time;
}
console.log(timeConverter(UNIX_timestamp));

// function a() {
//     return fetchWeatherDataFiveDays()
//         .then(data => {
//             const allWeatherParamFiveDays = {
//                 // temp: Math.round(data.main.temp),
//                 tempminFive: Math.round(data.list.main.temp_min),
//                 tempmaxFive: Math.round(data.list.main.temp_max),
//                 // name: data.name,
//                 // syscountry: data.sys.country,
//                 // desc: data.weather[0].description,
//                 // icon: data.weather[0].icon,
//                 // sunrise: data.sys.sunrise,
//                 // sunset: data.sys.sunset,
//             };
//             ulRef.innerHTML = fivedays(allWeatherParamFiveDays);
//             return allWeatherParamFiveDays
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// a();

// // 1  map - номер дня
// // 2. оставляем уникальные дни
// // 3. если их 6 по if убираем 1
// // 4. перебираем массив с 5 днями и оставляем массив масивов по днями
// // 5. из массива массивов выбрать 1 массив из 5 объектов. финальный
