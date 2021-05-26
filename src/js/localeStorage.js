import favCitiesHbs from '../templates/fav-cities.hbs';
import favCitiesFunction from './favorite-cities';

const formInput = document.querySelector('.search-city__form');
const input = document.querySelector('.search-city__input');
const btn = document.querySelector('.search-city__btn-save');
const ul = document.querySelector('.search-city__slider-list');

const updateView = () => {
  ul.textContent = localStorage.getItem('City') || '';
};

function addLocaleStorage(e) {
  localStorage.setItem('City', input.value);
  updateView();
}

updateView();

btn.addEventListener('click', addLocaleStorage);
