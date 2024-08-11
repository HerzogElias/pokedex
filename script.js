const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];
let OFFSET = 0;
let currentIndex = 0; // Globaler Index für das aktuell angezeigte Pokémon
let filteredPokemons = [];

async function init() {
    showLoadingspinner();
    await fetchPokemon(path = `pokemon?limit=20&offset=${OFFSET}`)
    await fetchPokemonStats(path = "pokemon/")
    hideLoadingspinner();
}

async function fetchPokemon(path = `pokemon?limit=10&offset=0`) {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    let newPokemon = await Promise.all(responseToJson.results.map(async (result, index) => {
        const pokemonData = await fetchPokemonData(result.url);
        return {
            name: result.name,
            id: OFFSET + index + 1,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(type => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
            stats: pokemonData.stats.map(stat => stat.base_stat),
        }
    }))
    allPokemons = allPokemons.concat(newPokemon);
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
    let pokemonCard = document.getElementById('allPokemonCardSmall');
    pokemonCard.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        let allTypes = allPokemons[i].type;
        pokemonCard.innerHTML += getAllPokemonHTML(i, firstType, allTypes, pokemonWeight(i));
    }
}

function openBigPokemonCard(i) {
    const overlay = document.getElementById('overlayBigPokemon');
    overlay.style.display = 'block';
    document.body.classList.add('no-scroll');
    overlay.innerHTML = getBigPokemonCardHTML(i, pokemonWeight(i));
    const header = document.getElementById('header');
    header.style.display = 'none';
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
function closeBigPokemon() {
    document.body.classList.remove('no-scroll');
    const overlay = document.getElementById('overlayBigPokemon');
    overlay.style.display = 'none';
    const header = document.getElementById('header');
    header.style.display = 'block';
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

function renderBigPokemonCard(i, currentIndex) {
    let overlayRef = document.getElementById('overlayBigPokemon');
    let weightInKg = pokemonWeight(i);
    overlayRef.innerHTML = getBigPokemonCardHTML(i, weightInKg);
    openBigPokemonGeneral(i, weightInKg, currentIndex); // Aktualisiere den Inhalt direkt
}

function loadMorePokemons() {
    console.log('loading more Pokemons funktioniert ');
    OFFSET += 20;
    init();
}

function showLoadingspinner() {
    const overlay = document.getElementById('overlayLoadingspinner');
    overlay.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

function hideLoadingspinner() {
    const overlay = document.getElementById('overlayLoadingspinner');
    overlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
    const content = document.getElementById('content');
    const header = document.getElementById('header');
    content.style.display = 'block';
    header.style.display = 'block';
}





