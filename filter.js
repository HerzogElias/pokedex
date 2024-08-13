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
        hideBanner();
    } else {
        showBanner();
    }
}

function showBanner() {
    const banner = document.getElementById('notificationBanner');
    banner.style.display = 'block';
}

function hideBanner() {
    const banner = document.getElementById('notificationBanner');
    banner.style.display = 'none';
}

function renderFilteredPokemonCard(pokemonData) {
    filteredPokemons = pokemonData;

    let pokemonCard = document.getElementById('allPokemonCardSmall');
    pokemonCard.innerHTML = '';
    for (let i = 0; i < filteredPokemons.length; i++) {
        let firstType = filteredPokemons[i].type[0];
        pokemonCard.innerHTML += getAllFilterdPokemonHTML(i, firstType);
    }
}

function getAllFilterdPokemonHTML(i, firstType) {
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
    const overlay = document.getElementById('overlayBigPokemon');
    overlay.style.display = 'block'; 
    document.body.classList.add('no-scroll'); 
    overlay.innerHTML = getBigFilterdPokemonCardHTML(i, pokemonWeightFiltered(i)); 
    const header = document.getElementById('header');
    header.style.display = 'none';  
    openBigPokemonStatsFiltered(i);
}

function getBigFilterdPokemonCardHTML(i, weightInKg) {
    return `
    <div class="bigPokemonCard"> 
        <div class="bigPokemonCardTop"> 
            <h2>${filteredPokemons[i].name}</h2>
            <img class="pokemonImage" src="${filteredPokemons[i].image}">
        </div>
        <div class="bigPokemonCardMiddle">  
        <button onclick="openBigPokemonStatsFiltered(${i})" class="bigPokemonButton" id="pokemonBigStats">Stats</button> 
            <button onclick="openBigPokemonSpecialFiltered(${i}, ${weightInKg})" class="bigPokemonButton">Spezial</button>
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

function openBigPokemonSpecialFiltered(i, weightInKg) {
    currentIndex = i; 
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    let bigPokemonStats = document.getElementById('bigPokemonStats');
    bigPokemonStats.innerHTML = "";
    bigPokemonGeneral.innerHTML = openBigPokemonSpecialFilteredHTML (i, weightInKg);
}

function openBigPokemonSpecialFilteredHTML (i, weightInKg) {
    return`
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

function openBigPokemonStatsFiltered(i) {
    currentIndex = i;
    let bigPokemonStats = document.getElementById('bigPokemonStats');
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    bigPokemonGeneral.innerHTML = "";
    bigPokemonStats.innerHTML = openBigPokemonStatsFilteredHTML(i)
}

function openBigPokemonStatsFilteredHTML(i){
    return `
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
    let weightInKg = pokemonWeightFiltered(i); 
    overlayRef.innerHTML = getBigFilterdPokemonCardHTML(i, weightInKg);
    openBigPokemonSpecialFiltered(i, weightInKg); 
}

function nextBigFilteredPokemon(){
    if (currentIndex < filteredPokemons.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    renderBigFilteredPokemonCard(currentIndex);
    openBigPokemonStatsFiltered(currentIndex);
}

function lessBigFilteredPokemon(){
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = filteredPokemons.length - 1; 
    }
    renderBigFilteredPokemonCard(currentIndex);
    openBigPokemonStatsFiltered(currentIndex); 
}
