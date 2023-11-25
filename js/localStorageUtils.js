export function loadDatabase(databaseKey) {
  // hacemos una funcion que mas tarde vamos a importar , para poder cargar la database en otros documentos js
  const database = JSON.parse(localStorage.getItem(databaseKey)) || {
    users: [],
  }; // simulamos la base de datos utilizando localstorage
  return database;
}

export function saveDatabase(databaseKey, database) {
  // hacemos una function que va a ser util para poder guardar usuarios dentro de la misma
  localStorage.setItem(databaseKey, JSON.stringify(database)); // para poder guardar usuarios dentro de nuestro localstorage
}

//! PARTE  BELEN
///////////////////////////
export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}
//////////////////////////
