import Deck from "./deck.js";
import Player from "./player.js";

class WarGame {
	constructor() {
		this.player1 = new Player(document.querySelector("#player1Deck"), 1);
		this.player2 = new Player(document.querySelector("#player2Deck"), 2);
		this.deck = new Deck();
		this.roundCards = [];
		this.player1CardPostion = 0;
		this.player2CardPostion = 0;
	}

	startGame() {
		this.createBackCardsDeck();
		this.initPlayersCards();
	}

	initPlayersCards() {
		this.deck.initDeck();
		this.deck.shuffleDeck();
		const [player1Cards, player2Cards] = this.deck.splitDeck();

		this.player1.cards = player1Cards;
		this.player2.cards = player2Cards;
	}

	createCardHtml(card) {
		if (["J", "Q", "K"].includes(card.getValue())) {
			return this.createFaceCard(card);
		}
		return this.createNumberCard(card);
	}

	createFaceCard(card) {
		const faceCard = document.createElement("div");
		faceCard.classList.add("cardJs");
		faceCard.innerHTML = `
            <div class="card" data-value="${card.getValue()}" data-suit="${card.getSuit()}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${card.getValue()}</div>
                        <div class="infoSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    </div>
                </div>
                <div class="imageContainer">
                    <img src="../assets/${card.getValue()}_${card.getSuit()}.png">
                    <img src="../assets/${card.getValue()}_${card.getSuit()}.png">
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoNumber">${card.getValue()}</div>
                        <div class="infoSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    </div>
                </div>
            </div>
        `;
		return faceCard;
	}

	createNumberCard(card) {
		const numericCard = document.createElement("div");
		numericCard.classList.add("cardJs");
		numericCard.classList.add("addTranslate");
		numericCard.innerHTML = `
            <div class="card" data-value="${card.getValue()}" data-suit="${card.getSuit()}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${card.getValue()}</div>
                        <div class="infoSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    </div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                    <div class="finalSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoSymbol"><img src="../assets/${card.getSuit()}.png"></div>
                        <div class="infoNumber">${card.getValue()}</div>
                    </div>
                </div>
            </div>
        `;
		return numericCard;
	}

	createBackCard(i) {
		const backCard = document.createElement("div");
		backCard.classList.add("backCard");
		backCard.style.transform = `translate(${-i * 3}px, ${-i * 1}px)`;
		backCard.innerHTML = `<img src="../assets/cardBackImage.png" alt="Back of card">`;
		return backCard;
	}

	createBackCardTie(position) {
		const backCard = document.createElement("div");
		backCard.classList.add("backCard");
		backCard.style.setProperty("--translate-x", `${position * 60}px`);
		backCard.classList.add("addTranslate");
		backCard.innerHTML = `<img src="../assets/cardBackImage.png" alt="Back of card">`;
		return backCard;
	}

	createBackCardsDeck() {
		const cardCount = 26;
		const backDecks = [this.player1.backDeck, this.player2.backDeck];

		backDecks.forEach((playerBackDeck) => {
			for (let i = 0; i < cardCount; i++) {
				playerBackDeck.appendChild(this.createBackCard(i));
			}
		});
	}

	addCardToBackDeck(playerDeck, playerBackDeck) {
		let i = playerDeck.getCardCount();
		const backCard = this.createBackCard(i);
		playerBackDeck.appendChild(backCard.backCard);
	}

	playRound() {
		//get both players first card
		let player1Card = this.player1.drawCard();
		let player2Card = this.player2.drawCard();

		//add them to round cards
		this.addCardsToRoundCards(player1Card, player2Card);

		//compare cards and determine winner
		let winner = this.compareCards(player1Card, player2Card);

		//based on winner, add cards to winner deck
		switch (winner) {
			case 0:
				this.playTieRound();
				break;
			case 1:
				this.addCardsToWinner(this.player1);
				break;
			case 2:
				this.addCardsToWinner(this.player2);
				break;
		}

		//update visual representation
		this.updateVisuals();
	}

	playTieRound() {
		//draw 3 cards face down and 1 card face up for both players
		let player1Cards = this.player1.drawCards(4);
		let player2Cards = this.player2.drawCards(4);

		//add 3 face down cards to the visual representation
		this.playBackCardsTie();

		//add the 4th card (face up) to the visual representation
		this.createRoundFaceCard(player1Cards[3], player2Cards[3]);

		//add all 4 cards to the roundCards array
		this.addCardsToRoundCards(...player1Cards, ...player2Cards);

		//compare the 4th cards to determine the winner
		let winner = this.compareCards(player1Cards[3], player2Cards[3]);

		//if it is a tie, call playTieRound again
		switch (winner) {
			case 0:
				this.playTieRound();
				break;
			case 1:
				this.addCardsToWinner(this.player1);
				break;
			case 2:
				this.addCardsToWinner(this.player2);
				break;
		}

		//update visual representation
		this.updateVisuals();
	}

	compareCards(player1Card, player2Card) {
		if (player1Card.value === player2Card.value) {
			return 0;
		}
		return player1Card.value > player2Card.value ? 1 : 2;
	}

	addCardsToWinner(player) {
		player.addCard(this.roundCards);
		this.roundCards = [];
	}

	addCardsToRoundCards(...cards) {
		this.roundCards.push(...cards);
	}

	playBackCardsTie() {
		const player1RoundCards = document.querySelector("#player1RoundCards");
		const player2RoundCards = document.querySelector("#player2RoundCards");

		for (let i = 0; i < 3; i++) {
			player1RoundCards.appendChild(
				this.createBackCardTie(this.player1CardPostion)
			);
			player2RoundCards.appendChild(
				this.createBackCardTie(this.player2CardPostion)
			);

			this.player1CardPostion++;
			this.player2CardPostion++;
		}
	}

	createRoundFaceCard(player1Card, player2Card) {
		const player1RoundCards = document.querySelector("#player1RoundCards");
		const player2RoundCards = document.querySelector("#player2RoundCards");

		const faceCard1 = this.createCardHtml(player1Card);
		const faceCard2 = this.createCardHtml(player2Card);

		faceCard1.style.setProperty(
			"--translate-x",
			`${this.player1CardPostion * 60}px`
		);
		faceCard2.style.setProperty(
			"--translate-x",
			`${this.player2CardPostion * 60}px`
		);

		if (!faceCard1.classList.contains("addTranslate")) {
			faceCard1.classList.add("addTranslate");
		}
		if (!faceCard2.classList.contains("addTranslate")) {
			faceCard2.classList.add("addTranslate");
		}

		player1RoundCards.appendChild(faceCard1);
		player2RoundCards.appendChild(faceCard2);

		this.player1CardPostion++;
		this.player2CardPostion++;
	}

	updateVisuals() {
		//todo Implement the logic to update the visual representation of the game state
		//todo This includes updating the card counters and removing cards from the deck stack
	}

	testfacecardroound() {
		const card1 = this.player1.drawCard();
		const card2 = this.player2.drawCard();
		this.createRoundFaceCard(card1, card2);
	}
}

const warGame = new WarGame();
warGame.startGame();
console.log(warGame.player1.cards);
console.log(warGame.player2.cards);
warGame.playBackCardsTie();
warGame.testfacecardroound();
