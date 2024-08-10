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
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = filteredPokemons.length - 1; // Zum letzten Pokémon wechseln
    }
    renderBigFilteredPokemonCard(currentIndex) 
}
