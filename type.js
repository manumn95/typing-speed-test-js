const sentences = `The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!`;

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");

let seconds = 30;
let timer;

timerElement.textContent = `00:${seconds}`;

// Start typing
function startTyping() {
  inputElement.disabled = false;
  inputElement.value = "";
  inputElement.focus();
  sentenceElement.textContent = sentences;
  startButton.disabled = true;
  resultElement.style.display = "none";

  timer = setInterval(() => {
    seconds--;
    timerElement.textContent = `00:${seconds < 10 ? "0" + seconds : seconds}`;
    if (seconds <= 0) {
      endType();
    }
  }, 1000);
}

// Typing End
function endType() {
  clearInterval(timer);
  inputElement.disabled = true;
  startButton.disabled = true;

  const userInput = inputElement.value.trim();
  console.log(userInput);
  const originalChars = sentences.trim().split("");
  console.log(originalChars);
  const typedChars = userInput.split("");
  console.log(typedChars);
  let correctCharCount = 0;

  for (let i = 0; i < typedChars.length; i++) {
    if (typedChars[i] === originalChars[i]) {
      correctCharCount++;
    }
  }

  const totalChars = sentences.length;
  const correctWords = userInput
    .split(" ")
    .filter((word, i) => word === sentences.split(" ")[i]).length;
 
  const wpm = Math.round((correctWords / 30) * 60);
  const accuracy = Math.round((correctCharCount / totalChars) * 100);

  speedElement.textContent = `${wpm} WPM`;
  accuracyElement.textContent = `${accuracy}`;
  resultElement.style.display = "block";
}

// Retry Test
function retakeTest() {
  clearInterval(timer);
  seconds = 30;
  timerElement.textContent = `00:${seconds}`;
  inputElement.disabled = true;
  inputElement.value = "";
  sentenceElement.textContent = "";
  resultElement.style.display = "none";
  startButton.disabled = false;
}

startButton.addEventListener("click", startTyping);
retryButton.addEventListener("click", retakeTest);
