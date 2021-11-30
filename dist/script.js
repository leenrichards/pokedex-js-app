const colours = { normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C", grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1", ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A", rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746", steel: "#B7B7CE", fairy: "#D685AD" }; let pokemonRepository = function () { let e = [], t = "https://pokeapi.co/api/v2/pokemon/?limit=60"; function n(t) { "object" == typeof t && "name" in t && "detailsUrl" in t ? e.push(t) : alert("Sorry, could not add " + t.name + ".") } let o = document.querySelector("#modal-container"); function i(e) { let t = e.detailsUrl; return fetch(t).then(function (e) { return e.json() }).then(function (t) { e.imageUrl = t.sprites.front_default, e.imageUrlBack = t.sprites.back_default, e.height = t.height, e.weight = t.weight, e.types = t.types }).catch(function (e) { console.error(e) }) } function a(e) { i(e).then(function () { !function (e) { let t = $(".modal-body"), n = $(".modal-title"); $(".modal-header"), n.empty(), t.empty(); let o = $("<h1>" + e.name + "</h1>"), i = $("<img class='modal-image' style='width:30%'>"); i.attr("src", e.imageUrl); let a = $("<img class='modal-image' style='width:30%'>"); a.attr("src", e.imageUrlBack); let l = $("<p><b>Height:</b> " + e.height + "</p>"), r = $("<p><b>Weight: </b>" + e.weight + "</p>"); n.append(o), t.append(i), t.append(a), t.append(l), t.append(r); let c = $("<div class ='divType'></div>"); e.types.forEach(e => { let n = $("<text-area>" + e.type.name + "</text-area>"); n.addClass("type-element"), n.css({ "background-color": colours[e.type.name] }), c.append(n), t.append(c) }) }(e), console.log(e) }) } return window.addEventListener("keydown", e => { "Escape" === e.key && o.classList.contains("is-visible") && function (e, t) { o.classList.remove("is-visible") }() }), { getAll: function () { return e }, add: n, findPokemon: function (t) { resetColors(); let n = document.getElementById("pokemonName").value; if (n = n.toLowerCase(), void 0 === e.filter(function (e) { return e.name === n })[0]) alert("Sorry " + document.getElementById("pokemonName").value + " is not in this repository."); else { let e = document.querySelector("." + n); e.style.backgroundColor = "#ffcb05", e.focus() } }, addListItem: function (e) { let t = document.querySelector(".list-group"), n = document.createElement("li"); n.classList.add("list-group-item"); let o = document.createElement("button"); o.innerText = e.name, o.classList.add("button-class", "btn-primary", "btn-block", "btn-large"), o.setAttribute("data-target", "#pokemonModal"), o.setAttribute("data-toggle", "modal"), o.classList.add(e.name), n.appendChild(o), t.appendChild(n), i(e).then(function () { let t = document.createElement("div"); o.appendChild(t); let n = document.createElement("img"); n.src = e.imageUrl, t.appendChild(n) }), o.addEventListener("click", function (t) { a(e) }) }, loadList: function () { return fetch(t).then(function (e) { return e.json() }).then(function (e) { e.results.forEach(function (e) { n({ name: e.name, detailsUrl: e.url }) }) }).catch(function (e) { console.error(e) }) }, loadDetails: i, showDetails: a } }(); function resetColors() { pokemonRepository.getAll().forEach(function (e) { document.querySelector("." + e.name).style.backgroundColor = "#007bff" }) } pokemonRepository.loadList().then(function () { pokemonRepository.getAll().forEach(function (e) { pokemonRepository.addListItem(e) }) });