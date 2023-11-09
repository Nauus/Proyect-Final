import { loadDatabase, saveDatabase } from './localStorageUtils.js';

// Constantes.

const storedData = localStorage.getItem('userDatabase');

const existingData = JSON.parse(storedData);

const currentUserInfo = existingData.users[0];

const currentPasswordInput = document.getElementById("currentPassword")

const newPasswordInput = document.getElementById("newPassword")

// Botones para mostrar el contenido de los inputs de contraseñas. CHECKBOXES //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// ACTUALIZAR VALOR DE INPUTS PARA QUE SE MUESTRE LOS DATOS ACTUALES DEL LOCALSTORAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    document.getElementById("lastname").value = currentUserInfo.lastname;
    document.getElementById("lastname2").value = currentUserInfo.secondlastname;
    document.getElementById("email").value = currentUserInfo.email;
    document.getElementById("phoneNumber").value = currentUserInfo.phonenumber;

    const storedProfilePicture = localStorage.getItem('profilePicture_' + localStorage.getItem('currentUser'));

    if (storedProfilePicture) {
        profilePicturePreview.src = storedProfilePicture;
    }
  });

//  FEEDBACK DE CONTRASEÑAS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Validar que el value del input de contraseña actual sea correcto, y dar feedback al usuario.

  currentPasswordInput.addEventListener("input", function() {

    const errorDiv = document.getElementById("errorDiv");

    const storedData = localStorage.getItem('userDatabase');

    const existingData = JSON.parse(storedData);
  
    const currentUserInfo = existingData.users[0];
  

    if (String(currentPasswordInput.value) !== String(currentUserInfo.password)) {

        errorDiv.style.display = "block";
        currentPasswordInput.setCustomValidity("No coincide con la contraseña actual.");

    } else {

      errorDiv.style.display = "none";
      currentPasswordInput.setCustomValidity("");

  }});

// En caso de que el usuario quiera cambiar la contraseña, dar feedback de si el value del input es correcto.

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

// CAMBIAR Y PREVISUALIZAR FOTO DE PERFIL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const profilePictureInput = document.getElementById('profilePicture');
const profilePicturePreview = document.getElementById('profilePicturePreview');

// Display user profile picture if available
const currentUser = localStorage.getItem('currentUser');
const profilePicture = localStorage.getItem('profilePicture_' + currentUser);
if (profilePicture) {
    profilePicturePreview.src = profilePicture;
}

// Handle profile picture change
profilePictureInput.addEventListener('change', () => {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profilePicturePreview.src = event.target.result;

            // Update local storage with the new profile picture
            localStorage.setItem('profilePicture_' + currentUser, event.target.result);
        };
        reader.readAsDataURL(file);
    }
});
            
// FEEDBACK DE NOMBRES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Feedback instantaneo de inputs para nombres y apellidos.

document.addEventListener('DOMContentLoaded', function () {
  var inputElementN = document.getElementById('name');
  var inputElementN2 = document.getElementById('name2');
  var inputElementLN = document.getElementById('lastname');
  var inputElementLN2 = document.getElementById('lastname2');
  var errorMessageN = document.getElementById('errorNameDivN');
  var errorMessageN2 = document.getElementById('errorNameDivN2');
  var errorMessageLN = document.getElementById('errorNameDivLN');
  var errorMessageLN2 = document.getElementById('errorNameDivLN2');

  function addValidationListener(inputElement, errorDiv) {
    function validateInput(inputElement, errorDiv) {
      if (/^[a-zA-Z]+$/.test(inputElement.value)) {
        errorDiv.style.display = 'none';
        inputElement.setCustomValidity('is-invalid');
        inputElement.setCustomValidity('');
      } else {
        errorDiv.style.display = 'block';
        inputElement.setCustomValidity('');
        inputElement.setCustomValidity('is-invalid');
      }
    }
    inputElement.addEventListener('input', function () {
      validateInput(inputElement, errorDiv);
    });
  }

  addValidationListener(inputElementN, errorMessageN);
  addValidationListener(inputElementN2, errorMessageN2);
  addValidationListener(inputElementLN, errorMessageLN);
  addValidationListener(inputElementLN2, errorMessageLN2);

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

// VALIDACIONES Y CAMBIOS AL LOCALSTORAGE.///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById('applyChanges').addEventListener('click', function (event) {
        event.preventDefault();

        if (String(currentPasswordInput.value) == String(currentUserInfo.password)) { // Especificamos que solamente suceda si el campo de contraseña actual es correcto.

// Creación de constantes y funciones para las validaciones.

          function name_lastnameIsValidInput(inputElement) {
            const regex = /^[A-Za-z]+$/;
            
            return inputElement.value.trim().length >= 2 && regex.test(inputElement.value.trim());
        }

        function isValidEmail(email) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      };

      function isValidPhoneNumber(inputElement) { 
            
        return (((inputElement.length >= 9) || (inputElement.length >= 15)));
      };

      let nameIsValid = true
      let name2IsValid = true
      let lastnameIsValid = true
      let lastname2IsValid = true
      let emailIsValid = true
      let phoneNumberIsValid = true
      let newPasswordIsValid = true

// Aplicación de constantes y funciones para finalmente hacer los cambios en los datos del userDatabase.

          if (name_lastnameIsValidInput(document.getElementById("name"))) {
            console.log("Nombre es válido");
            currentUserInfo.username = `${document.getElementById("name").value}`;
          } else {
            nameIsValid = false;
            document.getElementById("name").setCustomValidity('No se admiten números.')
          };

          if (name_lastnameIsValidInput(document.getElementById("name2"))) {
            console.log("Segundo nombre es válido");
            currentUserInfo.secondname = `${document.getElementById("name2").value}`;
          } else {
            name2IsValid = false;
          };

          if (name_lastnameIsValidInput(document.getElementById("lastname"))) {
            console.log("Apellido es válido");
            currentUserInfo.lastname = `${document.getElementById("lastname").value}`;
          } else {
            lastnameIsValid = false;
          };

          if (name_lastnameIsValidInput(document.getElementById("lastname2"))) {
            console.log("Segundo apellido es válido");
            currentUserInfo.secondlastname = `${document.getElementById("lastname2").value}`;
          } else {
            lastname2IsValid = false;
          };
          
          if (isValidEmail(document.getElementById("email").value)) {
            console.log("Email correcto.");
            currentUserInfo.email = `${document.getElementById("email").value}`;
          } else {
            emailIsValid = false;
          };
    
          if (isValidPhoneNumber(document.getElementById("phoneNumber").value)) {
            console.log("Número de teléfono largo suficiente");
            currentUserInfo.phonenumber = `${document.getElementById("phoneNumber").value}`;
          } else {
            phoneNumberIsValid = false;
          };

            if (newPasswordInput.value.length >= 1 && newPasswordInput.value.length <= 5) {
              newPasswordIsValid = false;
            } else if (newPasswordInput.value.length === 0 && newPasswordInput.value.length >= 6) {
              currentUserInfo.password = `${document.getElementById("newPassword").value}`;
            };

// Sweet Alerts para informar al usuario.

          if((nameIsValid && name2IsValid && lastnameIsValid && lastname2IsValid && emailIsValid && phoneNumberIsValid && newPasswordIsValid === true)) {
          Swal.fire({
              icon: 'success',
              title: 'Cambios realizados',
              text: "Los datos de su cuenta han sido cambiados exitosamente.",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('userDatabase', JSON.stringify(existingData));
                location.reload();
              }
            });
          return;
        } else {
          console.log(((nameIsValid || name2IsValid || lastnameIsValid || lastname2IsValid || emailIsValid || phoneNumberIsValid || newPasswordIsValid === false)));

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Alguno de los campos presenta errores.",
        })
}
}});