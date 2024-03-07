const searchInput = document.getElementById("search");
const cardBank = document.querySelector(".card-bank");
const pokemonCardTemplate = document.querySelector("[data-pokemon-template]");
const resultBox = document.querySelector(".result-box");

// Fonction pour créer une carte Pokémon
function createPokemonCard(data) {
	const pokemonId = data.id;
	const cardElement = document.createElement("div");
	cardElement.classList.add("card-container");
	cardElement.draggable = true;
	cardElement.setAttribute("ondragstart", "onDragStart(event)");
	const uniqueId = `pokemon-${pokemonId}`;
	cardElement.setAttribute("id", uniqueId);
	cardElement.innerHTML = `
        <p style="pointer-events: none;">${data.name}</p>
        <img src="${data.sprites.front_default}" style="pointer-events: none;" alt="${data.name}" />
    `;
	cardBank.appendChild(cardElement);
}

// Fonction pour effectuer la recherche et afficher les suggestions
function searchAndDisplaySuggestions(searchTerm) {
	resultBox.innerHTML = "";
	fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Failed to fetch Pokémon data");
			}
			return res.json();
		})
		.then((data) => {
			const pokemonNames = data.results.map((pokemon) => pokemon.name);
			const filteredNames = pokemonNames.filter((name) =>
				name.startsWith(searchTerm.toLowerCase())
			);
			filteredNames.forEach((name) => {
				const suggestionElement = document.createElement("div");
				suggestionElement.textContent = name;
				suggestionElement.classList.add("suggestion");
				resultBox.appendChild(suggestionElement);
			});
		})
		.catch((error) => {
			console.error("Error fetching Pokémon data:", error);
		});
}

// Événement pour détecter les changements dans la barre de recherche
searchInput.addEventListener("input", function () {
	const searchTerm = searchInput.value.trim();
	searchAndDisplaySuggestions(searchTerm);
});

resultBox.addEventListener("click", function (event) {
	if (event.target.classList.contains("suggestion")) {
		searchInput.value = event.target.textContent;
		resultBox.innerHTML = "";
		// Appeler la fonction pour créer la carte Pokémon
		fetchPokemonByName(event.target.textContent.toLowerCase());
	}
});

// Requête à l'API PokeAPI pour obtenir les informations du Pokémon par son nom
function fetchPokemonByName(name) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Pokemon not found");
			}
			return res.json();
		})
		.then((data) => {
			createPokemonCard(data);
		})
		.catch((error) => {
			console.error("Error fetching Pokemon data by name:", error);
		});
}
