import { generateRepository } from "../../repository-service";
import controller from "./controller";

export default generateRepository(
  {
    openEdit: false,
    commentData: {
      id: null,
      description: "",
    },
    error: "",
  },
  controller,
);
