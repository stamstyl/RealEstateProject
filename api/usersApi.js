export async function apiLogin(request, baseUrl, baseUserApi, baseEmail, basePassword) {
    const userFullUrl = new URL(baseUserApi, baseUrl).toString();

    const apiLoginResponse = await request.post(userFullUrl, {
      data: {
        email: baseEmail,
        password: basePassword
      }
    });
    
    const apiLoginResponseJson = await apiLoginResponse.json();

    return apiLoginResponseJson.accessToken;
  }