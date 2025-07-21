// ----------------------------------------------------------------------

export const envConfig = {
  apiBaseUrl:
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://grocerygo-microservice-api-auth-service.onrender.com/api/v1",
  accessTokenKey:
    import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "grovia_access_token",
};
