import { loadDatabase, saveDatabase } from "./localStorageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const messageDiv = document.getElementById("message");
  const databaseKey = "userDatabase";
  const database = loadDatabase(databaseKey);
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    window.location.href = "index.html";
    // Verificar si el usuario ya tiene una foto de perfil en el localStorage
    const user = database.users.find((user) => user.username === currentUser);
    if (!user.profilePicture) {
      // Si no tiene una foto de perfil, establece una foto predeterminada
      user.profilePicture = "default-profile.jpg"; // Nombre de archivo de la foto predeterminada
      saveDatabase(databaseKey, database);
    }
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = document.getElementById("loginIdentifier").value;
    const password = document.getElementById("loginPassword").value;

    // Verificar las credenciales
    const user = database.users.find(
      (user) =>
        (user.username === identifier || user.email === identifier) &&
        user.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", user.username);
      window.location.href = "index.html";
    } else {
      messageDiv.innerHTML = "Credenciales inválidas.";
    }
  });
});
