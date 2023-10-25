let gameArea = document.querySelector(".gameArea");
let letterArea = document.querySelector(".letterArea");
let scoreBoard = document.querySelector(".scoreBoard");
let wordArea = document.querySelector("#wordArea");
let guessCounter = document.querySelector("#header");
let scoreDisplay = document.querySelector("#scoreDisplay");
let form = document.querySelector(".name-form");
// let createUser = document.querySelector(".login");
let lossScore = document.querySelector("#lossScore");
let lastWord = document.querySelector("#lastWord");
let globalWord = "";
let guessWord = "";
let attempts = 0;
let rndLngth;
let score = 0;
startPage();
//generate random whole number 5-7
function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//create letter buttons ----------------------------------
function createButtons() {
  letterArea.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    let letter = document.createElement("button");
    letter.innerText = String.fromCharCode(i);
    letter.classList.add("letterButton");
    letter.addEventListener("click", checkLetter);
    letterArea.appendChild(letter);
  }
}

//create blank spots based on word length && create 5-7 letter word in game ------------------------------------------------------------
function getWord() {
  fetch(`https://random-word-api.herokuapp.com/word?length=${rndLngth}&lang=en`)
    .then((response) => {
      return response.json();
    })
    .then((word) => {
      let wordWord = word[0];
      let newWord = document.createElement("p");
      newWord.innerText = wordWord.toUpperCase();
      // gameArea.append(newWord);
      console.log(wordWord);
      globalWord = wordWord.toUpperCase();

      for (let i = 0; i < rndLngth; i++) {
        let letter = document.createElement("p");
        letter.classList.add("spot");
        letter.id = wordWord[i].toUpperCase();
        letter.innerText = "_";
        wordArea.append(letter);
      }
    });
}

function checkLetter(event) {
  let letter = event.target.innerText;
  let letterInWord = false;
  for (spots of document.querySelectorAll(".spot")) {
    if (spots.id === letter) {
      event.target.classList.add("guessedLetterButton");
      spots.classList.add("guessedSpot");
      spots.innerText = letter;
      guessWord += letter;
      letterInWord = true;

      guessDisplay();
      displayScore();
      checkGame();
    }
  }
  if (!letterInWord) {
    attempts++;
    drawChar(attempts);

    event.target.classList.add("guessedLetterButton");
    guessDisplay();
    displayScore();
    checkGame();
  }
}
//create stick stand--------------------------------------------
function createStand() {
  const canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  //stand
  context.beginPath();
  context.moveTo(20, 10);
  context.lineTo(20, 180);
  context.strokeStyle = "black";
  context.stroke();
  context.beginPath();
  context.moveTo(20, 10);
  context.lineTo(100, 10);
  context.strokeStyle = "black";
  context.stroke();
  context.beginPath();
  context.moveTo(0, 180);
  context.lineTo(40, 180);
  context.strokeStyle = "black";
  context.stroke();
}
//create stick figure-------------------------------------------
function drawChar(number) {
  switch (number) {
    case 1:
      //HEAD
      context.beginPath();
      context.fillStyle = "black";
      context.arc(100, 25, 15, 0, Math.PI * 2, true);
      context.fill();
      break;
    case 2:
      //body
      context.beginPath();
      context.moveTo(100, 20);
      context.lineTo(100, 90);
      context.strokeStyle = "navy";
      context.stroke();
      break;
    case 3:
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(100, 50);
      context.lineTo(75, 65);
      context.stroke();
      break;
    case 4:
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(100, 50);
      context.lineTo(125, 65);
      context.stroke();
      break;
    case 5:
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(100, 90);
      context.lineTo(75, 140);
      context.stroke();
      break;
    case 6:
      context.beginPath();
      context.strokeStyle = "black";
      context.moveTo(100, 90);
      context.lineTo(125, 140);
      context.stroke();
      break;
  }
}
//empty canvas -----------------------------------------------
function clearCanvas() {
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, 200, 200);
}
//life counter display
function guessDisplay() {
  guessCounter.innerText = `Wrong Guesses: ${attempts}/6 `;
}
//score display      ----------------------------------------------------
function displayScore() {
  scoreDisplay.innerText = `Current Score: ${score}`;
}
//check if game won/game over ---------------------------------
function checkGame() {
  //win----------------------
  if (guessWord.length === globalWord.length) {
    if (globalWord.length === 5) {
      score++;
    } else if (globalWord.length === 6) {
      score += 2;
    } else {
      score += 3;
    }
    lastWord.innerText = `Last word: ${globalWord}`;
    globalWord = "";
    guessWord = "";
    attempts = 0;
    for (guessedLetters of document.querySelectorAll(".spot")) {
      wordArea.removeChild(guessedLetters);
    }
    for (letterButtons of document.querySelectorAll(".letterButton")) {
      letterArea.removeChild(letterButtons);
    }
    for (gussedLetterButtons of document.querySelectorAll(
      ".guessedLetterButton"
    )) {
      letterArea.removeChild(gussedLetterButtons);
    }
    displayScore();

    startPage();
  }
  //loss----------------------------------------------------------------------
  if (attempts === 6) {
    globalWord = "";
    guessWord = "";
    //popup for when they lose
    document.getElementById("popup").style.display = "block";
    lossScore.innerText = `You lose! Score: ${score}`;
    for (guessedLetters of document.querySelectorAll(".spot")) {
      wordArea.removeChild(guessedLetters);
    }
    for (guessedLetters of document.querySelectorAll(".guessedSpot")) {
      wordArea.removeChild(guessedLetters);
    }
    for (letterButtons of document.querySelectorAll(".letterButton")) {
      letterArea.removeChild(letterButtons);
    }
    for (gussedLetterButtons of document.querySelectorAll(
      ".guessedLetterButton"
    )) {
      letterArea.removeChild(gussedLetterButtons);
    }
  }
}

//LeaderBoard functionality ------------------------------------------------
function updateLeaderBoard() {
  fetch("/player")
    .then((response) => {
      return response.json();
    })
    .then((players) => {
      for (names of document.querySelectorAll(".name")) {
        scoreBoard.removeChild(names);
      }
      for (let names of players) {
        const p = document.createElement("p");
        p.classList.add("name");
        p.innerText = `${names.name.toUpperCase()}: ${names.score} points`;
        scoreBoard.append(p);
      }
    });
}

//Popup window for losing game and submitting score with name -----------------------------------------------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);
  let name = formData.get("name");

  fetch("player", {
    method: "POST",
    body: JSON.stringify({ name: name, score: score }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((name) => {
      score = 0;
      startPage();
      document.getElementById("popup").style.display = "none";
    });
});
function updateLeaderBoard() {
  fetch("/player")
    .then((response) => {
      return response.json();
    })
    .then((players) => {
      for (names of document.querySelectorAll(".name")) {
        scoreBoard.removeChild(names);
      }
      for (let names of players) {
        const p = document.createElement("p");
        p.classList.add("name");
        let shortName = names.name.substring(0, 4).toUpperCase();
        p.innerText = `${shortName}: ${names.score} points`;
        scoreBoard.append(p);
      }
    });
}

function startPage() {
  attempts = 0;
  rndLngth = generateNumber(5, 8);
  getWord();
  clearCanvas();
  createStand();
  createButtons();
  drawChar();
  guessDisplay();
  updateLeaderBoard();
}
