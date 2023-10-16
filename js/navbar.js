fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;

        // Dispara el evento personalizado cuando el navbar se haya cargado
        const navbarLoadedEvent = new Event('navbarLoaded');
        document.dispatchEvent(navbarLoadedEvent);
    })
    .catch(error => {
        console.error('Error al cargar el navbar:', error);
    });
document.addEventListener('navbarLoaded', () => {
    // Código de "my-profile.js" relacionado con el navbar
    const navbarProfilePicture = document.getElementById('navbarProfilePicture');
    const storedProfilePicture = localStorage.getItem('profilePicture_' + localStorage.getItem('currentUser'));

    if (storedProfilePicture) {
        navbarProfilePicture.src = storedProfilePicture;
    }
});
