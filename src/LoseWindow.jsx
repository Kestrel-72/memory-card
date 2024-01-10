import { PropTypes } from "prop-types";

export default function LoseWindow({ cards, setCards }) {
   return (
      <div className="game-over-window lose">
         You lose!
         <button onClick={() => playSameCards()}>Play same cards</button>
         <button onClick={() => playNewCards()}>Play new cards</button>
      </div>
   )

   function playSameCards() {
      let unpickedCards = cards.map(card => ({ ...card, isPicked: false}));
      console.log(unpickedCards)
      setCards(unpickedCards)
   }

   function playNewCards() {
      location.reload();
   }
}

LoseWindow.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired
}