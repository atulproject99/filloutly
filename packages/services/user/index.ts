import type { AuthenticationMethod } from "./model";

class UserService {
  async getAuthenticationMethods(): Promise<AuthenticationMethod[]> {
    return [
      {
        provider: "google",
        name: "Google",
        iconUrl: "https://www.google.com/favicon.ico",
      },
    ];
  }
}

export default UserService;
