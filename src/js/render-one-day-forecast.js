import { fetchWeatherDataOneDay, setLocation } from './api-service'
import weatherOneDay from '../templates/weather-one-day.hbs'

const today__wether = document.querySelector('.today__wether');

function renderOneDayMarkup() {
    fetchWeatherDataOneDay().then(data => {
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
        today__wether.innerHTML = weatherOneDay(allWeatherParam)
    }).catch(error => {
        console.log(weatherOneDay(error))
    })
}

export { renderOneDayMarkup };