import { RepositoryService } from "../../repository-service/adapter";
import { request } from "../../request-service";
import { getlc } from "../../local-store-service";
import { getUnixTime } from "date-fns";

const statementCommentController = {
  repo: new RepositoryService(),
  async setComment(id) {
    try {
      const user = JSON.parse(getlc("user") || "{}");
      const commentData = {
        ...this.repo.actions.get("commentData"),
        creatorId: user.id,
        creatorName: `${user.lastName} ${user.firstName} ${user.middleName}`,
        createDate: getUnixTime(new Date()),
      };
      console.log("commentData", commentData);
      const { data } = await request("POST", `/claims/${id}/comments`, commentData);

      console.log("upload", data);
    } catch (error) {
      console.error("error", error);
    }
  },
  editComment(data, claimId) {
    this.repo.actions.set("commentData", {
      ...this.repo.actions.get("commentData"),
      ...data,
    });
    console.log("edit", data, claimId);
    this.setComment(claimId);
  },
};

export default statementCommentController;
