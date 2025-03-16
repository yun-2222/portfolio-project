// data
const jsonData =[
    {
        "file":"아이스크림미디어 수학 교과서",
        "image":[1,2,3,4,5,6,7,8,9],
        "date":"23.08 ~ 24.04",
        "no":1,
        "comment":`처음으로 교과서 퍼블리싱의 메인 작업을 맡아 진행하였고 
        작업 중 기획이 변경되면서 부족한 시간 속에서 개발과 병행하며 시행착오도 많았습니다.
        그 과정에서 초기 UI 요소의 공통 기준을 명확히 정하는 것이 중요함을 깨달았습니다.`
    },
    {
        "file":"미래엔 영어 교과서",        
        "image":[1,2,3,4,5,6],
        "date":"23.07 ~ 24.04",
        "no":2,
        "comment":`회사 내 자체 UI 개발 프레임워크를 활용하여 퍼블리싱을 진행하였습니다.
        개발이 완료되지 않은 상태에서 작업이 이루어졌지만 프레임워크 개발자 및 팀원들과 적극적으로 소통하며 문제를 해결해 나갔습니다.`
    },
    {
        "file":"천재 일본어 교과서",        
        "image":[1,2,3,4,5,6,7],
        "date":"23.09 ~ 24.03",
        "no":3,
        "comment":`개발 마무리 단계에서 예상보다 많은 수정이 발생했지만 개발자와 소통하며 문제를 해결해 나갔습니다. 
        소통을 통해 더 완성도 높은 결과물을 만들 수 있었습니다`
    },
    {
        "file":"미래엔 디지털 초코",
        "image":[1,2,3,4,5,6,7,8,9],
        "date":"23.01 ~ 23.04",
        "no":4,
        "comment":`동일한 페이지에 여러 데이터를 추가하는 작업을 데이터 객체를 활용해 동적으로 구성하며 
        기존 HTML 양산 방식보다 유연한 작업 방식을 경험했습니다.
        `
    },
    {
        "file":"비상 진도",
        "image":[1,2,3,4,5,6],
        "date":"2024.06 ~ 2024.09",
        "no":5,
        "comment":`입사 초기에 진행했던 프로젝트로 이후 볼륨이 커지면서 다시 참여하게 되었습니다. 
        초창기에는 회사의 작업 방식을 익히는 계기가 되었으며, 이후에는 세부적인 부분까지 신경 써서 작업했습니다. 
        특히 CSS 애니메이션과 JavaScript를 활용하며 완성도를 높이는 데 집중했습니다.
        `
    },
    {
        "file":"비상 두두 ai 스픽온",        
        "image":[1,2,3,4,5,6,7,8,9],
        "date":"24.04 ~ 24.07",
        "no":6,
        "comment":"비상 진도에서 활용한 작업 방식과 비슷하게 진행"
    },
    {
        "file":"비상 두두 잉글리시 그래머",        
        "image":[1,2,3,4,5,6,7,8,9],
        "date":"23.07 ~ 23.09",
        "no":7,
        "comment":"비상 진도에서 활용한 작업 방식과 비슷하게 진행"
    },
]



jsonData.forEach((data,index) => {
    // 정보
    let info = document.createElement('div');
    info.setAttribute('class', 'info');
    
    let name = document.createElement('dl');
    let dt1 = document.createElement('dt');
    let dd1= document.createElement('dd');
    name.appendChild(dt1).innerText = "프로젝트 이름: ";
    name.appendChild(dd1).innerText = data.file;

    let date = document.createElement('dl');
    let dt2 = document.createElement('dt');
    let dd2= document.createElement('dd');
    date.appendChild(dt2).innerText = "프로젝트 기간: ";
    date.appendChild(dd2).innerText = data.date;

    let comment = document.createElement('dl');
    let dt3 = document.createElement('dt');
    let dd3= document.createElement('dd');
    comment.appendChild(dt3).innerText = "코멘트: ";
    comment.appendChild(dd3).innerText = data.comment;

    info.append(name);
    info.append(date);
    info.append(comment);

    //이미지
    let ul = document.createElement('ul');
    for (let i = 0; i < data.image.length; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = `../assets/image/folder/`+ data.file + `/`+ (i + 1)+`.webp`;

        ul.append(li)
        li.append(img);
    }

    // inof 버튼 클릭
    const infoBtn = document.querySelector('.project_popup .h_bot .infoBtn');
    console.log(infoBtn)
    console.log(info)
    infoBtn.addEventListener('click',() => info.classList.toggle('active'))


    // 전체 슬라이드
    let inner = document.createElement('div');
    inner.setAttribute("class", "inner");
    inner.append(info);
    inner.append(ul);

    let slide = document.createElement('div');
    slide.setAttribute("class", "swiper-slide");
    slide.setAttribute("id", data.no);
    slide.append(inner);

    let wrapper = document.querySelector('.main .swiper-wrapper');
    wrapper.append(slide);
    
});

let currentIndex = 0;
let hTop = document.querySelector('.h_top');
let fileName = document.createElement('p');
hTop.append(fileName);
function fileNameChangeFn(){
    fileName.innerText = `file // ` + jsonData[currentIndex].file + ` [` + jsonData[currentIndex].no + `/` + jsonData.length + `]`; 
}


//스와이퍼 슬라이드
var swiper = new Swiper(".mySwiper", {
    speed:0,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    on: {
        init:fileNameChangeFn(),
        slideChange: function () {
            currentIndex = swiper.activeIndex;
            fileNameChangeFn();
        }
    }
});

const params = new URLSearchParams(window.location.search);
swiper.slideTo(params.get("slide") || 0, 0);