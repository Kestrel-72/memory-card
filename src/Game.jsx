import { PropTypes } from "prop-types";
import Card from "./Card";
import WinWindow from "./WinWindow";
import LoseWindow from "./LoseWindow";
import { useState } from "react";
import _ from 'lodash';

export default function Game({ playCards, displayCards, totalCards }) {
   let [isOver, setIsOver] = useState(false);
   let [cards, setCards] = useState(structuredClone(playCards));
   console.log(cards);
   const cardsOfRound = setCardsOfRound();
   const cardItems = cardsOfRound.map(card =>
      <li key={card.id} onClick={() => checkPick(card)}>
         <Card card={card} />
      </li>
   );
   console.log(cardItems)
   return (
      <ul className="cards-list">{cardItems}</ul>
   )

   // if (isLost) {
   //    return (
   //       <LoseWindow cards={cards} setCards={setCards} cardsOnDisplay={cardsOnDisplay} cardsTotal={cards.length}/>
   //    )
   // }
   // const indexes = generateIndexes();
   // if (!indexes) {
   //    return (
   //       <WinWindow cards={cards} setCards={setCards}/>
   //    )
   // }

   function setCardsOfRound() {
      const cardsClone = structuredClone(cards);
      const unpickedCards = findUnpickedCards();
      const unpickedCard = unpickedCards[Math.floor(Math.random() * unpickedCards.length)];
      const cardsOfRound = cardsClone.splice(unpickedCards.indexOf(unpickedCard), 1);
      const shuffled = _.shuffle(cardsClone);
      // const sliced = shuffled.slice(0, displayCards - 1);
      // cardsOfRound.push(structuredClone(...sliced));
      cardsOfRound.push(structuredClone(...shuffled));
      console.log(cardsOfRound);
      return cardsOfRound;
   }

   function checkPick(card) {
      console.log(card.id)
      if (card.isPicked) {
         gameOver();
      } else {
         card.isPicked = true;
         console.log(card)
         setCards(structuredClone(cards));
      }
   }

   function findUnpickedCards() {
      const unpickedCards = cards.filter((card) => 
      card.isPicked == false
   )
   if (unpickedCards.length == 0) {
      setIsOver(true);
   }
   return unpickedCards;
   }

   function youWin() {
      console.log('You win!');
      setIsOver(true);
   }

   function gameOver() {
      console.log('You lose!');
      setIsOver(true);
   }
   
}

Game.propTypes = {
   playCards: PropTypes.array.isRequired,
   displayCards: PropTypes.number.isRequired,
   totalCards: PropTypes.number.isRequired,
}
