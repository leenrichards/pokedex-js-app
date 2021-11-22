const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


//---------------------------------------------------------------------------------
//---------------------------      IIFE FUNCTION ----------------------------------
//--------Array of Pokemons, with their names, heights and types-------------------
//---------------------------------------------------------------------------------
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    //-----------------function to get all pokemons----------------------------------
    function getAll() {
        return pokemonList;
    }
    //-----------------end function to get ----------------------------------------

    //----------------function to add pokemon---------------------------------------
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
    //----------------end function to add ----------------------------------

    let modalContainer = document.querySelector("#modal-container");

    //----------------function to show modal---------------------------------------
    function showModal(pokemon) {
        //clear existing modal content
        modalContainer.innerHTML = "";

        let modal = document.createElement("div");
        modal.classList.add('modal');

        //add modal content


        let closeButtonElement = document.createElement("button");
        closeButtonElement.innerHTML = "<img src='img/close.png' width='20px' height='20px'>";
        closeButtonElement.style.cursor = "pointer"
        closeButtonElement.classList.add("modal-close");
        //closeButtonElement.innerText = "Close";

        closeButtonElement.addEventListener("click", hideModal);

        let titleElement = document.createElement("span");
        titleElement.classList.add("title-element");
        titleElement.innerText = pokemon.name;

        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add("pokemon-picture");

        let typeElementTitle = document.createElement("p");
        typeElementTitle.classList.add("type-elementTitle");
        // typeElementTitle.innerText = "Type:";

        let heightElement = document.createElement("p");
        heightElement.classList.add("height-element");
        heightElement.innerText = "Height:" + pokemon.height;



        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(typeElementTitle);

        pokemon.types.forEach(item => {
            let contentElement = document.createElement('text-area');
            contentElement.classList.add("type-element");
            contentElement.innerText = item.type.name;
            contentElement.style.background = colours[item.type.name];

            modal.appendChild(contentElement);
        });


        modalContainer.appendChild(modal);
        modalContainer.classList.add("is-visible");
    }
    //---------------------- close function show modal---------------------

    //----------------function close modal---------------------------------------
    function hideModal(title, text) {
        modalContainer.classList.remove("is-visible")
    }


    //---------------------Find Pokemon----------------------------------------
    function findPokemon(pokemon) {
        //reset all box colors to white
        resetColors();

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
            showModal(pokemon);
            console.log(pokemon);
        });
    }
    //--------------End of pokemon details---------------------------------

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


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
    getPokemon.forEach(function (getPokemon) {
        pokemonRepository.addListItem(getPokemon);
    });

});
//--------------End of getting pokemons from repository------------------------


//--------------Reset all background colors to white ------------------
function resetColors() {
    let getPokemon = pokemonRepository.getAll();
    getPokemon.forEach(function (getPokemon) {
        let pokemonBox = document.querySelector('.' + getPokemon.name);
        pokemonBox.style.backgroundColor = "white";
    });
}
//---------------End Reset background colors----------------------------

