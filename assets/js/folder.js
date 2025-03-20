// 폴더 새로고침
const fileReload = document.querySelector('.refresh_btn');
fileReload.onclick = () =>{
	document.location.reload(true);		
	alert('새로고침 되었습니다');
}

//파일 클릭
const memoSections = document.querySelectorAll('.folder_popup .contents .memo');
const folderAsides = document.querySelectorAll('.folder_popup .aside ul li');
const folderContents = document.querySelectorAll('.folder_popup .contents ul ');
const folderSection = document.querySelector('.folder_popup .contents .folder');
const projectSection = document.querySelector('.folder_popup .contents .project');
const headerAdd = document.querySelector('.header .h_bot .address');		


function folderAsideClickFn(e){
	let index = [...folderAsides].indexOf(e.currentTarget);
	for (let i = 0; i < folderAsides.length; i++) {
		folderAsides[i].classList.remove('active');
		folderContents[i].classList.remove('active');
		
		if(folderContents[i].childNodes.length === 0 ){
			folderContents[i].textContent = "이 폴더는 비어 있습니다."
			folderContents[i].style.cssText = "justify-content : center; padding-top: 30px; color:#6c6c6c";
		}
	}
	e.currentTarget.classList.add('active');
	folderContents[index].classList.toggle('active');
	changeTextFn(e);
}

function changeTextFn(e){
	const oldText = document.querySelector('.header .h_bot .address p');
	const oldIcon = document.querySelector('.header .h_bot .address img');
	let currentInner = e.currentTarget.querySelector('p').innerText;
	
	switch (currentInner) {
		case '홈': oldIcon.src = `assets/image/icon/address_icon.png`;
		break;
		
		case '갤러리': case '사진': oldIcon.src = `assets/image/icon/address2_icon.png`;
		break;
			
		default:oldIcon.src = `assets/image/icon/address3_icon.png`;
		break;
	}
	oldText.innerText = currentInner;
	
	let newText = document.querySelector('.header .h_bot .address p');
	let newIcon = document.querySelector('.header .h_bot .address img');
	if(newText && newIcon){
		headerAdd.replaceChild(oldIcon,newIcon);
		headerAdd.replaceChild(oldText, newText);
	}else{
		headerAdd.appendChild(oldIcon, oldText);
	}
}

folderAsides.forEach(folderAside => folderAside.addEventListener('click',folderAsideClickFn));
memoSections.forEach(memoSection => memoSection.addEventListener('click',clickBtnFn));
folderSection.addEventListener('click', () => projectSection.classList.add('active'));




	