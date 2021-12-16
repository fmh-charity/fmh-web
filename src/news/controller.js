import { request } from '../request-service';

const newsController = {
  async getNews(authData) {
    try {
      const { data } = await request('GET', '/news');

      this.repo.actions.set('list', data);
    } catch (error) {
      console.error('Error: ', error);
      this.repo.actions.set('error', 'Smth happeened');
    }
  },
  async removeRecord(id) {
    try {
      const { data } = await request('DELETE', `/news/${id}`);

      this.repo.actions.set('list', data);
    } catch (error) {
      console.error('error', error);
      this.repo.actions.set('error', 'Smth happeened');
    }
  }
}

export default newsController;
