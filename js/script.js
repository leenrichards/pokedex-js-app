//-------Array of Pokemons, with their names, heights and types -------------------
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Diglett',
            height: 0.2,
            type: ['ground']
        },
        {
            name: 'Slopoke',
            height: 1.2,
            type: ['Psychic', 'Water']
        },
        {
            name: 'Pichu',
            height: 0.3,
            type: ['Electric']
        },
        {
            name: 'Metapod',
            height: 0.7,
            type: ['Bug']
        },
        {
            name: 'Jynx',
            height: 1.4,
            type: ['Psychic', 'Ice']
        },
        {
            name: 'Wigglytuff',
            height: 1,
            type: ['Fairy', 'Normal']
        },
        {
            name: 'Rattata',
            height: 0.3,
            type: ['Normal']
        },
        {
            name: 'Seel',
            height: 1.1,
            type: ['Water']
        },
        {
            name: 'Cubone',
            height: 0.4,
            type: ['Ground']
        },
        {
            name: 'Sudowoodo',
            height: 1.2,
            type: ['Rock']
        }
    ];

    //function to get all pokemons
    function getAll() {
        return pokemonList;
    }

    //function to add pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})();
//-------End of array of Pokemons-----------------------------------


//Set pokemon count number for new row addition in loop
let pokemonCount = 1;

//Open main div
document.write("<div class='pokemon-list'> ");

//--------------------------- Bonus Task: Add a new Pokemon----------------------
let newPokemon = {
    name: 'Butterfree',
    height: 1.1,
    type: ['Bug', 'Flying']
}
// Only add Pokemon if it's an object with 3 keys
if (typeof newPokemon == 'object' && Object.keys(newPokemon).length === 3) {
    pokemonRepository.add(newPokemon)
}
//--------------------------- End Bonus Task to add ----------------------

//-------------------- Get all pokemons from repository--------------------
let getPokemon = pokemonRepository.getAll();
//---------------------End of getting pokemons from repository

//---------------------Find Pokemon----------------------------------------
function findPokemon(pokemonName) {
    let seachResult = getPokemon.filter(function (pokemon) {
        return pokemon.name == pokemonName;
    });

    //If pokemon not found, alert user    
    if (typeof seachResult[0] === 'undefined') {
        alert('Sorry ' + document.getElementById("pokemonName").value + 'is not in this repository.');
    }
    //otherwise color the box of the found Pokemon
    else {
        let pokemonBox = document.querySelector('.' + pokemonName);
        pokemonBox.style.backgroundColor = "lightyellow";
    }
}
//---------------------End Find Pokemon----------------------------------

//-------------Get search parameter from searchbox-------------------------
function pokemonToFind() {
    findPokemon(document.getElementById("pokemonName").value);
}
//-------------End of getting seach parameter -----------------------

//---------------START TO SHOW LIST OF POKEMONS------------------------
// Loop through each pokemon in repository
getPokemon.forEach(function (getPokemon) {
    //Create new row for every 5 Pokemons
    if (pokemonCount === 6) {
        document.write("</div>")
        document.write("<div class='pokemon-list'> ");
        pokemonCount = 1;
    }
    //Temporaty- If Pokmeon height is larger then 1.2 then highlight it
    if (getPokemon.height > 1.2) {
        document.write("<div class='pokemon-list__item " + getPokemon.name + "'>");
        document.write("<div class='pokemon-name'>" + getPokemon.name + "</div>");
        document.write("<div class='pokemon-height' >Height:" + getPokemon.height + "- Wow that's tall!</div >");
    } else {
        document.write("<div class='pokemon-list__item " + getPokemon.name + "'>");
        document.write("<div class='pokemon-name'>" + getPokemon.name + "</div>");
        document.write("<div class='pokemon-height' >Height:" + getPokemon.height + "</div >");
    }
    document.write("</div>")
    pokemonCount = pokemonCount + 1;
});
document.write("</div>")
//--------------END SHOWING LIST OF POKEMEONS------------------------

//--------------Reset all background colors to white ------------------
function resetColors() {
    getPokemon.forEach(function (getPokemon) {
        let pokemonBox = document.querySelector('.' + getPokemon.name);
        pokemonBox.style.backgroundColor = "white";
    });
}
//---------------End Reset background colors----------------------------