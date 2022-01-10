import { request } from "../request-service";
import { RepositoryService } from "../repository-service/adapter";

const usersController = {
  repo: new RepositoryService(),

  async getUsers() {
    try {
      const { data } = await request("GET", "/users");
      this.repo.actions.set("users", data);
      console.log(data);
    } catch (error) {
      console.error("ERROR", error);
    }
  },
};

export default usersController;
