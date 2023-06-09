'use strict';

//selecting buttons
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldCurrent = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//selecting elements
const scoreMain0 = document.querySelector('#score--0');
const scoreMain1 = document.querySelector('#score--1');
const scoreCurrent0 = document.querySelector('#current--0');
const scoreCurrent1 = document.querySelector('#current--1');
const left = document.querySelector('.player--0');
const right = document.querySelector('.player--1');
const diceEL = document.querySelector('.dice');

//initialising
diceEL.classList.add('hidden');

scoreMain0.textContent = 0;
scoreMain1.textContent = 0;

let gamePlaying = true;
let currentScore = 0;
let scoreMain = [0,0] ; 
let activePlayer = 0


function changeActive(){  //function to change the active element 
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;
    left.classList.toggle('player--active');
    right.classList.toggle('player--active');
}

btnRollDice.addEventListener('click',function(){  //executed when the dice roll button is pressed 
    if (gamePlaying){ 
        const diceNum = Math.floor(Math.random()*6)+1; //create a random number for the dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${diceNum}.png`;     //changes the active dice photo according the the random number generated

        if (diceNum != 1){       
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;  
        } else {
            changeActive();
        }
    }
})

btnHoldCurrent.addEventListener('click',function(){   //executed when the score is held 
    if (gamePlaying){
        scoreMain[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scoreMain[activePlayer]
        if (scoreMain[activePlayer] >= 100){   // the player to get 100 wins
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEL.classList.add('hidden');
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            gamePlaying = false;
        }else {
            changeActive();
        }
    }
})

btnNewGame.addEventListener('click',function () {  //new game button the reset the window
    scoreMain = [0,0];
    currentScore = 0;
    scoreMain0.textContent = 0;
    scoreMain1.textContent = 0;
    scoreCurrent0.textContent = 0;
    scoreCurrent1.textContent = 0;
    if(gamePlaying === false){
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        left.classList.add('player--active');
    }else if (right.classList.contains('player--active')){
        console.log("true true");
        right.classList.toggle('player--active');
        left.classList.toggle('player--active');
    }
    gamePlaying = true;
    activePlayer = 0;
    diceEL.classList.add('hidden');
})