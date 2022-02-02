import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/card';
import { Player } from 'src/app/player';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  subjectNotifier: Subject<null> = new Subject<null>();
  pliWinner: Player = new Player('');
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
    let tmpCards: Card[] = [...this.cards];
    for (let player of this.players) {
      player.resetCards();
      for (let i = 0; i < 13; i++) {
        let cardIndex = Math.floor(Math.random() * tmpCards.length);
        let card = tmpCards[cardIndex];
        player.addCard(card);
        tmpCards.splice(cardIndex, 1);
      }
    }
  }

  private comparePlayers(player1: Player, player2: Player) {
    let winner: Player;
    let res = Card.compare(player1.getPlayedCard(), player2.getPlayedCard());
    if (res >= 0) {
      winner = player1;
    } else {
      winner = player2;
    }
    return winner;
  }
  // la card la plus forte
  public pli() {
    // play cards (just update cardIndex random)
    for (let player of this.players) {
      player.playCard();
    }

    // identify the winner of the pli
    // first semi-final
    let winner12: Player = this.comparePlayers(
      this.players[0],
      this.players[1]
    );
    // second semi-final
    let winner34: Player = this.comparePlayers(
      this.players[2],
      this.players[3]
    );
    // final pli winner
    this.pliWinner = this.comparePlayers(winner12, winner34);

    // transfer cards from losers to winner
    for (let loser of this.players) {
      if (!(loser === this.pliWinner)) {
        loser.transferPlayedCard(this.pliWinner);
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
  }

  onDistribute() {
    this.distributeCards();
    this.subjectNotifier.next(null);
  }

  onPli() {
    this.pli();
    this.subjectNotifier.next(null);
  }
}
