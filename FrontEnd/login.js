//CONSTANTES
const BASE_URL = "http://localhost:5678/api/";
const USERS_API = BASE_URL + "users/login";

// AJOUT D'UN EVENEMENT AU CLIC POUR SE CONNECTER
document.getElementById("se_connecter").addEventListener("click", function () {
  loginUser();
});

function loginUser() {
  //RECUPERATION E-MAIL ET MOT DE PASSE
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //check email or password not empty
  if (email.length == 0 || password.length == 0) {
    showError("E-mail or Password empty");
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

  //APPEL DE L'API POUR VERIFIER L'E-MAIL ET LE MOT DE PASSE
  fetch(USERS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status === 200) {
      //SI LOGIN OK
      let data = response.json();
      // STOCKAGE DU TOKEN DANS LE SESSION STORAGE
      sessionStorage.setItem("token", data.token);
      // REDIRECTION VERS LA PAGE D'ACCUEIL
      window.location.href = "index.html";
    } else {
      //SI EMAIL OU MDP KO ON AFFICHE MESSAGE ERREUR
      showError("E-mail ou mot de passe incorrect");
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

function showError(message) {
  loginError = document.getElementById("login_error");
  loginError.innerHTML = message;
  loginError.style.display = "flex";
}
