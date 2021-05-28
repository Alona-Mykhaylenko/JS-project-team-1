import fivedays from '../templates/weather-five-days.hbs';
import { fetchWeatherDataFiveDays } from './api-service';

const ulRef = document.querySelector('.five-days__weather-week-list');

let newNewWeather = [];

function dataFiveDays() {
  fetchWeatherDataFiveDays().then(data => {
    const date2 = data.list.map(element => new Date(element.dt * 1000).getDate());
    const date5 = date2.filter((elem, index, arr) => arr.indexOf(elem) === index);
    const allDays = data.list;
    let weatherFiveDays = date5.map(data =>
      allDays.filter(obj => new Date(obj.dt * 1000).getDate() === data),
    );
    if (weatherFiveDays.length > 5) {
      weatherFiveDays = weatherFiveDays.slice(1);
    }

    newNewWeather = weatherFiveDays.map(day => {
      return {
        moreInfo: day,
        day: new Date(day[0].dt * 1000).getDate(),
        week: weekDayNow(day[0].dt),

        month: timeConverter(day[0].dt),
        icon: `http://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`,
        temp: mathTemp(day),
        date: dayConv(day[0].dt),

        // maxTemp:
        // minTemp:
      };
    });
    ulRef.innerHTML = fivedays(newNewWeather);
  });
}
dataFiveDays();

// =============день недели===================

const weekDayNow = data => {
  const date = new Date(data * 1000);
  const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  return weekDay;
};

// =================== дата месяц ====================

const timeConverter = function (data) {
  const a = new Date(data * 1000);
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
};

// =========================================день число==================================
const dayConv = function (data) {
  const a = new Date(data * 1000);
  const date = a.getDate();
  console.log(date);
  return date;
};

const mathTemp = data => {
  console.log(data);
  data = data.map(e => Math.floor(e.main.temp_min));
  const temp = {
    TempMin: Math.min(...data),
    TempMax: Math.max(...data),
  };
  // console.log(data);
  return temp;
};

// dataProcessingFiveDays();
// 1  map - номер дня
// 2. оставляем уникальные дни
// 3. если их 6 по if убираем 1
// 4. перебираем массив с 5 днями и оставляем массив масивов по днями
// 5. из массива массивов выбрать 1 массив из 5 объектов. финальный

// =========================================================================

// const newWeather = weatherFiveDays.flatMap(a => a);
// const newNewWeather = weatherFiveDays.map(day => {
// tempmin: Math.round(obj.main.temp_min),
// tempmax: Math.round(obj.main.temp_max),
// day: weekDayNow(obj.dt),
// icon: `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`,
// data: timeConverter(obj.dt),

export { newNewWeather };
