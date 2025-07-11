import apiService from "../../../services/api";

const usersApi = {
  getUsers: async (clientId: number, token: string) => {
    try {
      const response = await apiService.get(`/clients/${clientId}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al obtener los usuarios"
      );
    }
  },
  deleteUser: async (clientId: number, userId: number, token: string) => {
    try {
      const response = await apiService.delete(
        `/clients/${clientId}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar el usuario"
      );
    }
  },

  createUser: async (user: any, token: string) => {
    try {
      const response = await apiService.post(
        `/invitations`,
        { user },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al crear el usuario"
      );
    }
  },
};

export default usersApi;
