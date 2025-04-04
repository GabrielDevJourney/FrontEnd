export const Card = (value, suit) => {
    const _value = value;
    const _suit = suit;
    
    const symbolsNumericValues = {
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    };
    
    return {
        getValue: () => _value,
        getSuit: () => _suit,
        
        cardNumericValue: symbolsNumericValues[_value] || parseInt(_value)
    };
};