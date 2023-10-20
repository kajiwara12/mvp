console.log("here");
let gameArea = document.querySelector(".gameArea");
let letterArea = document.querySelector(".letterArea");
let scoreBoard = document.querySelector(".scoreBoard");

//generate random whole number 5-7
function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let rndLngth = generateNumber(5, 8);

//create letter buttons----------------------------------
for (let i = 65; i <= 90; i++) {
  let letter = document.createElement("button");
  letter.innerText = String.fromCharCode(i);
  letter.classList.add("letter");
  letter.addEventListener("click", checkLetter);
  letterArea.appendChild(letter);
}
// create 5-7 letter word in game---------------------------------------
function getWord() {
  fetch(`https://random-word-api.herokuapp.com/word?length=${rndLngth}&lang=en`)
    .then((response) => {
      return response.json();
    })
    .then((word) => {
      let newWord = document.createElement("p");
      needDef = word;
      console.log(needDef);
      newWord.innerText = word;
      gameArea.append(newWord);
    });
}

function checkLetter(event) {}

fetch("/player")
  .then((response) => {
    return response.json();
  })
  .then((things) => {
    console.log(things);
    for (let names of things) {
      const p = document.createElement("p");
      p.innerText = names.name;
      scoreBoard.append(p);
    }
  });
getWord();
