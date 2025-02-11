const deck = document.querySelector(".deck-container");
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
const suits = ["hearts", "diamonds", "clubs", "spades"];

function createCard(value, suit) {
	return `
        <div class="card" data-value="${value}" data-suit="${suit}">
            <div class="cardInfo">
                <div class="info">
                    <div class="infoNumber">${value}</div>
                    <div class="infoSymbol"><img src="./assets/${suit}.png"></div>
                </div>
            </div>
            <div class="symbolsContainer">
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
            </div>
            <div class="symbolsContainer">
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
            </div>
            <div class="symbolsContainer">
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
                <div class="finalSymbol"><img src="./assets/${suit}.png"></div>
            </div>
            <div class="cardInfoFliped">
                <div class="info">
                    <div class="infoNumber">${value}</div>
                    <div class="infoSymbol"><img src="./assets/${suit}.png"></div>
                </div>
            </div>
        </div>
    `;
}

values.forEach((value) => {
	suits.forEach((suit) => {
		deck.innerHTML += createCard(value, suit);
	});
});
