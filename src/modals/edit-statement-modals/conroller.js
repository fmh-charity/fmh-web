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

  editClaimData(data) {
    if (data.time && data.planExecuteDate) {
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
        planExecuteDate: getUnixTime(
          parseISO(`${data.planExecuteDate} ${data.time}`, "yyyy-MM-dd HH:mm"),
        ),
      });
    } else if (!data.executorName) {
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
        status: "OPEN",
      });
    } else if (data.executorName) {
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
        status: "IN_PROGRESS",
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

  async changeStatus(data) {
    const uploadChanges = {
      ...this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...data,
      }),
    };
    await request("PUT", "/claims", uploadChanges);
  },

  openModal(claimData) {
    if (claimData) {
      console.log("edit data", claimData);
      this.repo.actions.set("claimData", {
        ...this.repo.actions.get("claimData"),
        ...claimData,
      });
    }
    this.repo.actions.set("openEdit", true);
  },
  closeModal() {
    this.repo.actions.set("openEdit", false);
  },
};

export default createStatementController;
