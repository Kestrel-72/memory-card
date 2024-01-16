import { PropTypes } from "prop-types";
import Card from "./Card";
import { useState } from "react";
import _ from 'lodash';
import GameOver from "./GameOver";

export default function Game({ playCards, displayCards }) {
   let [gameOver, setGameOver] = useState(false);
   let [cards, setCards] = useState(indexateCards(playCards));
   let [counter, setCounter] = useState(0);

   if (gameOver || findUnpickedCards().length == 0) {
      console.log('Game over!');
      console.log('Score: ' + counter + '/' + playCards.length)
      return <GameOver counter={counter} totalCards={cards.length}/>
   }

   const cardsOfRound = getCardsOfRound();
   const cardItems = cardsOfRound.map(card =>
      <li key={card.id} onClick={() => checkPick(card)}>
         <Card card={card} />
      </li>
   );
   return (
      <ul className="cards-list">{cardItems}</ul>
   )

   function getCardsOfRound() {
      let shuffledIndexes = shuffleIndexes();
      let transformedCards = transformIntoCards(shuffledIndexes);
      return transformedCards;
   }

   function indexateCards(playCards) {
      let i = 0;
      let indexed = playCards.map(card => ({...card, index: i++}));
      return indexed;
   }

   function shuffleIndexes() {
      let indexes = [];
      const unpickedCards = findUnpickedCards();
      const pickedCards = findPickedCards();
      const unpickedCard = unpickedCards[Math.floor(Math.random() * unpickedCards.length)];
      const pickedCard = pickedCards[Math.floor(Math.random() * pickedCards.length)];
      if (pickedCard) indexes.push(pickedCard.index);
      indexes.push(unpickedCard.index);
      indexes = generateRandomIndexes(indexes);
      const shuffled = _.shuffle(indexes);
      return shuffled;
   }

   function generateRandomIndexes(indexes) {
      while (indexes.length < displayCards) {
         const randomIndex = Math.floor(Math.random() * cards.length);
         if (indexes.indexOf(randomIndex) === -1) {
            indexes.push(randomIndex);
         } else continue;
      }
      return indexes;
   }

   function transformIntoCards(shuffledIndexes) {
      let transformedCards = [];
      shuffledIndexes.forEach(index => {
         let card = cards.find(card => card.index == index);
         transformedCards.push(card);
      })
      return transformedCards;
   }

   function checkPick(card) {
      if (card.isPicked) {
         setGameOver(true);
      } else {
         setCounter(counter + 1);
         card.isPicked = true;
         setCards(structuredClone(cards));
      }
   }

   function findUnpickedCards() {
      const unpickedCards = cards.filter((card) => 
      card.isPicked == false
   )
   return unpickedCards;
   }

   function findPickedCards() {
      const pickedCards = cards.filter((card) => 
      card.isPicked == true
   )
   return pickedCards;
   }
}

Game.propTypes = {
   playCards: PropTypes.array.isRequired,
   displayCards: PropTypes.number.isRequired,
}
