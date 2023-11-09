import { loadDatabase, saveDatabase } from "./localStorageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const profilePictureInput = document.getElementById("profilePicture");
  const profilePicturePreview = document.getElementById(
    "profilePicturePreview"
  );
  const profileForm = document.getElementById("profileForm");
  const currentUser = localStorage.getItem("currentUser");

  // Cargar la base de datos de usuarios y encontrar el usuario actual
  const databaseKey = "userDatabase";
  const database = loadDatabase(databaseKey);

  if (database) {
    const user = database.users.find((user) => user.username === currentUser);

    if (user) {
      // Cargar datos del perfil actual del usuario
      let userProfile = JSON.parse(localStorage.getItem(currentUser)) || {
        firstName: "",
        middleName: "",
        lastName: "",
        secondLastName: "",
        email: user.email, // Utilizar el correo electrónico de la base de datos
        phone: "",
      };

      // Display user data in the form
      Object.keys(userProfile).forEach((key) => {
        const input = document.getElementById(key);
        if (input) {
          input.value = userProfile[key];
        }
      });

      // Display user profile picture if available
      const profilePicture = localStorage.getItem(
        "profilePicture_" + currentUser
      );
      if (profilePicture) {
        profilePicturePreview.src = profilePicture;
      }

      // Handle profile picture change
      profilePictureInput.addEventListener("change", () => {
        const file = profilePictureInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            profilePicturePreview.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      // Handle form submission
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Update the user profile data with the form values
        userProfile.firstName = document.getElementById("firstName").value;
        userProfile.middleName = document.getElementById("middleName").value;
        userProfile.lastName = document.getElementById("lastName").value;
        userProfile.secondLastName =
          document.getElementById("secondLastName").value;
        userProfile.email = document.getElementById("email").value;
        userProfile.phone = document.getElementById("phone").value;

        // Actualizar el correo electrónico del usuario
        user.email = userProfile.email;

        // Save the updated user profile data in localStorage
        localStorage.setItem(currentUser, JSON.stringify(userProfile));

        // Save the profile picture if one is selected
        if (profilePictureInput.files.length > 0) {
          const profilePictureFile = profilePictureInput.files[0];
          const reader = new FileReader();
          reader.onload = function (event) {
            localStorage.setItem(
              "profilePicture_" + currentUser,
              event.target.result
            );
          };
          reader.readAsDataURL(profilePictureFile);
        }
        window.location.href = "my-profile.html";
      });
    } else {
      console.error("Usuario no encontrado en la base de datos");
    }
  } else {
    console.error("Error al cargar la base de datos");
  }
});
