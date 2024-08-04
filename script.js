/*Define Global Variables */
const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];
let OFFSET = 0;
let currentIndex = 0; // Globaler Index für das aktuell angezeigte Pokémon


function init(parms) {
    fetchPokemon(path = `pokemon?limit=20&offset=${OFFSET}`)
    fetchPokemonStats(path = "pokemon/")
}

async function fetchPokemon(path = `pokemon?limit=10&offset=0`){
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    allPokemons = await Promise.all(responseToJson.results.map(async (result, index) => {
        const pokemonData = await fetchPokemonData(result.url);
        return {
            name: result.name,
            id: index + 1,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(type => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
            stats: pokemonData.stats.map(stat => stat.base_stat),
        }
    }))
    renderPokemonCard();
    console.log(allPokemons);
}

async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}

async function fetchPokemonStats(path = "pokemon/") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    pokemonStats = await Promise.all(responseToJson.results.map(async (result) => {
        const pokemonStatsData = await fetchPokemonData(result.url);
        return {
            stats: pokemonStatsData.stats.map(stat => stat.base_stat),
        }
    }))

}

function renderPokemonCard() {
    let pokemonCard = document.getElementById('allPokemonCardSmall'); /Die klasse beinhaltet alle Pokemons/
    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        let allTypes = allPokemons[i].type; 
        pokemonCard.innerHTML += getAllPokemonHTML(i, firstType, allTypes, weightInKg);      
}
}

function openBigPokemonCard(i) {
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
    overlayRef.classList.add('nScrollbar');
    overlayRef.innerHTML = getBigPokemonCardHTML(i, pokemonWeight(i));
}

function pokemonWeight(i) {
    let weightInKg = (allPokemons[i].weight * 0.1).toFixed(1);
    weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
    return weightInKg;
}

function openBigPokemonGeneral(i) {
    console.log('Generals anzeigen funktioniert');
    getBigPokemonCardHTML(i, weightInKg);
}

function openBigPkemonspeizifies(i) {
    console.log('Spezifies anzeigen funktioniert');
    let pokemonStats = document.getElementById('pokemonBigStats');
    //*Folgende Variablen gelten nur zur Information*//
    let hp = allPokemons[i].stats[0];
    let attack = allPokemons[i].stats[1];
    let defense = allPokemons[i].stats[2];
    let spezial_attack = allPokemons[i].stats[3];
    let spezial_defense = allPokemons[i].stats[4];
    let speed = allPokemons[i].stats[5];

    pokemonStats.innerHTML = '';
    pokemonStats.innerHTML += getPokemonStatsHTML(i);
}

function closeBigPokemon(){
    console.log('close big Pokemon hat funktioniert');
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
}

function lessBigPokemon() {
    console.log('less big Pokemon funktioniert');
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = allPokemons.length - 1; // Zum letzten Pokémon wechseln
    }
    renderBigPokemonCard(currentIndex);
}

function nextBigPokemon() {
    console.log('next big pokemon geht!');
    if (currentIndex < allPokemons.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Zum ersten Pokémon wechseln
    }
    renderBigPokemonCard(currentIndex);
}

function renderBigPokemonCard(i) { 
    let overlayRef = document.getElementById('overlayBigPokemon');
    let weightInKg = pokemonWeight(i);
    overlayRef.innerHTML = getBigPokemonCardHTML(i, weightInKg);
    openBigPokemonGeneral(i, weightInKg); // Aktualisiere den Inhalt direkt
}

function loadMorePokemons(){
    console.log('loading more Pokemons funktioniert ');
    OFFSET+=20;
    init();
}

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
}*/