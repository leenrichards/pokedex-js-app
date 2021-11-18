//-------Array of Pokemons, with their names, heights and types -------------------
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';


    //function to get all pokemons
    function getAll() {
        return pokemonList;
    }

    //function to add pokemon
    function add(pokemon) {
        // Only add Pokemon if it's an object with 3 keys
        if (typeof pokemon == 'object' &&
            "name" in pokemon &&
            "detailsUrl" in pokemon) {
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


    //function to display list of pokemons in a flex list
    function addListItem(pokemon) {
        let pokemonNewList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let listButton = document.createElement("button");
        listButton.innerText = pokemon.name;
        listButton.classList.add('pokemonButton');
        listButton.classList.add(pokemon.name);
        listItem.appendChild(listButton);
        pokemonNewList.appendChild(listItem);
        listButton.addEventListener('click', function (event) {
            showDetails(pokemon)
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //-------------------- Show pokemon details--------------------
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    //--------------End of pokemon details---------------------------------

    return {
        getAll: getAll,
        add: add,
        findPokemon: findPokemon,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();
//-------End of array of Pokemons-----------------------------------


//-------------------- Get all pokemons from repository--------------------
pokemonRepository.loadList().then(function () {
    let getPokemon = pokemonRepository.getAll();
    //Loop through pokemons
    getPokemon.forEach(function (getPokemon, index) {
        pokemonRepository.addListItem(getPokemon);
    });
});
//--------------End of getting pokemons from repository------------------------



//--------------Reset all background colors to white ------------------
function resetColors() {
    getPokemon.forEach(function (getPokemon) {
        let pokemonBox = document.querySelector('.' + getPokemon.name);
        pokemonBox.style.backgroundColor = "white";
    });
}
//---------------End Reset background colors----------------------------