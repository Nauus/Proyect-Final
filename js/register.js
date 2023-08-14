import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');
    const databaseKey = 'userDatabase';
    const database = loadDatabase(databaseKey);
    const currentUser = localStorage.getItem('currentUser');
    console.log(database);

    if (currentUser) {
        window.location.href = 'index.html';
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Verificar si el usuario ya existe
        const existingUser = database.users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            messageDiv.innerHTML = 'El usuario ya existe.';
            return;
        }

        // Crear nuevo usuario
        const newUser = { username, email, password };
        database.users.push(newUser);
        saveDatabase(databaseKey, database);
        messageDiv.innerHTML = 'Usuario registrado con éxito.';
    });
});

