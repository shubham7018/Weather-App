document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoords(lat, lon);
        }, () => {
            alert('Unable to retrieve your location. Please enter a location manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser. Please enter a location manually.');
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const apiKey = '6878cd3100340f7ce9be193e607be769';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            changeBackground(data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    const apiKey = '6878cd3100340f7ce9be193e607be769';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            changeBackground(data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    const weatherDescription = capitalizeFirstLetter(data.weather[0].description);
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>${weatherDescription}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.classList.add('show');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeBackground(weatherCondition) {
    const body = document.body;
    body.style.background = 'linear-gradient(to right, #ece9e6, #ffffff)';
}