export function loadDatabase (databaseKey) {
    const database = JSON.parse(localStorage.getItem(databaseKey)) || { users: [] };
    return database;
}

export function saveDatabase (databaseKey, database) {
    localStorage.setItem(databaseKey, JSON.stringify(database));
}

export function clearCurrentUser () {
    localStorage.removeItem('currentUser');
}