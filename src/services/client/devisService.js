import apiClient from "../api/apiClient";

const creerDevis = async (devisData) => {
    const response = await apiClient.post("/api/devis", devisData);
    return response.data;
};

const devisService = {
    creerDevis
};

export default devisService;