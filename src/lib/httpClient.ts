import axios from "axios";

// const BASE_URL = "https://test.ownmali.com/api";
 const BASE_URL = "https://mgm-backend.vercel.app";
// const BASE_URL = "http://localhost:5050";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => sessionStorage.getItem("accessToken");
const getRefreshToken = () => sessionStorage.getItem("refreshToken");
const getSessionId = () => sessionStorage.getItem("sessionId");

const setAccessToken = (token: string) =>
  sessionStorage.setItem("accessToken", token);

const setRefreshToken = (token: string) =>
  sessionStorage.setItem("refreshToken", token);

const setSessionId = (id: string) =>
  sessionStorage.setItem("sessionId", id);

const clearTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

const logout = () => {
  clearTokens();
  window.location.href = "/auth/login";
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({ message: "Network Error" });
    }

    const status = error.response.status;

    // Prevent infinite retry loop
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const sessionId = getSessionId();
        if (!refreshToken) {
          logout();
          return Promise.reject({ message: "No refresh token" });
        }

        const { data } = await axios.post(`${BASE_URL}/agents/refresh-token`, {
          refreshToken,
          sessionId,
        });

        const newAccessToken = data?.data?.accessToken;
        const newRefreshToken = data?.data?.refreshToken;
        const newSessionId = data?.data?.sessionId;
        if (!newAccessToken) throw new Error("No new access token");

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setSessionId(newSessionId);

        // Update request & retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        logout();
        return Promise.reject({ message: "Session expired" });
      }
    }

    return Promise.reject(error);
  },
);

export default api;
