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
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';

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
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");


        modalTitle.empty();
        modalBody.empty();

        // element for name in modal
        let nameElement = $("<h1>" + pokemon.name + "</h1>");

        let imageElement = $("<img class='modal-image' style='width:30%'>");
        imageElement.attr("src", pokemon.imageUrl);

        let imageElementBack = $("<img class='modal-image' style='width:30%'>");
        imageElementBack.attr("src", pokemon.imageUrlBack);


        let heightElement = $("<p><b>" + "Height:</b> " + pokemon.height + "</p>");
        let weightElement = $("<p><b>" + "Weight: </b>" + pokemon.weight + "</p>");


        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);

        let divElement = $("<div class ='divType'></div>");

        //modalBody.append(divElement);
        pokemon.types.forEach(item => {
            let contentElement = $("<text-area>" + item.type.name + "</text-area>");
            contentElement.addClass("type-element");
            contentElement.css({
                "background-color": colours[item.type.name]
            });
            divElement.append(contentElement);
            modalBody.append(divElement);
        });

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

        //convert search string lowercase    
        pokemonName = pokemonName.toLowerCase();

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
            pokemonBox.style.backgroundColor = "#ffcb05";
            pokemonBox.focus();
        }
    }
    //---------------------End Find Pokemon----------------------------------


    //function to display list of pokemons in a flex list
    function addListItem(pokemon) {
        let pokemonNewList = document.querySelector(".list-group");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        let listButton = document.createElement("button");
        listButton.innerText = pokemon.name;
        listButton.classList.add("button-class", "btn-primary", "btn-block", "btn-large");
        listButton.setAttribute("data-target", "#pokemonModal");
        listButton.setAttribute("data-toggle", "modal");
        listButton.classList.add(pokemon.name);
        listItem.appendChild(listButton);
        pokemonNewList.appendChild(listItem);

        //add pokemon image to button
        loadDetails(pokemon).then(function () {
            let imgDiv = document.createElement("div");
            listButton.appendChild(imgDiv);

            let pokemonImg = document.createElement("img");
            pokemonImg.src = pokemon.imageUrl;
            imgDiv.appendChild(pokemonImg);
        })
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
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;

        }).catch(function (e) {
            console.error(e);
        });
    }

    //-------------------- Show pokemon details--------------------
    function showDetails(pokemon) {

        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    //--------------End of pokemon details---------------------------------

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
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
        //Reset color to orinial background color
        pokemonBox.style.backgroundColor = "#007bff";
    });
}
//---------------End Reset background colors----------------------------

