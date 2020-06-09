const api = {
    myKey: "ff05136c9fd16ecab5feff21621df11a",
    checkWeatherURL: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = document.querySelector('.search__input');
const script__container = document.getElementById('script__container');

searchInput.addEventListener('keypress', searchFunction);

function searchFunction(event) {
    if (event.keyCode == 13) {
        weatherResults(searchInput.value);
    }
}


function weatherResults (query) {
    fetch (`${api.checkWeatherURL}/forecast?q=${query}&units=metric&APPID=${api.myKey}`)
    .then(data => {
         return data.json();
    }).then(viewResults);
    script__container.innerHTML = "";
}

function viewResults (data) {

    let icon = [];
    let city = [];
    let country = [];
    let mainTemp = [];
    let description = [];
    let minDeg = [];
    let maxDeg = [];

    for (let i = 0; i < data.list.length; i++){
        let mainTempFormat = data.list[i].main.temp.toFixed(0);

        city.push(data.city.name);
        country.push(data.city.country);
        mainTemp.push(mainTempFormat);
        description.push(data.list[i].weather[0].description);
        icon.push(data.list[i].weather[0].icon);
        minDeg.push(Math.round(data.list[i].main.temp_min));
        maxDeg.push(Math.round(data.list[i].main.temp_max));

    }

    for (let i = 0; i < data.list.length; i+=8) {
        let dt = data.list[i].dt;
        let formatTime = new Date(dt * 1000); 
        let options = {  
            weekday: "long", year: "numeric", month: "short",  
            day: "numeric", hour: "2-digit", minute: "2-digit"  
        };  
        let nowTime = (formatTime.toLocaleTimeString("en-us", options)).slice(0, -10);

        script__container.innerHTML += (` 
            <main class="overview">
                <div class="overview__icon">
                    <img src="http://openweathermap.org/img/w/${icon[i]}.png" class="overview__img" alt="weather icon">     
                </div>
                <div class="overview__location">
                    <h1 class="overview__city">${city[i]}, ${country[i]}</h1>
                    <h2 class="overview__date">${nowTime}</h2>
                </div>

                <div class="overview__weather-info">
                    <div class="overview__temp">${mainTemp[i]}<span class="overview__temp-degrees">°C</span></div>
                    <div class="overview__condition">${description[i]}</div>
                </div>
                <div class="overview__details">Min: ${minDeg[i]}°C <br><br> Max: ${maxDeg[i]}°C</div>
            </main>
        `)
    }
}




