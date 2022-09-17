const startBtnEl = document.querySelector("[data-start]");
const stopBtnEl = document.querySelector("[data-stop]");
let intervalID = null;

startBtnEl.addEventListener("click", colorSwitcherStart);
stopBtnEl.addEventListener("click", colorSwitcherStop);

function colorSwitcherStart () {
intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  startBtnEl.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function colorSwitcherStop () {
    clearInterval(intervalID);
    startBtnEl.disabled = false;
    }