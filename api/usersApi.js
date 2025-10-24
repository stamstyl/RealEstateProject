export async function apiLogin(apiClient, email, password) {
    const apiLoginResponse = await apiClient.post(`/api/users/login`, {
      data: {
        email,
        password
      }
    });
    
    const apiLoginResponseJson = await apiLoginResponse.json();

    return apiLoginResponseJson.accessToken;
  }