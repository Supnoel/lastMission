
const weather = document.querySelector(".js-weather");
const API_KEY = "8b510ccb62005b580967d84034b97f3c";
const COORD = "coord";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @ ${place}`;
    })
}

function saveCoord(coordObj) {
    localStorage.setItem(COORD, JSON.stringify(coordObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude
    };
    saveCoord(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {

}

function askForCoord() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoord(){
    const loadedCoord = localStorage.getItem(COORD);
    if(loadedCoord === null) {
        askForCoord();
    } else {
        const parsedCoords = JSON.parse(loadedCoord);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoord();
}

init();