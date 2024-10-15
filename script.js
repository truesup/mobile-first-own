// skills
const sections = [
  {
    top: document.querySelector('.skills-hard-top'),
    divider: document.querySelector('.skills-hard-divider'),
    button: document.querySelector('.skills-hard-button'),
  },
  {
    top: document.querySelector('.skills-soft-top'),
    divider: document.querySelector('.skills-soft-divider'),
    button: document.querySelector('.skills-soft-button'),
  },
];

function toggleSection(top, divider, button) {
  const isOpen = divider.classList.contains('open');

  if (isOpen) {
    button.style.transform = 'rotate(0deg)';
    divider.style.height = '2px';
    divider.classList.remove('open');
  } else {
    button.style.transform = 'rotate(90deg)';
    divider.style.height = `${divider.scrollHeight}px`;
    divider.classList.add('open');
  }
}

sections.forEach(({ top, divider, button }) => {
  top.addEventListener('click', () => toggleSection(top, divider, button));
});

// slider
const slides = document.querySelectorAll('.slides img');
let slideIndex = 0;
let intervalId = null;

initializeSlider();
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add('displaySlide');
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove('displaySlide');
  });
  slides[slideIndex].classList.add('displaySlide');
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// modal window
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalGif = document.getElementById('modal-gif');
const modalUrl = document.getElementById('modal-url');

function openModal(content, gifUrl, githubUrl) {
  modal.style.display = 'block';
  modalText.innerText = content;
  modalGif.src = gifUrl;
  modalUrl.href = githubUrl;
}

function closeModal() {
  modal.style.display = 'none';
}

// downloaded animation
function showDownloadedText(event) {
  const link = event.currentTarget;
  const textElement = link.querySelector('.resume-text');
  const iconElement = link.querySelector('.resume-icon');

  if (textElement.innerHTML === 'Downloading...') {
    return;
  }

  const originalText = textElement.innerHTML;

  textElement.innerHTML = 'Downloading...';
  link.style.justifyContent = 'center';
  iconElement.classList.add('visually-hidden');

  link.style.pointerEvents = 'none';

  setTimeout(() => {
    textElement.innerHTML = originalText;
    link.style.justifyContent = 'space-between';
    iconElement.classList.remove('visually-hidden');
    link.style.pointerEvents = 'auto';
  }, 3000);
}

document.querySelectorAll('.resume-en, .resume-ru').forEach((link) => {
  link.addEventListener('click', showDownloadedText);
});
