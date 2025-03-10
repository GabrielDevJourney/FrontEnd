import Deck from "./deck.js";
import Player from "./player.js";

class WarGame {
	constructor() {
		// Players and game state
		this.player1 = new Player(document.querySelector("#player1Deck"), 1);
		this.player2 = new Player(document.querySelector("#player2Deck"), 2);
		this.deck = new Deck();
		this.roundCards = [];
		this.roundNumber = 0;

		// UI cards positioning trackers
		this.player1CardPosition = 0;
		this.player2CardPosition = 0;

		// Round tracking counters
		this.player1RoundCardsCounter = 0;
		this.player2RoundCardsCounter = 0;

		//Timer mecanism
		this.timer = null;
		this.normalDelay = 2000; // 2 seconds
		this.warDelay = 4000; // 4 seconds
		this.callback = null;
		this.isWar = false;
	}

	//  GAME INITIALIZATION
	handleTimer(isWarRound, callbackAction) {
		this.clearTimer();

		// Set war state
		this.isWar = isWarRound;

		// Store callback
		this.callback = callbackAction;

		// Set appropriate delay based on round type
		const delay = this.isWar ? this.warDelay : this.normalDelay;

		// Start new timer
		this.timer = setTimeout(() => {
			if (this.callback) {
				this.callback();
			}
		}, delay);
	}

	clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	handlePlayBtn() {
		const playBtn = document.querySelector(".playBtn");
		playBtn.addEventListener("click", () => this.initializeGame());
	}
	handleRestartBtn() {
		const restartBtn = document.querySelector(".restartBtn");
		restartBtn.addEventListener("click", () => this.restartGame());
	}

	initializeGame() {
        document.querySelector(".playBtn").disabled = true;

		this.initializeCardsCounter();

		this.createVisualCardDecks();
		this.dealInitialCards();
		setTimeout(() => this.playNextRound(), 1000);
	}

	dealInitialCards() {
		this.deck.initDeck();
		this.deck.shuffleDeck();
		const [player1Cards, player2Cards] = this.deck.splitDeck();

		this.player1.cards = player1Cards;
		this.player2.cards = player2Cards;

		// Update UI counters
		this.updateCardCounters();
	}

	initializeCardsCounter() {
		const player1CardsCounter = document.querySelector("#player1Cards");
		const player2CardsCounter = document.querySelector("#player2Cards");

		if (player1CardsCounter && player2CardsCounter) {
			player1CardsCounter.textContent = this.player1.getCardCount();
			player2CardsCounter.textContent = this.player2.getCardCount();
		}
	}

	//  GAME MECHANICS

	playNextRound() {
		this.clearRoundDisplay();

		this.incrementRoundCounter();

		this.handleNormalRound();
	}

	handleNormalRound() {
		if (
			this.player1.getCardCount() <= 0 ||
			this.player2.getCardCount() <= 0
		) {
			this.endGame();
			return;
		}

		this.player1RoundCardsCounter = 1;
		this.player2RoundCardsCounter = 1;

		// Remove one card visually from each player's deck
		this.removeCardsFromVisualDeck(1, 1);
		this.removeCardsFromVisualDeck(2, 1);

		let player1Card = this.player1.drawCard();
		let player2Card = this.player2.drawCard();

		// Add to round cards collection
		this.addCardsToRoundCollection(player1Card, player2Card);

		// Display cards on the table
		this.displayFaceUpCards(player1Card, player2Card);

		//call timer to delay game mecanics so user can preview game
		this.handleTimer(false, () => {
			// Compare cards
			let winner = this.compareCardValues(player1Card, player2Card);
			// Handle result
			this.handleRoundResult(winner);
		});
	}

	handleRoundResult(winner) {
		switch (winner) {
			case 0: // Tie
				this.handleTieRound();
				break;
			case 1: // Player 1 wins
			case 2: // Player 2 wins
				// First highlight the winner
				this.highlightRoundWinner(winner);

				// Clear the round display before adding cards
				this.clearRoundDisplay();

				// After a short delay, add cards to winner's deck
				setTimeout(() => {
					this.addCardsToVisualDeck(winner, this.roundCards.length);
					this.addCardsToWinnerCollection(
						winner === 1 ? this.player1 : this.player2
					);
					this.updateCardCounters();
					this.checkGameEnd();
				}, 500);
				break;
		}
	}

	handleTieRound() {
		// Check if both players have enough cards for war
		if (
			this.player1.getCardCount() < 4 ||
			this.player2.getCardCount() < 4
		) {
			this.handleInsufficientCardsForWar();
			return;
		}

		this.player1RoundCardsCounter += 4;
		this.player2RoundCardsCounter += 4;

		// Remove cards visually
		this.removeCardsFromVisualDeck(1, 4);
		this.removeCardsFromVisualDeck(2, 4);

		// Draw 4 cards for war round
		let player1Cards = this.player1.drawCards(4);
		let player2Cards = this.player2.drawCards(4);
		this.displayFaceDownCards();

		// Display final face-up cards
		this.displayFaceUpCards(player1Cards[3], player2Cards[3]);

		this.addCardsToRoundCollection(...player1Cards, ...player2Cards);

		this.handleTimer(true, () => {
			let winner = this.compareCardValues(
				player1Cards[3],
				player2Cards[3]
			);

			// Handle result
			this.handleRoundResult(winner);
		});
	}

	handleInsufficientCardsForWar() {
		if (this.player1.getCardCount() > this.player2.getCardCount()) {
			this.endGame("player1");
		} else {
			this.endGame("player2");
		}
	}

	compareCardValues(player1Card, player2Card) {
		if (player1Card.cardNumericValue === player2Card.cardNumericValue) {
			return 0; // Tie
		}
		return player1Card.cardNumericValue > player2Card.cardNumericValue
			? 1
			: 2;
	}

	addCardsToWinnerCollection(player) {
		for (let card of this.roundCards) {
			player.addCard(card);
		}
		this.roundCards = [];
	}

	addCardsToRoundCollection(...cards) {
		this.roundCards.push(...cards);
	}

	//  GAME STATE MANAGEMENT

	incrementRoundCounter() {
		this.roundNumber++;
	}

	updateCardCounters() {
		const player1CardsCounter = document.querySelector("#player1Cards");
		const player2CardsCounter = document.querySelector("#player2Cards");

		player1CardsCounter.textContent = this.player1.getCardCount();
		player2CardsCounter.textContent = this.player2.getCardCount();
	}

	checkGameEnd() {
		if (this.player1.getCardCount() <= 0) {
			console.log("Player 2 wins the game!");
			return true;
		}
		if (this.player2.getCardCount() <= 0) {
			console.log("Player 1 wins the game!");
			return true;
		}

		setTimeout(() => this.playNextRound(), 2000);

		return false;
	}

	endGame(winner) {
		// To be implemented
		this.clearTimer();
		this.timer = null;
        document.querySelector(".playBtn").disabled = false;
		alert("Winner is " + winner);
	}

	restartGame() {
		this.clearTimer();

		// Clear the visual decks
		const player1Deck = this.player1.getBackDeck();
		const player2Deck = this.player2.getBackDeck();
		player1Deck.innerHTML = "";
		player2Deck.innerHTML = "";

		this.resetPlayersCards();
		this.resetCounters();
		this.resetDeck();
		this.resetRoundFields();
		this.clearRoundDisplay();

		// Reset player name highlights
		const player1Name = document.querySelector(".player1Name");
		const player2Name = document.querySelector(".player2Name");
		player1Name.style.backgroundColor = "";
		player2Name.style.backgroundColor = "";

		this.initializeGame();
	}

	resetPlayersCards() {
		this.player1.cards = [];
		this.player2.cards = [];
	}
	resetCounters() {
		this.player1CardPosition = 0;
		this.player2CardPosition = 0;
		this.player1RoundCardsCounter = 0;
		this.player2RoundCardsCounter = 0;
	}
	resetDeck() {
		this.deck.deck = [];
	}
	resetRoundFields() {
		this.roundCards = [];
		this.roundNumber = 0;
	}

	//  UI MANAGEMENT

	createVisualCardDecks() {
		const cardCount = 26;
		const backDecks = [this.player1.backDeck, this.player2.backDeck];

		backDecks.forEach((playerBackDeck) => {
			for (let i = 0; i < cardCount; i++) {
				playerBackDeck.appendChild(this.createBackCard(i));
			}
		});
	}

	displayFaceUpCards(player1Card, player2Card) {
		const player1RoundCards = document.querySelector("#player1RoundCards");
		const player2RoundCards = document.querySelector("#player2RoundCards");

		const faceCardPlayer1 = this.createCardHtml(player1Card);
		const faceCardPlayer2 = this.createCardHtml(player2Card);

		faceCardPlayer1.style.setProperty(
			//css variable for easier ui handling
			"--translate-x",
			`${this.player1CardPosition * 60}px`
		);
		faceCardPlayer2.style.setProperty(
			"--translate-x",
			`${this.player2CardPosition * 60}px`
		);

		// Add translate class if needed
		if (!faceCardPlayer1.classList.contains("addTranslate")) {
			faceCardPlayer1.classList.add("addTranslate");
		}
		if (!faceCardPlayer2.classList.contains("addTranslate")) {
			faceCardPlayer2.classList.add("addTranslate");
		}

		player1RoundCards.appendChild(faceCardPlayer1);
		player2RoundCards.appendChild(faceCardPlayer2);

		this.player1CardPosition++;
		this.player2CardPosition++;
	}

	displayFaceDownCards() {
		const player1RoundCards = document.querySelector("#player1RoundCards");
		const player2RoundCards = document.querySelector("#player2RoundCards");

		for (let i = 0; i < 3; i++) {
			player1RoundCards.appendChild(
				this.createBackCardTie(this.player1CardPosition)
			);
			player2RoundCards.appendChild(
				this.createBackCardTie(this.player2CardPosition)
			);

			this.player1CardPosition++;
			this.player2CardPosition++;
		}
	}

	clearRoundDisplay() {
		const player1RoundCards = document.querySelector("#player1RoundCards");
		const player2RoundCards = document.querySelector("#player2RoundCards");

		player1RoundCards.innerHTML = "";
		player2RoundCards.innerHTML = "";

		// Reset card positions for next round so when tie again it can be again handle UI
		this.player1CardPosition = 0;
		this.player2CardPosition = 0;
	}

	highlightRoundWinner(winner) {
		const player1Name = document.querySelector(".player1Name");
		const player2Name = document.querySelector(".player2Name");

		if (winner === 1) {
			player1Name.style.backgroundColor = "lightgreen";
			player2Name.style.backgroundColor = "lightcoral";
		} else if (winner === 2) {
			player2Name.style.backgroundColor = "lightgreen";
			player1Name.style.backgroundColor = "lightcoral";
		}

		setTimeout(() => {
			player1Name.style.backgroundColor = "";
			player2Name.style.backgroundColor = "";
		}, 1500);
	}

	removeCardsFromVisualDeck(playerNumber, count) {
		const backDeck =
			playerNumber === 1
				? this.player1.getBackDeck()
				: this.player2.getBackDeck();

		// Remove the specified number of cards
		for (let i = 0; i < count; i++) {
			if (backDeck.lastChild) {
				backDeck.removeChild(backDeck.lastChild);
			}
		}
	}

	addCardsToVisualDeck(playerNumber, count) {
		const backDeck =
			playerNumber === 1
				? this.player1.getBackDeck()
				: this.player2.getBackDeck();

		// Get current card count for proper stacking
		const currentCount = backDeck.childElementCount;

		// Add the specified number of cards
		for (let i = 0; i < count; i++) {
			backDeck.appendChild(this.createBackCard(currentCount + i));
		}
	}

	//  CARD HTML CREATION

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
}

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
	const warGame = new WarGame();
	warGame.handlePlayBtn();
    warGame.handleRestartBtn();
});
