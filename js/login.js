import { loadDatabase, saveDatabase } from "./localStorageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const messageDiv = document.getElementById("message");
  const databaseKey = "userDatabase";
  const database = loadDatabase(databaseKey);
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    //aca va el primer href
    const user = database.users.find((user) => user.username === currentUser);
    if (!user.profilePicture) {
      user.profilePicture = "default-profile.jpg"; 
      saveDatabase(databaseKey, database);
    }
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.getElementById("loginIdentifier").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: identifier, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        window.location.href = "index.html"
      } else {
        messageDiv.innerHTML = "Credenciales inválidas.";
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      messageDiv.innerHTML = "Error durante el inicio de sesión.";
    }
  });
  
});
