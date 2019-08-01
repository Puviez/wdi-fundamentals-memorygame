// ----- Variables ------

// Cards Array
// - Contains all cards that can be played
var cards = [
{
	rank: "Jack",
	suit: "Hearts",
	cardImage: "images/jack_of_hearts2.png"
},
{
	rank: "Jack",
	suit: "Diamonds",
	cardImage: "images/jack_of_diamonds2.png"
},
{
	rank: "Queen",
	suit: "Hearts",
	cardImage: "images/queen_of_hearts2.png"
},
{
	rank: "Queen",
	suit: "Diamonds",
	cardImage: "images/queen_of_diamonds2.png"
},
{
	rank: "King",
	suit: "Hearts",
	cardImage: "images/king_of_hearts2.png"
},
{
	rank: "King",
	suit: "Diamonds",
	cardImage: "images/king_of_diamonds2.png"
},
{
	rank: "Ace",
	suit: "Hearts",
	cardImage: "images/ace_of_hearts.png"
},
{
	rank: "Ace",
	suit: "Diamonds",
	cardImage: "images/ace_of_diamonds.png"
},
{
	rank: "Joker",
	suit: "Red",
	cardImage: "images/red_joker.png"
},
{
	rank: "Joker",
	suit: "Red",
	cardImage: "images/red_joker.png"
},
{
	rank: "Two",
	suit: "Hearts",
	cardImage: "images/2_of_hearts.png"
},{
	rank: "Two",
	suit: "Diamonds",
	cardImage: "images/2_of_diamonds.png"
}
];

// Subset of Cards
// Contains a number of cards (determined by difficulty) that will be used for each instance of the game
var usedCards = []

// Cards that have been flipped
var cardsInPlay = [];

// Number of Points the player has earned this round
var points = 0;

// The difficulty level selected by the player
var difficulty = 1;

// ----- Functions -----

// Change the difficulty (number of cards)
function setDifficulty(lvl) {
	difficulty = lvl;
}

// Randomise cards
function randomise(arr) {
	var tempArr = []
	var len = arr.length
	while (len > 0) {
		var index = Math.floor(Math.random() * len);
		len --;
		tempArr = arr[len];
		arr[len] = arr[index];
		arr[index] = tempArr;
	}
	return arr;
}

// Unflip all face-up cards 
// Used during the reset process
function unflip(flippedCards) {
	setTimeout(function() {
		for (let i = 0; i < flippedCards.length; i ++) {
			flippedCards[i].setAttribute('src',"images/back.png");
			flippedCards[i].removeAttribute('class');
		}
	},750);
}

// Checks whether the two cards that have bene flipped are a match
function checkForMatch() {
	var clickedCards = document.querySelectorAll('.clicked');
	var resetButton = document.querySelector('#reset');
	var corrector = [];

	if (cardsInPlay[0] === cardsInPlay[1]) {
			console.log("You found a match!");
			cardsInPlay.pop();
			cardsInPlay.pop();
			points += 50;
			// Sets class of correctly paired cards to "correct"
			for (var i = 0; i < clickedCards.length; i ++) {
				corrector.push(clickedCards[i]);
				for (var j = 0; j < corrector.length; j ++) {
					corrector[j].setAttribute('class','correct');
				}
			}
			//
			document.querySelector('#score').innerHTML = "Score: " + points;
			if (document.querySelectorAll('.correct').length === usedCards.length) {
				setTimeout(function() {
					alert(`CONGRATS, YOU WIN! You scored ${points} Points!`);
				}, 500);
				resetButton.style.display = 'block';
				resetButton.addEventListener('click', reset);
				resetButton.addEventListener('click',function() {
					resetButton.style.display = 'none';
				});
			} 
		} else {
			console.log("Sorry try again.");
			cardsInPlay.pop();
			cardsInPlay.pop();
			points -= 10;
			document.querySelector('#score').innerHTML = "Score: " + points;
			unflip(clickedCards);
		}
}

// Flips the card clicked by the user
function flipCard() {
	if (this.getAttribute('class') === 'clicked' || this.getAttribute('class') === 'correct') {
		console.log("Please select a different card to flip!");
	} else {
		var cardId = this.getAttribute('data-id');
		console.log(`User flipped ${usedCards[cardId].rank}`);
		cardsInPlay.push(usedCards[cardId].rank);
		this.setAttribute('src',usedCards[cardId].cardImage);
		this.setAttribute('class','clicked');
		if (cardsInPlay.length === 2) {
			checkForMatch();
		}
	}
	
}

// Creates the game board layout, with varying number of cards depending on difficulty
function createBoard() {
	if (difficulty === 1) {
		usedCards = cards.slice(0,4);
		randomise(usedCards);
	} else if(difficulty === 2) {
		usedCards = cards.slice(0,8);
		randomise(usedCards);
	} else {
		usedCards = cards;
		randomise(usedCards);
	}
	for (var i = 0; i < usedCards.length; i ++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id',i);
		cardElement.addEventListener('click', flipCard);
		document.querySelector('#gameboard').appendChild(cardElement);
	document.querySelector('#back').style.display = 'block';
	backToHome();
	document.querySelector('#score').style.display = 'block';
	document.querySelector('#score').innerHTML = "Score: " + points;
	}
}

// Removes the game board from the display
function hideBoard() {
	var board = document.querySelector('#gameboard');
	while (board.hasChildNodes()) {
		board.removeChild(board.firstChild);
	}
}

// Hides the main menu
function hideMenu() {
	var menu = document.querySelectorAll('.menuoption');
	for (var i = 0; i < menu.length; i++) {
		menu[i].style.display = 'none';
	}
}


// Displays the main menu
function showMenu() {
	var menu = document.querySelectorAll('.menuoption');
	for (var i = 0; i < menu.length; i++) {
		menu[i].style.display = 'inline-block';
	}
}

// Starts a new game
function newGame(){
	var beginGame = document.querySelector('#startgame')
	beginGame.addEventListener('click', createBoard);
	beginGame.addEventListener('click', hideMenu);
}

// Builds a sub-option menu
function showOpt() {
	var difoptmenu = document.querySelectorAll('.difoption');
	for (var i = 0; i < difoptmenu.length - 1; i++) { // -1 to exlude the reset button
		difoptmenu[i].style.display = 'block';
	}
	optControl();
}

// Hides sub-option menu
function hideOpt() {
	var difoptmenu = document.querySelectorAll('.difoption');
	for (var i = 0; i < difoptmenu.length; i++) {
		difoptmenu[i].style.display = 'none';
	}
}


// Returns the user to the main options page
function backToHome() {
	var goback = document.querySelector('#back');
	goback.addEventListener('click', showMenu);
	goback.addEventListener('click', hideOpt);
	goback.addEventListener('click', hideBoard);
	goback.addEventListener('click', function() {
		document.querySelector('#score').innerHTML = "Score: " + points;
		document.querySelector('#score').style.display = 'none';
	});
}

// Allows the user to select the game difficulty
function optControl() {
	var ez = document.querySelector('#easy');
	var med = document.querySelector('#medium');
	var tough = document.querySelector('#hard');

	ez.addEventListener('click', function() {
		setDifficulty(1);
		this.style.backgroundColor = '#0D2C40';
		med.style.backgroundColor = '#00A6B3';
		tough.style.backgroundColor = '#00A6B3';
	});
	med.addEventListener('click', function() {
		setDifficulty(2);
		this.style.backgroundColor = '#0D2C40';
		ez.style.backgroundColor = '#00A6B3';
		tough.style.backgroundColor = '#00A6B3';
	});
	tough.addEventListener('click', function() {
		setDifficulty(3);
		this.style.backgroundColor = '#0D2C40';
		med.style.backgroundColor = '#00A6B3';
		ez.style.backgroundColor = '#00A6B3';
	});
	backToHome();
}

// Functionality for difficulty option
function difSelect() {
	var difficultyOption = document.querySelector('#options');
	difficultyOption.addEventListener('click', hideMenu);
	difficultyOption.addEventListener('click', showOpt);
}

// Functionality for credits option
function credSelect() {
	var creds = document.querySelector('#credits');
	creds.addEventListener('click', hideMenu);
	creds.addEventListener('click', function() {
		document.querySelector('#back').style.display = 'block';
		backToHome();
	});
}

// Runs the Game
function playGame() {
	newGame();
	difSelect();
	credSelect();
}

// Resets the Game
function reset() {
	var checkReset = document.querySelectorAll('.correct');
	if (checkReset.length === usedCards.length) {
		points = 0;
		document.querySelector('#score').innerHTML = "Score: " + points;
		hideBoard();
		createBoard();
	}
}



// ------ Gameplay -----

playGame();