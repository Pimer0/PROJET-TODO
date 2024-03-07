ce code permet d'executer un simple web app de tier list.

Les features principales sont :

- Une interface de recherche
- créer une tier list
- permettre le drag and drop
- sauvegarde en local storage

notre web app sera basée sur l'api pokémon et aussi sur l'api drag and drop.

Explication du role des fichiers :

- index.html :

Contient le contenu principal de la page.

Une section avec la classe search-wrapper contenant :
Une étiquette pour un champ de recherche, identifiée par for="search".
Un champ de recherche <input type="search" id="search">.
Une boîte de résultat vide <div class="result-box"></div>, qui va obtenir les donnée de l'api en fonction des premières letres tapées.
Une section <div id="board"> qui est le tableau de classement :
Composée de six rangées <div class="row">.
Chaque rangée contient une balise <div class="label"> qui représente la catégorie de classement (S, A, B, C, D, F).
Une <div class="card-bank"> qui est un conteneur pour les cartes de Pokémon créer apres recherche.


- search.js : Sélection des éléments du DOM :

Il sélectionne plusieurs éléments du DOM en utilisant document.getElementById et document.querySelector, tels que l'élément de recherche, le conteneur de cartes de Pokémon, un modèle de carte de Pokémon, et une boîte de résultats.
Fonction pour créer une carte Pokémon (createPokemonCard) :

Cette fonction prend les données d'un Pokémon en entrée et crée dynamiquement une carte de Pokémon.
Elle utilise les données fournies pour définir l'identifiant unique de la carte, le nom du Pokémon et l'URL de son image.
Fonction pour rechercher et afficher des suggestions (searchAndDisplaySuggestions) :

Cette fonction prend un terme de recherche en entrée, effectue une requête à l'API PokeAPI pour obtenir une liste de Pokémon, puis filtre les noms des Pokémon correspondant au terme de recherche.
Elle crée des éléments de suggestion pour chaque nom de Pokémon filtré et les affiche dans la boîte de résultats.
Événements d'entrée et de clic :

Il écoute les événements d'entrée dans le champ de recherche et déclenche la fonction de recherche et d'affichage des suggestions en fonction du contenu entré.
Il écoute également les clics sur les suggestions et met à jour le champ de recherche avec le nom du Pokémon sélectionné, puis déclenche une requête pour récupérer les données de ce Pokémon.
Fonction pour récupérer les données d'un Pokémon par son nom (fetchPokemonByName) :

Cette fonction prend un nom de Pokémon en entrée et effectue une requête à l'API PokeAPI pour obtenir les données de ce Pokémon.
En cas de succès, elle appelle la fonction createPokemonCard pour créer une carte de Pokémon avec les données récupérées.

- card.js : 
Sélection des éléments de carte :

Il sélectionne toutes les cartes de Pokémon avec la classe .card-container à l'aide de document.querySelectorAll(".card-container").
Gestion des événements de glisser-déposer :

Il définit deux fonctions, onDragStart et onDragEnd, pour gérer le début et la fin du glisser-déposer.
La fonction onDragStart est déclenchée lorsque le glisser-déposer commence sur une carte. Elle configure les données de transfert pour l'élément en cours de glissement.
La fonction onDragEnd est déclenchée lorsque le glisser-déposer se termine sur une carte. Elle rétablit la visibilité de l'élément glissé et imprime un message dans la console.
Affectation des gestionnaires d'événements :

Il itère sur toutes les cartes de Pokémon sélectionnées et leur affecte les fonctions onDragStart et onDragEnd pour les événements ondragstart et ondragend.

- row.js : 

Sélection des éléments de rangée :

Il sélectionne toutes les rangées de classement avec la classe .row à l'aide de document.querySelectorAll(".row").
Définition des couleurs des rangées :

Il définit un tableau de couleurs pour les rangées.
Gestion des événements de glisser-déposer :

La fonction onDragOver est déclenchée lorsqu'un élément est glissé au-dessus d'une rangée. Elle empêche le comportement par défaut de l'événement.
La fonction onDrop est déclenchée lorsqu'un élément est lâché sur une rangée. Elle empêche également le comportement par défaut de l'événement.
Lorsqu'un élément est lâché sur une rangée, cette fonction récupère l'identifiant de l'élément glissé, trouve cet élément dans le document, le déplace vers la rangée cible, puis imprime un message dans la console pour indiquer que l'élément a été lâché.
Affectation des gestionnaires d'événements :

Il itère sur toutes les rangées de classement sélectionnées et leur affecte la fonction onDragOver pour l'événement ondragover et la fonction onDrop pour l'événement ondrop.
  
