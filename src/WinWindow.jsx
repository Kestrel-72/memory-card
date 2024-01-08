import App from "./App"
import { PropTypes } from "prop-types";

export default function WinWindow({ cards, setCards }) {
   return (
      <div className="game-over-window win">
         You win!
         <button onClick={() => playAgain()}>Play again</button>
      </div>
   )

   function playAgain() {
      let unpickedCards = cards.map(card => ({ ...card, isPicked: false}));
      console.log(unpickedCards)
      setCards(unpickedCards)
   }
}

WinWindow.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired
}