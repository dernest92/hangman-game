// List of possible words
const words = ["JAZZ", "PEANUTS", "TRANSYLVANIA", "AMPHIBIAN"];
let randomWord;

// Track right and wrong guesses
const correctLetters = [];
const wrongLetters = [];

// Function that updates the display characters
let displayCharacters = [];
function updateDisplayChars() {
  displayCharacters = [];
  for (let i = 0; i < randomWord.length; i++) {
    if (correctLetters.includes(randomWord[i])) {
      displayCharacters.push(randomWord[i]);
    } else {
      displayCharacters.push("_");
    }
  }
  console.log(displayCharacters);
}

// Function that writes display characters to the board
const displayBoard = document.querySelector("#wordboard");
function updateDisplayBoard() {
  displayBoard.innerHTML = "";
  displayCharacters.forEach((character) => {
    displayBoard.innerHTML =
      displayBoard.innerHTML + '<span id="space">' + character + "</span>";
  });
}

// Listen to button clicks
const buttons = document.querySelectorAll(".letter-btn");
buttons.forEach((btn) => btn.addEventListener("click", getUserInput));

// Function that updates a button
function updateButton(letter, correct) {
  const button = findButtonByLetter(letter);
  button.disabled = true;
  if (correct) {
    button.classList.add("btn-correct");
  } else {
    button.classList.add("btn-wrong");
  }
}

// Function that finds a button by its letter
function findButtonByLetter(letter) {
  let selectedButton;
  buttons.forEach((btn) => {
    if (btn.textContent === letter) {
      selectedButton = btn;
    }
  });
  return selectedButton;
}

// Function to check win or loose
function checkWinLoose() {
  if (!displayCharacters.includes("_")) {
    console.log("You win!!");
  }

  if (wrongLetters.length >= 9) {
    console.log("You loose");
  }
}

// Function to update the image
const hangmanImage = document.querySelector("#hangman-image");
function updateImage() {
  hangmanImage.src = `/images/hangman${wrongLetters.length}.png`;
}

// Handle a button click
function getUserInput() {
  const guessLetter = this.textContent;
  if (randomWord.includes(guessLetter)) {
    updateButton(guessLetter, true);
    correctLetters.push(guessLetter);
  } else {
    updateButton(guessLetter, false);
    wrongLetters.push(guessLetter);
  }
  updateDisplayChars();
  updateDisplayBoard();
  updateImage();
  checkWinLoose();
}

function init() {
  // Pick a random word
  const random = Math.floor(Math.random() * words.length);
  randomWord = words[random];
  console.log(randomWord);

  // Update the board for the first time
  updateDisplayChars();
  updateDisplayBoard();
}
init();
