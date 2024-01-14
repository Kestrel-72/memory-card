import { useRef } from "react";
import { PropTypes } from "prop-types";

export default function MainMenu({ displayCards, setDisplayCards, totalCards, setTotalCards, setGame }) {
   
   const displayCardsInput = useRef(null);
   const totalCardsInput = useRef(null);

   function checkData() {
      if (Number(displayCardsInput.current.value) > Number(totalCardsInput.current.value)) {
         console.log("There must be more total cards than cards on display")
      } else {
         setDisplayCards(Number(displayCardsInput.current.value));
         setTotalCards(Number(totalCardsInput.current.value));
         setGame(true);
      }
   }

   return (
      <div className="main-menu">
         <h1>Memory card</h1>
         <form className="menu-settings">
            <ul className="menu-settings-list">
               <li>
                  <label htmlFor="displayCardsInput ">Cards on display: </label>
                  <input type="number" defaultValue={displayCards} min={2} max={30} id="displayCardsInput " name="displayCardsInput " ref={displayCardsInput}/>
               </li>
               <li>
                  <label htmlFor="totalCardsInput">Cards total: </label>
                  <input type="number" defaultValue={totalCards} min={3} max={50} id="totalCardsInput" name="totalCardsInput" ref={totalCardsInput}/>
               </li>
            </ul>
            <button type="button" onClick={checkData}>Start game</button>
         </form>
      </div>
   )
}

MainMenu.propTypes = {
   displayCards: PropTypes.number.isRequired,
   setDisplayCards: PropTypes.func.isRequired,
   totalCards: PropTypes.number.isRequired,
   setTotalCards: PropTypes.func.isRequired, 
   setGame: PropTypes.func.isRequired,
   // cards: PropTypes.array.isRequired,
   // setCards: PropTypes.func.isRequired
}