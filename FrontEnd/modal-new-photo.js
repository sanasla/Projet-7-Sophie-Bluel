//CONSTANTES
const NEW_MODALE = document.querySelector(".modal-new-photo");
const BUTTON_CLOSE_NEW = document.querySelector(".js-modal-close-new");
const BUTTON_BACK = document.querySelector(".modal-back");
const BUTTON_ADD = document.querySelector(".button-add-photo");
const INPUT_PICTURE = document.querySelector("#input-picture");
const PICTURE_PREVIEW = document.querySelector("#picture-preview");
const PICTURE_SELECTION = document.querySelector(".picture-selection");
const CATEGORIES_SELECT = document.querySelector(".select-category");
const TITLE_NEW_PHOTO = document.querySelector(".input-titre");
const BUTTON_SUBMIT = document.querySelector(".button-submit");

let modal_new = null;

//FONCTION OUVERTURE BOITE MODALE
const OPEN_MODAL_NEW = function (e) {
  e.preventDefault();
  //ON CACHE LA MODAL-GALLERY
  modal.style.display = "none";
  //ON AFFICHE LA MODALE DE CREATION
  modal_new = document.querySelector("#modal2");
  modal_new.style.display = null;
  modal_new.addEventListener("click", CLOSE_MODAL_NEW);

  let modal_wrapper = document.querySelector(".modal-wrapper-new");
  modal_wrapper.style.display = "flex";
};

//FONCTION FERMETURE BOITE MODALE
const CLOSE_MODAL_NEW = function (e) {
  console.log("bilel close called");
  if (modal_new == null) return;

  //SI ON CLIQUE SUR AUTRE CHOSE QUE LA MODALE OU LE BOUTON ON NE VEUT PAS FERMER
  console.log("bilel close called target" + e.target);
  if (
    e.target != modal_new &&
    e.target != BUTTON_CLOSE_NEW &&
    e.target != document.querySelector(".top2 .fa-x")
  )
    return;

  console.log("bilel close called OK");
  e.preventDefault;
  modal_new.style.display = "none";
  modal_new.removeEventListener("click", CLOSE_MODAL_NEW);
};

document.querySelectorAll("#ajout_projet").forEach((a) => {
  a.addEventListener("click", OPEN_MODAL_NEW);
});

BUTTON_CLOSE_NEW.addEventListener("click", CLOSE_MODAL_NEW);
//BOUTON RETOUR: en cliqunat sur button back, la fonction se declenche masque l element anec id : nex modal et affiche l'element avec id modal
BUTTON_BACK.addEventListener("click", function () {
  modal_new.style.display = "none";
  modal.style.display = "flex";
});

//BOUTON AJOUT PHOTO
BUTTON_ADD.addEventListener("click", function () {
  INPUT_PICTURE.click();
});

//SELECTEUR FICHIER PHOTO
INPUT_PICTURE.addEventListener("change", function () {
  if (this.files[0].size > 4194304) {
    alert("Fichier trop volumineux");
    this.value = "";
  }
  if (this.files[0]) {
    PICTURE_PREVIEW.src = URL.createObjectURL(this.files[0]);
    PICTURE_PREVIEW.style.display = "block";
    PICTURE_SELECTION.style.display = "none";
  }
});
