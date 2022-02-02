export class Card {
  private suit: string = '';
  private rank: string = '0';

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public toString():string {
    return this.rank + ' de ' + this.suit;
  }
  public get Suit() {
    return this.suit;
  }
  public get Rank() {
    return this.rank;
  }

  public static compare(card1: Card, card2: Card) {
    if (card1.Rank < card2.Rank) {
      return -1;
    } else if (card1.Rank > card2.Rank) {
      return 1;
    } else {
      return 0;
    }
  }
}
