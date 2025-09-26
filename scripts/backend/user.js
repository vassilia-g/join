class User {
    constructor(id, username, password, email, status = "active", createdAt = Date.now()) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Persist this user to backend and return the posted object (or this)
    async save() {
        const payload = {
            id: this.id,
            createdAt: this.createdAt || Date.now(),
            username: this.username,
            email: this.email,
            password: this.password,
            status: this.status,
        };
        await putData(`users/${this.id}`, payload);
        return this;
    }

    static async loadById(id) {
        if (id == null) return null;
        const u = await getData("users/" + id);
        if (!u) return null;
        return new User(u.id, u.username, u.password, u.email, u.status, u.createdAt);
    }

    static async loadUserByEmail(email) {
        if (!email) return null;
        const allUsers = await getData("users") || {};
        const vals = Array.isArray(allUsers) ? allUsers : Object.values(allUsers);
        const u = vals.find(user => user.email === email);
        if (!u) return null;
        return new User(u.id, u.username, u.password, u.email, u.status, u.createdAt);
    }

    static async nextId() {
        const allUsers = await getData("users") || {};
        const vals = Array.isArray(allUsers) ? allUsers : Object.values(allUsers);
        const ids = vals.map(user => Number(user.id) || 0);
        return Math.max(0, ...ids) + 1;
    }
}

const UserCollection = {
    async loadAll() {
        const data = await getData("users") || {};
        // backend returns object keyed by id? normalize to array
        const users = Array.isArray(data)
            ? data
            : Object.values(data);
        return users.map(u => new User(u.id, u.username, u.password, u.email, u.status, u.createdAt));
    }
};