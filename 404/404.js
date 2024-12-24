// Constants
const GRADIENT_ANGLE = 150;
const COLOR_START = "#000";
const COLOR_END = "#FF0000";
const INITIAL_PERCENTAGE = 50;
const MOUSEMOVE_FACTOR = 40;
const MIN_PERCENTAGE = 30;
const MAX_PERCENTAGE = 70;
const PAGE_LOAD_DELAY = 3500;
const ANIMATION_DURATION = 1600;
const REDIRECT_URL = "/?fade=true";

// Function to change the gradient
function changeGradient(x) {
  const bgWebKit = `linear-gradient(${GRADIENT_ANGLE}deg, ${COLOR_START} ${x}%, ${COLOR_END} ${x + 10}%)`;
  const bgMoz = `linear-gradient(${GRADIENT_ANGLE}deg, ${COLOR_START} ${x}%, ${COLOR_END} ${x + 10}%)`;
  document.body.style.backgroundImage = bgWebKit;
  document.body.style.backgroundImage = bgMoz;
}

// Changes the gradient on page load
document.addEventListener("DOMContentLoaded", function () {
  changeGradient(INITIAL_PERCENTAGE);
});

// Changes the gradient with mouse movement
document.body.addEventListener("mousemove", function (e) {
    let x = ((e.clientX / window.innerWidth) - 0.5) * MOUSEMOVE_FACTOR; // Mouse position on the X axis
    x = 50 - x; // Adjusts the center of the gradient
    x = Math.min(Math.max(x, MIN_PERCENTAGE), MAX_PERCENTAGE); // Limits x to a range of 30 to 70
    changeGradient(x);
});

// Fade effect duration
const FADE_DURATION = 1000;

// Function to start fade-out
function startFadeOut() {
  document.body.style.transition = `opacity ${FADE_DURATION}ms`;
  document.body.style.opacity = 0;
}

// Modify the window loading function
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Adjust the fade duration based on the query parameter
  const fadeDuration = urlParams.get('fade') === 'true' ? 2000 : 1000; // Long fade for 'fade=true', default for 'fade=false'

  setTimeout(function () {
    const img = document.querySelector("img");
    img.classList.add("fly-away");

    // Start fading before redirection
    setTimeout(function () {
      document.body.style.transition = `opacity ${fadeDuration}ms`;
      startFadeOut();

      // Wait for the fade to complete before redirecting
      setTimeout(function () {
        window.location.href = REDIRECT_URL; // Redirigir con fade=true
      }, fadeDuration);
    }, ANIMATION_DURATION);
  }, PAGE_LOAD_DELAY);
};
