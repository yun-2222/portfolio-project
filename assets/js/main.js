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
	const articles = document.querySelectorAll('article[data-step]');
	const headerAppLis = document.querySelectorAll('header .app > li');
	let clickCount = 0;
	headerAppLis.forEach(headerAppLi => {
		headerAppLi.onclick = () => {
			let isMatch = false;
			articles.forEach(article => {
				if(article.dataset.step == headerAppLi.dataset.step){
					isMatch = true;
					article.classList.toggle('active');

					if(article.classList.contains('active')){
						article.style.top = (50 * (clickCount + 1)) + "px";
						article.style.left = (50 * (clickCount + 1)) + "px";
						article.style.zIndex = 1 + clickCount;
						clickCount++;

					}else{
						article.style.top =  "0px";
						article.style.left = "0px";		
						article.style.zIndex = "0";
						clickCount = Math.max(0, clickCount - 1);
					}
				}
			});
		}; 
	}); 
		

	// footer appBtn active 추가
	const appBtns = document.querySelectorAll('footer .app > li');
	function footerApp() {
		appBtns.forEach(appBtn =>{
			appBtn.onclick = () =>{
				appBtn.classList.toggle('active');
			}
		});
	}


		
	// all btn
	const closeBtns = document.querySelectorAll(".all_btn .close_btn");
	const maxBtns = document.querySelectorAll(".all_btn .max_btn");
	const miniBtns = document.querySelectorAll(".all_btn .mini_btn");
	
	// 닫기 버튼
	closeBtns.forEach(closeBtn => {
		closeBtn.onclick = () => {
			let closestArticle = closeBtn.closest('article');
			closestArticle.classList.remove('active');
		} 
	});

	//최대화
	maxBtns.forEach(maxBtn => {
		maxBtn.onclick = () => {
			let closestArticle = maxBtn.closest('article');
			closestArticle.classList.toggle('max');
		} 
	});

	//최소화
	miniBtns.forEach(miniBtn => {
		miniBtn.onclick = () => {
		let closestArticle = miniBtn.closest('article');
			closestArticle.classList.add('min');
			closestArticle.classList.remove('active');
		} 
	});

	function miniBtnRemoveFn(){
		miniBtns.forEach(miniBtn => {
			let closestArticle = miniBtn.closest('article');
			closestArticle.classList.remove('min');
			if(closestArticle.classList.contains('min')&&closestArticle.classList.contains('active')){
				closestArticle.classList.remove('min');
			}
		})
	}

}
