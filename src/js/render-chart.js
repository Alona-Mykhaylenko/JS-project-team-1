import Chart from 'chart.js/auto';
import refs from '../js/refs';
import { fetchWeatherDataFiveDays } from './api-service';
import tempChart from '../templates/chart.hbs';
import { dataFiveDays } from './render-five-day-forecast';

const navListRef = document.querySelector('.nav-list');
const ChartRef = document.querySelector('.chart-container');

ChartRef.innerHTML = tempChart();

const navChartRef = document.querySelector('.nav');

const ctx = document.getElementById('myChart').getContext('2d');

const headerOfShowChart = document.querySelector('.show-chart-header-js');

headerOfShowChart.addEventListener('click', a);

function a() {
  fetchWeatherDataFiveDays().then(data => {
    console.log(data);
  });
}

navListRef.addEventListener('click', onShowChartClick);
navChartRef.addEventListener('click', onHideChartClick);

function onShowChartClick(e) {
  ChartRef.classList.remove('hidden');
  navListRef.classList.add('hidden');
}

function onHideChartClick(e) {
  ChartRef.classList.add('hidden');
  navListRef.classList.remove('hidden');
}

// function setDataChart(chart, array) => {
//   [...chart.data.datasets[0].data].forEach() => chart.data.datasets[0].data.pop());
//   [...chart.data.labels].forEach(()=> chart.data.labels.pop());
// }

dataFiveDays().then(newNewWeather => {
  console.log(newNewWeather);
  const getChartData = newNewWeather.map(e => e.date);
  const getChartTemp = newNewWeather.map(e => e.tempDay);
  const getChartHumidity = newNewWeather.map(e => e.humidity);
  const getChartPressure = newNewWeather.map(e => e.pressure);
  const getChartWind = newNewWeather.map(e => e.wind);

  const array = [getChartData, getChartTemp, getChartHumidity, getChartPressure, getChartWind];

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: getChartData,
      datasets: [
        {
          label: ' — Temperature, C°',
          backgroundColor: 'rgb(255, 107, 8)',
          borderColor: 'rgb(255, 107, 8)',
          data: getChartTemp,
          fill: false,
        },
        {
          label: ' —  Humidity, %',
          backgroundColor: 'rgb(10, 6, 234)',
          borderColor: 'rgb(10, 6, 234)',
          data: getChartHumidity,
          fill: false,
        },
        {
          label: ' —  Wind Speed, m/s',
          backgroundColor: 'rgb(235, 155, 5)',
          borderColor: 'rgb(235, 155, 5)',
          data: getChartPressure,
          fill: false,
        },
        {
          label: ' — Atmosphere Pressure, m/m',
          backgroundColor: 'rgb(5, 120, 6)',
          borderColor: 'rgb(5, 120, 6)',
          data: getChartWind,
          fill: false,
        },
      ],
    },
    options: {
      interaction: {
        mode: 'point',
      },
      // title: {
      //   display: true,
      //   text: 'Value of indicators',
      //   position: 'left',
      // },
      // legend: {
      //   display: true,
      //   align: 'start',

      //   labels: {
      //     boxWidth: 13,
      //     boxHeight: 12,
      //     defaultFontColor: 'rgb(5, 120, 6)',
      //     padding: 10,
      //   },
      // },
      scales: {
        x: [
          {
            grid: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 20,
            },
          },
        ],
        y: [
          {
            grid: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 18,
            },
          },
        ],
      },

      responsive: true,
      maintainAspectRatio: false,
    },
  });
  chart.update({
    duration: 1000,
    easing: 'easeOutBounce',
  });
});

// =================Скрытие чарта при перезагрузке страницы============
function hideChart(event) {}
