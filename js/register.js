import { loadDatabase, saveDatabase } from "./localStorageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const messageDiv = document.getElementById("message");
  const databaseKey = "userDatabase";
  const database = loadDatabase(databaseKey);
  const currentUser = localStorage.getItem("currentUser");
  const messageElement = document.getElementById("message");

  if (currentUser) {
    window.location.href = "index.html";
  }

  registerForm.addEventListener("submit", async (e) => {
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
      console.log("Las contraseñas no coinciden");
      return;
    } else if (existingUser) {
      messageDiv.innerHTML = "El correo ya se encuentra registrado.";
      return;
    } else {
      try {
        const registerResponse = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (registerResponse.ok) {
          messageDiv.innerHTML = "Usuario registrado con éxito.";
        } else {
          messageDiv.innerHTML = "Error durante el registro.";
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        messageDiv.innerHTML = "Error durante el registro.";
      }
    }
  });
});
