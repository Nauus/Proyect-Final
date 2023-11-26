import { displayCurrentUser, logoutUser } from "./logout.js";
 fetch("navbar.html")
  .then((response) => {
    console.log("Response status:", response.status);
    return response.text();
  })
  .then((data) => {
    console.log("Data received:", data);
    document.getElementById("navbarContainer").innerHTML = data;
    const navbarLoadedEvent = new Event("navbarLoaded");
    document.dispatchEvent(navbarLoadedEvent);
    displayCurrentUser();
    logoutUser();
  })
  .catch((error) => {
    console.error("Error fetching navbar:", error);
  });

document.addEventListener("navbarLoaded", function () {
  // Código de "my-profile.js" relacionado con el navbar
  const navbarProfilePicture = document.getElementById("navbarProfilePicture");
  const storedProfilePicture = localStorage.getItem(
    "profilePicture_" + localStorage.getItem("currentUser")
  );

  if (storedProfilePicture) {
    navbarProfilePicture.src = storedProfilePicture;
  }
  const body = document.body;
  const switchButton = document.getElementById("switch");
  const spookyButton = document.getElementById("spooky");
  const soundElement = document.getElementById("sound");
  let soundPlayed = false;

  // Función para habilitar el modo oscuro
  function enableDarkMode() {
    disableSpookyMode();
    body.classList.add("dark");
    localStorage.setItem("mode", "dark");
  }

  // Función para habilitar el modo spooky
  function enableSpookyMode() {
    disableDarkMode();
    body.classList.add("spooky");
    localStorage.setItem("mode", "spooky");

    if (!soundPlayed) {
      // Reproducir el sonido una vez si no se ha reproducido antes
      soundElement.currentTime = 0;
      soundElement.play();
      soundPlayed = true;
    }
  }

  // Función para deshabilitar el modo oscuro
  function disableDarkMode() {
    body.classList.remove("dark");
    localStorage.removeItem("mode");
  }

  // Función para deshabilitar el modo spooky
  function disableSpookyMode() {
    body.classList.remove("spooky");
    localStorage.removeItem("mode");
  }

  // Verificar el estado almacenado en localStorage y aplicarlo
  const storedMode = localStorage.getItem("mode");
  if (storedMode === "dark") {
    enableDarkMode();
  } else if (storedMode === "spooky") {
    enableSpookyMode();
  }

  // Manejador de clic para el botón de modo oscuro
  switchButton.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Manejador de clic para el botón de modo spooky
  spookyButton.addEventListener("click", function () {
    if (body.classList.contains("spooky")) {
      disableSpookyMode();
    } else {
      enableSpookyMode();
    }
  });
});
