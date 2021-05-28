import favCitiesHbs from '../templates/fav-cities.hbs';
import favCityHbs from '../templates/fav-city.hbs';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { setLocation } from './api-service';
import { setLocationImg, setImgBg } from './geolocation';
import Siema from 'siema';

const inputRef = document.querySelector('.search-city__input');
const btnRef = document.querySelector('.search-city__btn-save');
const ulRef = document.querySelector('.search-city__slider-list');
const btnLeft = document.querySelector('.search-city__slider-btnPrev');
const btnRight = document.querySelector('.search-city__slider-btnNext');
//==========================================ДОБАВЛЕНИЕ В LOCAL STORAGE====================================

// let widthVivport = document.querySelector('body').offsetWidth;


btnLeft.addEventListener('click', () => mySiema.prev());
btnRight.addEventListener('click', () => mySiema.next());

btnRef.addEventListener('click', addToLocalStorage);

const storage = {
  arrCities: [],
};

function addToLocalStorage() {
  const imputValue = inputRef.value;
  storage.arrCities.push(imputValue);

  localStorage.setItem('City', JSON.stringify(storage.arrCities));
  inputRef.value = '';
  const div = document.createElement('div');
  div.classList.add('search-city__slider-list-item');
  div.innerHTML = favCityHbs(imputValue);
  mySiema.append(div);
  
  // createMarkup(getLocalStorage());
  
}

function getLocalStorage() {
  const arrayOfCities = localStorage.getItem('City');

  if (!arrayOfCities) {
    return;
  }

  const parsedCities = JSON.parse(arrayOfCities);
  storage.arrCities = parsedCities;

  return parsedCities;
}
let mySiema;
function createMarkup(cities) {
  const markup = favCitiesHbs(cities);

  ulRef.innerHTML = markup;
  mySiema = new Siema({
    selector: '.search-city__slider-list',
    perPage: 3,
    duration: 200,
    });
}

createMarkup(getLocalStorage());
//===============================================КОПИРОВАНИЕ В РАЗМЕТКА И LOCAL STORAGE ===================================================================
ulRef.addEventListener('click', addInputValueFromList);

function addInputValueFromList(event) {
  if (event.target.nodeName === 'BUTTON') {
    const nameLiCity = event.path[1].childNodes[1].textContent;
    const indexCurrentCity = storage.arrCities.indexOf(nameLiCity);
    
    storage.arrCities.splice(indexCurrentCity, 1);
    localStorage.setItem('City', JSON.stringify(storage.arrCities));
    mySiema.remove(indexCurrentCity);

    
    // createMarkup(getLocalStorage());
  }
  if (event.target.nodeName === 'P') { 
    setLocation(event.path[1].childNodes[1].textContent);
    renderOneDayMarkup(); 
    setLocationImg(event.path[1].childNodes[1].textContent);
    setImgBg();
  }
}
