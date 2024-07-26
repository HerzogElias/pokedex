function getAllPokemonHTML(i, firstType) {
    return ` 
    <div onclick="openBogPokemonCard(${i})" class="oneSmallPokemonCard">  
       <span class="end"> #${allPokemons[i].id}</span> 
        <h2>${allPokemons[i].name} </h2>
        <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>`
}


function getBigPokemonCardHTML(i, firstType, weightInKg) {
    // Funktion verwendet die Parameter
    return `
     <img class="pokemonImage" src="${allPokemons[i].image}">
    `;}