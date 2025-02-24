export default class PlayerDeck{
    constructor(){
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) {
			const temp = this.cards[i]; 
			const j = Math.floor(Math.random() * i);
			this.cards[i] = this.cards[j]; 
			this.cards[j] = temp; 
		}
		return this.cards;
    }

    //play card from top of deck and remove it from array
    drawCard(){
        return this.cards.shift();
    }

    getCards(){
        return this.cards;
    }

    getCardCount(){
        return this.cards.length;
    }
}