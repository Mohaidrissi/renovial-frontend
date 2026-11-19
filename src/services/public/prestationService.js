import apiClient from "../api/apiClient";

const recupererPrestationsActives = async () => {
    const response = await apiClient.get("/api/services/actifs");
    return response.data;
};

export default {
    recupererPrestationsActives
};