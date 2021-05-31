import favCitiesHbs from '../templates/fav-cities.hbs';
import favCityHbs from '../templates/fav-city.hbs';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { setLocation } from './api-service';
import { setLocationImg, setImgBg } from './geolocation';
import { onHideChartClick, destroy, renderChartUpdate } from './render-chart';
import { goToFirstPage } from './buttons-functions';
import { dataFiveDays } from './render-five-day-forecast';
import { randomQuote } from './quotes';
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
  const city = inputRef.value;

  if (!city) {
    return;
  }

  if (storage.arrCities.includes(city)) {
    return;
  }

  const inputValue = inputRef.value;
  storage.arrCities.push(inputValue);

  localStorage.setItem('City', JSON.stringify(storage.arrCities));

  inputRef.value = '';
  const div = document.createElement('div');
  div.classList.add('search-city__slider-list-item');
  div.innerHTML = favCityHbs(inputValue);
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
    perPage: {
      279: 2,
      768: 4,
      1119: 4,
    },
    duration: 200,
    draggable: false,
    multipleDrag: false,
    threshold: 20,
    loop: false,
  });
}

createMarkup(getLocalStorage());

// =============Media screen===========
const widthOfUserScreen = window.innerWidth;
//===============================================КОПИРОВАНИЕ В РАЗМЕТКА И LOCAL STORAGE ===================================================================

btnRef.addEventListener('click', () => {
  if (widthOfUserScreen < 768) {
    if (storage.arrCities.length > 2) {
      btnRight.hidden = false;
    }
  }

  if (widthOfUserScreen > 768) {
    if (storage.arrCities.length > 4) {
      btnRight.hidden = false;
    }
  }
});

if (widthOfUserScreen < 768) {
  if (storage.arrCities.length <= 2) {
    btnRight.hidden = true;
  }
}

if (widthOfUserScreen > 768) {
  if (storage.arrCities.length <= 4) {
    btnRight.hidden = true;
  }
}

ulRef.addEventListener('click', addInputValueFromList);

function addInputValueFromList(event) {
  if (event.target.nodeName === 'BUTTON') {
    const nameLiCity = event.path[1].childNodes[1].textContent;
    const indexCurrentCity = storage.arrCities.indexOf(nameLiCity);

    storage.arrCities.splice(indexCurrentCity, 1);
    localStorage.setItem('City', JSON.stringify(storage.arrCities));
    mySiema.remove(indexCurrentCity);

    createMarkup(getLocalStorage());

    if (widthOfUserScreen < 768) {
      if (storage.arrCities.length <= 2) {
        btnRight.hidden = true;
        btnLeft.hidden = true;
      }
    }

    if (widthOfUserScreen > 768) {
      if (storage.arrCities.length <= 4) {
        btnRight.hidden = true;
      }
    }
  }
  if (event.target.nodeName === 'P') {
    setLocation(event.path[1].childNodes[1].textContent);
    renderOneDayMarkup();
    setLocationImg(event.path[1].childNodes[1].textContent);
    setImgBg();

    // onHideChartClick();
    // goToFirstPage();
    dataFiveDays();
    randomQuote();
    setTimeout(() => {
      destroy();
      renderChartUpdate();
    }, 300);
  
  }
}
// =====================Скрытие каруссели===================

btnLeft.addEventListener('click', () => {
  mySiema.prev();
  if (mySiema.currentSlide === 0) {
    btnLeft.hidden = true;
  }
});
btnRight.addEventListener('click', () => {
  mySiema.next();
  if (mySiema.currentSlide > 0) {
    btnLeft.hidden = false;
  }
});

if (mySiema.currentSlide === 0) {
  btnLeft.hidden = true;
}

//=========Заглавная буква большая==========
// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
