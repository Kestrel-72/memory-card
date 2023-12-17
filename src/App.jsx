import { useState } from "react";

export default function App() {
   const numberOfCards = 3;
   const [cards, setCards] = useState(generateCards());
   console.log(cards);

   function generateCards() {
      let cards = [];
      while (cards.length < numberOfCards) {
         const newID = Math.floor(Math.random() * 100) + 1;
         const newCard = {id: newID};
         if (!hasDuplicate(newCard, cards)) {
            cards.push(newCard);
         } else continue;
      }
      cards.forEach(card => {
         fetch(`https://pokeapi.co/api/v2/pokemon/${card.id}/`, {mode: 'cors'}) 
            .then(function(response) {
               return response.json()
            })
            .then(function(response) {
               card.name = response.name;
               card.image = response.sprites.front_default;
               card.isPicked = false;
            })
            .catch(function(err) {
               console.log(err)
         });
      })

      return cards;
   }

   function hasDuplicate(newCard, cards) {
      let result = false;
      for (let i = 0; i < cards.length; i++) {
         if (newCard.id === cards[i].id) result = true;
      }
      return result;
   }
}
