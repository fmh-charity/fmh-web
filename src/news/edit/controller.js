import { request } from '../../request-service';

export default {
  createRecord(record) {
    try {
      const { data } = await request('POST', '/news', record);

      return data;
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
