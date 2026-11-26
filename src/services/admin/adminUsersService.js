import apiClient from "../api/apiClient";

const recupererTousLesUtilisateurs = async () => {
    const response = await apiClient.get("/api/admin/utilisateurs");
    return response.data;
};

// actif = false bloque le compte, actif = true le débloque
const changerActif = async (idUtilisateur, actif) => {
    const response = await apiClient.put(`/api/admin/utilisateurs/${idUtilisateur}/actif`, { actif });
    return response.data;
};

export default {
    recupererTousLesUtilisateurs,
    changerActif
};
