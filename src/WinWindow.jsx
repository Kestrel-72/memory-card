import { PropTypes } from "prop-types";

export default function WinWindow({ cards, setCards }) {
   return (
      <div className="game-over-window win">
         You win!
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

WinWindow.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired
}