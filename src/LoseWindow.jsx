import { PropTypes } from "prop-types";
import { useState } from "react";
import Game from "./Game";

export default function LoseWindow({ cards, setCards, cardsOnDisplay }) {
   const [sameCardsGame, setSameCardsGame] = useState(false);

   if (sameCardsGame) {
      return (
         <Game cards={cards} setCards={setCards} cardsOnDisplay={cardsOnDisplay} />
      )
   }

   return (
      <div className="game-over-window lose">
         You lose!
         <button onClick={() => playSameCards()}>Play same cards</button>
         <button onClick={() => playNewCards()}>Play new cards</button>
      </div>
   )

   function playSameCards() {
      let unpickedCards = cards.map(card => ({ ...card, isPicked: false}));
      console.log(unpickedCards);
      setCards(unpickedCards);
      setSameCardsGame(true);
   }

   function playNewCards() {
      location.reload();
   }
}

LoseWindow.propTypes = {
   cards: PropTypes.array.isRequired,
   setCards: PropTypes.func.isRequired,
   cardsOnDisplay: PropTypes.number.isRequired,
   cardsTotal: PropTypes.number.isRequired,
}