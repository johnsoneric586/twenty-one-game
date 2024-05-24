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
let player1CurrentScore = [];
let player2CurrentScore = [];

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
  player1CurrentScore = [0];
  player2CurrentScore = [0];

  player1TotalScoreEl.textContent = player1TotalScore;
  player1CurrentScoreEl.textContent = player1CurrentScore;

  player2TotalScoreEl.textContent = player2TotalScore;
  player2CurrentScoreEl.textContent = player2CurrentScore;
}

function rollDice() {
  roll = Math.trunc(Math.random() * 6) + 1;
  diceImageEl.src = `assets/dice-${roll}-svgrepo-com.svg`;

  player1CurrentScore.push(roll);
  player1CurrentScoreEl.textContent = player1CurrentScore.reduce(function (
    acc,
    curr
  ) {
    return acc + curr;
  },
  0);

  //   TODO NEED TO FIGURE OUT HOW TO USE THE "ACTIVE PLAYER" SO THE PLAYER ISN'T FIXED
  //   WATCH JONAS VIDEO
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
