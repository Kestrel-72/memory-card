import { PropTypes } from "prop-types"

export default function Card({ card }) {
   let colorClass;
   if (card.isPicked) {
      colorClass = 'red';
   } else {
      colorClass = 'green';
   }
   return (
      <div className={`card ${colorClass}`}>
         <h1>{card.name}</h1>
         <img src={card.image} alt={card.name}/>
      </div>
   )  
}

Card.propTypes = {
   card: PropTypes.object.isRequired,
}
