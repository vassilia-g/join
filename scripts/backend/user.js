class User {
    constructor(id, username, password, email, status = "active", createdAt = Date.now()) {
        this.id = id || null; // will be set when saved to backend
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.createdAt = createdAt;
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
        if (!response) return null;
        return new User(id, response.username, response.password, response.email, response.status, response.createdAt);
    }

    static async loadUserByEmail(email) {
        if (!email) return null;
        const allUsers = await UserCollection.loadAll();
        return allUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }
}

const UserCollection = {
    async loadAll() {
        const data = await getData("users") || {};
        return Object.entries(data).map(([key, u]) => new User(key, u.username, u.password, u.email, u.status, u.createdAt));
    }
};