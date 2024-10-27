export abstract class Card { }

abstract class Deck {
    cards: Card[];
    constructor() {
        this.cards = [];
    }
    drawCard(): Card {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards[randomIndex];
    }
}

export default Deck;
