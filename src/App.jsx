import { useState, useEffect } from "react";
import Game from "./Game";
import { PropTypes } from "prop-types";

export default function App({ cardsOnDisplay, cardsTotal, prevCards=null }) {
   let [cards, setCards] = useState(null);
   useEffect(() => {
      fetchPokemonData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   if (prevCards) {
      return (
         <>
            { <Game cards={prevCards} setCards={setCards} cardsOnDisplay={cardsOnDisplay}/> }
         </>
      )
   }

   function fetchPokemonData() {
      let IDs = generateRandomIDs();
      let array = [];

      IDs.forEach(ID => {
         fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`, {mode: 'cors'}) 
            .then(response => {
               return response.json();
            })
            .then(data => {
               array.push(data);  
               if (array.length == cardsTotal) reformatData(array);
            })
            .catch(err => {
               console.log(err);
         });
      })
   }

   function generateRandomIDs() {
      let IDs = [];
      while (IDs.length < cardsTotal) {
         const randomID = Math.floor(Math.random() * 100) + 1;
         if (!hasDuplicate(randomID, IDs)) {
            IDs.push(randomID);
         } else continue;
      }
      return IDs;
   }

   function hasDuplicate(newID, IDs) {
      let result = false;
      for (let i = 0; i < IDs.length; i++) {
         if (newID === IDs[i]) {
            result = true;
            break;
         }
      }
      return result;
   }

   function reformatData(array) {
      let reformatted = array.map(item => ({
         name: item.name, image: item.sprites.front_default, isPicked: false, index: array.indexOf(item)
      }));
      console.log(reformatted);
      setCards(reformatted);
   }

   return (
      <>
         { cards && <Game cards={cards} setCards={setCards} cardsOnDisplay={cardsOnDisplay}/> }
      </>
   )
}

App.propTypes = {
   cardsOnDisplay: PropTypes.number.isRequired,
   cardsTotal: PropTypes.number.isRequired,
   prevCards: PropTypes.array,
}