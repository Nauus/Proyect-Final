import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener("DOMContentLoaded", function() {
    const newProfilePicture = document.getElementById('newProfilePicture').nextSibling.value;   
    const name = document.getElementById('name').nextElementSibling.value;
    const name2 = document.getElementById('name2').nextElementSibling.value;
    const apellido = document.getElementById('apellido').nextElementSibling.value;
    const apellido2 = document.getElementById('apellido2').nextElementSibling.value;
    const email = document.getElementById('email').nextElementSibling.value;
    const numTel = document.getElementById('numTel').nextElementSibling.value;
    const currentPassword = document.getElementById('currentPassword').nextElementSibling.value;
    const newPassword = document.getElementById('newPassword').nextElementSibling.value;


    const newProfilePictureInput = document.getElementById('newProfilePicture');
    newProfilePictureInput.addEventListener('change', (event) => {
        const newProfilePictureFile = event.target.files[0];

        if (newProfilePictureFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                profilePageProfilePicture.src = event.target.result;
                user.profilePicture = event.target.result;

                const uniqueKey = 'profilePicture_' + user.username;
                localStorage.setItem(uniqueKey, event.target.result);
            };
        }
    });

    const profilePageProfilePicture = document.getElementById('profilePageProfilePicture');
    if (user.profilePicture) {
        profilePageProfilePicture.src = user.profilePicture;
    }




// Crear un objeto user con los datos capturados del formulario
const user = {
    name: name,
    name2: name2,
    apellido: apellido,
    apellido2: apellido2,
    email: email,
    numTel: numTel,
    currentPassword: currentPassword,
    newPassword: newPassword,
};
    
};

// Convertir el objeto user a JSON para almacenarlo en el localStorage
const userData = JSON.stringify(user);

// Guardar en el localStorage con una clave específica
localStorage.setItem('userData', userData);

// Una vez guardado, los datos se almacenarán en el localStorage con la clave 'userData'


    // Cargar datos del localStorage al formulario si existen
    function saveDatabase() {
        const name = localStorage.getItem('name');
        if (name) document.getElementById('name').nextElementSibling.value = name;

        const name2 = localStorage.getItem('name2');
        if (name2) document.getElementById('name2').nextElementSibling.value = name2;

        const apellido = localStorage.getItem('apellido');
        if (apellido) document.getElementById('apellido').nextElementSibling.value = apellido;

        const apellido2 = localStorage.getItem('apellido2');
        if (apellido2) document.getElementById('apellido2').nextElementSibling.value = apellido2;

        const email = localStorage.getItem('email');
        if (email) document.getElementById('email').nextElementSibling.value = email;

        const numTel = localStorage.getItem('numTel');
        if (numTel) document.getElementById('numTel').nextElementSibling.value = numTel;

        const currentPassword = localStorage.getItem('currentPassword');
        if (currentPassword) document.getElementById('currentPassword').nextElementSibling.value = currentPassword;

        const newPassword = localStorage.getItem('newPassword');
        if (newPassword) document.getElementById('newPassword').nextElementSibling.value = newPassword;
    }

    // Capturar el evento click en el botón "Guardar cambios"
    const applyChangesButton = document.getElementById('applyChanges');
    applyChangesButton.addEventListener('click', saveChanges);
});