export default class Player {
	constructor(backDeck, id) {
		this.cards = [];
		this.backDeck = backDeck;
		this.id = id;
	}

	addCard(card) {
		this.cards.push(card);
	}

	drawCard() {
		return this.cards.shift();
	}

	drawCards(num) {
		return this.cards.splice(0, num);
	}

	getCards() {
		return this.cards;
	}

	getCardCount() {
		return this.cards.length;
	}

	getBackDeck() {
		return this.backDeck;
	}
}
