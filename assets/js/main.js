window.onload = () =>{
	// 날씨
	const API_KEY = ("33dc461add1e8586dc4a13c5a70bf169");
	function onGeoOk(position){
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
		
		const temp = document.querySelector('footer .temp');
		const wind = document.querySelector('footer .wind');
		const weatherIcon = document.querySelector('footer .weather_icon');
		
		fetch(url).then(response=> response.json())
			.then(data=> {
			let temper = data.main.temp;
			let weather = data.weather[0].description;
        	console.log( temper, weather);

			const icon = data.weather[0].icon;
			console.log(icon)
			console.log(weatherIcon)
			weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`;
			
			temp.textContent = Math.floor(temper)  + "℃";
			wind.textContent = weather;
			
		});	
	}	
	function onGeoEroor(){
	    alert("Can't find you. No weather for you")
	}

	navigator.geolocation.getCurrentPosition(onGeoOk, onGeoEroor);


	// 날짜
	let todayDate = new Date();
	let year = todayDate.getFullYear();
	let month = todayDate.getMonth();
	let date = todayDate.getDate();
	let today = document.querySelector('footer .today');
	today.textContent = year + "-" + month.toString().padStart(2, '0') + "-" + date.toString().padStart(2, '0');

	//시간
	let hours = todayDate.getHours();
	let minutes = todayDate.getMinutes();
	let time = document.querySelector('footer .time');
	hours = hours - 12;

	if(hours < 12){
		time.textContent = "오전 " + hours + ":" + minutes.toString().padStart(2, '0') ;
	}else{
		time.textContent = "오후 " + hours + ":" + minutes.toString().padStart(2, '0') ;
	}

	//팝업열림


}
