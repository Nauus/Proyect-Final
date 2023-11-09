import { loadDatabase, saveDatabase } from './localStorageUtils.js';

// Constantes.

const storedData = localStorage.getItem('userDatabase');

const existingData = JSON.parse(storedData);

const currentUserInfo = existingData.users[0];

const currentPasswordInput = document.getElementById("currentPassword")

const newPasswordInput = document.getElementById("newPassword")

// Botones para mostrar el contenido de los inputs de contraseñas.

document.getElementById('btnShowOldPassword').addEventListener('click', function() {
    if(document.getElementById('currentPassword').getAttribute('type') == 'text') {
        document.getElementById('currentPassword').setAttribute('type', 'password')
    } else {
    document.getElementById('currentPassword').setAttribute('type', 'text');
    }
    });

    document.getElementById('btnShowNewPassword').addEventListener('click', function() {
        if(document.getElementById('newPassword').getAttribute('type') == 'text') {
            document.getElementById('newPassword').setAttribute('type', 'password')
        } else {
        document.getElementById('newPassword').setAttribute('type', 'text');
        }
        });

// Función para pintar de rojo o verde inputs.

(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

// Cambios en localStorage y validaciones.

document.addEventListener("DOMContentLoaded", function() {

    if (currentUserInfo) {
        if (!currentUserInfo.secondname) {
          currentUserInfo.secondname = '';
        }
      
        if (!currentUserInfo.lastname) {
          currentUserInfo.lastname = '';
        }
      
        if (!currentUserInfo.secondlastname) {
          currentUserInfo.secondlastname = '';
        }
      
        if (!currentUserInfo.phonenumber) {
          currentUserInfo.phonenumber = '';
        }
      }

    document.getElementById("name").value = currentUserInfo.username;
    document.getElementById("name2").value = currentUserInfo.secondname;
    document.getElementById("lastaname").value = currentUserInfo.lastname;
    document.getElementById("lastname2").value = currentUserInfo.secondlastname;
    document.getElementById("email").value = currentUserInfo.email;
    document.getElementById("phoneNumber").value = currentUserInfo.phonenumber;

  currentPasswordInput.addEventListener("input", function() {

    const errorDiv = document.getElementById("errorDiv");

    const storedData = localStorage.getItem('userDatabase');

    const existingData = JSON.parse(storedData);
  
    const currentUserInfo = existingData.users[0];
  

    if (String(currentPasswordInput.value) !== String(currentUserInfo.password)) {

        errorDiv.style.display = "block";
        currentPasswordInput.setCustomValidity("No coincide con la contraseña acttual.");

    } else {

      errorDiv.style.display = "none";
      currentPasswordInput.setCustomValidity("");

  }});

  newPasswordInput.addEventListener("input", function() {

  const repeatErrorDiv = document.getElementById("repeatErrorDiv");

  const newPasswordInput = document.getElementById("newPassword")

  if ((newPasswordInput.value.length >= 6)) {

    repeatErrorDiv.style.display = "none";
    newPasswordInput.setCustomValidity("");

  } else {

    repeatErrorDiv.style.display = "block";
    newPasswordInput.setCustomValidity("La nueva contraseña debe tener más de 6 digitos.");

  };
});

    document.getElementById('applyChanges').addEventListener('click', function (event) {
        event.preventDefault();
        if (String(currentPasswordInput.value) == String(currentUserInfo.password)) {
        currentUserInfo.username = `${document.getElementById("name").value}`;
        currentUserInfo.secondname = `${document.getElementById("name2").value}`;
        currentUserInfo.lastname = `${document.getElementById("lastaname").value}`;
        currentUserInfo.secondlastname = `${document.getElementById("lastname2").value}`;
        currentUserInfo.email = `${document.getElementById("email").value}`;

        if ((document.getElementById("phoneNumber").value.length >= 9) && (document.getElementById("phoneNumber").value.length <= 13)) {
          currentUserInfo.phonenumber = `${document.getElementById("phoneNumber").value}`;
        }

        if ((newPasswordInput.value.length >= 6)) {
          currentUserInfo.password = `${document.getElementById("newPassword").value}`;
        };

      };

        localStorage.setItem('userDatabase', JSON.stringify(existingData));
        });
});

// Cambio de imagen de perfil

