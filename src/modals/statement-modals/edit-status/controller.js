import { RepositoryService } from "../../../repository-service/adapter";
import { request } from "../../../request-service";

const statusController = {
  repo: new RepositoryService(),

  async changeStatus(data, claimId) {
    const uploadChanges = {
      ...this.repo.actions.set("repo", {
        ...this.repo.actions.get("repo"),
        ...data,
      }),
    };

    await request("PUT", `/claims/${claimId}/status`, uploadChanges);
  },
};

export default statusController;
