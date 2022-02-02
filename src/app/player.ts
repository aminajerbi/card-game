import { Card } from "./card";

export class Player {
    cards: Card[]=[];
    name : string = "";

    constructor(name:string){
        this.name= name;
    }
    public addCard(card:Card){
        this.cards.push(card);
    }

    public toString() : string{
        let description = this.name + ":";
        for (let card of this.cards){
            description += card.toString()+ " , ";
        } 
        return description;
    }
}
