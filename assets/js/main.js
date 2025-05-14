// 새창 열림(깃,노션)
const links = document.querySelectorAll('a[target="_blank"]');
function openWindowFn(e){
	const newWindow = window.open(e.target.href);
	if (newWindow) {
		const sameLinks = document.querySelectorAll(`a[data-step="${e.target.dataset.step}"]`);
		sameLinks.forEach(sameLink => {sameLink.closest('li').classList.add('on');});
	} 
}
links.forEach(link => link.addEventListener('click',openWindowFn));

//팝업열림
const appBtns = document.querySelectorAll('header .app > li');
const fAppBtns = document.querySelectorAll('footer .app > li');
let popup ,step;
let clickCount = 0;
let isMatch = false;

function clickBtnFn(e){
	step = e.target.dataset.step;
	popup = document.querySelector(`article[data-step="${step}"]`);

	if(popup){
		isMatch = true;
		popup.style.top = "";
		popup.style.scale ="";
		popup.classList.toggle('active');
		popup.style.zIndex = clickCount;
		if(clickCount < 100) clickCount++;
		
		
		popup.querySelector('.close_btn').addEventListener('click',closeBtnFn);
		popup.querySelector('.max_btn').addEventListener('click',maxBtnFn);
		popup.querySelector('.mini_btn').addEventListener('click',miniBtnFn);
		popup.querySelector('.header .h_top').addEventListener("mousedown", dragStart);
		popup.addEventListener("mousedown", zIndexFn);
		footerFn();
		memoAnimatio();
	}
}

function footerFn(){
	fAppBtns[step - 1].classList.toggle('on', popup.classList.contains('active'));
}

appBtns.forEach((appBtn) => {appBtn.addEventListener('click',clickBtnFn)});  
fAppBtns.forEach((fAppBtn) => {fAppBtn.addEventListener('click',clickBtnFn)});  


// all btn
let isFull = false;
function closeBtnFn(){
	let article = this.closest('article');
	isFull = false;
	footerFn();
	positions.clear();
	article.classList.remove('active','max');
	article.style.transform = '';
	article.style.scale ="0";
}

function maxBtnFn(){
	let article = this.closest('article');
	article.classList.toggle('max');
	!isFull && article.classList.contains('active')? isFull = true : isFull = false;
}

function miniBtnFn(){
	let article = this.closest('article');
	article.classList.remove('active');
	article.style.top ="100vh";
	article.style.scale ="0";
}

//팝업 zindex
function zIndexFn(){
	if(this.classList.contains('active')) {
		this.style.zIndex = clickCount;	
	}
}

// search 버튼
const searchBtn = document.querySelector('.search > button');
searchBtn.onclick = () =>{
	const searchInput = document.querySelector('.search input')
	searchInput.value ='검색해주셔서 감사합니다:)';
	searchInput.style.color='#4686d1';
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

	let computedStyle = getComputedStyle(_this);
	let startX = parseInt(computedStyle.left) || 0;
	let startY = parseInt(computedStyle.top) || 0;

	if (!positions.has(_this)) {
		positions.set(_this, { x: startX, y: startY });
	}

	document.addEventListener("mousemove", dragMove);
	document.addEventListener("mouseup", dragEnd);
}

// 드래그 이동 함수
function dragMove(e) {
	if (isDrag && !isFull) {
		moveX = e.clientX;
		moveY = e.clientY;

		let deltaX = moveX - prevX;
		let deltaY = moveY - prevY;

		let pos = positions.get(_this);
		pos.x += deltaX;
		pos.y += deltaY;
		positions.set(_this, pos);

		_this.style.transition = 'none';
		_this.style.left = `${pos.x}px`;
		_this.style.top = `${pos.y}px`;

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

// 메모장 하단
const memoTextH3 = document.querySelector('.memo_popup .main h3');
const memoTextP = document.querySelector('.memo_popup .main p');
const memoTextLength = document.querySelector('.memo_popup .footer .length');
memoTextLength.innerHTML = memoTextH3.innerText.length +  memoTextP.innerText.length + `자`;  

// 메모장 에니메이션 
const memo = document.querySelector('.memo_popup .main');
for (let i = 0; i < 5; i++) {
	let memoAni = document.createElement('span');
	memoAni.setAttribute('class', 'aniObj');
	memo.append(memoAni)
}
const memoAnis = document.querySelectorAll('.memo_popup .main span');

function memoAnimatio(){
	memoAnis.forEach(memoAni => {
		let widht = Math.floor(Math.random() * 21) + 15;
		let height = Math.floor(Math.random() * 11) + 20;
		let [r,g,b] = [...Array(3)].map(()=>Math.floor(Math.random() * 210));
		let radiusX = [...Array(4)].map(()=>Math.floor(Math.random() * 51) + 40)
		let radiusY = [...Array(4)].map(()=>Math.floor(Math.random() * 51) + 40)
		let rgba = `rgba(${r},${g},${b},0.2)`;
		
		function randomRadius(){
			let randomX = radiusX.map(v=>v+(Math.floor(Math.random()*100)+ 1)).join('%') + '%'
			let randomY = radiusY.map(v=>v+(Math.floor(Math.random()*100)+ 1)).join('%') + '%'
			return `${randomX}/${randomY}`
		}
		let firstFrame = { borderRadius: randomRadius() };
		console.log(Math.random() * 0.15 + 0.85)
		let keyframes = Array.from({length:5},() =>({
			borderRadius:randomRadius(),
			scale:Math.random() * 0.15 + 0.85
		}))
			
		keyframes.unshift(firstFrame);
		keyframes.push(firstFrame);

		let options = {
			duration: 6000,
			iterations: Infinity,
			animationDeraction: 'alternate',
			fill:'both'
		}
		memoAni.animate(keyframes,options);

				
		memoAni.style.width = `${widht}vw`;
		memoAni.style.height = `${height}vh`;
		memoAni.style.backgroundColor = rgba ;
		memoAni.style.borderRadius = firstFrame;
	});
}

