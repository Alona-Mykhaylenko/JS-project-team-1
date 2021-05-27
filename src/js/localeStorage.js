import favCitiesHbs from '../templates/fav-cities.hbs';
import {renderOneDayMarkup} from './render-one-day-forecast';
import {setLocation} from './api-service';
import Siema from 'siema';

const inputRef = document.querySelector('.search-city__input');
const btnRef = document.querySelector('.search-city__btn-save');
const ulRef = document.querySelector('.search-city__slider-list');
const btnLeft = document.querySelector('.search-city__slider-btnPrev');
const btnRight = document.querySelector('.search-city__slider-btnNext');

//==========================================ДОБАВЛЕНИЕ В LOCAL STORAGE====================================

btnRef.addEventListener('click', addToLocalStorage);

const storage = {
  arrCities: [],
};

function addToLocalStorage() {
  const imputValue = inputRef.value;
  storage.arrCities.push(imputValue);

  localStorage.setItem('City', JSON.stringify(storage.arrCities));
  inputRef.value = '';
  createMarkup(getLocalStorage());
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

function createMarkup(cities) {
  const markup = favCitiesHbs(cities);

  ulRef.innerHTML =  markup;
}



createMarkup(getLocalStorage());
//===============================================КОПИРОВАНИЕ В РАЗМЕТКА И LOCAL STORAGE ===================================================================
ulRef.addEventListener('click', addInputValueFromList);

function addInputValueFromList (event) {
  if (event.target.nodeName === 'BUTTON') {
    const nameLiCity = event.path[1].childNodes[1].textContent;
    const indexCurrentCity = storage.arrCities.indexOf(nameLiCity);

    storage.arrCities.splice(indexCurrentCity, 1);
    localStorage.setItem('City', JSON.stringify(storage.arrCities));
    createMarkup(getLocalStorage());
  }
  if (event.target.nodeName === 'P')
  setLocation(event.path[1].childNodes[1].textContent);
  renderOneDayMarkup();
}


//========================================== ОТОБРАЖЕНИЕ КНОПОК ЛЕВО-ПРАВО + СКРОЛЛ============================================================


  let widthVivport = document.querySelector('body').offsetWidth;
  const mySiema = new Siema({
    selector: ulRef,
    perPage: {
      768: 2,
      1024: 3,
    },
  });

  btnLeft.addEventListener('click', () => mySiema.prev());
  btnRight.addEventListener('click', () => mySiema.next());  
  
