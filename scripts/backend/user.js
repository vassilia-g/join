class User {
    constructor(id, username, password, email, status = "active", createdAt = Date.now(), phone = "") {
        this.id = id || null; // will be set when saved to backend
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.createdAt = createdAt;
        this.phone = phone;
    }

    // Persist this user to backend and return the posted object (or this)
    async save() {
        const payload = {
            createdAt: this.createdAt || Date.now(),
            username: this.username,
            email: this.email,
            password: this.password,
            status: this.status,
        };
        const response = await postData("users", payload);
        this.id = response.name; // Firebase returns the new key in 'name'
        return this;
    }

    static async loadById(id) {
        if (id == null) return null;
        const response = await getData("users/" + id);
        // console.log("Loaded user:", response);
        if (!response) return null;
        return new User(
            id,
            response.username,
            response.password,
            response.email,
            response.status,
            response.createdAt,
            response.phone
        );
    }

    static async loadUserByEmail(email) {
        if (!email) return null;
        const allUsers = await UserCollection.loadAll();
        return allUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }

    static async updateOwnUser(updatedContact) {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            console.error("Kein User eingeloggt.");
            return;
        }

        // Hole die aktuellen Userdaten (z.B. Passwort und Status sollen erhalten bleiben)
        const response = await fetch(`${BASE_URL}users/${userId}.json`);
        const userData = await response.json();

        // Erstelle ein neues User-Objekt mit den aktualisierten Daten
        const updatedUser = {
            ...userData,
            username: updatedContact.name,
            email: updatedContact.email,
            color: updatedContact.color,
            phone: updatedContact.phone || "",
        };

        // Speichere die aktualisierten Daten in der Datenbank
        await fetch(`${BASE_URL}users/${userId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });
    }
}


const UserCollection = {
    async loadAll() {
        const data = await getData("users") || {};
        return Object.entries(data).map(([key, u]) => new User(key, u.username, u.password, u.email, u.status, u.createdAt));
    }
};


// Returns the currently logged-in user or null
async function getUser() {
    const id = localStorage.getItem("currentUserId");
    if (!id) return null;
    try {
        return await User.loadById(id);
    } catch (error) {
        console.error("getUser failed", error);
        return null;
    }
}