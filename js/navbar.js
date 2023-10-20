import { displayCurrentUser, logoutUser } from './logout.js';
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;

        // Dispara el evento personalizado cuando el navbar se haya cargado
        const navbarLoadedEvent = new Event('navbarLoaded');
        document.dispatchEvent(navbarLoadedEvent);

        // Llama a la función displayCurrentUser para mostrar el usuario actual en el navbar
        displayCurrentUser();

        // Llama a la función logoutUser para configurar el botón de cierre de sesión
        logoutUser();


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

    //! darkmode button en navbar
    const btnSwitch = document.querySelector('#switch');
    const darkModeEnabled = localStorage.getItem('darkModeEnabled');

    function enableDarkMode () {
        document.body.classList.add('dark');
        btnSwitch.classList.add('active');
    }

    function disableDarkMode () {
        document.body.classList.remove('dark');
        btnSwitch.classList.remove('active');
    }

    if (darkModeEnabled === 'true') {
        enableDarkMode();
    } else {
        disableDarkMode(); // Asegúrate de desactivar el modo oscuro si no está habilitado en localStorage.
    }

    btnSwitch.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
            disableDarkMode();
            localStorage.setItem('darkModeEnabled', 'false'); // Guardar el estado en localStorage
        } else {
            enableDarkMode();
            localStorage.setItem('darkModeEnabled', 'true'); // Guardar el estado en localStorage
        }
    });
});







