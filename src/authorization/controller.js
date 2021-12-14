import { request } from '../request-service';
import { setCookie } from '../cookie-service';

const authController = { 
  async login(authData) {
    try {
      const { data } = await request('POST', '/authentication/login', authData);
      
      setCookie('accessToken', data.accessToken, { path: '/' });
      setCookie('refreshToken', data.refreshToken, { path: '/' });

      return { login: '', password: '' };
    } catch (error) {
      console.error('Errror:', error);
      return { login: '', password: '' };
    }
  },
  fillValues(data) {
    return data;
  }
}

export default authController;
