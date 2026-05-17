import { apiRequest } from "./http";

export const authApi = {
    register: (payload) =>
        apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
    login: (payload) =>
        apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
    me: () => apiRequest("/auth/me"),
    updateProfile: (payload) =>
        apiRequest("/auth/profile", {
            method: "PUT",
            body: JSON.stringify(payload),
        }),
};
