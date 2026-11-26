import apiClient from "../api/apiClient";

const recupererTousLesDevis = async () => {
    const response = await apiClient.get("/api/admin/devis");
    return response.data;
};

// code : "ACCEPTE" ou "REFUSE" ; commentaire : message lu par le client (obligatoire pour un refus)
const changerStatut = async (idDevis, code, commentaire) => {
    const response = await apiClient.put(`/api/admin/devis/${idDevis}/statut`, { code, commentaire });
    return response.data;
};

export default {
    recupererTousLesDevis,
    changerStatut
};
