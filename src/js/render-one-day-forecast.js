import { fetchWeatherDataOneDay, setLocation } from './api-service'
import weatherOneDay from '../templates/weather-one-day.hbs'

const todayWetherRef = document.querySelector('.today__wether');
const currentCityRef = document.querySelector('.today__wether-text');
const firstTitleCurrentCityRef = document.querySelector('.five-days__title');
const secondTitleCurrentCityRef = document.querySelector('.five-days__weather-week-title');



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
        firstTitleCurrentCityRef.textContent = `${allWeatherParam.name}, ${allWeatherParam.syscountry}`;
        secondTitleCurrentCityRef.textContent = `${allWeatherParam.name}, ${allWeatherParam.syscountry}`;
        return allWeatherParam;
    }).catch(error => {
        console.log(error)
    })
}

renderOneDayMarkup();

export { renderOneDayMarkup };
