/*Define Global Variables */
const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];
let OFFSET = 0;


function init(params) {
    fetchPokemon(path = "pokemon?limit=20&offset=0")
    fetchPokemonStats(path = "pokemon/")
}


async function fetchPokemon(path = "pokemon?limit=10&offset=${OFFSET}"){
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
    pokemonCard.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        pokemonCard.innerHTML += getAllPokemonHTML(i, firstType);
    }
}

function openBigPokemonCard(i) {
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
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
