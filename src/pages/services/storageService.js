const TOKEN_KEY = "token";
const ADMIN_KEY = "isAdmin";

export const storageService = {
    setAuth(token, rememberMe) {
        const storage = rememberMe
            ? localStorage
            : sessionStorage;

        storage.setItem(TOKEN_KEY, token);
        storage.setItem(ADMIN_KEY, "true");
    },

    getToken() {
        return (
            localStorage.getItem(TOKEN_KEY) ||
            sessionStorage.getItem(TOKEN_KEY)
        );
    },

    isAdmin() {
        return (
            localStorage.getItem(ADMIN_KEY) ||
            sessionStorage.getItem(ADMIN_KEY)
        );
    },

    clearAuth() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ADMIN_KEY);

        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(ADMIN_KEY);
    }
};