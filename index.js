
//Variables from HTML
const ancientCards=document.querySelectorAll(".ancientsCards");
const myLevels=document.querySelectorAll(".difficultyLevel");
const buildDeck=document.querySelector(".start");
const desk=document.querySelector(".desk");
const slot=document.querySelector(".openCards");
const error=document.querySelector(".error");

const blueCounter=document.querySelectorAll(".blueCounter");
const brownCounter=document.querySelectorAll(".brownCounter");
const greenCounter=document.querySelectorAll(".greenCounter");

const divStage=document.querySelector(".stage");
//Variables from JS



let ancient=-1;
let level=-1;

let cards=[];
let stage=0;

let firstStage=[0,0,0];
let secondStage=[0,0,0];
let thirdStage=[0,0,0];


function choseAncient(n) {
    desk.classList.remove("deskReady");
    for(let i = 0; i < ancientCards.length; i++ ){
        ancientCards[i].classList.remove("selectAncient");
    }
    ancientCards[n].classList.add("selectAncient");
    slot.style.backgroundImage="";
    divStage.classList.remove("show");
}

ancientCards[0].addEventListener("click", () => {
    ancient=0;
    choseAncient(ancient);
});

ancientCards[1].addEventListener("click", () => {
    ancient=1;
    choseAncient(ancient);
});

ancientCards[2].addEventListener("click", () => {
    ancient=2;
    choseAncient(ancient);
});

ancientCards[3].addEventListener("click", () => {
    ancient=3;
    choseAncient(ancient);
});

function choseLevel(n) {
    desk.classList.remove("deskReady");
    for(let i = 0; i < myLevels.length; i++ ){
        myLevels[i].classList.remove("selectLevel");
    }
    myLevels[n].classList.add("selectLevel");
    slot.style.backgroundImage="";
    divStage.classList.remove("show");
};


myLevels[0].addEventListener("click", () => {
    level=0;
    choseLevel(level);
});


myLevels[1].addEventListener("click", () => {
    level=1;
    choseLevel(level);
});


myLevels[2].addEventListener("click", () => {
    level=2;
    choseLevel(level);
});

myLevels[3].addEventListener("click", () => {
    level=3;
    choseLevel(level);
});


myLevels[4].addEventListener("click", () => {
    level=4;
    choseLevel(level);
});

buildDeck.addEventListener("click", () => {
    error.classList.remove('showError');

if(ancient === -1){
    error.textContent="Choose an ancient";
    error.classList.add('showError');
}
else if(level === -1){
    error.textContent="Select difficulty level";
    error.classList.add('showError');
}
else{
    slot.style.backgroundImage="";
    desk.classList.add("deskReady");
    cards=getStageArray(getDeskArray(ancient, level),ancient);
    stage=0;
    firstStage=getBNGLevel(ancient, 1);
    secondStage=getBNGLevel(ancient, 2);
    thirdStage=getBNGLevel(ancient, 3);
    showStage(firstStage,secondStage,thirdStage);
    divStage.classList.add("show");


}
})

const blueEasy=["b3","b4","b5", "b10"];
const blueMedium=["b7","b9","b11", "b12"];
const blueHard=["b1","b2","b6", "b8"];


const brounEasy=["n11","n12","n13", "n14", "n21"];
const brounMedium=["n1","n2","n3", "n4", "n5", "n15", "n16", "n17", "n18", "n19", "n20"];
const brounHard=["n6","n7","n8", "n9", "n10"];

const greenEasy=["g1","g12","g16", "g17", "g18"];
const greenMedium=["g7","g8","g9", "g10", "g11", "g13", "g14", "g15"];
const greenHard=["g2","g3","g4", "g5", "g6"];

function getCardsFromArray(arr,n){
    let res=[];
    while(n>0){
        let r=Math.round(Math.random()*(arr.length-1));
        if(!res.includes(arr[r])){
            res.push(arr[r]);
            n=n-1;
        }
    }

    return res;
}

function getBNG(n) {
    switch(n){
        case 0: return [2,9,5];
        case 1: return [2,9,4];
        case 2: return [2,9,5];
        case 3: return [2,9,6]; 
    }
}

function getBNGLevel(n, l) {
    switch(n){
        case 0: 
        switch(l){
            case 1: return [1,2,1];
            case 2: return [1,3,2];
            case 3: return [0,4,2];
        }
        case 1: 
        switch(l){
            case 1: return [2,2,0];
            case 2: return [0,3,1];
            case 3: return [0,4,3];
        }
        case 2: 
        switch(l){
            case 1: return [1,2,0];
            case 2: return [1,3,2];
            case 3: return [0,4,3];
        }
        case 3: 
        switch(l){
            case 1: return [1,2,1];
            case 2: return [1,2,3];
            case 3: return [0,4,2];
        } 
    }
}

function getDeskArray(anci, lev){

    switch(lev){
        case 0:{
            let res=[];
            let blueArray=[];
            let brounArray=[];
            let greenArray=[];
            if(getBNG(anci)[0]>blueEasy.length){
                blueArray = blueEasy.concat(getCardsFromArray(blueMedium,getBNG(anci)[0]-blueEasy.length));
                }
                else{
                    blueArray = getCardsFromArray(blueEasy,getBNG(anci)[0]);
                }
            res.push(blueArray);

            if(getBNG(anci)[1]>brounEasy.length){
                brounArray = brounEasy.concat(getCardsFromArray(brounMedium,getBNG(anci)[1]-brounEasy.length));
                }
                else{
                    brounArray = getCardsFromArray(brounEasy,getBNG(anci)[1]);
                }
            res.push(brounArray);

            if(getBNG(anci)[2]>greenEasy.length){
                greenArray = greenEasy.concat(getCardsFromArray(greenMedium,getBNG(anci)[2]-greenEasy.length));
                }
                else{
                    greenArray = getCardsFromArray(greenEasy,getBNG(anci)[2]);
                }
            res.push(greenArray);

            return res;

        }
        case 1:{
            let res=[];
            let blueArray=[];
            let brounArray=[];
            let greenArray=[];
            blueArray = getCardsFromArray(blueEasy.concat(blueMedium),getBNG(anci)[0]);
            res.push(blueArray);
            brounArray = getCardsFromArray(brounEasy.concat(brounMedium),getBNG(anci)[1]);
            res.push(brounArray);
            greenArray = getCardsFromArray(greenEasy.concat(greenMedium),getBNG(anci)[2]);
            res.push(greenArray);
            return res;

        }
        case 2:{
            let res=[];
            let blueArray=[];
            let brounArray=[];
            let greenArray=[];
            blueArray = getCardsFromArray(blueEasy.concat(blueMedium,blueHard),getBNG(anci)[0]);
            res.push(blueArray);
            brounArray = getCardsFromArray(brounEasy.concat(brounMedium, brounHard),getBNG(anci)[1]);
            res.push(brounArray);
            greenArray = getCardsFromArray(greenEasy.concat(greenMedium, greenHard),getBNG(anci)[2]);
            res.push(greenArray);
            return res;

        }
        case 3:{
            let res=[];
            let blueArray=[];
            let brounArray=[];
            let greenArray=[];
            blueArray = getCardsFromArray(blueHard.concat(blueMedium),getBNG(anci)[0]);
            res.push(blueArray);
            brounArray = getCardsFromArray(brounHard.concat(brounMedium),getBNG(anci)[1]);
            res.push(brounArray);
            greenArray = getCardsFromArray(greenHard.concat(greenMedium),getBNG(anci)[2]);
            res.push(greenArray);
            return res;
        }
        case 4:{
            let res=[];
            let blueArray=[];
            let brounArray=[];
            let greenArray=[];
            if(getBNG(anci)[0]>blueHard.lastIndexOf){
                blueArray = blueHard.concat(getCardsFromArray(blueMedium,getBNG(anci)[0]-blueHard.length));
                }
                else{
                    blueArray = getCardsFromArray(blueHard,getBNG(anci)[0]);
                }
            res.push(blueArray);

            if(getBNG(anci)[1]>brounHard.length){
                brounArray = brounHard.concat(getCardsFromArray(brounMedium,getBNG(anci)[1]-brounHard.length));
                }
                else{
                    brounArray = getCardsFromArray(brounHard,getBNG(anci)[1]);
                }
            res.push(brounArray);

            if(getBNG(anci)[2]>greenHard.length){
                greenArray = greenHard.concat(getCardsFromArray(greenMedium,getBNG(anci)[2]-greenHard.length));
                }
                else{
                    greenArray = getCardsFromArray(greenHard,getBNG(anci)[2]);
                }
            res.push(greenArray);

            return res;
        }
    }
}

function getStageArray(colorArray,anci){
let blueArr=colorArray[0];
let brownArr=colorArray[1];
let greenArr=colorArray[2];

let first=[];

for(let i=0;i<getBNGLevel(anci, 1)[0];i++){
    first.push(choiseCard(blueArr));
}
for(let j=0;j<getBNGLevel(anci, 1)[1];j++){
    first.push(choiseCard(brownArr));
}
for(let i=0;i<getBNGLevel(anci, 1)[2];i++){
    first.push(choiseCard(greenArr));
}

let second=[];

for(let i=0;i<getBNGLevel(anci, 2)[0];i++){
    second.push(choiseCard(blueArr));
}
for(let j=0;j<getBNGLevel(anci, 2)[1];j++){
    second.push(choiseCard(brownArr));
}
for(let i=0;i<getBNGLevel(anci, 2)[2];i++){
    second.push(choiseCard(greenArr));
}

let third=[];  
    
for(let i=0;i<getBNGLevel(anci, 3)[0];i++){
    third.push(choiseCard(blueArr));
}
for(let j=0;j<getBNGLevel(anci, 3)[1];j++){
    third.push(choiseCard(brownArr));
}
for(let i=0;i<getBNGLevel(anci, 3)[2];i++){
    third.push(choiseCard(greenArr));
}
    
return [first, second, third];
}


function changeСounter(x){


    switch(x){
        case "b": 
            switch(stage){
                case 0: {firstStage[0]=firstStage[0]-1;} break;
                case 1: {secondStage[0]=secondStage[0]-1;} break;
                case 2: {thirdStage[0]=thirdStage[0]-1;} break;
            } break;
        case "n":
            switch(stage){
                case 0: {firstStage[1]=firstStage[1]-1;} break;
                case 1: {secondStage[1]=secondStage[1]-1;} break;
                case 2: {thirdStage[1]=thirdStage[1]-1;} break;
        } break;
        case "g":
            switch(stage){
                case 0: {firstStage[2]=firstStage[2]-1;} break;
                case 1: {secondStage[2]=secondStage[2]-1;} break;
                case 2: {thirdStage[2]=thirdStage[2]-1;} break;
            } break;

    }
    if(isLevelComplite(cards[stage])){
        stage=stage+1;
    } 

}

function choiseCard(array){

    while(true){
        let r=Math.round(Math.random()*(array.length-1));

        if(array[r] != "0"){
            let res=array[r];
            array[r]="0";
            return res;
        }
    }
}


function getCard(text){
   // console.log(text);
    switch(text[0]){
        case "b": {changeСounter("b");  showStage(firstStage,secondStage,thirdStage);} return `url(assets/MythicCards/blue/blue${text.slice(1,text.length)}.png)`;
        case "n": {changeСounter("n");  showStage(firstStage,secondStage,thirdStage);}  return `url(assets/MythicCards/brown/brown${text.slice(1,text.length)}.png)`;
        case "g": {changeСounter("g");  showStage(firstStage,secondStage,thirdStage);} return `url(assets/MythicCards/green/green${text.slice(1,text.length)}.png)`;
    }


}

desk.addEventListener("click", ()=>{
    if(! isLevelComplite(cards[stage])){
       slot.style.backgroundImage= getCard(choiseCard(cards[stage]));
    }
    else if (stage == 3){
        desk.classList.remove("deskReady");
   }
   else{
        slot.style.backgroundImage= getCard(choiseCard(cards[stage]));

  
}

})

function isLevelComplite(array){
    for(let i in array){
        if(array[i] != "0"){
            return false;
        }
    }
    return true;
}


//Stages




function showStage(arr1,arr2,arr3){
let x=[arr1, arr2,arr3];

    for( let i=0;i<3;i++){
        blueCounter[i].textContent=x[i][0];
        brownCounter[i].textContent=x[i][1];
        greenCounter[i].textContent=x[i][2];
    }
}

