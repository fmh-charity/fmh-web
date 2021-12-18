import { request } from '../request-service';
import { setCookie } from '../cookie-service';
import { setlc } from '../local-store-service';
import { RepositoryService } from '../repository-service/adapter';

const authController = { 
  repo: new RepositoryService(),

  async login(authData) {
    try {
      const { data } = await request('POST', '/authentication/login', authData);
      
      setCookie('accessToken', data.accessToken, { path: '/' });
      setlc('refreshToken', data.refreshToken); 

      const { data: userInfo } = await request('POST', '/authentication/userInfo', authData);
      this.repo.actions.set('isLogged', true);

      setlc('user', JSON.stringify(userInfo)); 
      this.repo.actions.set('data', { login: '', password: '' });
      this.repo.actions.set('isLogged', false);

    } catch (error) {
      console.error('Errror:', error);
      this.repo.actions.set('isLogged', false);
      this.repo.actions.set('error', 'Что-то пошло не так');
    }
  },
  fillValues(data) {
    this.repo.actions.set('data', data);
  }
}

export default authController;
