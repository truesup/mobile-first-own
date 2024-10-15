// skills
const skillsData = [
  {
    top: document.querySelector('.skills-hard-top'),
    btn: document.getElementById('skills-hard-arrow'),
    divider: document.querySelector('.skills-hard-divider'),
    list: document.querySelector('.skills-hard-list'),
  },
  {
    top: document.querySelector('.skills-soft-top'),
    btn: document.getElementById('skills-soft-arrow'),
    divider: document.querySelector('.skills-soft-divider'),
    list: document.querySelector('.skills-soft-list'),
  },
];

const conditions = [
  { query: '(max-width: 320px', hardHeight: '225px', softHeight: '203px' },
  { query: '(max-width: 348px', hardHeight: '225px', softHeight: '180px' },
  { query: '(max-width: 456px', hardHeight: '225px', softHeight: '158px' },
];

function closeAllSkills() {
  skillsData.forEach((skill) => {
    skill.btn.style.transform = 'rotate(0deg)';
    skill.divider.style.height = '2px';
    skill.divider.style.paddingBlock = '0px';
    skill.list.classList.add('visually-hidden');
  });
}

function toggleSkills(skill, height) {
  const { btn, divider, list } = skill;
  const isOpen = btn.style.transform === 'rotate(90deg)';

  closeAllSkills();

  if (!isOpen) {
    btn.style.transform = 'rotate(90deg)';
    divider.style.height = height;
    divider.style.paddingBlock = '8px';
    list.classList.remove('visually-hidden');
  }
}
function applyCondition(condition) {
  skillsData[0].top.onclick = () =>
    toggleSkills(skillsData[0], condition.hardHeight);
  skillsData[1].top.onclick = () =>
    toggleSkills(skillsData[1], condition.softHeight);
}

function setUpMediaQueries() {
  conditions.forEach((condition) => {
    const mediaQuery = window.matchMedia(condition.query);

    const handleChange = () => {
      if (mediaQuery.matches) {
        closeAllSkills();
        applyCondition(condition);
      }
    };

    handleChange();

    mediaQuery.addEventListener('change', handleChange);
  });
}

window.addEventListener('load', setUpMediaQueries);

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
