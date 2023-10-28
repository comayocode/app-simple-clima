// --- SELECTORES ---
const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

  const APIKey = 'a59521817a357cf893a5149144c85209';
  const city = document.querySelector('.search-box input').value;

  if (city === '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

    // Si es codigo 404 se oculta el container, weatherBox y weatherDetails. Seguido se muestra error404 y se le añade la clase 'fadeIn'
    if (json.code === '404') {
      container.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    // Si no arroja el 404, se oculta error404
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    // Selectores para la información de la ciudad
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    // Mostrar imagen segun el clima
    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'img/clear.png';
        break;

      case 'Rain':
        image.src = 'img/rain.png';
        break;

      case 'snow':
        image.src = 'img/snow.png';
        break;

      case 'Clouds':
        image.src = 'img/cloud.png';
        break;

      case 'Haze':
        image.src = 'img/haze.png';
        break;

      default:
        image.src = '';
    }

    // Poner la información en sus respectivos campos del DOM
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    // Mostrar los contenedores
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';

  });

});

