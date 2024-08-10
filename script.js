const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];
let OFFSET = 0;
let currentIndex = 0; // Globaler Index für das aktuell angezeigte Pokémon
let filteredPokemons = [];

async function init() {
    showLoadingspinner()
    await fetchPokemon(path = `pokemon?limit=20&offset=${OFFSET}`)
    await fetchPokemonStats(path = "pokemon/")
    hideLoadingspinner();
}

/*async function fetchPokemon(path = `pokemon?limit=10&offset=0`){
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
}*/

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
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
    document.body.classList.add('no-scroll');
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

function closeBigPokemon() {
    console.log('close big Pokemon hat funktioniert');
    document.body.classList.remove('no-scroll');
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
    document.getElementById('loadingspinner').classList.remove('dNone');
    document.getElementById('content').classList.add('dNone');
    document.getElementById('header').classList.add('dNone');
}

function hideLoadingspinner() {
    document.getElementById('loadingspinner').classList.add('dNone');
    document.getElementById('content').classList.remove('dNone');
    document.getElementById('header').classList.remove('dNone');
    document.getElementById('loadingspinnerDiv').classList.remove('loadingspinnerDiv');
}

/* Filterfunktion*/
function filterAndShowPokemons() {
    let filterWord = document.getElementById('pokemonSearchInput').value;
    let filteredPokemons = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterWord.toLowerCase())
    );
    renderFilteredPokemonCard(filteredPokemons);
}

function handleSearch() {
    let input = document.getElementById('pokemonSearchInput').value.trim();
    if (input.length >= 3 || input.length === 0) {
        filterAndShowPokemons(input);
    } else {
        // Optionale Nachricht anzeigen, wenn weniger als 3 Buchstaben
        console.log("Bitte gib mindestens drei Buchstaben ein.");
    }
}

function renderFilteredPokemonCard(pokemonData) {
    // Weist den globalen filteredPokemons die übergebenen Daten zu
    filteredPokemons = pokemonData;

    let pokemonCard = document.getElementById('allPokemonCardSmall');
    pokemonCard.innerHTML = '';
    for (let i = 0; i < filteredPokemons.length; i++) {
        let firstType = filteredPokemons[i].type[0];
        // Aufruf von getAllFilterdPokemonHTML, um HTML für das Pokémon zu generieren
        pokemonCard.innerHTML += getAllFilterdPokemonHTML(i, firstType);
    }
}

function getAllFilterdPokemonHTML(i, firstType) {
    console.log('get All Filter Pokemon funktioniert');
    return ` 
    <div onclick="openBigFilteredPokemonCard(${i})" class="oneSmallPokemonCard b-${firstType}">  
        <h2>${filteredPokemons[i].name}</h2>
        <div class="type-container">
            ${filteredPokemons[i].type.join(', ')}
        </div>
        <img class="pokemonImage" src="${filteredPokemons[i].image}">
    </div>`;
}

function openBigFilteredPokemonCard(i) {
    console.log('openBigFilterPokemonCard hat funktioniert');
    let overlayRef = document.getElementById('overlayBigPokemon');
    overlayRef.classList.toggle('dNone');
    document.body.classList.add('no-scroll');
    overlayRef.innerHTML = getBigFilterdPokemonCardHTML(i, pokemonWeightFiltered(i));
}

function getBigFilterdPokemonCardHTML(i, weightInKg) {
    return `
    <div class="bigPokemonCard"> 
        <div class="bigPokemonCardTop"> 
            <h2>${filteredPokemons[i].name}</h2>
            <img class="pokemonImage" src="${filteredPokemons[i].image}">
        </div>
        <div class="bigPokemonCardMiddle">  
            <button onclick="openBigPokemonGeneralFiltered(${i}, ${weightInKg})" class="bigPokemonButton">General</button>
            <button onclick="openBigPokemonSpeizifiesFiltered(${i})" class="bigPokemonButton" id="pokemonBigStats">Specifics</button> 
        </div>
        <div id="bigPokemonGeneral"></div>
        <div id="bigPokemonStats"></div>
    </div>`;
}

function pokemonWeightFiltered(i) {
    let weightInKg = (filteredPokemons[i].weight * 0.1).toFixed(1);
    weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
    return weightInKg;
}

function openBigPokemonGeneralFiltered(i, weightInKg) {
    console.log('open big general funktioniert');
    currentIndex = i; // Den aktuellen Index speichern
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    let bigPokemonStats = document.getElementById('bigPokemonStats');

    // Clear the other div's content
    bigPokemonStats.innerHTML = "";

    bigPokemonGeneral.innerHTML = `   
        <div class="bigPokemonGenerals"> 
        <table>
            <tr>
                <td>Weight</td>
                <td>${weightInKg}kg</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${((filteredPokemons[i].height) / 10)}m</td>
            </tr>
        </table>
        </div> 
        <div class="bigPokemonBottom">
        <img onclick="lessBigFilteredPokemon(${i}, ${weightInKg})" class="bigPokemonWayPicutre" src="img/zurueck.png">  
        <img onclick="closeBigPokemon()"  class="bigPokemonWayPicutre" src="img/deleate.png">
        <img onclick="nextBigFilteredPokemon(${i})" class="bigPokemonWayPicutre" src="img/hin.png"> 
        </div> 
    `;
}

function openBigPokemonSpeizifiesFiltered(i) {
    console.log('States funkiton funktioniert');
    currentIndex = i;
    let bigPokemonStats = document.getElementById('bigPokemonStats');
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    bigPokemonGeneral.innerHTML = "";
    bigPokemonStats.innerHTML = `
     <div class="bigPokemonGenerals"> 
        <table>
            <tr>
                <td>HP</td>
                <td>${filteredPokemons[i].stats[0]}</td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>${filteredPokemons[i].stats[1]} </td>
            </tr>
              <tr>
                <td>Defense</td>
                <td>${filteredPokemons[i].stats[2]}</td>
            </tr>
              <tr>
                <td>Spezial Attack </td>
                <td>${filteredPokemons[i].stats[3]}</td>
            </tr>
              <tr>
                <td>Spezial Defense</td>
                <td>${filteredPokemons[i].stats[4]}</td>
            </tr>
               <tr>
                <td>Speed</td>
                <td>${filteredPokemons[i].stats[5]}</td>
            </tr>
        </table>
        </div> 
         <div class="bigPokemonBottom">
        <img onclick="lessBigFilteredPokemon(${i})" class="bigPokemonWayPicutre" src="img/zurueck.png">  
        <img onclick="closeBigPokemon()"  class="bigPokemonWayPicutre" src="img/deleate.png">
        <img onclick="nextBigFilteredPokemon(${i})" class="bigPokemonWayPicutre" src="img/hin.png"> 
        </div> 
    `;
}
function renderBigFilteredPokemonCard(i) {
    let overlayRef = document.getElementById('overlayBigPokemon');
    let weightInKg = pokemonWeightFiltered(i); // Berechnet das Gewicht aus filteredPokemons
    overlayRef.innerHTML = getBigFilterdPokemonCardHTML(i, weightInKg);
    openBigPokemonGeneralFiltered(i, weightInKg); // Aktualisiert den Inhalt direkt
}

function nextBigFilteredPokemon(){
    console.log('next filtered pokemon funktioniert');
    
    if (currentIndex < filteredPokemons.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Zum ersten Pokémon wechseln
    }
    renderBigFilteredPokemonCard(currentIndex);
}

function lessBigFilteredPokemon(){
    console.log('last big filterd pokemon funktioniert ');
    
    if (currentIndex > 0) 
        currentIndex--;
    renderBigFilteredPokemonCard(currentIndex) 
}
