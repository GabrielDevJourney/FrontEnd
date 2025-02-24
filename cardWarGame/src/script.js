class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}

	createHTML() {
		if (["J", "Q", "K"].includes(this.value)) {
			return this.createFaceCard();
		}
		return this.createNumberCard();
	}

	createFaceCard() {
		return `
            <div class="card" data-value="${this.value}" data-suit="${this.suit}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${this.value}</div>
                        <div class="infoSymbol"><img src="./assets/${this.suit}.png"></div>
                    </div>
                </div>
                <div class="imageContainer">
                    <img src="./assets/${this.value}_${this.suit}.png">
                    <img src="./assets/${this.value}_${this.suit}.png">
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoNumber">${this.value}</div>
                        <div class="infoSymbol"><img src="./assets/${this.suit}.png"></div>
                    </div>
                </div>
            </div>
        `;
	}

	createNumberCard() {
		return `
            <div class="card" data-value="${this.value}" data-suit="${this.suit}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${this.value}</div>
                        <div class="infoSymbol"><img src="./assets/${this.suit}.png"></div>
                    </div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${this.suit}.png"></div>
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoSymbol"><img src="./assets/${this.suit}.png"></div>
                        <div class="infoNumber">${this.value}</div>
                    </div>
                </div>
            </div>
        `;
	}
}

class Deck {
	constructor() {
		this.deckElement = document.querySelector(".deckContainer");
		this.backDeckElement = document.querySelector(".backCardDeck");
		this.values = [
			"A",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"J",
			"Q",
			"K",
		];
		this.suits = ["hearts", "diamonds", "clubs", "spades"];
		this.cards = [];
		this.initializeDeck();
	}

	initializeDeck() {
		this.cards = [];
		this.values.forEach((value) => {
			this.suits.forEach((suit) => {
				this.cards.push(new Card(value, suit));
			});
		});
		//this.shuffle();
		this.render();
		this.createBackCardsDeck();
	}


	render() {
		this.deckElement.innerHTML = "";
		this.cards.forEach((card) => {
			this.deckElement.innerHTML += card.createHTML();
		});
	}

	createBackCardsDeck() {
		this.backDeckElement.innerHTML = "";
		const cardCount = 26;
		for (let i = 0; i < cardCount; i++) {
			const backCard = document.createElement("div");
			backCard.classList.add("backCard");
			backCard.style.transform = `translate(${-i * 2}px, ${
				-i * 1
			}px) rotate(${-i * 1.5}deg)`;
			backCard.style.zIndex = cardCount - i;
			backCard.innerHTML = `<img src="./assets/cardBackImage.png" alt="Back of card">`;
			this.backDeckElement.appendChild(backCard);
		}
	}
}

// Initialize the game
const deck = new Deck();
