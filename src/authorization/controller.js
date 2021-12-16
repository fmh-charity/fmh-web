import { request } from '../request-service';
import { setCookie } from '../cookie-service';

const authController = { 
  async login(authData) {
    try {
      const { data } = await request('POST', '/authentication/login', authData);
      
      setCookie('accessToken', data.accessToken, { path: '/' });
      setCookie('refreshToken', data.refreshToken, { path: '/' });

      this.repo.actions.set('data', { login: '', password: '' });
    } catch (error) {
      console.error('Errror:', error);
      this.repo.actions.set('error', 'Что-то пошло не так');
    }
  },
  fillValues(data) {
    this.repo.actions.set('data', data);
  }
}

export default authController;
