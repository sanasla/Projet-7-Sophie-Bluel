//CONSTANTES
const GALLERY_MODALE = document.querySelector(".modal-gallery");
const BUTTON_CLOSE = document.querySelector(".js-modal-close-1");
const MODALE_WRAPPER = document.querySelector(".modal-wrapper");
const BUTTON_MODIF_WORKS = document.querySelector("#modif_projet");

let modal = null;

//FONCTION OUVERTURE BOITE MODALE
const OPEN_MODAL = function (e) {
  e.preventDefault();
  modal = document.querySelector("#modal1");
  modal.style.display = null;
  modal.addEventListener("click", CLOSE_MODAL);
  BUTTON_CLOSE.addEventListener("click", CLOSE_MODAL);
  MODALE_WRAPPER.style.display = "flex";
  GALLERY_MODALE.innerHTML = "";
  fetchWorks(GALLERY_MODALE, true);
};

//FONCTION FERMETURE BOITE MODALE
const CLOSE_MODAL = function (e) {
  if (modal == null) return;
  //SI ON CLIQUE SUR AUTRE CHOSE QUE LA MODALE OU LE BOUTON ON NE VEUT PAS FERMER
  if (
    e.target != modal &&
    e.target != BUTTON_CLOSE &&
    e.target != document.querySelector(".fa-solid")
  )
    return;
  e.preventDefault;
  modal.style.display = "none";
  modal.removeEventListener("click", CLOSE_MODAL);
  BUTTON_CLOSE.removeEventListener("click", CLOSE_MODAL);
};

//AJOUT LISTENER SUR CLIQUE BOUTON MODIFIER POUR APPELER OUVERTURE MODALE
BUTTON_MODIF_WORKS.addEventListener("click", OPEN_MODAL);
