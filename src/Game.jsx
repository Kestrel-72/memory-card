import { PropTypes } from "prop-types";
import Card from "./Card";
import WinWindow from "./WinWindow";
import LoseWindow from "./LoseWindow";
import { useState } from "react";

export default function Game({ cards, setCards }) {
   let [isLost, setIsLost] = useState(false);
   if (isLost) {
      return (
         <LoseWindow/>
      )
   }
   const cardsOnDisplay = 5;
   const indexes = generateIndexes();
   if (!indexes) {
      return (
         <WinWindow cards={cards} setCards={setCards}/>
      )
   }
   const foundCards = findCardsByIndexes(indexes);
   const cardItems = foundCards.map(card =>
      <li key={card.index} onClick={() => checkPick(card)}>
         <Card card={card} />
      </li>
   )

   return (
      <ul className="cards-list">{cardItems}</ul>
   )
   
   function generateIndexes() {
      let indexes = [];
      const unpickedCards = cards.filter((card) => 
         card.isPicked == false
      )
      if (unpickedCards.length == 0) {
         return youWin();
      }
      const unpickedCardIndex = unpickedCards[Math.floor(Math.random() * unpickedCards.length)].index;
      const randomPosition = Math.floor(Math.random() * cardsOnDisplay);
      const modifiedCards = structuredClone(cards);
      modifiedCards.splice(unpickedCardIndex, 1);
      // console.log('unpickedCardIndex: ' + unpickedCardIndex)
      // console.log(modifiedCards);
      for (let i = 0; indexes.length < cardsOnDisplay; i++) {
         if (i == randomPosition) {
            indexes.push(unpickedCardIndex);
         }
         const randomIndex = Math.floor(Math.random() * cards.length);
         if (!hasDuplicate(randomIndex, indexes) && randomIndex != unpickedCardIndex) {
            indexes.push(randomIndex);
         }
      }
      console.log(indexes)
      return indexes;
      
   }

   function findCardsByIndexes(indexes) {
      const foundCards = [];
      indexes.forEach(index => {
         let card = cards.find(card => card.index == index);
         foundCards.push(card);
      })
      return foundCards;
   }

   function hasDuplicate(newIndex, indexes) {
      let result = false;
      for (let i = 0; i < indexes.length; i++) {
         if (newIndex === indexes[i]) {
            result = true;
            break;
         }
      }
      return result;
   }

   function checkPick(card) {
      console.log(card.index)
      if (card.isPicked) {
         gameOver();
      } else {
         card.isPicked = true;
         setCards(structuredClone(cards));
      }
   }

   function youWin() {
      console.log('You win!');
      return false;
   }

   function gameOver() {
      console.log('You lose!');
      setIsLost(true);
   }
   
}

Game.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired
}
