import { generateRepository } from '../repository-service';
import controller from './controller';

export default generateRepository(
  {
    data: {
      login: '',
      password: '',
    },
    isLogged: false,
    error: '',
  },
  controller
);
