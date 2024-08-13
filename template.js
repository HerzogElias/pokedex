function getAllPokemonHTML(i, firstType, weightInKg, allTypes) {
    return ` 
    <div onclick="openBigPokemonCard(${i})" class="oneSmallPokemonCard b-${firstType}">  
        <h2>${allPokemons[i].name}</h2>
        <div class="type-container">
            ${allPokemons[i].type.join(', ')}
        </div>
        <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>`;
}

function getBigPokemonCardHTML(i, weightInKg) {
    return `
    <div class="bigPokemonCard"> 
    <div class ="bigPokemonCardTop"> 
      <h2>${allPokemons[i].name} </h2>
    <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>
    <div class="bigPokemonCardMiddle">  
    <button onclick="openBigPokemonStats(${i})" class="bigPokemonButton" id="pokemonBigStats"> Stats </button> 
    <button onclick="openBigPokemonSpecials(${i}, ${weightInKg})" class="bigPokemonButton"> Specials </button>
    </div>
    <div id="bigPokemonGeneral"> </div>
    <div id="bigPokemonStats" </div>
    `;
}

function openBigPokemonSpecials(i, weightInKg) {
    currentIndex = i;
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    let bigPokemonStats = document.getElementById('bigPokemonStats');
    bigPokemonStats.innerHTML = "";

    bigPokemonGeneral.innerHTML = openBigPokemonSpecialsHTML(i,weightInKg)
    
}

function openBigPokemonSpecialsHTML(i,weightInKg) {
    return `
        <div class="bigPokemonGenerals" id="bigPokemonGeneral"> 
        <table>
            <tr>
                <td>Weight</td>
                <td>${weightInKg}kg</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${((allPokemons[i].height) / 10)}m</td>
            </tr>
        </table>
        </div> 
        <div class="bigPokemonBottom">
        <img onclick="lessBigPokemon(${i}, ${weightInKg})" class="bigPokemonWayPicutre" src="img/zurueck.png">  
        <img onclick="closeBigPokemon()"  class="bigPokemonWayPicutre" src="img/deleate.png">
        <img onclick="nextBigPokemon(${i})" class="bigPokemonWayPicutre" src="img/hin.png"> 
        </div> 
    `;
}

function openBigPokemonStats(i) {
    currentIndex = i;
    let bigPokemonStats = document.getElementById('bigPokemonStats');
    let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
    bigPokemonGeneral.innerHTML = "";
    bigPokemonStats.innerHTML = openBigPokemonstatsHTML(i);
}

function openBigPokemonstatsHTML(i){
return`
<div class="bigPokemonGenerals"> 
    <table>
        <tr>
            <td>HP</td>
            <td>${allPokemons[i].stats[0]}</td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${allPokemons[i].stats[1]} </td>
        </tr>
          <tr>
            <td>Defense</td>
            <td>${allPokemons[i].stats[2]}</td>
        </tr>
          <tr>
            <td>Spezial Attack </td>
            <td>${allPokemons[i].stats[3]}</td>
        </tr>
          <tr>
            <td>Spezial Defense</td>
            <td>${allPokemons[i].stats[4]}</td>
        </tr>
           <tr>
            <td>Speed</td>
            <td>${allPokemons[i].stats[5]}</td>
        </tr>
    </table>
    </div> 
     <div class="bigPokemonBottom">
    <img onclick="lessBigPokemon(${i})" class="bigPokemonWayPicutre" src="img/zurueck.png">  
    <img onclick="closeBigPokemon()"  class="bigPokemonWayPicutre" src="img/deleate.png">
    <img onclick="nextBigPokemon(${i})" class="bigPokemonWayPicutre" src="img/hin.png"> 
    </div> 
`;
}