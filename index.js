import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42; // Max Page eintragen
let page = 1; // const => let
let searchQuery = "";

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
  ); // ?page= noch einbauen `
  const data = await response.json(); // Hier holen wir uns die Daten aus der URL und speichern diese in data ab
  console.log(data);
  data.results.forEach((character) => {
    const characterCard = CharacterCard(character);
    cardContainer.append(characterCard);
  });
}
fetchCharacters();

// Next Button
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    // prüfen ob die aktuelle Seite kleiner ist, als die maximale Seite
    page++; // Wenn die aktuelle Seite kleiner ist, wird diese um eine Seite erhöht
    cardContainer.innerHTML = ""; // der aktuelle Inhalt wird geleert
    fetchCharacters();
    counter();
  }
});

// Previous Button
prevButton.addEventListener("click", () => {
  if (page > 1) {
    // prüfen ob die aktuelle Seite größer ist als 1
    page--; // Wenn die aktuelle Seite größer ist, wird diese um eine Seite verkleinert
    cardContainer.innerHTML = ""; // der aktuelle Inhalt wird geleert
    fetchCharacters();
    counter();
  }
});

// Counter
function counter() {
  pagination.textContent = `${page}/${maxPage}`;
}
counter();

//SearchBar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = document.querySelector('[data-js="search-bar__input"]').value; // Value des Inputs
  cardContainer.innerHTML = "";
  fetchCharacters();
});
