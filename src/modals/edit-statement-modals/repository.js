import { generateRepository } from "../../repository-service";
import controller from "./conroller";

export default generateRepository(
  {
    openEdit: false,
    claimData: {
      planExecuteDate: null,
      id: null,
      time: "00:00",
      executorName: "",
      description: "",
      title: "",
      status: "",
    },
  },
  controller,
);
