import { loadDatabase, saveDatabase } from './localStorageUtils.js';

document.addEventListener("DOMContentLoaded", function() {
    const storedData = localStorage.getItem('userDatabase');

// Paso 2: Convierte el objeto en un objeto JavaScript
    const existingData = JSON.parse(storedData);

// Paso 3: Agregar la propiedad "lastname" al objeto
    existingData.users[0].secondname = '';
    existingData.users[0].lastname = '';
    existingData.users[0].secondlastname = '';
    existingData.users[0].phonenumber = '';

// Vuelve a guardar el objeto modificado en el localStorage
    localStorage.setItem('userDatabase', JSON.stringify(existingData));

    document.getElementById("name").value = userObject.users[0].username;
    document.getElementById("name2").value = userObject.users[0].secondname;
    document.getElementById("lastaname").value = userObject.users[0].lastname;
    document.getElementById("lastname2").value = userObject.users[0].secondlastname;
    document.getElementById("email").value = userObject.users[0].email;
    document.getElementById("phoneNumber").value = userObject.users[0].phonenumber;
    document.getElementById("currentPassword").value = userObject.users[0].password;


    });