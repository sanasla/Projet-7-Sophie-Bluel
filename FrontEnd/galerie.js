//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const WORKS_API = BASE_URL + "works";

//AFFICHE LES TRAVAUX DANS LA GALERIE
fetchWorks();

//RECUPERATION DES TRAVAUX
function fetchWorks() {
  //CREATION DU FETCH POUR IMPORTER LES TRAVAUX
  fetch(WORKS_API)
    .then((reponse) => reponse.json())
    .then((works) => {
      console.log(works);
      showWorks(works);
    });
}
function showWorks(works) {
  let worksGallery = document.querySelector(".gallery");

  for (let i = 0; i < works.length; i++) {
    let work = works[i];

    let figure = document.createElement("figure");
    let imgWorks = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    imgWorks.src = work.imageUrl;
    figcaption.innerHTML = work.title;
    figure.appendChild(imgWorks);
    figure.appendChild(figcaption);

    worksGallery.appendChild(figure);
  }
}
