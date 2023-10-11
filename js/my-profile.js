import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const changeOption = document.getElementById('changeOption');
    const applyChangesButton = document.getElementById('applyChanges');
    const newProfilePictureInput = document.getElementById('newProfilePicture');

    const usernameField = document.getElementById('usernameField');
    const passwordField = document.getElementById('passwordField');
    const emailField = document.getElementById('emailField');
    const profilePictureField = document.getElementById('profilePictureField');

    // Mostrar los campos relevantes cuando cambia la opción seleccionada
    changeOption.addEventListener('change', () => {
        const selectedOption = changeOption.value;
        usernameField.style.display = selectedOption === 'username' ? 'block' : 'none';
        passwordField.style.display = selectedOption === 'password' ? 'block' : 'none';
        emailField.style.display = selectedOption === 'email' ? 'block' : 'none';
        profilePictureField.style.display = selectedOption === 'profilePicture' ? 'block' : 'none';
    });

    const databaseKey = 'userDatabase';
    let database = loadDatabase(databaseKey);
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        window.location.href = 'login.html';
    }

    // Obtener el usuario actual
    let user = database.users.find(user => user.username === currentUser);

    // Mostrar la información actual del usuario
    const currentUsernameElement = document.getElementById('currentUsername');
    const currentEmailElement = document.getElementById('currentEmail');
    const currentProfilePictureElement = document.getElementById('currentProfilePicture');

    currentUsernameElement.textContent = user.username;
    currentEmailElement.textContent = user.email;


    // Mostrar la foto de perfil actual en la página my-profile.html
    const profilePageProfilePicture = document.getElementById('profilePageProfilePicture');
    if (user.profilePicture) {
        profilePageProfilePicture.src = user.profilePicture;
    }

    newProfilePictureInput.addEventListener('change', (event) => {
        const newProfilePictureFile = event.target.files[0];

        if (newProfilePictureFile) {
            // Leer la nueva imagen de perfil
            const reader = new FileReader();

            reader.onload = (event) => {
                // Mostrar la nueva imagen de perfil en la página my-profile.html
                profilePageProfilePicture.src = event.target.result;

                // Guardar la imagen en el usuario
                user.profilePicture = event.target.result;
                localStorage.setItem('profilePicture', user.profilePicture);

                // Actualiza la imagen de perfil en el navbar
                const navbarProfilePicture = document.getElementById('navbarProfilePicture');
                if (navbarProfilePicture) {
                    navbarProfilePicture.src = user.profilePicture;
                }

                // Genera una clave única basada en el nombre de usuario
                const uniqueKey = 'profilePicture_' + user.username;

                // Almacena la imagen de perfil en el localStorage
                localStorage.setItem(uniqueKey, user.profilePicture);

                // Dispara un evento personalizado para notificar al navbar
                const profilePictureChangeEvent = new CustomEvent('profilePictureChanged', {
                    detail: user.username,  // Envía el nombre de usuario actual
                });
                document.dispatchEvent(profilePictureChangeEvent);
                // Actualiza el objeto de usuario en la base de datos
                const userIndex = database.users.findIndex(u => u.username === currentUser);
                if (userIndex !== -1) {
                    database.users[userIndex] = user;
                    // Guardar los cambios en el localStorage
                    saveDatabase(databaseKey, database);
                }

                // Ahora que la imagen se ha cargado correctamente, habilita el botón de "Guardar Cambios"
                applyChangesButton.disabled = false;
            };

            reader.readAsDataURL(newProfilePictureFile);
        }
    });

    applyChangesButton.addEventListener('click', () => {
        const selectedOption = changeOption.value;

        if (user) {
            // Realizar cambios según la opción seleccionada
            if (selectedOption === 'username') {
                const newUsername = document.getElementById('newUsername').value;
                user.username = newUsername;
                currentUsernameElement.textContent = newUsername;
                localStorage.setItem('currentUser', newUsername);
            } else if (selectedOption === 'password') {
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;

                if (currentPassword !== user.password) {
                    // La contraseña actual no coincide, muestra el mensaje de error
                    passwordError.style.display = 'block';
                } else {
                    // La contraseña actual es válida, oculta el mensaje de error
                    passwordError.style.display = 'none';

                    // Continúa con el cambio de contraseña
                    user.password = newPassword;

                }
            } else if (selectedOption === 'email') {
                const newEmail = document.getElementById('newEmail').value;
                user.email = newEmail;
                currentEmailElement.textContent = newEmail;
            }

            // Guardar los cambios en el localStorage
            database = { users: database.users.map(u => (u.username === currentUser ? user : u)) };
            saveDatabase(databaseKey, database);

            // Ahora que se han guardado los cambios, deshabilita el botón de "Guardar Cambios"
            applyChangesButton.disabled = false;
        }
    });
});
