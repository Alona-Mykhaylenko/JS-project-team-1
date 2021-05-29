// / ================BUTTONS ONE DAY/FIVE DAYS=============

const fivedayButtonContainer = document.querySelector('.five-days__btn-container');
const fivedayDiv = document.querySelector('.five-days');
const oneDayDiv = document.querySelector('.container-one-day');
const todayButtonContainer = document.querySelector('.today__button');
const ChartRef = document.querySelector('.chart-container');

fivedayButtonContainer.addEventListener('click', hideFiveDaysSection);
todayButtonContainer.addEventListener('click', onButtonClickOpen);

function hideFiveDaysSection(event) {
  if (event.target.classList.contains('five-days__btn-today')) {
    fivedayDiv.classList.add('hidden-section');
    oneDayDiv.classList.remove('hidden-section');
  }
}

function onButtonClickOpen(event) {
  if (event.target.classList.contains('today__btn-fiveday')) {
    fivedayDiv.classList.remove('hidden-section');
    oneDayDiv.classList.add('hidden-section');
    ChartRef.classList.add('hidden-section');
  }
}
function goToFirstPage() {
  if (oneDayDiv.classList.contains('hidden-section')) {
    fivedayDiv.classList.add('hidden-section');
    oneDayDiv.classList.remove('hidden-section');
  }
}

export { goToFirstPage };

