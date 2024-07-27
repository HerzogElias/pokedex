function getAllPokemonHTML(i, firstType, weightInKg) {
    return ` 
    <div onclick="openBigPokemonCard(${i}), ${firstType},${weightInKg}" class="oneSmallPokemonCard">  
       <span class="end"> #${allPokemons[i].id}</span> 
        <h2>${allPokemons[i].name} </h2>
        <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>`
}


function getBigPokemonCardHTML(i, firstType, weightInKg) {
    // Funktion verwendet die Parameter
    return `
    <div class="bigPokemonCard"> 
    <div class ="bigPokemonCardTop"> 
      <h2>${allPokemons[i].name} </h2>
    <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>
    <div class="bigPokemonCardMiddle">  
    <button class="bigPokemonButton"> General </button>
    <button class="bigPokemonButton"> Specifices </button> 
    </div>
    <div> 
     <span>weight</span>
    <span>${weightInKg}kg</span>
          <span>Height</span>
        <span>${((allPokemons[i].height) / 10)}m</span>
    </div> 
    <img class="bigPokemonWayPicutre" src="img/zurueck.png"
    <img class="bigPokemonWayPicutre" src="img/hin.png">
    </div>
     `}