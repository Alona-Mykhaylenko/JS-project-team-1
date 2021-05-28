import { setLocation } from './api-service';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { dataFiveDays } from './render-five-day-forecast';
import { hideMoreInfo } from './render-more-info';

const formInput = document.querySelector('.search-city__form');
const fiveDaysHourListRef = document.querySelector('.five-days__hour-list');

formInput.addEventListener('submit', getCities);

function getCities(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.query.value;
  const normalizedLoc = inputValue.toLowerCase().trim();
  if (!normalizedLoc) return;
  setLocation(normalizedLoc);
  renderOneDayMarkup();
  dataFiveDays();
  hideMoreInfo();
}
