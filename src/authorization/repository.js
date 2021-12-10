import { generateRepository } from '../repository-service';
import controller from './controller';

export default generateRepository(
  {
    data: {
      login: '',
      password: '',
    },
    error: '',
  },
  [controller, 'login'],
  [controller, 'fillValues', { sync: 'data' }]
);
