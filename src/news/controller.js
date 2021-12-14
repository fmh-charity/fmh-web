import { request } from '../request-service';

const newsController = { 
  async getNews(authData) {
    try {
      const { data } = await request('GET', '/news');

      return data;
    } catch (error) {
      console.error('Error: ', error);
    }
  },
  async removeRecord(id) {
    try {
      const { data } = await request('DELETE', `/news/${id}`);

      return data;
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}

export default newsController;
