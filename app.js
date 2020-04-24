const api = {
    myKey: "ff05136c9fd16ecab5feff21621df11a",
    checkWeatherURL: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = document.querySelector('.search__input');

searchInput.addEventListener('keypress', searchFunction);

function searchFunction(event) {
    if (event.keyCode == 13) {
        weatherResults(searchInput.value);
    }
}


function weatherResults (query) {
    fetch (`${api.checkWeatherURL}/forecast?q=${query}&units=metric&APPID=${api.myKey}`)
    .then(weather => {
         return weather.json();
    }).then(viewResults);
}

function viewResults (weather) {
    console.log(weather);
    let city = document.querySelector('.overview__location .overview__city')
    city.innerText = `${weather.name}, ${weather.city.country}`;

    let dt = weather.dt;
    let formateTime = new Date(dt * 1000);
    let date = document.querySelector(`.overview__location .overview__date`)
    date.innerText = `${formateTime}`;

    let temp = document.querySelector('.overview__weather-info .overview__temp')
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>c</span>`;

    let weatherCondition = document.querySelector('.overview__weather-info .overview__weather');
    weatherCondition.innerHTML = weather.weather[0].main;

    let details = document.querySelector('.overview__details');
    details.Text = `${Math.round(weather.main.temp_min)}c - ${Math.round(weather.main.temp_max)}c`;

}