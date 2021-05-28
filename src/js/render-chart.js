import Chart from 'chart.js/auto';
import refs from '../js/refs';
import { fetchWeatherDataFiveDays } from './api-service';
import tempChart from '../templates/chart.hbs';

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

let chartData = {};

// const getChartData = () => {
//   const data = api.dataProcessingMoreInfo();
//   chartData.days = data.map(e => moment(e.date * 1000).format('ll'));
//   chartData.temp = data.map(e => average('temp', e.forecast));
//   chartData.humidity = data.map(e => average('humidity', e.forecast));
//   chartData.pressure = data.map(e => average('pressure', e.forecast));
//   chartData.speed = data.map(e => average('speed', e.forecast));
// };

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
        data: [7, 4, 8, 3, 1],
        fill: false,
      },
      {
        label: ' —  Wind Speed, m/s',
        backgroundColor: 'rgb(235, 155, 5)',
        borderColor: 'rgb(235, 155, 5)',
        data: [1, 4, 9, 3, 5],
        fill: false,
      },
      {
        label: ' — Atmosphere Pressure, m/m',
        backgroundColor: 'rgb(5, 120, 6)',
        borderColor: 'rgb(5, 120, 6)',
        data: [4, 3, 8, 3, 5],
        fill: false,
      },
    ],
  },
  options: {
    interaction: {
      mode: 'point',    
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
      y: {      
          grid: {
          color: 'rgba(255, 255, 255, 0.541)',
            
            ticks: {
            padding: 18,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});
