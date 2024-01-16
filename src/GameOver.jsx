import { PropTypes } from "prop-types";

export default function GameOver({ counter, totalCards }) {
    let message = counter == totalCards ? 'You win!' : 'You lose!';

   return (
      <div className="game-over-window">
         <h2>{message}</h2>
         <p>Score: {counter}/{totalCards}</p>
         <button onClick={() => playAgain()}>Play again</button>
      </div>
   )

   function playAgain() {
      location.reload();
   }
}

GameOver.propTypes = {
   counter: PropTypes.number.isRequired,
   totalCards: PropTypes.number.isRequired,
}