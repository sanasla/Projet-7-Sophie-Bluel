//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const WORKS_API = BASE_URL + "works";
const CATEGORY_API = BASE_URL + "categories";

//Variables
//this is the html div to show on it the works objects
var worksGallery;
//this is the list of works getted from api
var workList;
//this is the selected category in the filter
var selectCategoryId = 0;
//this is a boolean to identify if we should show works on modal or not : if not the works woill be showed on the main galery
var showWorkOnModal = false;

//waiting fot the Lunch of the page
window.onload = function () {
  //recuperer et afficher LES TRAVAUX DANS LA GALERIE
  fetchWorks();

  //fetch and show categories
  fetchCATEGORIES();

  //MODIFICATION LOGIN EN LOGOUT SI NECESSAIRE
  check_login_logout();
};

/************************* Fonctions **********************/

//RECUPERATION DES TRAVAUX
function fetchWorks() {
  //CREATION DU FETCH POUR IMPORTER LES TRAVAUX
  fetch(WORKS_API)
    .then((reponse) => reponse.json())
    .then((works) => {
      //save varibles
      workList = works;

      //check work galery
      if (showWorkOnModal) {
        worksGallery = document.querySelector(".modal-gallery");
      } else {
        worksGallery = document.querySelector(".gallery");
      }

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

  //check work galery
  if (showWorkOnModal) {
    //add your btn to figure
    createDeleteButton(figure, work);
  }

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

function check_login_logout() {
  if (sessionStorage.getItem("token")) {
    // CHANGER LOGIN à LOGOUT
    let loginLogoutLink = document.getElementById("login_logout");
    loginLogoutLink.textContent = "logout";
    //POUR FAIRE APPARAITRE LE BANDEAU EDITION
    let bandeau_edit = document.getElementById("edition");
    bandeau_edit.style.display = "flex";
    //POUR FAIRE APPARAITRE LA MODIFICATION DES PROJETS
    let projet_modif = document.getElementById("modif_projet");
    projet_modif.style.display = "inline";

    //AJOUT LISTENER SUR CLIQUE BOUTON MODIFIER POUR APPELER OUVERTURE MODALE
    projet_modif.addEventListener("click", OPEN_MODAL);

    //POUR CACHER LES FILTRES EN MODE EDITION
    let button_filter = document.querySelector(".filter");
    button_filter.style.display = "none";
    // DÉCONNEXION LORS DU CLIQUE SUR LOGOUT
    loginLogoutLink.addEventListener("click", function (event) {
      event.preventDefault();

      // SUPPRESSION DU TOKEN DU SESSION STORAGE
      sessionStorage.removeItem("token");

      // REDIRECTION VERS LA PAGE D'ACCUEIL
      window.location.href = "index.html";
    });
  }
}

//CREATION D'UN BOUTON SUPPRIMER POUR CHAQUE IMAGE
function createDeleteButton(figure, work) {
  let button = document.createElement("i");
  button.classList.add("fa-regular", "fa-trash-can");
  button.addEventListener("click", DELETE_WORK);
  button.id = work.id;
  figure.appendChild(button);
}
