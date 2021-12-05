import { request } from '../request-service';
import { setCookie } from '../cookie-service';

const authController = { 
  async login(authData) {
    try {
      const result = await request('POST', '/fmh/authentication/login', authData);
      
      setCookie('access', result.accessToken, { path: '/' });
      setCookie('refresh', result.refreshToken, { path: '/' });

      return;
    } catch (error) {
      return 
    }
  },
  fillValues(data) {
    return data;
  }
}

export default authController;
