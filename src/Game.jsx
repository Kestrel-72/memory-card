import { PropTypes } from "prop-types";
import Card from "./Card";

export default function Game({ cards }) {
   const cardsOnDisplay = 10;
   let shuffledIndexes = shuffleIndexes();
   let shuffledCards = shuffleCards();

   const cardItems = shuffledCards.map(card =>
      <li key={card.index}>
         <Card card={card} />
      </li>
   )

   return (
      <ul>{cardItems}</ul>
   )

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
      const unpickedCard = unpickedCards[Math.floor(Math.random() * unpickedCards.length)];
      indexes.push(unpickedCard.index);
      generateRandomIndexes(indexes);
      return indexes;
   }

   function generateRandomIndexes(indexes) {
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
}
