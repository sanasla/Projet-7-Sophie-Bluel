//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const USERS_API = BASE_URL + "users/login";

// AJOUT D'UN EVENEMENT AU CLIC POUR SE CONNECTER( cliq sur bouton se connecter)
document.getElementById("se_connecter").addEventListener("click", function () {
  loginUser();
});

function loginUser() {
  //RECUPERATION E-MAIL ET MOT DE PASSE(les valeurs saisie de login et mot pass)
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //check email ou mot pass vide
  if (email.length == 0 || password.length == 0) {
    showError("E-mail ou mot de passe vide");
    return;
  }

  //check mail valid or not
  if (!isMailValid(email)) {
    showError("E-mail invalid");
    return;
  }

  let user = {
    email: email,
    password: password,
  };

  //APPEL DE L'API POUR VERIFIER L'E-MAIL ET LE MOT DE PASSE: methode post pr envoyer des donnés au serveur
  fetch(USERS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        //SI LOGIN OK
        return response.json();
      } else {
        //SI EMAIL OU MDP KO ON AFFICHE MESSAGE ERREUR
        showError("E-mail ou mot de passe incorrect");
      }
    })
    .then((data) => {
      if (data) {
        // STOCKAGE DU TOKEN DANS LE SESSION STORAGE
        let token = data.token;
        sessionStorage.setItem("token", token);
        // REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
      } else {
        console.log("data null ");
      }
    });
}

function isMailValid(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
/** afficher msg erreur sur web: get element pr recuperer login erreur de dom puis remplacer login erreur par msg erreur enfin configurer css  */
function showError(message) {
  loginError = document.getElementById("login_error");
  loginError.innerHTML = message;
  loginError.style.display = "flex";
}
