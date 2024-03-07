const searchInput = document.getElementById("search");
const cardBank = document.querySelector(".card-bank");
const pokemonCardTemplate = document.querySelector("[data-pokemon-template]"); // Déplacer la déclaration ici

searchInput.addEventListener("input", function () {
	const searchTerm = searchInput.value.toLowerCase().trim();

	// Requête à l'API PokeAPI pour obtenir les informations du Pokémon par son nom
	fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Pokemon not found");
			}
			return res.json();
		})
		.then((data) => {
			const pokemonId = data.id;

			// Requête à l'API PokeAPI pour obtenir les informations complètes du Pokémon par son ID
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
				.then((res) => res.json())
				.then((data) => {
					/* const card = pokemonCardTemplate.content.cloneNode(true); */
					const cardElement = document.createElement("div");
					cardElement.classList.add("card-container");
					cardElement.draggable = true;
					cardElement.setAttribute("ondragstart", "onDragStart(event)");

					// Générer un ID unique pour la carte du Pokémon
					const uniqueId = `pokemon-${pokemonId}`;

					// Attribution de l'ID unique à la carte du Pokémon
					cardElement.setAttribute("id", uniqueId);

					// Remplissez les détails du Pokémon dans la carte
					cardElement.innerHTML = `
                        <p style="pointer-events: none;">${data.name}</p>
                        <img src="${data.sprites.front_default}" style="pointer-events: none;" alt="${data.name}" />
                    `;

					console.log(cardElement);

					// Effacez la banque de cartes avant d'ajouter une nouvelle carte
					/* cardBank.innerHTML = ""; */

					// Ajoutez la carte remplie à la banque de cartes
					cardBank.appendChild(cardElement);
				})
				.catch((error) => {
					console.error("Error fetching Pokemon data by ID:", error);
				});
		})
		.catch((error) => {
			console.error("Error fetching Pokemon data by name:", error);
		});
});
