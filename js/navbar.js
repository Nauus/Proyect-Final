fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;

    })
    .catch(error => {
        console.error('Error al cargar el navbar:', error);
    });

document.addEventListener('DOMContentLoaded', () => {
    const navbarProfilePicture = document.getElementById('navbarProfilePicture');
    const storedProfilePicture = localStorage.getItem('profilePicture');

    if (storedProfilePicture) {
        navbarProfilePicture.src = storedProfilePicture;
    }

    // Resto del código del navbar.js
});