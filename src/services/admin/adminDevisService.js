import apiClient from "../api/apiClient";

const recupererTousLesDevis = async () => {
    const response = await apiClient.get("/api/admin/devis");
    return response.data;
};

// code : "ACCEPTE" ou "REFUSE"
const changerStatut = async (idDevis, code) => {
    const response = await apiClient.put(`/api/admin/devis/${idDevis}/statut`, { code });
    return response.data;
};

export default {
    recupererTousLesDevis,
    changerStatut
};
