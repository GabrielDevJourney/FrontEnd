//both create deck card back and create full deck to be splited
import Card from './card.js';

export default class Deck{
    constructor(){
        this.deck = [];
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    }

    initDeck(){
        this.deck = [];
        for (let value of this.values){
            for (let suit of this.suits){
                this.deck.push(new Card(value, suit));
            }
        }
        return this.deck;
    }

    //shuffle deck to then split it for both players
    shuffleDeck(){
        for (let i = this.deck.length - 1; i > 0; i--){
            const temp = this.deck[i]; //current card in i index

            const j = Math.floor(Math.random() * i);//random index
            this.deck[i] = this.deck[j]; //make current deck index i have the card random index j
            this.deck[j] = temp; //finally make the j index have the initial card stored that was based on i index
        }
        return this.deck;
    }

    splitDeck(){
        const half = 26;
        const firstHalf = this.deck.splice(0, half);
        return [firstHalf, this.deck];
    }

    

}