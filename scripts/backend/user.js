/** 
 * User model with helpers for backend persistence and lookup 
 * @constructor
 * */
class User {
    constructor(id, color, username, password, email, status = "active", createdAt = Date.now(), phone = "") {
        this.id = id || null; /** will be set when saved to backend */
        this.color = color;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.createdAt = createdAt;
        this.phone = phone;
    }


    /** 
     * Persist this user to backend and return the posted object (or this) 
     */
    async save() {
        const payload = {
            color: this.color,
            createdAt: this.createdAt || Date.now(),
            username: this.username,
            email: this.email,
            password: this.password,
            status: this.status,
        };
        const response = await postData("users", payload);
        this.id = response.name; /** Firebase returns the new key in 'name' */
        return this;
    }


    /** 
     * Load one user by id from backend 
     */
    static async loadById(id) {
        if (id == null) return null;
        const response = await getData("users/" + id);
        if (!response) return null;
        return new User(
            id,
            response.color,
            response.username,
            response.password,
            response.email,
            response.status,
            response.createdAt,
            response.phone
        );
    }


    /** 
     * Find a user by email among all users (case-insensitive) 
     */
    static async loadUserByEmail(email) {
        if (!email) return null;
        const targetEmail = email.trim().toLowerCase();
        const allUsers = await UserCollection.loadAll();
        return allUsers.find(u => {
            if (typeof u.email !== 'string') return false;
            return u.email.trim().toLowerCase() === targetEmail;
        }) || null;
    }


    /** 
     * Update the currently logged-in user's record with provided contact data 
     */
    static async updateOwnUser(updatedContact) {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            console.error("Kein User eingeloggt.");
            return;
        }
        const response = await fetch(`${BASE_URL}users/${userId}.json`);
        const userData = await response.json();

        const updatedUser = {
            ...userData,
            username: updatedContact.name,
            email: updatedContact.email,
            phone: updatedContact.phone || "",
        };

        await fetch(`${BASE_URL}users/${userId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });
    }
}


/** 
 * Checks if user already exists if not, create user 
 */
const UserCollection = {
    async loadAll() {
        const data = await getData("users") || {};
        return Object.entries(data).map(([key, u = {}]) => new User(
            key,
            u.color ?? null,
            u.username ?? "",
            u.password ?? "",
            u.email ?? "",
            u.status ?? "active",
            u.createdAt ?? null,
            u.phone ?? ""
        ));
    }
};


/** 
 * Returns the currently logged-in user or null 
 */
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