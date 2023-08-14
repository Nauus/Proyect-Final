import { clearCurrentUser } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUserSpan = document.getElementById('currentUser');
    const logoutButton = document.getElementById('logoutButton');

    // Mostrar el usuario actual en la página
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        currentUserSpan.textContent = currentUser;
    }


    if (!currentUser) {
        window.location.href = 'login.html';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            clearCurrentUser();
            window.location.href = 'login.html';
        });
    }
});

