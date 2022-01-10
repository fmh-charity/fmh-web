import { generateRepository } from "../../repository-service";
import controller from "./conroller";

export default generateRepository(
  {
    openEdit: false,
    claimData: {
      planExecuteDate: 0,
      id: null,
      time: "00:00",
      executorName: "",
      description: "",
      title: "",
    },
  },
  controller,
);
