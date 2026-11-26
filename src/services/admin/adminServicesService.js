import apiClient from "../api/apiClient";

const recupererTousLesServices = async () => {
    const response = await apiClient.get("/api/admin/services");
    return response.data;
};

const recupererUnites = async () => {
    const response = await apiClient.get("/api/admin/services/unites");
    return response.data;
};

const creerService = async (service) => {
    const response = await apiClient.post("/api/admin/services", service);
    return response.data;
};

// Sert aussi à activer / désactiver (champ actif)
const modifierService = async (idService, service) => {
    const response = await apiClient.put(`/api/admin/services/${idService}`, service);
    return response.data;
};

export default {
    recupererTousLesServices,
    recupererUnites,
    creerService,
    modifierService
};
