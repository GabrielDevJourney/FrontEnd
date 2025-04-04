// deck.js
import { Card } from "./card.js";

export const Deck = () => {
    // Private properties
    let _deck = [];
    const _suits = ["hearts", "diamonds", "clubs", "spades"];
    const _values = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", 
        "J", "Q", "K", "A"
    ];
    
    // Private methods
    const _createDeck = () => {
        const newDeck = [];
        for (let value of _values) {
            for (let suit of _suits) {
                newDeck.push(Card(value, suit));
            }
        }
        return newDeck;
    };
    
    const initDeck = () => {
        _deck = _createDeck();
        return _deck;
    }
    
    const shuffleDeck = () => {
        for (let i = _deck.length - 1; i > 0; i--) {
            const temp = _deck[i];
            const j = Math.floor(Math.random() * i);
            _deck[i] = _deck[j];
            _deck[j] = temp;
        }
        return _deck;
    }
    
    const splitDeck = () => {
        const half = 26;
        const firstHalf = _deck.splice(0, half);
        return [firstHalf, _deck];
    } 

    return {
        initDeck,
        shuffleDeck,
        splitDeck,
        getDeck: () => [..._deck]
    };
};