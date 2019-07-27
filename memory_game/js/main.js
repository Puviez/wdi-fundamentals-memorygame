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
}
];

var cardsInPlay = [];
var usedCards = []
var points = 0;
var difficulty = 1;

function setDifficulty(lvl) {
	difficulty = lvl;
}

function unflip(flippedCards) {
	setTimeout(function() {
		for (let i = 0; i < flippedCards.length; i ++) {
			flippedCards[i].setAttribute('src',"images/back.png");
			flippedCards[i].removeAttribute('class');
		}
	},1500);
}

function checkForMatch() {
	var clickedCards = document.querySelectorAll('.clicked');
	if (cardsInPlay[0] === cardsInPlay[1]) {
			console.log("You found a match!");
			cardsInPlay.pop();
			cardsInPlay.pop();
			points += 50;
			document.querySelector('#score').innerHTML = "Score: " + points;
			if (clickedCards.length === usedCards.length) {
				console.log("CONGRATS, YOU WIN!");
				console.log(`You scored ${points} Points!`);
				// RESET FUNCTION
				points = 0;
				document.querySelector('#score').innerHTML = "Score: " + points;
				unflip(clickedCards);
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

function flipCard() {
	if (this.getAttribute('class') === 'clicked') {
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

function createBoard() {
	if (difficulty === 1) {
		usedCards = cards.slice(0,4);
	} else if(difficulty === 2) {
		usedCards = cards.slice(0,8);
	} else {
		usedCards = cards;
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
	}
}

function hideBoard() {
	var board = document.querySelector('#gameboard');
	while (board.hasChildNodes()) {
		board.removeChild(board.firstChild);
	}
}

function hideMenu() {
	var menu = document.querySelectorAll('.menuoption');
	for (var i = 0; i < menu.length; i++) {
		menu[i].style.display = 'none';
	}
}

function showMenu() {
	var menu = document.querySelectorAll('.menuoption');
	for (var i = 0; i < menu.length; i++) {
		menu[i].style.display = 'inline-block';
	}
}

function newGame(){
	var beginGame = document.querySelector('#startgame')
	beginGame.addEventListener('click', createBoard);
	beginGame.addEventListener('click', hideMenu);
}

function showOpt() {
	var difoptmenu = document.querySelectorAll('.difoption');
	for (var i = 0; i < difoptmenu.length; i++) {
		difoptmenu[i].style.display = 'block';
	}
	optControl();
}

function hideOpt() {
	var difoptmenu = document.querySelectorAll('.difoption');
	for (var i = 0; i < difoptmenu.length; i++) {
		difoptmenu[i].style.display = 'none';
	}
}

function backToHome() {
	var goback = document.querySelector('#back');
	goback.addEventListener('click', showMenu);
	goback.addEventListener('click', hideOpt);
	goback.addEventListener('click', hideBoard);
	goback.addEventListener('click', function() {
		document.querySelector('#score').style.display = 'none';
	});
}

function optControl() {
	document.querySelector('#easy').addEventListener('click', function() {
		setDifficulty(1);
	});
	document.querySelector('#medium').addEventListener('click', function() {
		setDifficulty(2);
	});
	document.querySelector('#hard').addEventListener('click', function() {
		setDifficulty(3);
	});
	backToHome();
}

function difSelect() {
	var difficultyOption = document.querySelector('#options');
	difficultyOption.addEventListener('click', hideMenu);
	difficultyOption.addEventListener('click', showOpt);
}

function credSelect() {
	var creds = document.querySelector('#credits');
	creds.addEventListener('click', hideMenu);
	creds.addEventListener('click', function() {
		document.querySelector('#back').style.display = 'block';
		backToHome();
	});
}

function playGame() {
	newGame();
	difSelect();
	credSelect();
}

playGame();