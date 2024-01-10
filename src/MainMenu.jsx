import { useRef, useState } from "react"
import App from "./App";

export default function MainMenu() {
   const minimumCards = useRef(null);
   const maximumCards = useRef(null);
   const [game, setGame] = useState(false);

   if (game) {
      return (
         <App cardsOnDisplay={Number(minimumCards.current.value)} cardsTotal={Number(maximumCards.current.value)} />
      )
   }

   function checkData() {
      if (Number(minimumCards.current.value) > Number(maximumCards.current.value)) {
         console.log(minimumCards.current.value);
         console.log(maximumCards.current.value);
         console.log("There must be more total cards than cards on display")
      } else {
         console.log('Game starts');
         setGame(true);
      }
   }

   return (
      <div className="main-menu">
         <h1>Memory card</h1>
         <form className="menu-settings">
            <ul className="menu-settings-list">
               <li>
                  <label htmlFor="minimumCards">Cards on display: </label>
                  <input type="number" defaultValue="8" min={2} max={30} id="minimumCards" name="minimumCards" ref={minimumCards}/>
               </li>
               <li>
                  <label htmlFor="maximumCards">Cards total: </label>
                  <input type="number" defaultValue="20" min={3} max={50} id="maximumCards" name="maximumCards" ref={maximumCards}/>
               </li>
            </ul>
            <button type="button" onClick={checkData}>Start game</button>
         </form>
      </div>
   )
}