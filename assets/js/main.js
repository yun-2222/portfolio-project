const API_KEY = ("33dc461add1e8586dc4a13c5a70bf169");

function onGeoOk(position){
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang=kr`}

function onGeoEroor(){
    alert("Can't find you. No weather for you")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoEroor);

fetch()


// const weatherIcon = document.querySelector('footer .weather_icon');
// const temp = document.querySelector('footer .temp');
// const wind = document.querySelector('footer .wind');