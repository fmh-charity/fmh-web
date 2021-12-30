import { generateRepository } from "../repository-service";
import controller from "./controller";

export default generateRepository(
  {
    users: null,
  },
  controller,
);
