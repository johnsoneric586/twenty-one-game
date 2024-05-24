'use strict';

// ---------- Variables ----------

// ----- DOM Elements -----
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('overlay');
const btnCloseModal = document.getElementById('close-modal');

// ---------- Functions ----------

function closeModal() {
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

// ---------- Event Listeners ----------

btnCloseModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (event) {
  if (!modal.classList.contains('hidden')) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
});
