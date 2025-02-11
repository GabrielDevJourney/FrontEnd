const deck = document.querySelector(".deckContainer");
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
const faces = ["J", "Q", "K"];
const suits = ["hearts", "diamonds", "clubs", "spades"];

//create cards of hight ranks
function createFaceCard(face, suit) {
	return `
        <div class="card" data-value="${face}" data-suit="${suit}">
            <div class="cardInfo">
                <div class="info">
                    <div class="infoNumber">${face}</div>
                    <div class="infoSymbol"><img src="./assets/${suit}.png"></div>
                </div>
            </div>
            <div class="imageContainer">
                <img src="./assets/${face}_${suit}.png">
                <img src="./assets/${face}_${suit}.png">
            </div>
            <div class="cardInfoFliped">
                <div class="info">
                    <div class="infoNumber">${face}</div>
                    <div class="infoSymbol"><img src="./assets/${suit}.png"></div>
                </div>
            </div>
        </div>
    `;
}

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
                <div class="infoSymbol"><img src="./assets/${suit}.png"></div>
                <div class="infoNumber">${value}</div>
                </div>
            </div>
        </div>
    `;
}

function generateNumberCards() {
	values.forEach((value) => {
		suits.forEach((suit) => {
			deck.innerHTML += createCard(value, suit);
		});
	});
}

function generateFaceCards() {
	faces.forEach((face) => {
		suits.forEach((suit) => {
			deck.innerHTML += createFaceCard(face, suit);
		});
	});
}

function createDeck() {
	deck.innerHTML = "";
	generateNumberCards();
	generateFaceCards();
}

createDeck();
