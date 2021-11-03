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

    //Write and alert pokemon name
    function showDetails(pokemon) {
        alert(pokemon);
        console.log(pokemon);
    }


    //function to display list of pokemons in a flex list
    function addListItem(pokemon) {
        let pokemonNewList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let listButton = document.createElement("button");
        listButton.innerText = pokemon;
        listButton.classList.add('pokemonButton');
        listButton.classList.add(pokemon);
        listItem.appendChild(listButton);
        pokemonNewList.appendChild(listItem);
        listButton.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }
    //function to get all pokemons
    function getAll() {
        return pokemonList;
    }

    //function to add pokemon
    function add(pokemon) {
        // Only add Pokemon if it's an object with 3 keys
        if (typeof newPokemon == 'object' && Object.keys(newPokemon).length === 3) {
            pokemonList.push(pokemon);
        } else {
            alert("Sorry, could not add " + pokemon.name + ".")
        }
    }

    //---------------------Find Pokemon----------------------------------------
    function findPokemon(pokemon) {

        let pokemonName = document.getElementById("pokemonName").value;

        //pokemonName = pokemonName.toLowerCase();
        let searchResult = pokemonList.filter(function (pokemon) {
            return pokemon.name === pokemonName;

        });

        //If pokemon not found, alert user    
        if (typeof searchResult[0] === 'undefined') {
            alert('Sorry ' + document.getElementById("pokemonName").value + ' is not in this repository.');
        }
        //otherwise color the box of the found Pokemon
        else {
            let pokemonBox = document.querySelector("." + pokemonName);
            pokemonBox.style.backgroundColor = "lightyellow";
        }
    }
    //---------------------End Find Pokemon----------------------------------

    return {
        getAll: getAll,
        add: add,
        findPokemon: findPokemon,
        addListItem: addListItem
    };
})();
//-------End of array of Pokemons-----------------------------------

//--------------------------- Bonus Task: Add a new Pokemon----------------------
let newPokemon = {
    name: 'Butterfree',
    height: 1.1,
    type: ['Bug', 'Flying']
}
pokemonRepository.add(newPokemon);
//--------------------------- End Bonus Task to add ----------------------

//-------------------- Get all pokemons from repository--------------------
let getPokemon = pokemonRepository.getAll();
//---------------------End of getting pokemons from repository


//---------------START TO SHOW LIST OF POKEMONS------------------------
getPokemon.forEach(function (getPokemon, index) {
    pokemonRepository.addListItem(getPokemon.name);
});
//--------------END SHOWING LIST OF POKEMEONS------------------------

//--------------Reset all background colors to white ------------------
function resetColors() {
    getPokemon.forEach(function (getPokemon) {
        let pokemonBox = document.querySelector('.' + getPokemon.name);
        pokemonBox.style.backgroundColor = "white";
    });
}
//---------------End Reset background colors----------------------------