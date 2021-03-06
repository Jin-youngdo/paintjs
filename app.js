// jsCanvas 아이디 불러오기 : canvas event
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// jscolor 클래스 불러오기 : 색상 값 변경 
const colors = document.getElementsByClassName("jsColor");
// jsRange 아이디 불러오기 : range 값 조절 
const range = document.getElementById("jsRange");
// jsMode 아이디 불러오기 : fill 버튼 
const mode = document.getElementById("jsMode");
// jssave 아이디 불러오기 : save 버튼
const saveBtn = document.getElementById("jsSave");
// jsClear 아이디 불러오기 : clear 버튼
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;
let random_color = false;

// canvas pixel modifier 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas background 색상 초기화
ctx.fillStyle= "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// canvas stroke style : 색 지정
ctx.strokeStyle = INITIAL_COLOR;
// canvas fill style 초기화 
ctx.fillStyle = INITIAL_COLOR;
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

function onMouseDown(event) {
    if(random_color){
        color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }

    startPainting();
}

// 마우스 이동시 event 
function onMouseMove(event){
    let x = event.offsetX;
    let y = event.offsetY;
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
    if(!event.target.classList.contains("random_color")){
        color = event.target.style.backgroundColor;

    } else {
        random_color = true;
        color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`; 
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
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

// CANVAS 크기 만큼의 도형 지정 후 fill
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
}

// canvas 마우스 우클릭 이벤트 제거
function handleCM(event){
    event.preventDefault();
}

// canvas SAVE 버튼 클릭시 event
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

// canvas Clear 버튼 클릭시 event
function handleClearClick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
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

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn){
    clearBtn.addEventListener("click", handleClearClick);
}