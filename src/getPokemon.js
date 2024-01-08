export default function getPokemon(numberOfCards) {
   let pokemon = [];

   let IDs = [];
   while (IDs.length < numberOfCards) {
      const randomID = Math.floor(Math.random() * 100) + 1;
      if (!hasDuplicate(randomID, IDs)) {
         IDs.push(randomID);
      } else continue;
   }

   let rawPokemon = [];
   IDs.forEach(ID => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`, {mode: 'cors'}) 
         .then(response => {
            return response.json();
         })
         .then(data => {
            rawPokemon.push(data);  
            if (rawPokemon.length == numberOfCards) {
               pokemon = rawPokemon.map(item => ({
                  name: item.name, image: item.sprites.front_default, isPicked: false, index: rawPokemon.indexOf(item)
               }));
               console.log(pokemon);
            }
         })
         .catch(err => {
            console.log(err);
         }
      );
   })
   return pokemon;

   function hasDuplicate(newID, IDs) {
      let result = false;
      for (let i = 0; i < IDs.length; i++) {
         if (newID === IDs[i]) {
            result = true;
            break;
         }
      }
      return result;
   }
}
   

