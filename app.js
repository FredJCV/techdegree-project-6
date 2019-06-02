let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let btnReset = document.getElementsByClassName("btn__reset")[0];
let missed = 0;

let phrases = [
    'A Chip on Your Shoulder',
    'A Dime a Dozen',
    'A Piece of Cake',
    'Barking Up The Wrong Tree',
    'Curiosity Killed The Cat'
]



const getRandomPhraseAsArray = arr => {
    let randomPhrase = arr[Math.floor(Math.random()*arr.length)];
    return randomPhrase.split("");
}



const hideOverlay = () => document.getElementById("overlay").style.display = 'none';

btnReset.addEventListener("click", hideOverlay);



//loops through the length of the phrase and adds letters and spaces to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        let phraseUl = document.querySelector("#phrase ul");
        let newLi = document.createElement('li');
        let liContent = document.createTextNode(arr[i]);
        newLi.appendChild(liContent);
        phraseUl.appendChild(newLi);
        if (arr[i] !== " ") {
            newLi.classList.add("letter");
        } else {
            newLi.classList.add("space");
        }
    }
}



let phraseArray = getRandomPhraseAsArray(phrases);

addPhraseToDisplay(phraseArray);



//loops through the length of letters in the phrase and for each correct letter adds the class 'show' and returns the letter
const checkLetter = btn => {
    let letterClass = document.getElementsByClassName('letter');
    let letterFound = null;
    for (let i = 0; i < letterClass.length; i++) {
        if (letterClass[i].innerHTML.toLowerCase() === btn) {
            letterClass[i].classList.add("show");
            letterFound = letterClass[i].innerHTML;
        } 
    }
    return letterFound;
}



//responds to clicks on button tags and disables them
//if guess is wrong increases missed count and removes a heart, then checks if the player has won/lost the game
qwerty.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        e.target.classList.add("chosen");
        e.target.setAttribute('disabled', 'true');
        let letterFound = checkLetter(e.target.innerHTML);
        if (letterFound === null) {
            missed += 1;
            document.querySelector('#scoreboard ol').removeChild(document.querySelector('.tries:last-child'));
        }
    }
    checkWin();
});



//if number of elements with class of 'letter' equal number elements with class of 'show' the player wins
//if player wins, adds class of 'win' and display of flex to the overlay, changes overlay text, and adds reset button
//if missed counter reaches 5 the player loses
//if player loses, adds class of 'lose' and display of flex to the overlay, changes overlay text, and adds reset button
const checkWin = () => {
    let letterClass = document.getElementsByClassName('letter').length;
    let showClass = document.getElementsByClassName('show').length; 
    let overlay = document.getElementById('overlay');
    let title = document.getElementsByClassName('title')[0];
    if (letterClass === showClass) {
        overlay.classList.remove("lose");
        overlay.classList.add("win");
        overlay.style.display = 'flex';
        title.innerHTML = 'YOU WIN!';
        createReset();
    } else if (missed >= 5) {
        overlay.classList.remove("win");
        overlay.classList.add("lose");
        overlay.style.display = 'flex';
        title.innerHTML = 'YOU LOST!';
        createReset();
    }
}



//resets hearts back to 5
const resetHearts = () => {
    let scoreboard = document.querySelector('#scoreboard ol');
    let heartHTML = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';
    for (let i=0; scoreboard.childElementCount < 5; i++) {
        scoreboard.innerHTML += heartHTML;
    }
}

//resets keyboard with no classes and active buttons
const resetQwerty = () => {
    let chosenButtons = document.getElementsByClassName('chosen');
    for (let i = chosenButtons.length - 1; chosenButtons.length > 0; i--) {
        chosenButtons[i].removeAttribute("disabled");
        chosenButtons[i].className = "";
    }
}

//removes the last phrase from the display
const removeOldPhrase = () => {
    let oldPhrase = document.querySelector("#phrase ul");
    for (let i = oldPhrase.childElementCount - 1; oldPhrase.childElementCount > 0; i--) {
        oldPhrase.removeChild(oldPhrase.lastChild);
    }
}

//changes btnReset text
//resets missed counter, hearts, keyboard, and phrase
//adds new random phrase
const createReset = () => {
    btnReset.innerHTML = 'Reset';
    missed = 0;
    resetHearts();
    resetQwerty();
    removeOldPhrase();
    let newPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhraseArray);
}