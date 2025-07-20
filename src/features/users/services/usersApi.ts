import apiService from "../../../services/api";

const usersApi = {
  getUsers: async (clientId: number, token: string) => {
    try {
      const response = await apiService.get(`/clients/${clientId}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw error;
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
      throw error;
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
      throw error;
    }
  },

  updateUser: async (user: any, token: string) => {
    try {
      const response = await apiService.put(`/users/${user.userId}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  updatePassword: async (
    data: { userId: number; currentPassword: string; newPassword: string },
    token: string
  ) => {
    try {
      const response = await apiService.patch(
        `/users/${data.userId}/password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default usersApi;
