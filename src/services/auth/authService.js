import api from "../api/apiClient";

const seConnecter = async (values) => {
    const response = await api.post("/authenticate", values);
    return response;
};

const sInscrire = async (values) => {
    const response = await api.post("/register", values);
    return response;
};

const authService = {
    seConnecter,
    sInscrire
};

export default authService;
