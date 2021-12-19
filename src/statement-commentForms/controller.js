import { RepositoryService } from '../repository-service/adapter';
import { request } from "../request-service";

const statementCommentController = {
  repo: new RepositoryService(),
  async setComment(id, comment) {
    try {
      const { data } = await request("POST", `/statement/${id}/comments`, comment);
      this.repo.actions.set("comment", data);
    } catch (error) {
      console.error("error", error);
    }
  },
};

export default statementCommentController;
