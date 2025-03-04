window.onload = () =>{
	// 날씨
	// const API_KEY = ("33dc461add1e8586dc4a13c5a70bf169");
	// function onGeoOk(position){
	// 	const lat = position.coords.latitude;
	// 	const lng = position.coords.longitude;
	// 	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
		
	// 	const temp = document.querySelector('footer .temp');
	// 	const wind = document.querySelector('footer .wind');
	// 	const weatherIcon = document.querySelector('footer .weather_icon');
		
	// 	fetch(url).then(response=> response.json())
	// 		.then(data=> {
	// 		let temper = data.main.temp;
	// 		let weather = data.weather[0].description;
	// 		weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`;

	// 		temp.textContent = Math.floor(temper)  + "℃";
	// 		wind.textContent = weather;
			
	// 	});	
	// }	
	// function onGeoEroor(){
	//     alert("Can't find you. No weather for you")
	// }

	// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoEroor);


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
	const appLis = document.querySelectorAll('header .app > li, footer .app > li');
	const footerAppLis = document.querySelectorAll('footer .app > li');
	let clickCount = 0;

	appLis.forEach(appLi => {
		let isMatch = false;
		appLi.onclick = () => {	
			articles.forEach(article => {
				if(article.dataset.step == appLi.dataset.step){
					isMatch = true;
					clickCount++;
					article.classList.toggle('active');
					article.style.top = "";
					article.style.margin = "auto";
				}

				footerAppLis.forEach(footerAppLi => {
					if ( footerAppLi.dataset.step === appLi.dataset.step ) {
						footerAppLi.classList.add('on');
					}else if(!article.classList.contains('active')){
						footerAppLi.classList.remove('on');
					}
				});
				
				article.addEventListener('click',closeBtnFn);
				article.addEventListener('click',maxBtnFn);
				article.addEventListener('click',miniBtnFn);
				article.addEventListener("mousedown", zIndexFn);
				
				article.querySelector('.header .h_top').addEventListener("mousedown", dragStart);
				
			}); 
		}; 
	}); 


	function zIndexFn(e){
		if(this.classList.contains('active')){
			this.style.zIndex = clickCount;	
		}
	}

	// all btn
	function closeBtnFn(e){
		if(e.target.classList.contains('close_btn')){
			this.classList.remove('active','max');
			this.style.transform = '';
		}
	}

	function maxBtnFn(e){
		if(e.target.classList.contains('max_btn')){
			this.classList.toggle('max');
		}
	}

	function miniBtnFn(e){
		if(e.target.classList.contains('mini_btn')){
			this.classList.remove('active');
			this.style.top ="100vh";
			this.style.margin = "0";
		}
	}


	// 드래그드랍
	let positions = new Map(); 	
	let isDrag = false;
	let prevX = 0, prevY = 0;
	let moveX = 0, moveY = 0;
	let _this = null;
	
	// 드래그 시작 함수
	function dragStart(e) {
		isDrag = true;
		_this = this.closest('article');
		prevX = e.clientX;
		prevY = e.clientY;
		clickCount++;
	
		if (!positions.has(_this)){
			positions.set(_this, { x: 0, y: 0 });
		}

		document.addEventListener("mousemove", dragMove);
		document.addEventListener("mouseup", dragEnd);
	}
	
	// 드래그 이동 함수
	function dragMove(e) {
		if (isDrag) {
			moveX = e.clientX;
			moveY = e.clientY;
	
			let deltaX = moveX - prevX;
			let deltaY = moveY - prevY;
	
			let pos = positions.get(_this);
			pos.x += deltaX;
			pos.y += deltaY;
			positions.set(_this, pos);
	
			_this.style.transition = 'none';
			_this.style.transform = `translate(${pos.x}px, ${pos.y}px)`;


			prevX = moveX;
			prevY = moveY;
		}
	}
	
	// 드래그 종료 함수
	function dragEnd() {
		isDrag = false;
		document.removeEventListener("mousemove", dragMove);
		document.removeEventListener("mouseup", dragEnd);
		_this.style.transition = '';
	}
	





	// 파일 //
	// folder 새로고침
	const fileReload = document.querySelector('.refresh_btn');
	fileReload.onclick = () =>{
		document.location.reload(true);		
		alert('새로고침 되었습니다');
	}

	//파일 클릭
	const folderAsides = document.querySelectorAll('.folder_popup .aside ul li');
	const folderCons = document.querySelectorAll('.folder_popup .contents ul ');
	
	const folderFolder = document.querySelector('.folder_popup .contents .folder');
	const folderMemos = document.querySelectorAll('.folder_popup .contents .memo ');
	const articlesFoler = document.querySelector('.folder_popup .contents .project');
	const articlesMemo = document.querySelector('.memo_popup');
	
	folderAsides.forEach(folderAside => {
		folderAsides[3].classList.add('active');
		folderCons[3].classList.add('active');
		folderAside.onclick = (e) =>{
			let index = [...folderAsides].indexOf(e.currentTarget);
			for (let i = 0; i < folderAsides.length; i++) {
				folderAsides[i].classList.remove('active');
				folderCons[i].classList.remove('active');

				if(folderCons[i].childNodes.length === 0 ){
					folderCons[i].textContent = "이 폴더는 비어 있습니다."
					folderCons[i].style.cssText = "justify-content : center; padding-top: 30px; color:#6c6c6c";
				}
			}
			e.currentTarget.classList.add('active');
			folderCons[index].classList.add('active');
			folderFolder.onclick = () => articlesFoler.classList.add('active');		
		}
	});

	
	folderMemos.forEach(folderMemo => {
		folderMemo.onclick = () => {
			if(!articlesMemo.classList.contains('active')){
				articlesMemo.classList.add('active');
			}

		} 
	});

}
