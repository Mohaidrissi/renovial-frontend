import apiClient from "../api/apiClient";

// Profil du client connecté (le token est ajouté par apiClient)
const recupererProfil = async () => {
    const response = await apiClient.get("/api/profil");
    return response.data;
};

// Seuls le nom et le téléphone sont modifiables
const modifierProfil = async ({ nom, telephone }) => {
    const response = await apiClient.put("/api/profil", { nom, telephone });
    return response.data;
};

export default {
    recupererProfil,
    modifierProfil
};
