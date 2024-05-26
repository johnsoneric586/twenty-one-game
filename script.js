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

const containerPlayer1 = document.getElementById('player1-container');
const containerPlayer2 = document.getElementById('player2-container');

const diceImageEl = document.getElementById('dice-image');

// ----- Buttons -----
const btnRules = document.getElementById('btn-rules');
const btnNewGame = document.getElementById('new-game');
const btnRoll = document.getElementById('roll');
const btnHold = document.getElementById('hold');

// ----- Regular Variables -----
let player1TotalScore = 0;
let player2TotalScore = 0;
let currentScore = [];

let dice;
let roll;
let activePlayer = 1;
let holdValue;

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
  player1TotalScore = [0];
  player2TotalScore = [0];
  currentScore = [0];

  player1TotalScoreEl.textContent = player1TotalScore.reduce(
    (accumulator, current) => {
      return accumulator + current;
    },
    0
  );

  player1CurrentScoreEl.textContent = currentScore;

  player2TotalScoreEl.textContent = player2TotalScore.reduce(
    (accumulator, current) => {
      return accumulator + current;
    },
    0
  );

  player2CurrentScoreEl.textContent = currentScore;
}

function switchPlayer() {
  currentScore = [0];

  if (activePlayer === 1) {
    activePlayer = 2;
    containerPlayer1.classList.remove('active-player');
    containerPlayer2.classList.add('active-player');
    player1CurrentScoreEl.textContent = '0';
  } else {
    activePlayer = 1;
    containerPlayer2.classList.remove('active-player');
    containerPlayer1.classList.add('active-player');
    player2CurrentScoreEl.textContent = '0';
  }
}

function checkCurrentScore() {
  if (
    currentScore.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0) > 21
  ) {
    currentScore = [0];
    switchPlayer();
  }
}

function rollDice() {
  roll = Math.trunc(Math.random() * 6) + 1;
  diceImageEl.src = `assets/dice-${roll}-svgrepo-com.svg`;

  // Add the roll to the currentScore
  currentScore.push(roll);

  // Check the current score before updating the DOM
  checkCurrentScore();

  // If current score is still less than 21, update the DOM

  if (activePlayer === 1) {
    player1CurrentScoreEl.textContent = currentScore.reduce(
      (accumulator, current) => {
        return accumulator + current;
      },
      0
    );
  } else {
    player2CurrentScoreEl.textContent = currentScore.reduce(
      (accumulator, current) => {
        return accumulator + current;
      },
      0
    );
  }
}

function hold() {
  if (activePlayer === 1) {
    player1TotalScore += currentScore.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);

    player1TotalScoreEl.textContent = player1TotalScore;
  } else if (activePlayer === 2) {
    player2TotalScore += currentScore.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);

    player2TotalScoreEl.textContent = player2TotalScore;
  }

  switchPlayer();
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

// Clicking "hold"
btnHold.addEventListener('click', hold);
