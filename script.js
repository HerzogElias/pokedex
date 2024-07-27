/*Define Global Variables */
const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];


function init(params) {
    fetchPokemon(path = "pokemon?limit=20&offset=0")
    fetchPokemonStats(path = "pokemon/")
}


async function fetchPokemon(path = "pokemon?limit=10&offset=0") {
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
            /*
            stats: pokemonData.stats.map(stat => stat.base_stat),*/
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
    /*
    pokemonStats = await Promise.all(responseToJson.results.map(async (result) => {
        const pokemonStatsData = await fetchPokemonData(result.url);
        return {
            stats: pokemonStatsData.stats.map(stat => stat.base_stat),
        }
    }))*/
}


function renderPokemonCard() {
    let pokemonCard = document.getElementById('allPokemonCardSmall'); /*Die klasse beinhaltet alle Pokemons */
    pokemonCard.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        let weightInKg = (allPokemons[i].weight * 0.1).toFixed(1);
        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getAllPokemonHTML(i, firstType,weightInKg);
    }
}


function openBigPokemonCard(i,firstType,weightInKg) {
    console.log('open big ding hat funktioniert');
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
    overlayRef.innerHTML = getBigPokemonCardHTML(i, firstType,weightInKg);
}