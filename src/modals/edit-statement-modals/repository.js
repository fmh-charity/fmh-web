import { generateRepository } from "../../repository-service";
import controller from "./conroller";

export default generateRepository(
  {
    openEdit: false,
    claimData: {
      planExecuteDate: new Date(),
      id: null,
      time: new Date(),
      executorName: "",
      description: "",
      title: "",
      status: "",
    },
  },
  controller,
);
