//CONSTANTES
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

  showWorkOnModal = true;
  fetchWorks();
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
  showWorkOnModal = false;
};

//FONCTION SUPPRESSION TRAVAUX
const DELETE_WORK = function (e) {
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce projet ?"
  );

  if (confirmation) {
    try {
      deleteWorkFetch(e.target.id);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  }
};

//APPEL API SUPPRESSION TRAVAUX
function deleteWorkFetch(idWork) {
  let token = sessionStorage.getItem("token");

  fetch(WORKS_API + "/" + idWork, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      refreshWorks(GALLERY_MODALE, true); //REAFFICHAGE TRAVAUX DANS MODALE
      refreshWorks(GALLERY_DIV, false); //REAFFICHAGE TRAVAUX DANS INDEX
    } else {
      alert("Erreur lors de la suppression du projet.");
    }
  });
}
