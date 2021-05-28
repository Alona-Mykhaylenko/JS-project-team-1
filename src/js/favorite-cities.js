import { setLocation } from './api-service';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { setLocationImg, setImgBg } from './geolocation';

const inputRef = document.querySelector('.search-city__input')

const formInput = document.querySelector('.search-city__form');

formInput.addEventListener('submit', getCities);

function getCities(e) {
  e.preventDefault();
  const inputValue = inputRef.value;
  const normalizedLoc = inputValue.toLowerCase().trim();
  if (!normalizedLoc) return;
  
  inputRef.value = '';
  setLocation(normalizedLoc);
  renderOneDayMarkup();
  setLocationImg(normalizedLoc);
  setImgBg();
}
