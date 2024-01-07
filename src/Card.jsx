import { PropTypes } from "prop-types"

export default function Card({ card }) {
   return (
      <div className="card">
         <h1>{card.name}</h1>
         <img src={card.image} alt={card.name}/>
      </div>
   )  
}

Card.propTypes = {
   card: PropTypes.object.isRequired,
}
