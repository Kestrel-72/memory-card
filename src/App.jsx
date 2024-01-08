import { useState, useEffect } from "react";
import Game from "./Game2";

export default function App() {
   const numberOfCards = 10;
   let [cards, setCards] = useState(null);
   useEffect(() => {
      fetchPokemonData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
               if (array.length == numberOfCards) reformatData(array);
            })
            .catch(err => {
               console.log(err);
         });
      })
   }

   function generateRandomIDs() {
      let IDs = [];
      while (IDs.length < numberOfCards) {
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
         { cards && <Game cards={cards} setCards={setCards}/> }
      </>
   )
}
