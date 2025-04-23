let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let body = document.querySelector("body");

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

let highScore = [];

let h3 = document.createElement("h3");
body.appendChild(h3);

document.addEventListener("keypress", function () {
    if(started === false) {
        
        started = true;
        

        levelUp();
    }
    
});

function gameFlash(button) {
    button.classList.add("flash");
    setTimeout(function() {
        button.classList.remove("flash");
    }, 250);
}

function userFlash(button) {
    button.classList.add("userflash");
    setTimeout(function() {
        button.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
   h2.innerText =  `Level: ${level}`;

   let ranInx = Math.floor(Math.random() * 4);

    let ranColor = btns[ranInx];
    let randBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
   gameFlash(randBtn);
}


//main game condition
function checkAns(idx){
 
  if(userSeq[idx] === gameSeq[idx])
    {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
        
  else{
    h2.innerHTML = `Game Over! Your Score is: ${level} <br>Press any key to restart.`;
    highScore.push(level - 1); 
    console.log(highScore);
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    body.style.backgroundColor = "red";

    h3.innerText = `High Score: ${Math.max(...highScore)}`;
   
    setTimeout(function(){
        body.style.backgroundColor = "white";
    },200);
}
    
};


//User Sequence
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}