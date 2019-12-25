
const backgroundmusic = new Audio(require('../music/background.mp3'));
const bombmusic = new Audio(require('../music/bomb.mp3'));
const laughmusic = new Audio(require('../music/laugh.mp3'));

let t1=0;
let timecount;
let blockcount;
let start = 0;
let score ;



export function StartGame(){
    console.log('Start Game');
    StartTimer();
    StartBlock();
    backgroundmusic.load();
    backgroundmusic.play();
}

function StartTimer(){
    console.log('Start Timer');
    clearInterval(timecount);
    t1 = 60;
    start=1;
    timecount = setInterval(function () {
        t1 = t1 - 1;
        document.getElementById('time').innerHTML = t1;
        if (t1 <= 0) {
            clearInterval(timecount);
            document.getElementById('time').innerHTML='60';
            start=0;
            backgroundmusic.pause();
        }
    }, 1000);
}

 function StartBlock(){
    console.log('Start Block');
    clearInterval(blockcount);
    score=0;
    document.getElementById('score').innerHTML = score;
    blockcount = setInterval(function () {
        var x = Math.floor(Math.random() * 9)+1;
        allBlockReset();
       document.getElementById(`block${x}`).style.visibility = 'visible';
        laughmusic.load()
        laughmusic.play()

        if (t1 <= 0) {
            clearInterval(blockcount);
            allBlockReset();
            allBlockShow();
        }
    }, 700);
}

function allBlockReset(){
    for(var i =1;i<=9;i++){   
        document.getElementById(`block${i}`).style.visibility = 'hidden';
    }
}

function allBlockShow() {
    for(var i =1;i<=9;i++){
       document.getElementById(`block${i}`).style.visibility = 'visible';
    }
}

export function GameReset(){
    clearInterval(timecount);
    t1 = 60;
    clearInterval(blockcount);
    document.getElementById('time').innerHTML = t1;
    score = 0;
    document.getElementById('score').innerHTML = score;
    allBlockReset();
    allBlockShow();
    start=0;
    backgroundmusic.pause();
}



export function Hit(num,hit){
  
    if(start==1){
        bombmusic.load();
        bombmusic.play();
        hit=true;
        score++;
        document.getElementById('score').innerHTML = score;
    }
}

