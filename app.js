// jsCanvas 아이디 불러오기 : canvas event
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// jscolor 클래스 불러오기 : 색상 값 변경 
const colors = document.getElementsByClassName("jsColor");
// jsRange 아이디 불러오기 : range 값 조절 
const range = document.getElementById("jsRange");
// jsMode 아이디 불러오기 : fill 버튼 
const mode = document.getElementById("jsMode");


let painting = false;
let filling = false;

// canvas pixel modifier 지정
canvas.width = 700;
canvas.height = 700;

// canvas stroke style : 색 지정
ctx.strokeStyle = "#2c2c2c";
// canvas line 두께 지정
ctx.lineWidth = 2.5;

// painting 변수 조정 함수
function startPainting(){
    painting = true;
}

// 마우스가 클릭이 아닐 시 event : 종료
function stopPainting(){
    painting = false;
}

// 마우스 이동시 event 
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // 마우스 active가 아닌 hover 상태일 시  현재 (x, y) 좌표에 path(선) 생성
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        // 마우스가 active 상태일 시 path 생성 지점부터 현재 (x, y)좌표 까지 선 생성
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// color 버튼 클릭시 색상 값 변경 함수
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    // strokeStyle override
    ctx.strokeStyle = color;
}

// range 버튼 조절시 선 굵기 조절 함수
function handleRangeChange(event){
    const size = event.target.value;
    // lineWidth override
    ctx.lineWidth = size;
}

// fill 버튼 클릭시 event 
function handleModeClick(){
    if(filling === true){ // clikc시 Fill mode
        filling = false;
        mode.innerText = "Fill";
    } else{ // default = Pointing mode
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}