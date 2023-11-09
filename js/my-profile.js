import { loadDatabase, saveDatabase } from './localStorageUtils.js';

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

document.addEventListener("DOMContentLoaded", function() {
    const storedData = localStorage.getItem('userDatabase');

    const existingData = JSON.parse(storedData);

    const currentUserInfo = existingData.users[0];

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
    document.getElementById("currentPassword").value = currentUserInfo.password;

    document.getElementById('applyChanges').addEventListener('click', function (event) {
        event.preventDefault();

        currentUserInfo.username = `${document.getElementById("name").value}`;
        currentUserInfo.secondname = `${document.getElementById("name2").value}`;
        currentUserInfo.lastname = `${document.getElementById("lastaname").value}`;
        currentUserInfo.secondlastname = `${document.getElementById("lastname2").value}`;
        currentUserInfo.email = `${document.getElementById("email").value}`;
        currentUserInfo.phonenumber = `${document.getElementById("phoneNumber").value}`;

        if ((document.getElementById("newPassword").value.length >= 6)) {
        currentUserInfo.password = `${document.getElementById("newPassword").value}`;
        }

        localStorage.setItem('userDatabase', JSON.stringify(existingData));
        });
});