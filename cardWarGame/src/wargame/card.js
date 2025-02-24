export default class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}

    get cardNumericValue(){
        const symbolsNumericValues = {
            'J': 11,
            'Q': 12,
            'K': 13,
            'A' : 14
        }

        return symbolsNumericValues[this.value] || parseInt(this.value);
    }
}