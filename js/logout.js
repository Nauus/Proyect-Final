import { clearCurrentUser } from "./localStorageUtils.js";

export function displayCurrentUser() {
  const currentUserSpan = document.getElementById("currentUser");
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    currentUserSpan.textContent = currentUser;
  }
}
export function logoutUser() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearCurrentUser();
      window.location.href = "login.html";
    });
  }
}
