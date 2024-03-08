//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const WORKS_API = BASE_URL + "works";
const CATEGORY_API = BASE_URL + "categories";

//Variables
var worksGallery;
var workList;
var selectCategoryId = 0;

//recuperer et afficher LES TRAVAUX DANS LA GALERIE
fetchWorks();
fetchCATEGORIES();

//RECUPERATION DES TRAVAUX
function fetchWorks() {
  //CREATION DU FETCH POUR IMPORTER LES TRAVAUX
  fetch(WORKS_API)
    .then((reponse) => reponse.json())
    .then((works) => {
      console.log(works);
      worksGallery = document.querySelector(".gallery");
      //save varibles
      workList = works;

      updateWorks();
    });
}

function updateWorks() {
  worksGallery.innerHTML = "";
  for (let i = 0; i < workList.length; i++) {
    let work = workList[i];
    if (work.categoryId === selectCategoryId || selectCategoryId === 0) {
      showWork(work);
    }
  }
}

function showWork(work) {
  let figure = document.createElement("figure");
  let imgWorks = document.createElement("img");
  let figcaption = document.createElement("figcaption");

  imgWorks.src = work.imageUrl;
  figcaption.innerHTML = work.title;
  figure.appendChild(imgWorks);
  figure.appendChild(figcaption);

  worksGallery.appendChild(figure);
}

//RECUPERATION DES CATEGORIES
function fetchCATEGORIES() {
  fetch(CATEGORY_API)
    .then((reponse) => reponse.json())
    .then((categories) => {
      console.log(categories);

      let filterWorks = new Set(categories);

      let nouvelleCategorie = { id: 0, name: "Tous" };
      //create btns
      let filtersZone = document.querySelector(".filter");
      createFilterButton(nouvelleCategorie, filtersZone);

      for (let category of filterWorks) {
        createFilterButton(category, filtersZone);
      }

      //select category :selectionner la categorie "tous" par défaut lors de chargement de page ou chargement des filtres
      selectCategory(nouvelleCategorie.id);
    });
}

//CREATION DES BOUTONS FILTRES
function createFilterButton(category, filtersZone) {
  let categoryLink = document.createElement("a");
  categoryLink.id = category.id;
  categoryLink.classList.add("category");
  categoryLink.innerHTML = category.name;

  filtersZone.appendChild(categoryLink);

  //AJOUT DU EVENTLISTERNER SUR LES FILTRES
  categoryLink.addEventListener("click", function () {
    selectCategory(category.id);
  });
}

//AJOUT DE LA CLASSE SELECTED A UNE CATEGORY
function selectCategory(categoryId) {
  document.getElementById(selectCategoryId).classList.remove("selected");

  document.getElementById(categoryId).classList.add("selected");

  selectCategoryId = categoryId;
  updateWorks();
}
