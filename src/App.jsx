import { useState, useEffect } from "react";
import Game from "./Game";
import MainMenu from "./MainMenu";

export default function App() {
   const pokemonNumber = 100;
   
   let [game, setGame] = useState(false);
   let [data, setData] = useState(null);
   let [displayCards, setDisplayCards] = useState(2);
   let [totalCards, setTotalCards] = useState(6);

   useEffect(() => {
      fetchPokemonData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (game && data) {
      console.log(data);
      const playCards = getRandomCards();
      return (
         <div>
            { <Game 
               playCards={playCards}
               displayCards={displayCards}
               totalCards={totalCards}
               /> } 
         </div>
      )
   }
   
   if (!game) return (
      <MainMenu 
         displayCards={displayCards} 
         setDisplayCards={setDisplayCards}
         totalCards={totalCards}
         setTotalCards={setTotalCards}
         setGame={setGame}
         // cards={cards}
         // setCards={setCards}
      />
   )

   function fetchPokemonData() {
      let pokemons = [];
      for (let i = 1; i <= pokemonNumber; i++) {
         fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, {mode: 'cors'}) 
         .then(response => {
            return response.json();
         })
         .then(pokemon => {
            pokemons.push(pokemon);
            if (pokemons.length == pokemonNumber) {
               let reformatted = pokemons.map(item => ({
                  name: item.name, image: item.sprites.front_default, isPicked: false, id: item.id
               }));
               setData(reformatted);
            }
         })
         .catch(err => {
            console.log(err);
         });
      }
   }

   function getRandomCards() {
      let IDs = [];
      while (IDs.length < totalCards) {
         const randomID = Math.floor(Math.random() * data.length) + 1;
         if (IDs.indexOf(randomID) === -1) {
            IDs.push(randomID);
         }
      }
      const playCards = [];
      IDs.forEach(ID => {
         let card = data.find(item => item.id == ID);
         playCards.push(card);
      })
      return playCards;
   }
}