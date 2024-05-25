'use strict';

// ---------- Variables ----------
// ----- DOM Elements -----
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('overlay');
const btnCloseModal = document.getElementById('close-modal');

const player1TotalScoreEl = document.getElementById('player-1-total-score');
const player2TotalScoreEl = document.getElementById('player-2-total-score');

const player1CurrentScoreEl = document.getElementById('player-1-current-score');
const player2CurrentScoreEl = document.getElementById('player-2-current-score');

const diceImageEl = document.getElementById('dice-image');

// ----- Buttons -----
const btnRules = document.getElementById('btn-rules');
const btnNewGame = document.getElementById('new-game');
const btnRoll = document.getElementById('roll');
const btnHold = document.getElementById('hold');

// ----- Regular Variables -----
let player1TotalScore;
let player2TotalScore;
let currentScore = [];

let dice;
let roll;
let activePlayer = 1;

// ---------- Functions ----------
function closeModal() {
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

function openModal() {
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

function newGame() {
  player1TotalScore = 0;
  player2TotalScore = 0;
  currentScore = [0];

  player1TotalScoreEl.textContent = player1TotalScore;
  player1CurrentScoreEl.textContent = currentScore;

  player2TotalScoreEl.textContent = player2TotalScore;
  player2CurrentScoreEl.textContent = currentScore;
}

function switchPlayer() {
  if (activePlayer === 1) {
    activePlayer = 2;
  } else {
    activePlayer = 1;
  }
}

// TODO SOME ISSUE WITH ACTIVE PLAYER TRANSFER AND CURRENT SCORE NOT STOPPING RIGHT BEFORE 21 IS EXCEEDED

function rollDice() {
  roll = Math.trunc(Math.random() * 6) + 1;
  diceImageEl.src = `assets/dice-${roll}-svgrepo-com.svg`;

  if (
    currentScore.reduce((accumulator, current) => accumulator + current, 0) <=
    21
  ) {
    currentScore.push(roll);

    if (activePlayer === 1) {
      (player1CurrentScoreEl.textContent = currentScore.reduce(
        (accumulator, current) => {
          return accumulator + current;
        }
      )),
        0;
    } else if (activePlayer === 2) {
      (player2CurrentScoreEl.textContent = currentScore.reduce(
        (accumulator, current) => {
          return accumulator + current;
        }
      )),
        0;
    }
  } else if (
    currentScore.reduce((accumulator, current) => accumulator + current, 0) > 21
  ) {
    currentScore = [0];
    switchPlayer();
  }
}

// ---------- Event Listeners ----------

// Closing the modal
btnCloseModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (event) {
  if (!modal.classList.contains('hidden')) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
});

// Reopening the modal when clicking "Rules" button
btnRules.addEventListener('click', openModal);

// Clicking the "new game" button
btnNewGame.addEventListener('click', newGame);

// Rolling dice
btnRoll.addEventListener('click', rollDice);
