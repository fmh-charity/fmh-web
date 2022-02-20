import { generateRepository } from "../repository-service";
import controller from "./controller";

export default generateRepository(
  {
    openFilterModal: false,
    filterBy: {
      OPEN: false,
      IN_PROGRESS: false,
      EXECUTED: false,
      CANCELLED: false,
    },
    claims: null,
    error: "",
  },
  controller,
);
