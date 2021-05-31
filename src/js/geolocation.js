import { setLocation } from './api-service';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { dataFiveDays } from './render-five-day-forecast';
// import { setLocationImg, setImgBg } from './geolocation';



const inputRef = document.querySelector('.search-city__input');
const bodyRef = document.querySelector('body');

let location = 'kiev';

const fetchImg = () =>
  fetch(
    `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${location}&per_page=12&key=21708715-c005b8eff9b2107cefe751bb8`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  });

//   Получение текущей локации после нажатия на Сабмит или Enter

const setLocationImg = newLocation => {
  location = newLocation;
};

function setImgBg() {
  fetchImg().then(data => {
    const contryImgUrl = data.hits[1].largeImageURL;
    const styleValue = `background: url(${contryImgUrl}) center fixed; background-size: cover;`;
    bodyRef.setAttribute('style', styleValue);
  });
}
setImgBg();

export { setImgBg, setLocationImg };

//=====================================================ОПРЕДЕЛЕНИЕ ГЕОДАННЫХ=============================
navigator.geolocation.getCurrentPosition(success)
// function error() {
//   setLocation();
//   renderOneDayMarkup();
//   dataFiveDays();
//   setLocationImg('Kiev');
//   setImgBg();
// }

function success(position) {
  const apikey = '993fb22893a947dbb2d0ca6e36241a91';
  
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apikey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  })
  .then(data => {
    const myCity = data.results[0].components.city;
    console.log(myCity);
    setLocation(myCity);
    renderOneDayMarkup();
    dataFiveDays();
    setLocationImg(myCity);
    setImgBg();
  })
}





