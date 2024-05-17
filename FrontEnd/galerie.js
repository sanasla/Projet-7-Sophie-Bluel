//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const WORKS_API = BASE_URL + "works";
const CATEGORY_API = BASE_URL + "categories";

//Variables
//liste des works obtenus de api
var workList;
//la selection des categories dans le filtre
var selectCategoryId = 0;

//waiting fot the Lunch of the page
window.onload = function () {
  //recuperer et afficher LES TRAVAUX DANS LA GALERIE
  fetchWorks(false);

  //fetch and show categories
  fetchCATEGORIES();

  //MODIFICATION LOGIN EN LOGOUT SI NECESSAIRE
  check_login_logout();
};

/************************* Fonctions **********************/

//RECUPERATION DES TRAVAUX

/**fetchworks qui recupere les works sous forme json et le met dans variable worklist puis appel de fonction updateworks
 *
 * @param {*} showWorkOnModal est un parametre utilisé  pour distinguer entre le modale et la page pricipale, 
  issi ds la page  est en false
 */
function fetchWorks(showWorkOnModal) {
  //CREATION DU FETCH POUR IMPORTER LES TRAVAUX
  fetch(WORKS_API)
    .then((reponse) => reponse.json())
    .then((works) => {
      //save varibles
      workList = works;

      updateWorks(showWorkOnModal);
    });
}

/**
 * fonction update works prend en parametre showWorkOnmodal.
 * dans cete methode: 
 *  - on recupere les work galary de la fonction getworks gallery qu'on va l'expliquer aprés en passant le parametre showwork on modal
 *  - vider le contenu de a galery
 *  -appliquer le filtre s'il existe( work correspond a la catagorie selectionné )ou si la category selectionné est vide )
alors on appelle la fonction show work 
 
 * @param {*} showWorkOnModal 
 */

function updateWorks(showWorkOnModal) {
  let gallery = getWorksGallery(showWorkOnModal);
  gallery.innerHTML = "";
  for (let i = 0; i < workList.length; i++) {
    let work = workList[i];
    if (work.categoryId === selectCategoryId || selectCategoryId === 0) {
      showWork(work, showWorkOnModal);
    }
  }
}

/**creer les elements html de image titre et le figure par create element
 piis le remplissage cad mettre image de work , titre de work et puis mettre tout ca dans la figure
 * 
 * @param {*} work 
 * @param {*} showWorkOnModal 
 */
function showWork(work, showWorkOnModal) {
  let gallery = getWorksGallery(showWorkOnModal);

  let figure = document.createElement("figure");
  let imgWorks = document.createElement("img");
  let figcaption = document.createElement("figcaption");

  imgWorks.src = work.imageUrl;
  figcaption.innerHTML = work.title;
  figure.appendChild(imgWorks);
  figure.appendChild(figcaption);

  //check work galery : si le parametre showwork on modal est vrai c'est a dire les works sont affiché dans le modal , alors on créé le bouton supprimer
  if (showWorkOnModal) {
    //add your btn to figure
    createDeleteButton(figure, work);
  }

  gallery.appendChild(figure);
}

//RECUPERATION DES CATEGORIES
/**cette fonction recupere les categories a partir de API
 * Une fois les données des catégories disponibles; elles sont stockées dans la variable categories.
 *  Set est utilisé ici pour s'assurer qu'il n'y a pas de doublons dans les catégories.
 * Ensuite, un objet nouvelleCategorie est créé avec un id de 0 et un name de "Tous"
 *  La fonction createFilterButton() est appelée pr créer un bouton de filtre pour la catégorie "Tous" et ensuite pour 
 chaque catégorie recupéré de API
 */
function fetchCATEGORIES() {
  fetch(CATEGORY_API)
    .then((reponse) => reponse.json())
    .then((categories) => {
      let filterWorks = new Set(categories);

      let filtersZone = document.querySelector(".filter");

      let nouvelleCategorie = { id: 0, name: "Tous" };
      //create btns tous
      createFilterButton(nouvelleCategorie, filtersZone);

      for (let category of filterWorks) {
        createFilterButton(category, filtersZone);
      }

      //select category :selectionner la categorie "tous" par défaut lors de chargement de page ou chargement des filtres
      selectCategory(nouvelleCategorie.id);
    });
}

//CREATION DES BOUTONS FILTRES
/**
 *creer le bouton filtre avec la category le parametre et la zone et ajouter le click listenr sur ce bouton 
 pour permettre la selection des categories
 
 * on commence par créationlien html (a) , donner la category id a cete element et lui donner class  css
 Une fois que l'élément <a> est configuré, il est ajouté à la zone de filtres spécifiée (filtersZone) 
 en utilisant filtersZone.appendChild(categoryLink)
 * @param {*} category
 * @param {*} filtersZone
 */

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

//AJOUT DE LA CLASSE SELECTED A UNE CATEGORY:
/**
 * cette focntion gere la selection d'une categorie : elle deselectionne l'objet selectionné et selectionne le nouveau objet
 * aprés avoir mi les filtre visuelle, on appelel la fonction updateworks pour mettre a jour les works en fonction de la categories selectionne
 *
 * @param {*} categoryId
 */

function selectCategory(categoryId) {
  document.getElementById(selectCategoryId).classList.remove("selected");

  document.getElementById(categoryId).classList.add("selected");

  selectCategoryId = categoryId;
  updateWorks();
}

function check_login_logout() {
  let token = sessionStorage.getItem("token");
  if (token != null) {
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
      let token = sessionStorage.getItem("token");
      // SUPPRESSION DU TOKEN DU SESSION STORAGE
      sessionStorage.removeItem("token");

      // REDIRECTION VERS LA PAGE D'ACCUEIL
      window.location.href = "index.html";
    });
  }
}

//CREATION D'UN BOUTON SUPPRIMER POUR CHAQUE IMAGE de modal
/**
 * fonction pour creer et ajouter le bouton supprimé associé   au work, ajouter event listenr pr gerer les click sur ce bouton
 *
 * on commence par creer le nouvel element html
 * puis ajouter element css au bouton crée avec fa regular et fa trash utilisé avec bibliotheque fontawesome
 * puis ajout ecouteur evenement  en cliquant sur bouton appel de fonction delete work
 * la ligne boutonid= work id : identifi de manniere uniqu le bouton par rapport au work a supprimer
 * enfin ajout de button supprimer en tant enfant de l'element figure pour que bouton s'affiche a cote de l'image
 * @param {*} figure
 * @param {*} work
 */
function createDeleteButton(figure, work) {
  let button = document.createElement("i");
  button.classList.add("fa-regular", "fa-trash-can");
  button.addEventListener("click", DELETE_WORK);
  button.id = work.id;
  figure.appendChild(button);
}

function getWorksGallery(showWorkOnModal) {
  //check work galery

  if (showWorkOnModal) {
    return document.querySelector(".modal-gallery");
  } else {
    return document.querySelector(".gallery");
  }
}
