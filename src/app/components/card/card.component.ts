import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/card';
import { Player } from 'src/app/player';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cardsuits = ['trèfle', 'pique', ' coeur', 'carreau'];
  cardranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    ' Valet',
    'Reine',
    'Roi',
    'As',
  ];
  cards: Card[] = [];
  players: Player[] = [
    new Player('Jack'),
    new Player('Alice'),
    new Player('Mike'),
    new Player('Simon'),
  ];
  constructor() {}

  public distributeCards() {
    for (let player of this.players) {
      for (let i = 0; i < 13; i++) {
        let cardIndex = Math.floor(Math.random() * this.cards.length);
        let card = this.cards[cardIndex];
        player.addCard(card);
        this.cards.splice(cardIndex, 1);
      }
    }
  }

  ngOnInit(): void {
    for (let suit of this.cardsuits) {
      for (let rank of this.cardranks) {
        let card = new Card(suit, rank);
        this.cards.push(card);
      }
    }

   // this.distributeCards();
  }

  onDistribute() {
    this.distributeCards();
     
  }
}
