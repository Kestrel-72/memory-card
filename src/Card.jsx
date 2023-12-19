import { PropTypes } from "prop-types"

export default function Card({ name, image }) {
   return (
      <div className="card">
         <h1>{name}</h1>
         <img src={image} alt={name}/>
      </div>
   )  
}

Card.propTypes = {
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired
}
