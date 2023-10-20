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
    const numTelField = document.getElementById('numTelField');
    function controlarVisibilidadCampos () {
        const selectedOption = changeOption.value;
        usernameField.style.display = selectedOption === 'username' ? 'block' : 'none';
        passwordField.style.display = selectedOption === 'password' ? 'block' : 'none';
        emailField.style.display = selectedOption === 'email' ? 'block' : 'none';
        profilePictureField.style.display = selectedOption === 'profilePicture' ? 'block' : 'none';
        numTelField.style.display = selectedOption === 'numTelefono' ? 'block' : 'none';
    }

    changeOption.addEventListener('change', controlarVisibilidadCampos);

    controlarVisibilidadCampos();
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


                // Genera una clave única basada en el nombre de usuario
                const uniqueKey = 'profilePicture_' + user.username;
                // Almacena la imagen de perfil en el localStorage
                localStorage.setItem(uniqueKey, event.target.result);




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
            if (selectedOption === 'username') {

                const newUsername = document.getElementById('newUsername').value;
                if (newUsername.trim() !== '') {
                    user.username = newUsername;
                    currentUsernameElement.textContent = newUsername;
                    localStorage.setItem('currentUser', newUsername);
                }
            } else if (selectedOption === 'password') {

                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;

                if (currentPassword === user.password && newPassword.length > 6) {
                    user.password = newPassword;
                } else {

                    alert('La contraseña actual no coincide o la nueva contraseña es muy corta (debe tener al menos 6 caracteres).');
                    return;
                }
            } else if (selectedOption === 'email') {
                const newEmail = document.getElementById('newEmail').value;
                console.log("entre");
                if (isValidEmail(newEmail)) {
                    user.email = newEmail;
                    currentEmailElement.textContent = newEmail;
                } else {
                    alert('El correo electrónico no es válido. Asegúrate de que tenga un formato válido.');
                    return;
                }
            } else if (selectedOption === 'numTelefono') {
                const numTelInput = document.getElementById('numTel');
                const newPhoneNumber = numTelInput.value;

                // Eliminar espacios y guiones existentes (si los hubiera)
                const cleanPhoneNumber = newPhoneNumber.replace(/[\s-]/g, '');

                // Expresión regular para validar el número de teléfono
                const phoneNumberPattern = /^0\d{8}$/;

                if (phoneNumberPattern.test(cleanPhoneNumber)) {
                    // Formatear el número de teléfono con espacios cada 3 dígitos
                    const formattedPhoneNumber = cleanPhoneNumber.replace(/(\d{3})(?=\d)/g, '$1 ');

                    // Asignar el número de teléfono formateado al campo de entrada
                    numTelInput.value = formattedPhoneNumber;

                    user.phoneNumber = formattedPhoneNumber;

                    const userIndex = database.users.findIndex(u => u.username === currentUser);
                    if (userIndex !== -1) {
                        database.users[userIndex] = user;
                        saveDatabase(databaseKey, database);
                    }
                } else {
                    alert('El número de teléfono no es válido. Asegúrate de que empiece con "0" y contenga 8 dígitos numéricos.');
                    return;
                }
            }

            database = { users: database.users.map(u => (u.username === currentUser ? user : u)) };
            saveDatabase(databaseKey, database);
            location.reload();
            applyChangesButton.disabled = true;
        }
    });

    function isValidEmail (email) {
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailPattern.test(email);
    }
    swal("Pestaña en Alpha", "Esta pestaña está en fase Alpha de desarrollo. Aun falta agregar estilos. ¡Gracias por tu visita!", "warning");
}); //////////////////JOSECODIGO PREGUNTAR CAMBIOS VALIDACIONES CONTRASEÑAS >6 BLABLABLA
///////////////////JOSECODIGO 2 SE DA UNA FOTO POR DEFECTO
