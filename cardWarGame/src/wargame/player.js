// player.js
export const Player = (backDeck, id) => {
    // Private properties
    let _cards = [];
    const _backDeck = backDeck;
    const _id = id;
    
    const addCard = (card) => {
        _cards.push(card);
    }
    
    const drawCard = () => {
        return _cards.shift();
    }
    
    const drawCards = (num) => {
        return _cards.splice(0, num);
    }
    
    const getCards = () => _cards
    const getCardCount = () => _cards.length
    const getBackDeck = () => _backDeck
    const getId = () => _id
    
    const setCards = (cards) => {
        _cards = cards;
    }

    return {
        addCard,
        drawCard,
        drawCards,
        getCards,
        getCardCount,
        getBackDeck,
        getId,
        setCards
    };
};