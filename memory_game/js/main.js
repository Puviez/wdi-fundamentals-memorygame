console.log("Up and Running!");

var cards = ["Queen","Queen","King","King"];
var cardsInPlay = [];
var cardOne = cards[0];
var cardTwo = cards[2];
//var cardThree = cards[2];
//var cardFour = cards[3];

cardsInPlay.push(cardOne);
cardsInPlay.push(cardTwo);
console.log("User flipped " + cardsInPlay[0]);
console.log("User flipped " + cardsInPlay[1]);

if (cardsInPlay.length === 2) {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
	} else {
		alert("Sorry try again.");
	}
}