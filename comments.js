/*Code von JUNUS 
function getAllPokemonHTML(i, firstType, allTypes) {
    let html = '<ul>';
    for(let j=0; j < allTypes.length; j++){
        type = allTypes[j];
        html += `<li>${type}</li>`;
    }
    html += '</ul>';
    
    return ` 
    <div onclick="openBogPokemonCard(${i})" class="oneSmallPokemonCard">  
       <span class="end"> #${allPokemons[i].id}</span> 
        <h2>${allPokemons[i].name} </h2>
        ${html}
        <img class="pokemonImage" src="${allPokemons[i].image}">
        
    </div>`
}
/*Define Global Variables 
const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];
let OFFSET = 0;

function init(params) {
    fetchPokemon(path = "pokemon?limit=20&offset=0")
    fetchPokemonStats(path = `pokemon/?limit=10&offset=${OFFSET}`)
}*/