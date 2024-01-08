import { PropTypes } from "prop-types";
import Card from "./Card";

export default function Game({ cards, setCards }) {
   const cardsOnDisplay = 5;
   let shuffledIndexes = shuffleIndexes();
   if (!shuffledIndexes) return;
   let shuffledCards = shuffleCards();
   console.log(shuffledCards);
   const cardItems = shuffledCards.map(card =>
      <li key={card.index} onClick={() => checkPick(card)}>
         <Card card={card} />
      </li>
   )

   return (
      <ul>{cardItems}</ul>
   )

   function checkPick(card) {
      if (card.isPicked) {
         gameOver();
      } else {
         card.isPicked = true;
         setCards(structuredClone(cards));
      }
   }

   function gameOver() {
      console.log('game over!');
   }

   function youWin() {
      console.log('You win!');
   }

   function shuffleCards() {
      let shuffledCards = [];
      shuffledIndexes.forEach(index => {
         let card = cards.find(card => card.index == index);
         shuffledCards.push(card);
      })
      return shuffledCards;
   }

   function shuffleIndexes() {
      let indexes = [];
      const unpickedCards = cards.filter((card) => 
         card.isPicked == false
      )
      if (unpickedCards.length == 0) {
         youWin();
         return false;
      }
      // const unpickedCardIndex = unpickedCards[Math.floor(Math.random() * unpickedCards.length)].index;
      // indexes.push(unpickedCardIndex);
      generateRandomIndexes(indexes);
      return indexes;
   }

   function generateRandomIndexes(indexes) {
      const randomPosition = Math.floor(Math.random() * cardsOnDisplay);
      console.log(randomPosition);
      while (indexes.length < cardsOnDisplay) {
         const randomIndex = Math.floor(Math.random() * cards.length);
         if (!hasDuplicate(randomIndex, indexes)) {
            indexes.push(randomIndex);
         } else continue;
      }
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
}

Game.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired
}
