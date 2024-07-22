function getAllPokemonHTML(i, firstType) {
    return` 
    <div onclick="openBogPokemonCard()" class="oneSmallPokemonCard">  
       <span class="end"> #${allPokemons[i].id}</span> 
        <h2>${allPokemons[i].name} </h2>
        <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>`
}


