// ----------------------------------------------------------------------

export const envConfig = {
  apiBaseUrl:
    import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8000/api/v1",
  accessTokenKey:
    import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "grovia_access_token",
};
