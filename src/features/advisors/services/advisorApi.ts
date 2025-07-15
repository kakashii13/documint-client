import apiService from "../../../services/api";

const advisorApi = {
  getAdvisors: async (userId: number, token: string) => {
    try {
      const response = await apiService.get(`/users/${userId}/advisors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAdvisorBySlug: async (advisorSlug: string) => {
    try {
      const response = await apiService.get(`/advisors/slug/${advisorSlug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAdvisor: async (userId: number, advisorData: any, token: string) => {
    try {
      const response = await apiService.post(
        `/users/${userId}/advisors`,
        advisorData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAdvisor: async (userId: number, advisorId: number, token: string) => {
    try {
      const response = await apiService.delete(
        `/users/${userId}/advisors/${advisorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default advisorApi;
