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
		
		
		popup.addEventListener('click',closeBtnFn);
		popup.addEventListener('click',maxBtnFn);
		popup.addEventListener('click',miniBtnFn);
		popup.addEventListener("mousedown", zIndexFn);
		popup.querySelector('.header .h_top').addEventListener("mousedown", dragStart);
		footerFn();
	}
}

function footerFn(){
	fAppBtns[step - 1].classList.toggle('on', popup.classList.contains('active'));
}

appBtns.forEach((appBtn) => {appBtn.addEventListener('click',clickBtnFn)});  
fAppBtns.forEach((fAppBtn) => {fAppBtn.addEventListener('click',clickBtnFn)});  


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


// all btn
let isFull = false;
function closeBtnFn(e){
	if(e.target.classList.contains('close_btn')){
		this.classList.remove('active','max');
		this.style.transform = '';
		this.style.scale ="0";
		positions.clear();
		isFull = false;
		footerFn();
	}
}

function maxBtnFn(e){
	if(e.target.classList.contains('max_btn')){
		this.classList.toggle('max');
		if(!isFull && this.classList.contains('active')){
			isFull = true;
		} else{
			isFull = false;
		}
	}
}

function miniBtnFn(e){
	if(e.target.classList.contains('mini_btn')){
		this.classList.remove('active');
		this.style.top ="100vh";
		this.style.scale ="0";
	}
}

//팝업 zindex
function zIndexFn(e){
	if(this.classList.contains('active')){
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

// 메모
const memoTextH3 = document.querySelector('.memo_popup .main h3');
const memoTextP = document.querySelector('.memo_popup .main p');
const memoTextLength = document.querySelector('.memo_popup .footer .length');
console.log(memoTextH3.innerText.length)
memoTextLength.innerHTML = memoTextH3.innerText.length +  memoTextP.innerText.length + `자`;  



