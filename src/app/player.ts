import { Card } from './card';

export class Player {
  resetCards() {
    this.cards = [];
  }
  cards: Card[] = [];
  name: string = '';
  cardIndex: number = -1;

  constructor(name: string) {
    this.name = name;
  }
  public addCard(card: Card) {
    this.cards.push(card);
  }

  public toString(): string {
    let description = this.name + ':';
    for (let card of this.cards) {
      description += card.toString() + ' , ';
    }
    return description;
  }

  //question 4
  public playCard() {
    if (this.cards.length > 0) {
      this.cardIndex = Math.floor(Math.random() * this.cards.length);
    }
  }

  public transferPlayedCard(winner: Player) {
    let card: Card = this.getPlayedCard();
    winner.addCard(card);
    this.removePlayedCard();
  }

  public getPlayedCard(): Card {
    return this.cards[this.cardIndex];
  }

  public removePlayedCard() {
    this.cards.splice(this.cardIndex, 1);
  }
}
