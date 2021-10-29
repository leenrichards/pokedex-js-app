// Array of Pokemons, with their names, heights and types 
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
]

//Set pokemon count number for new row addition in loop
let pokemonCount = 1;

//Open main div
document.write("<div class='pokemon-list'> ");

pokemonList.forEach(function (getPokemon) {

    //Create new row for every 5 Pokemons
    if (pokemonCount === 6) {
        document.write("</div>")
        document.write("<div class='pokemon-list'> ");
        pokemonCount = 1;
    }

    //Temporaty- If Pokmeon height is larger then 1.2 then highlight it
    if (getPokemon.height > 1.2) {
        document.write("<div class='pokemon-list__item' style='background-color:lightyellow;'>");
        document.write("<div class='pokemon-name'>" + getPokemon.name + "</div>");
        document.write("<div class='pokemon-height' >Height:" + getPokemon.height + "- Wow that's tall!</div >");
    } else {
        document.write("<div class='pokemon-list__item'>");
        document.write("<div class='pokemon-name'>" + getPokemon.name + "</div>");
        document.write("<div class='pokemon-height' >Height:" + getPokemon.height + "</div >");
    }

    document.write("</div>")
    pokemonCount = pokemonCount + 1;
}); //end for each

// Close main div
document.write("</div>")