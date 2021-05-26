import { fetchWeatherDataOneDay, setLocation } from './api-service'
import weatherOneDay from '../templates/weather-one-day.hbs'

const todayWetherRef = document.querySelector('.today__wether');
const firstTitleCurrentCityRef = document.querySelector('.five-days__title');
const secondTitleCurrentCityRef = document.querySelector('.five-days__weather-week-title');
const sunriseRef = document.querySelector('.date-sunrise-time');
const sunsetRef = document.querySelector('.date-sunset-time');

function pad(value) {
    return String(value).padStart(5, '0');
};

function renderOneDayMarkup() {
    return fetchWeatherDataOneDay().then(data => {
        const allWeatherParam = {temp: Math.round(data.main.temp),
            tempmin: Math.round(data.main.temp_min),
            tempmax: Math.round(data.main.temp_max),
            name: data.name,
            syscountry: data.sys.country,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        };
        todayWetherRef.innerHTML = weatherOneDay(allWeatherParam);
        addCurrentCityTitle(allWeatherParam.name, allWeatherParam.syscountry);
        const sunrise = pad(timeConverter(allWeatherParam.sunrise));
        const sunset = pad(timeConverter(allWeatherParam.sunset));
        addSunriseSunset(sunrise, sunset);
        return allWeatherParam;
    }).catch(error => {
        console.log(error)
    })
}

renderOneDayMarkup();


function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp*1000);
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = hour + ':' + min ;
    return time;
}

function addCurrentCityTitle ( name, CountryCode ) {
    firstTitleCurrentCityRef.textContent = `${name}, ${CountryCode}`;
    secondTitleCurrentCityRef.textContent = `${name}, ${CountryCode}`;
}

function addSunriseSunset (sunUp, sunDown) {
    sunriseRef.textContent = sunUp;
    sunsetRef.textContent = sunDown;
}



export { renderOneDayMarkup };

// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }