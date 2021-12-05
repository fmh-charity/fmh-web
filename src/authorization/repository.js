import { generateRepository } from '../repository-service';
import controller from './controller';

export default generateRepository(
  {
    data: {
      username: '',
      password: '',
    },
    error: '',
  },
  [controller, 'login'],
  [controller, 'fillValues', { sync: 'data' }]
);
