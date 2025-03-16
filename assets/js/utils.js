// 날씨
const API_KEY = ("33dc461add1e8586dc4a13c5a70bf169");
const city = "Seoul";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`

const temp = document.querySelector('footer .temp');
const wind = document.querySelector('footer .wind');
const weatherIcon = document.querySelector('footer .weather_icon');

fetch(url).then(response=> response.json())
	.then(data=> {
	let temper = data.main.temp;
	let weather = data.weather[0].description;
	weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`;

	temp.textContent = Math.floor(temper)  + "℃";
	wind.textContent = weather;
	
});	


// 날짜
const today = document.querySelector('footer .today');
let todayDate = new Date();
let year = todayDate.getFullYear();
let month = todayDate.getMonth();
let date = todayDate.getDate();
today.textContent = year + "-" + month.toString().padStart(2, '0') + "-" + date.toString().padStart(2, '0');

//시간
const time = document.querySelector('footer .time');
let hours = todayDate.getHours();
let minutes = todayDate.getMinutes();
hours = hours - 12;

if(hours < 12){
	time.textContent = "오전 " + hours + ":" + minutes.toString().padStart(2, '0') ;
}else{
	time.textContent = "오후 " + hours + ":" + minutes.toString().padStart(2, '0') ;
}

