import { loadDatabase, saveDatabase } from "./localStorageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const messageDiv = document.getElementById("message");
  const databaseKey = "userDatabase";
  const database = loadDatabase(databaseKey);
  const currentUser = localStorage.getItem("currentUser");

  const messageElement = document.getElementById("message");
  console.log(database);

  if (currentUser) {
    window.location.href = "index.html";
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageElement.textContent = "";
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPasswordInput =
      document.getElementById("verifyPassword").value;
    const existingUser = database.users.find((user) => user.email === email);

    if (password !== confirmPasswordInput) {
      messageElement.textContent = "Las contraseñas no coinciden.";
      console.log("las contraseñas no coincidieron");
      return;
    } else if (existingUser) {
      // Verificar si el usuario ya existe
      messageDiv.innerHTML = "El correo ya se encuentra registrado.";
      return;
    } else {
      // Crear nuevo usuario
      const newUser = { username, email, password };
      database.users.push(newUser);
      saveDatabase(databaseKey, database);
      messageDiv.innerHTML = "Usuario registrado con éxito.";
    }
  });
});
