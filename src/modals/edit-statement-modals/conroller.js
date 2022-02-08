import { getUnixTime, parseISO } from "date-fns";

import { getlc } from "../../local-store-service";
import { RepositoryService } from "../../repository-service/adapter";
import { request } from "../../request-service";
import claimsController from "../../statementPage/controller";

const createStatementController = {
  repo: new RepositoryService(),

  async createStatement() {
    try {
      const user = JSON.parse(getlc("user") || "{}");
      const claimData = {
        ...this.repo.actions.get("claimData"),
        creatorId: user.id,
        creatorName: `${user.lastName} ${user.firstName} ${user.middleName}`,
        createDate: getUnixTime(new Date()),
      };

      console.log("claimData", claimData);
      const { data } = await request(claimData.id ? "PUT" : "POST", `/claims`, claimData);

      console.log("uploadData", data);

      await claimsController.getClaims();
      this.closeModal();
    } catch (error) {
      console.error("error", error);
    }
  },

  editDate(date) {
    console.log("Edit Date", date);
    this.repo.actions.set("claimData", {
      ...this.repo.actions.get("claimData"),
      time: new Date(date),
      planExecuteDate: new Date(date),
    });
  },

  editExecutorName(name) {
    this.repo.actions.set("claimData", {
      ...this.repo.actions.get("claimData"),
      executorName: name,
    });
  },

  editClaimData(data) {
    if (data.time && data.planExecuteDate) {
      const { planExecuteDate } = this.repo.actions.get("claimData");
      console.log("plan", planExecuteDate);
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
        planExecuteDate: getUnixTime(planExecuteDate),
        status: data.executorName ? "IN_PROGRESS" : "OPEN",
      });
    } else {
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
      });
    }
    console.log("edit", data);
    this.createStatement();
  },

  openModal(claimData) {
    if (claimData) {
      console.log("edit data", claimData);
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...claimData,
        time: new Date(),
        planExecuteDate: new Date(),
      });
    }
    this.repo.actions.set("openEdit", true);
  },
  closeModal() {
    this.repo.actions.set("openEdit", false);
  },
};

export default createStatementController;
