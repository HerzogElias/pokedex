function getAllPokemonHTML(i,firstType,weightInKg) {
    return ` 
    <div onclick="openBigPokemonCard(${i}), ${firstType},${weightInKg}" class="oneSmallPokemonCard">  
       <span class="end"> #${allPokemons[i].id}</span> 
        <h2>${allPokemons[i].name} </h2>
        <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>`
}


/*function getBigPokemonCardHTML(i, weightInKg) {
    return`
    <div class="bigPokemonCard"> 
    <div class ="bigPokemonCardTop"> 
      <h2>${allPokemons[i].name} </h2>
    <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>
    <div class="bigPokemonCardMiddle">  
    <button onclick="openBigPokemonGeneral()" class="bigPokemonButton" > General </button>
    <button onclick="openBigPkemonspeizifies(${i})" class="bigPokemonButton" id="pokemonBigStats"> Specifices </button> 
    </div>
    <divclass="bigPokemonGenerals"> 
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
    <img class="bigPokemonWayPicutre" src="img/zurueck.png"
    <img class="bigPokemonWayPicutre" src="img/hin.png">
    </div>
     `;}

function getPokemonStatsHTML(hp, attack, defense, spezial_attack, spezial_defense, speed, i) {
    return`
       <div class="bigPokemonCard"> 
    <div class ="bigPokemonCardTop"> 
      <h2>${allPokemons[i].name} </h2>
    <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>
    <div class="bigPokemonCardMiddle">  
    <button onclick="openBigPokemonGeneral()" class="bigPokemonButton"  id="pokemonBigGeneral"> General </button>
    <button onclick="openBigPkemonspeizifies(${i})" class="bigPokemonButton" id="pokemonBigStats"> Specifices </button> 
    </div>
    <div class="bigPokemonGenerals"> 
    <table>
        <tr>
            <td>HP</td>
            <td>${hp}</td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${attack} </td>
        </tr>
          <tr>
            <td>Defense</td>
            <td>${defense}</td>
        </tr>
          <tr>
            <td>Spezial Attack </td>
            <td>${spezial_attack}</td>
        </tr>
          <tr>
            <td>Spezial Defense</td>
            <td>${spezial_defense}</td>
        </tr>
           <tr>
            <td>Speed</td>
            <td>${speed}</td>
        </tr>
    </table>
    </div> 
    <img class="bigPokemonWayPicutre" src="img/zurueck.png"
    <img class="bigPokemonWayPicutre" src="img/hin.png">
    </div>`;
}*/

function getBigPokemonCardHTML(i, weightInKg){
    return`
    <div class="bigPokemonCard"> 
    <div class ="bigPokemonCardTop"> 
      <h2>${allPokemons[i].name} </h2>
    <img class="pokemonImage" src="${allPokemons[i].image}">
    </div>
    <div class="bigPokemonCardMiddle">  
    <button onclick="openBigPokemonGeneral(${i}, ${weightInKg})" class="bigPokemonButton"> General </button>
    <button onclick="openBigPokemonSpeizifies(${i})" class="bigPokemonButton" id="pokemonBigStats"> Specifices </button> 
    </div>
    <div id="bigPokemonGeneral">  </div>
    <div id="bigPokemonStats" </div>`;
} 

function openBigPokemonGeneral(i, weightInKg){
console.log('open big general funktioniert');
let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');
let bigPokemonStats = document.getElementById('bigPokemonStats');

// Clear the other div's content
bigPokemonStats.innerHTML = "";

bigPokemonGeneral.innerHTML=`   
    <div class="bigPokemonGenerals"> 
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
    <img onclick="lessBigPokemon(${i} ${weightInKg})" class="bigPokemonWayPicutre" src="img/zurueck.png">  
    <img onclick="closeBigPokemon()"  class="bigPokemonWayPicutre" src="img/deleate.png">
    <img onclick="nextBigPokemon()" class="bigPokemonWayPicutre" src="img/hin.png"> 
    </div> 
`;
}

function openBigPokemonSpeizifies(i){
console.log('States funkiton funktioniert');
let bigPokemonStats= document.getElementById('bigPokemonStats');

let bigPokemonGeneral = document.getElementById('bigPokemonGeneral');

// Clear the other div's content
bigPokemonGeneral.innerHTML = "";

bigPokemonStats.innerHTML =`
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
`;
}

function lessBigPokemon(i) {
    console.log('less big Pokemon funktioniert');
    if (i > 0) {
        i--;
    } else {
        i = allPokemons.length - 1; // Zum letzten Pokémon wechseln
    }
    getBigPokemonCardHTML(i);
    openBigPokemonGeneral(i);
}

function closeBigPokemon(){
    console.log('close big Pokemon hat funktioniert');
    let overlayRef = document.getElementById('overlayBigPokemon')
    overlayRef.classList.toggle('dNone');
}

function nextBigPokemon(i,weightInKg){
    console.log('next big pokemon geht!');

}

