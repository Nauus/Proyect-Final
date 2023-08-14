import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const databaseKey = 'userDatabase';
    const database = loadDatabase(databaseKey);
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        window.location.href = 'index.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value;
        const password = document.getElementById('loginPassword').value;

        // Verificar las credenciales
        const user = database.users.find(user => (user.username === identifier || user.email === identifier) && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', user.username);
            window.location.href = 'index.html';
        } else {
            messageDiv.innerHTML = 'Credenciales inválidas.';
        }
    });
});

