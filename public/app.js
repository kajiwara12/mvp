console.log("here");
let gameArea = document.querySelector(".gameArea");
let letterArea = document.querySelector(".letterArea");
//create letter buttons----------------------------------
for (let i = 65; i <= 90; i++) {
  let letter = document.createElement("button");
  letter.innerText = String.fromCharCode(i);
  letter.classList.add("letter");
  letter.addEventListener("click", checkLetter);
  letterArea.appendChild(letter);
}
//create word in game---------------------------------------

fetch("https://random-word-api.herokuapp.com/word?length=5")
  .then((response) => {
    return response.json();
  })
  .then((word) => {
    let newWord = document.createElement("p");
    newWord.innerText = word;
    gameArea.append(newWord);
  });

function checkLetter(event) {}
fetch("/things")
  .then((response) => {
    return response.json();
  })
  .then((things) => {
    console.log(things);
    for (let thing of things) {
      const p = document.createElement("p");
      p.innerText = thing.num;
      //document.body.append(p);
    }
  });
