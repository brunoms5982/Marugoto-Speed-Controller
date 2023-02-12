let currentAudio;
let speed = 1.0;
let isHidden = false;

const speedDisplay = document.createElement('div');
speedDisplay.style.cssText = `
position: fixed;
background-color: rgba(128, 128, 128, 0.7);
padding: 10px;
border: 1px solid gray;
border-radius: 10px;
cursor: move;
user-select: none;
`;

document.body.appendChild(speedDisplay);

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

speedDisplay.addEventListener("mousedown", dragStart);
speedDisplay.addEventListener("mouseup", dragEnd);
speedDisplay.addEventListener("mouseout", dragEnd);
speedDisplay.addEventListener("mousemove", drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  isDragging = true;
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, speedDisplay);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

document.addEventListener('click', (event) => {
  speed = 1.0;
  if (!event.target.classList.contains('js-audioPlayer')) return;

  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(event.target.dataset.audio);
  currentAudio.playbackRate = 1;
  currentAudio.play();
  event.target.click();
  
  const {left, top} = event.target.getBoundingClientRect();
  speedDisplay.style.left = `${left + event.target.offsetWidth - 200}px`;
  speedDisplay.style.top = `${top + 40 + event.target.offsetHeight / 2 - speedDisplay.offsetHeight / 2}px`;
});

document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('course-pkey-navi__prev') &&
      !event.target.classList.contains('course-pkey-navi__next') &&
      !event.target.classList.contains('course-btn-check') &&
      !event.target.classList.contains('course-btn-next-question  ')) return;

  if (currentAudio){
    currentAudio.pause();
    currentAudio=null;
  }
});

document.addEventListener('keydown', (event) => {
    if (!currentAudio) return;
  
    if (event.code === 'KeyD') {
      speed += 0.25;
      currentAudio.playbackRate = speed;
    } else if (event.code === 'KeyS') {
      speed -= 0.25;
      currentAudio.playbackRate = speed;
  
    } else if (event.code === 'KeyA') {
      currentAudio.pause();
      currentAudio = null;
    }
  
    speedDisplay.textContent = `Speed: ${speed.toFixed(2)}x`;
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyH') {
      if (isHidden) {
        speedDisplay.style.display = 'block';
        isHidden = false;
      } else {
        speedDisplay.style.display = 'none';
        isHidden = true;
      }
    }
  });
