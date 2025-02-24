import Deck from './deck.js';
import PlayerDeck from './playerDeck.js';

class WarGame {
    constructor() {
        this.player1Deck = new PlayerDeck();
        this.player2Deck = new PlayerDeck();
        this.deck = new Deck();
    }

	createHtml(card) {
		if (["J", "Q", "K"].includes(card.value)) {
			return card.createFaceCard();
		}
		return card.createNumberCard();
	}

	createFaceCard(card) {
		return `
            <div class="card" data-value="${card.value}" data-suit="${card.suit}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${card.value}</div>
                        <div class="infoSymbol"><img src="./assets/${card.suit}.png"></div>
                    </div>
                </div>
                <div class="imageContainer">
                    <img src="./assets/${card.value}_${card.suit}.png">
                    <img src="./assets/${card.value}_${card.suit}.png">
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoNumber">${card.value}</div>
                        <div class="infoSymbol"><img src="./assets/${card.suit}.png"></div>
                    </div>
                </div>
            </div>
        `;
	}

	createNumberCard(card) {
		return `
            <div class="card" data-value="${card.value}" data-suit="${card.suit}">
                <div class="cardInfo">
                    <div class="info">
                        <div class="infoNumber">${card.value}</div>
                        <div class="infoSymbol"><img src="./assets/${card.suit}.png"></div>
                    </div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                </div>
                <div class="symbolsContainer">
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                    <div class="finalSymbol"><img src="./assets/${card.suit}.png"></div>
                </div>
                <div class="cardInfoFliped">
                    <div class="info">
                        <div class="infoSymbol"><img src="./assets/${card.suit}.png"></div>
                        <div class="infoNumber">${card.value}</div>
                    </div>
                </div>
            </div>
        `;
	}

        createBackCardsDeck(playerDeck){
        //area in player section to place which deck
        const backDeckElement = document.querySelector('.backCardDeck');
        const cardCount = 26;
        for (let i = 0; i < cardCount; i++){
            const backCard = document.createElement('div');
            backCard.classList.add('backCard');
            backCard.style.transform = `translate(${-i * 2}px, ${-i * 1}px)`;
            backCard.innerHTML = `<img src="./assets/cardBackImage.png" alt="Back of card">`;
            backDeckElement.appendChild(backCard);
        }
    }

    initPlayersDecks(){
        this.deck.initDeck();
        this.deck.shuffleDeck();
        const [player1Deck, player2Deck] = this.deck.splitDeck();
        this.player1Deck.cards = player1Deck;
        this.player2Deck.cards = player2Deck;
    }
    
}

const warGame = new WarGame();
warGame.initPlayersDecks();
console.log(warGame.player1Deck.cards);
console.log(warGame.player2Deck.cards);
