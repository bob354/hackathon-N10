const problemElement1 = document.querySelector('.problem1');
const problemElement2 = document.querySelector('.problem2');
const ourForm = document.querySelector('.our-form');
const ourField = document.querySelector('.our-field');
const pointsNeeded = document.querySelector('.points-needed');
const mistakesAllowed = document.querySelector('.mistakes-allowed');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');


function getRan(max){
    return Math.ceil((Math.random()) * (max+1));
}

function getRan2(max){
    return Math.ceil((Math.random()+7) * (max+1));
}


function genProb(){
    let sus = getRan2(9);
    return{
        num1: getRan(9) * sus,
        num2: getRan(9) * sus,
        num3: getRan(9) * sus,
        num4: getRan(9) * sus,
        num5: getRan(9) * sus,
        num6: getRan(9) * sus,
    }
}

let state = {
    score: 0,
    wrongAns: 0
}

function resetField(){
    ourField.value = "";
    ourField.focus();
}

function updProb(){
    resetField();
    state.currentProb = genProb();
    const p = state.currentProb;
    problemElement1.innerHTML = `${p.num1} ${p.num2} ${p.num3}`;
    problemElement2.innerHTML = `${p.num4} ${p.num5} ${p.num6}`;
}

updProb(); 

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();

    const s = parseInt(ourField.value, 10);
    const p = state.currentProb; 
    if (p.num1%s==0 && p.num2%s==0 && p.num3%s==0 && p.num4%s==0 && p.num5%s==0 && p.num6%s==0){
        // alert("YES");
        if (s>2){
            state.score+=2;
            pointsNeeded.textContent = 20 - state.score;
            updProb();
        }
        else{
            state.score++;
            pointsNeeded.textContent = 20 - state.score;
            updProb();
        }
    }
    else{
        // alert("NO");
        state.wrongAns++;
        mistakesAllowed.textContent = 5 - state.wrongAns;
        resetField();
    }
    checkLogic();
}

function checkLogic(){
    if (state.score>=20){
        winningMessageTextElement.innerText = "You won!";
        winningMessageElement.classList.add('show');
        updProb();
        // newGame();
    }
    if (state.wrongAns==5){
        winningMessageTextElement.innerText = "You lost!";
        winningMessageElement.classList.add('show');
        updProb();
        // newGame();
    }
}

function newGame(){
    state.score = 0;
    state.wrongAns = 0;
    pointsNeeded.textContent = 20;
    mistakesAllowed.textContent = 5;
    resetField();
}

restartButton.addEventListener('click', handleClick);

function handleClick(){
    winningMessageElement.classList.remove('show');
    newGame();
}