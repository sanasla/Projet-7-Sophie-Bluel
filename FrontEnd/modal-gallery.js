//CONSTANTES
const BUTTON_CLOSE = document.querySelector(".js-modal-close-1");
const MODALE_WRAPPER = document.querySelector(".modal-wrapper");
const BUTTON_MODIF_WORKS = document.querySelector("#modif_projet");

let modal = null;
/**
 * la fnction open modal utilisé pr ouvrir modale , configure son affichage puis ajout listenr pr gerer ouverture 
  et fermeture et aussi realise chargemnt des donnés

 * z. prevent defaut empeche comprtement par defaut de l'evenemnt: empeche naviguer sur autre page 

 * 
 * add event listenr lors click en dehors boite modal ou sur bouton fermeture modal , en cliquant sur l'un de deux la fonction close modal est apellé
 * 
 * appele fonction fetch work avec argument true  pr executer les donnés 
 * @param {
 * } e 
 */

//FONCTION OUVERTURE BOITE MODALE
const OPEN_MODAL = function (e) {
  e.preventDefault();
  modal = document.querySelector("#modal1");
  modal.style.display = null;
  worksGalleryModal = document.querySelector(".modal-gallery");
  modal.addEventListener("click", CLOSE_MODAL);
  BUTTON_CLOSE.addEventListener("click", CLOSE_MODAL);
  MODALE_WRAPPER.style.display = "flex";

  fetchWorks(true);
};

//FONCTION FERMETURE BOITE MODALE

/**
 *verifier modale est ouvert: si modal est null on sort

 *s'assurer que l'evenemt vient des bouton autorisés pr fermer le modal qui sont : modal , bouton close et icone si non je sort(return)
 
 * ds le cas ou tt va bien je cache le modal en utilisant display none
 * @param {*} e
 * @returns
 */
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
};

//FONCTION SUPPRESSION TRAVAUX
/**permet de confirmer la suppression de trvaux avnt sa suppresion cote serveur, utilse une boite de dialog pr la confirmation
 *
 * puis appell la fonction deleworksFetch pr effectuer la suppresion
 *
 * on utilise la fonction confirm pr afficher boite de dialog avec message demandant confirmation
 *
 * si utilsateur cliqu ok le code a interieur if sera executé on appel fction delete workfetch avc try catch pr afficher erreur en cas erreur suppresiion
 * @param {*} e
 */
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

/** fction delet wor fetch
 * la 1 ligne recupere token  apartir session storage
 * envoyer requete delete api avc identifianr idwork
 * puis traitemnt repons avec then( 200 , 202 204 cad suppresion reussi)
 *
 * la fnction fetchworks true pr recharger ls works ds le modale
 * la fetchworks false pr rechazrger les works dans index
 *
 * si la suppression  a echoué une boite alert est affiché pr informer l'utilisateur qu'ilya erreur lors suppresion
 *
 *
 * @param {*} idWork
 */
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
      //REAFFICHAGE TRAVAUX DANS MODALE
      fetchWorks(true);
      //REAFFICHAGE TRAVAUX DANS INDEX
      fetchWorks(false);
    } else {
      alert("Erreur lors de la suppression du projet.");
    }
  });
}
