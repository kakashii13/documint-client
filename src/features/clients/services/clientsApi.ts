import apiService from "../../../services/api";

const clientsApi = {
  getClients: async (token: string) => {
    const response = await apiService.get("/clients", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteClient: async (clientId: number, token: string) => {
    const response = await apiService.delete(`/clients/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  createClient: async (clientData: any, token: string) => {
    const response = await apiService.post("/clients", clientData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default clientsApi;
