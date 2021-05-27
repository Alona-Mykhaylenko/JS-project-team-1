import Chart from 'chart.js/auto';
import refs from '../js/refs';
import { fetchWeatherDataFiveDays } from './api-service';
import tempChart from '../templates/chart.hbs';

const navListRef = document.querySelector('.nav-list');
const ChartRef = document.querySelector('.chart-container');

ChartRef.innerHTML = tempChart();

const ctx = document.getElementById('myChart').getContext('2d');

const headerOfShowChart = document.querySelector('.show-chart-header-js');

headerOfShowChart.addEventListener('click', a);

function a() {
  fetchWeatherDataFiveDays().then(data => {
    console.log(data);
  });
}

navListRef.addEventListener('click', onShowChartClick);

function onShowChartClick(e) {
  if (e.target.tagName === 'LI' || e.target.tagName === 'BUTTON') {
    ChartRef.classList.remove('hidden');
    navListRef.classList.add('hidden');
  }
}
ChartRef.addEventListener('click', onHideChartClick);

function onHideChartClick(e) {
  if (e.target.tagName === 'LI' || e.target.tagName === 'BUTTON') {
    ChartRef.classList.add('hidden');
    navListRef.classList.remove('hidden');
  }
}

let chartData = {};

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [5, 6, 7, 2, 5],
    datasets: [
      {
        label: ' — Temperature, C°',
        backgroundColor: 'rgb(255, 107, 8)',
        borderColor: 'rgb(255, 107, 8)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' —  Humidity, %',
        backgroundColor: 'rgb(10, 6, 234)',
        borderColor: 'rgb(10, 6, 234)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' —  Wind Speed, m/s',
        backgroundColor: 'rgb(235, 155, 5)',
        borderColor: 'rgb(235, 155, 5)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
      {
        label: ' — Atmosphere Pressure, m/m',
        backgroundColor: 'rgb(5, 120, 6)',
        borderColor: 'rgb(5, 120, 6)',
        data: [5, 6, 7, 2, 5],
        fill: false,
      },
    ],
  },
  options: {
    interaction: {
      mode: 'point',
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
    },
    scales: {
      x: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.541)',
          },
          ticks: {
            padding: 20,
          },
        },
      ],
      y: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.541)',
            stepSize: 0.5,
            zeroLineColor: 'rgba(255, 255, 255, 0.541)',
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

