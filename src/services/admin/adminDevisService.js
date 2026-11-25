import apiClient from "../api/apiClient";

const recupererTousLesDevis = async () => {
    const response = await apiClient.get("/api/admin/devis");
    return response.data;
};

export default {
    recupererTousLesDevis
};