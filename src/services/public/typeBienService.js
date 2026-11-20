import apiClient from "../api/apiClient";

const recupererTypesBien = async () => {
    const response = await apiClient.get("/api/types-bien");
    return response.data;
};

export default {
    recupererTypesBien
};