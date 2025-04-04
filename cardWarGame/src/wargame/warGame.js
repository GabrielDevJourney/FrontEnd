// warGame.js
import { Deck } from "./deck.js";
import { Player } from "./player.js";

const WarGame = () => {
    let _player1 = Player(document.querySelector("#player1Deck"), 1);
    let _player2 = Player(document.querySelector("#player2Deck"), 2);
    let _deck = Deck();
    let _roundCards = [];
    let _roundNumber = 0;
    
    // UI card positioning trackers
    let _player1CardPosition = 0;
    let _player2CardPosition = 0;
    
    let _player1RoundCardsCounter = 0;
    let _player2RoundCardsCounter = 0;
    
    let _timer = null;
    const _normalDelay = 2000; // 2 seconds
    const _warDelay = 4000; // 4 seconds
    let _callback = null;
    let _isWar = false;
    
    // Private methods
    const _handleTimer = (isWarRound, callbackAction) => {
        _clearTimer();
        
        _isWar = isWarRound;
        _callback = callbackAction;
        
        const delay = _isWar ? _warDelay : _normalDelay;
        
        _timer = setTimeout(() => {
            if (_callback) {
                _callback();
            }
        }, delay);
    };
    
    const _clearTimer = () => {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
    };
    
    const _handleRoundResult = (winner) => {
        switch (winner) {
            case 0: // Tie
                _handleTieRound();
                break;
            case 1: // Player 1 wins
            case 2: // Player 2 wins
                _highlightRoundWinner(winner);
                _clearRoundDisplay();
                
                setTimeout(() => {
                    _addCardsToVisualDeck(winner, _roundCards.length);
                    _addCardsToWinnerCollection(
                        winner === 1 ? _player1 : _player2
                    );
                    _updateCardCounters();
                    _checkGameEnd();
                }, 500);
                break;
        }
    };
    
    const _handleTieRound = () => {
        if (
            _player1.getCardCount() < 4 ||
            _player2.getCardCount() < 4
        ) {
            _handleInsufficientCardsForWar();
            return;
        }
        
        _player1RoundCardsCounter += 4;
        _player2RoundCardsCounter += 4;
        
        _removeCardsFromVisualDeck(1, 4);
        _removeCardsFromVisualDeck(2, 4);
        
        let player1Cards = _player1.drawCards(4);
        let player2Cards = _player2.drawCards(4);
        _displayFaceDownCards();
        
        // Display final face-up cards
        _displayFaceUpCards(player1Cards[3], player2Cards[3]);
        
        _addCardsToRoundCollection(...player1Cards, ...player2Cards);
        
        _handleTimer(true, () => {
            let winner = _compareCardValues(
                player1Cards[3],
                player2Cards[3]
            );
            
            _handleRoundResult(winner);
        });
    };
    
    const _handleInsufficientCardsForWar = () => {
        if (_player1.getCardCount() > _player2.getCardCount()) {
            _endGame("player1");
        } else {
            _endGame("player2");
        }
    };
    
    const _compareCardValues = (player1Card, player2Card) => {
        if (player1Card.cardNumericValue === player2Card.cardNumericValue) {
            return 0; // Tie
        }
        return player1Card.cardNumericValue > player2Card.cardNumericValue
            ? 1
            : 2;
    };
    
    const _addCardsToWinnerCollection = (player) => {
        for (let card of _roundCards) {
            player.addCard(card);
        }
        _roundCards = [];
    };
    
    const _addCardsToRoundCollection = (...cards) => {
        _roundCards.push(...cards);
    };
    
    // Game state management
    const _incrementRoundCounter = () => {
        _roundNumber++;
    };
    
    const _updateCardCounters = () => {
        const player1CardsCounter = document.querySelector("#player1Cards");
        const player2CardsCounter = document.querySelector("#player2Cards");
        
        player1CardsCounter.textContent = _player1.getCardCount();
        player2CardsCounter.textContent = _player2.getCardCount();
    };
    
    const _checkGameEnd = () => {
        if (_player1.getCardCount() <= 0) {
            console.log("Player 2 wins the game!");
            _endGame("player2");
            return true;
        }
        if (_player2.getCardCount() <= 0) {
            console.log("Player 1 wins the game!");
            _endGame("player1");
            return true;
        }
        
        setTimeout(() => playNextRound(), 2000);
        
        return false;
    };
    
    const _endGame = (winner) => {
        _clearTimer();
        _timer = null;
        document.querySelector(".playBtn").disabled = false;
        alert("Winner is " + winner);
    };
    
    const _createVisualCardDecks = () => {
        const cardCount = 26;
        const backDecks = [_player1.getBackDeck(), _player2.getBackDeck()];
        
        backDecks.forEach((playerBackDeck) => {
            for (let i = 0; i < cardCount; i++) {
                playerBackDeck.appendChild(_createBackCard(i));
            }
        });
    };
    
    const _displayFaceUpCards = (player1Card, player2Card) => {
        const player1RoundCards = document.querySelector("#player1RoundCards");
        const player2RoundCards = document.querySelector("#player2RoundCards");
        
        const faceCardPlayer1 = _createCardHtml(player1Card);
        const faceCardPlayer2 = _createCardHtml(player2Card);
        
        faceCardPlayer1.style.setProperty(
            "--translate-x",
            `${_player1CardPosition * 60}px`
        );
        faceCardPlayer2.style.setProperty(
            "--translate-x",
            `${_player2CardPosition * 60}px`
        );
        
        if (!faceCardPlayer1.classList.contains("addTranslate")) {
            faceCardPlayer1.classList.add("addTranslate");
        }
        if (!faceCardPlayer2.classList.contains("addTranslate")) {
            faceCardPlayer2.classList.add("addTranslate");
        }
        
        player1RoundCards.appendChild(faceCardPlayer1);
        player2RoundCards.appendChild(faceCardPlayer2);
        
        _player1CardPosition++;
        _player2CardPosition++;
    };
    
    const _displayFaceDownCards = () => {
        const player1RoundCards = document.querySelector("#player1RoundCards");
        const player2RoundCards = document.querySelector("#player2RoundCards");
        
        for (let i = 0; i < 3; i++) {
            player1RoundCards.appendChild(
                _createBackCardTie(_player1CardPosition)
            );
            player2RoundCards.appendChild(
                _createBackCardTie(_player2CardPosition)
            );
            
            _player1CardPosition++;
            _player2CardPosition++;
        }
    };
    
    const _clearRoundDisplay = () => {
        const player1RoundCards = document.querySelector("#player1RoundCards");
        const player2RoundCards = document.querySelector("#player2RoundCards");
        
        player1RoundCards.innerHTML = "";
        player2RoundCards.innerHTML = "";
        
        _player1CardPosition = 0;
        _player2CardPosition = 0;
    };
    
    const _highlightRoundWinner = (winner) => {
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
    };
    
    const _removeCardsFromVisualDeck = (playerNumber, count) => {
        const backDeck =
            playerNumber === 1
                ? _player1.getBackDeck()
                : _player2.getBackDeck();
        
        for (let i = 0; i < count; i++) {
            if (backDeck.lastChild) {
                backDeck.removeChild(backDeck.lastChild);
            }
        }
    };
    
    const _addCardsToVisualDeck = (playerNumber, count) => {
        const backDeck =
            playerNumber === 1
                ? _player1.getBackDeck()
                : _player2.getBackDeck();
        
        // Get current card count for proper stacking
        const currentCount = backDeck.childElementCount;
        
        for (let i = 0; i < count; i++) {
            backDeck.appendChild(_createBackCard(currentCount + i));
        }
    };
    
    // Card HTML creation
    const _createCardHtml = (card) => {
        if (["J", "Q", "K"].includes(card.getValue())) {
            return _createFaceCard(card);
        }
        return _createNumberCard(card);
    };
    
    const _createFaceCard = (card) => {
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
    };
    
    const _createNumberCard = (card) => {
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
    };
    
    const _createBackCard = (i) => {
        const backCard = document.createElement("div");
        backCard.classList.add("backCard");
        backCard.style.transform = `translate(${-i * 3}px, ${-i * 1}px)`;
        backCard.innerHTML = `<img src="../assets/cardBackImage.png" alt="Back of card">`;
        return backCard;
    };
    
    const _createBackCardTie = (position) => {
        const backCard = document.createElement("div");
        backCard.classList.add("backCard");
        backCard.style.setProperty("--translate-x", `${position * 60}px`);
        backCard.classList.add("addTranslate");
        backCard.innerHTML = `<img src="../assets/cardBackImage.png" alt="Back of card">`;
        return backCard;
    };
    
    // Game initialization and control
    const initializeGame = () => {
        document.querySelector(".playBtn").disabled = true;
        
        _initializeCardsCounter();
        
        _createVisualCardDecks();
        _dealInitialCards();
        setTimeout(() => playNextRound(), 1000);
    };
    
    const _dealInitialCards = () => {
        _deck.initDeck();
        _deck.shuffleDeck();
        const [player1Cards, player2Cards] = _deck.splitDeck();
        
        _player1.setCards(player1Cards);
        _player2.setCards(player2Cards);
        
        _updateCardCounters();
    };
    
    const _initializeCardsCounter = () => {
        const player1CardsCounter = document.querySelector("#player1Cards");
        const player2CardsCounter = document.querySelector("#player2Cards");
        
        if (player1CardsCounter && player2CardsCounter) {
            player1CardsCounter.textContent = _player1.getCardCount();
            player2CardsCounter.textContent = _player2.getCardCount();
        }
    };
    
    const playNextRound = () => {
        _clearRoundDisplay();
        
        _incrementRoundCounter();
        
        _handleNormalRound();
    };
    
    const _handleNormalRound = () => {
        if (
            _player1.getCardCount() <= 0 ||
            _player2.getCardCount() <= 0
        ) {
            _endGame();
            return;
        }
        
        _player1RoundCardsCounter = 1;
        _player2RoundCardsCounter = 1;
        
        _removeCardsFromVisualDeck(1, 1);
        _removeCardsFromVisualDeck(2, 1);
        
        let player1Card = _player1.drawCard();
        let player2Card = _player2.drawCard();
        
        _addCardsToRoundCollection(player1Card, player2Card);
        
        _displayFaceUpCards(player1Card, player2Card);
        
        _handleTimer(false, () => {
            let winner = _compareCardValues(player1Card, player2Card);
            _handleRoundResult(winner);
        });
    };
    
    const restartGame = () => {
        _clearTimer();
        
        const player1Deck = _player1.getBackDeck();
        const player2Deck = _player2.getBackDeck();
        player1Deck.innerHTML = "";
        player2Deck.innerHTML = "";
        
        _resetPlayersCards();
        _resetCounters();
        _resetDeck();
        _resetRoundFields();
        _clearRoundDisplay();
        
        const player1Name = document.querySelector(".player1Name");
        const player2Name = document.querySelector(".player2Name");
        player1Name.style.backgroundColor = "";
        player2Name.style.backgroundColor = "";
        
        initializeGame();
    };
    
    const _resetPlayersCards = () => {
        _player1.setCards([]);
        _player2.setCards([]);
    };
    
    const _resetCounters = () => {
        _player1CardPosition = 0;
        _player2CardPosition = 0;
        _player1RoundCardsCounter = 0;
        _player2RoundCardsCounter = 0;
    };
    
    const _resetDeck = () => {
        _deck = Deck();
    };
    
    const _resetRoundFields = () => {
        _roundCards = [];
        _roundNumber = 0;
    };
    
    const handlePlayBtn = () => {
        const playBtn = document.querySelector(".playBtn");
        playBtn.addEventListener("click", initializeGame);
    };
    
    const handleRestartBtn = () => {
        const restartBtn = document.querySelector(".restartBtn");
        restartBtn.addEventListener("click", restartGame);
    };
    
    return {
        handlePlayBtn,
        handleRestartBtn,
        initializeGame,
        playNextRound,
        restartGame
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const warGame = WarGame();
    warGame.handlePlayBtn();
    warGame.handleRestartBtn();
});