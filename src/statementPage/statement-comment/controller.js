import { request } from "../../request-service";
import { RepositoryService } from "../../repository-service/adapter";

const commentsController = {
  repo: new RepositoryService(),

  async getComments(id) {
    try {
      const { data } = await request("GET", `/claims/${id}/comments`);
      this.repo.actions.set("comments", data);
    } catch (error) {
      console.log("ERROR", error);
    }
  },
};
export default commentsController;
