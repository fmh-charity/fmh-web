import { generateRepository } from "../../../repository-service";
import controller from "./controller";

export default generateRepository(
  {
    repo: {
      claimComment: {},
      id: null,
      status: "",
    },
  },
  controller,
);
