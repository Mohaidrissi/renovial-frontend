import apiClient from "../api/apiClient";

const creerDevis = async (devisData) => {
    const response = await apiClient.post("/api/devis", devisData);
    return response.data;
};

// Devis du client connecté (le token est ajouté par apiClient)
const recupererMesDevis = async () => {
    const response = await apiClient.get("/api/devis/mes-devis");
    return response.data;
};

const devisService = {
    creerDevis,
    recupererMesDevis
};

export default devisService;