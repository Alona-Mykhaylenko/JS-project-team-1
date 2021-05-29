import Chart from 'chart.js/auto';
import tempChart from '../templates/chart.hbs';
import { newNewWeather } from './render-five-day-forecast';

const moment = require('moment-timezone');

const navListRef = document.querySelector('.nav-list');
const ChartRef = document.querySelector('.chart-container');

ChartRef.innerHTML = tempChart();

const navChartRef = document.querySelector('.nav');

const ctx = document.getElementById('myChart').getContext('2d');

// const headerOfShowChart = document.querySelector('.show-chart-header-js');

navListRef.addEventListener('click', onShowChartClick);
navChartRef.addEventListener('click', onHideChartClick);

let chart = {};

function renderChartUpdate() {
  const getChartData = newNewWeather.map(e => e.date.month + ' ' + e.date.day + ', ' + e.date.year);
  const getChartTemp = newNewWeather.map(e => e.tempDay);
  const getChartHumidity = newNewWeather.map(e => e.humidity);
  const getChartPressure = newNewWeather.map(e => e.pressure);
  const getChartWind = newNewWeather.map(e => e.wind);

  chart = new Chart(ctx, {
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
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value of indicators',
            color: '#ffffff',
            font: {
              family: 'Times',
              size: 20,
              style: 'normal',
              lineHeight: 1.2,
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 },
          },
        },
      },

      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function onShowChartClick(e) {
  ChartRef.classList.remove('hidden');
  navListRef.classList.add('hidden');
  renderChartUpdate();
}

function onHideChartClick(e) {
  ChartRef.classList.add('hidden');
  navListRef.classList.remove('hidden');
  chart.destroy();
}
