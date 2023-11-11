import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const profilePictureInput = document.getElementById('profilePicture');
    const profilePicturePreview = document.getElementById('profilePicturePreview');
    const profileForm = document.getElementById('profileForm');

    // OBTENER USUARIO ACTUAL Y OBTENER SUS DATOS /////////////////////////////////////////////////////////////////////////////////////////////// CAMILA
    
    const currentUser = localStorage.getItem('currentUser');

// Cargar la base de datos de usuarios y encontrar el usuario actual
const databaseKey = 'userDatabase';
const database = loadDatabase(databaseKey);

if (database) {
    const userIndex = database.users.findIndex(user => user.username === currentUser);

    if (userIndex !== -1) {
        // Obtener datos del perfil actual del usuario desde la base de datos
        let userProfile = {
            firstName: database.users[userIndex].firstName || '',
            middleName: database.users[userIndex].middleName || '',
            lastName: database.users[userIndex].lastName || '',
            secondLastName: database.users[userIndex].secondLastName || '',
            email: database.users[userIndex].email || '',
            phone: database.users[userIndex].phone || ''
        };

    // MOSTRAR DATOS YA ALMACENADOS EN INPUT /////////////////////////////////////////////////////////////////////////////////////////////// MARTÍN

        // Display user data in the form
        Object.keys(userProfile).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = userProfile[key];
            }
        });

    // FOTO DE PERFIL /////////////////////////////////////////////////////////////////////////////////////////////// NAHUEL

            // Display user profile picture if available
            const profilePicture = localStorage.getItem('profilePicture_' + currentUser);
            if (profilePicture) {
                profilePicturePreview.src = profilePicture;
            }

            
            // Handle profile picture change
            profilePictureInput.addEventListener('change', () => {
                const file = profilePictureInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        profilePicturePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });


    // CAMBIAR INFORMACIÓN DEL USUARIO EN EL LOCAL STORAGE POR LA DE LOS INPUTS /////////////////////////////////////////////////////////////////////////////////////////////// JOSÉ

            // Handle form submission
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Update the user profile data with the form values
                userProfile.firstName = document.getElementById('firstName').value;
                userProfile.middleName = document.getElementById('middleName').value;
                userProfile.lastName = document.getElementById('lastName').value;
                userProfile.secondLastName = document.getElementById('secondLastName').value;
                userProfile.email = document.getElementById('email').value;
                userProfile.phone = document.getElementById('phone').value;

            
    // ACTUALIZAR INFORMACIÓN DEL USUARIO EN EL LOCAL STORAGE /////////////////////////////////////////////////////////////////////////////////////////////// NACHO

                // Actualizar los campos en el objeto user de la base de datos
                database.users[userIndex].firstName = userProfile.firstName;
                database.users[userIndex].middleName = userProfile.middleName;
                database.users[userIndex].lastName = userProfile.lastName;
                database.users[userIndex].secondLastName = userProfile.secondLastName;
                database.users[userIndex].email = userProfile.email;
                database.users[userIndex].phone = userProfile.phone;


              // Guardar los datos actualizados en la base de datos
              saveDatabase(databaseKey, database);

                if (profilePictureInput.files.length > 0) {
                    const profilePictureFile = profilePictureInput.files[0];
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        localStorage.setItem('profilePicture_' + currentUser, event.target.result);
                    };
                    reader.readAsDataURL(profilePictureFile);
                }
                window.location.href = 'my-profile.html';
            });
        } else {
            console.error("Usuario no encontrado en la base de datos");
        }
    } else {
        console.error("Error al cargar la base de datos");
    }
});