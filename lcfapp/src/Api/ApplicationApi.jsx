import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const ApplicationApi = (PATH) => {
  const COMPLETEURL = `${URL}/${PATH}`;
  const token = localStorage.getItem("_auth_jwt");
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return {
    GET: async () =>
      await axios.get(`${COMPLETEURL}`, config, {withCredentials: true}),
    POST: async (payload) =>
      await axios.post(`${COMPLETEURL}`, payload, config, {
        withCredentials: true,
      }),
    DELETE: async () =>
      await axios.delete(`${COMPLETEURL}`, config, {withCredentials: true}),
    PUT: async (payload) =>
      await axios.put(`${COMPLETEURL}`, payload, config, {
        withCredentials: true,
      }),
    PATCH: async (payload) =>
      await axios.patch(`${COMPLETEURL}`, payload, config, {
        withCredentials: true,
      }),
  };
};
