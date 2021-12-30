import { request } from "../request-service";
import { RepositoryService } from "../repository-service/adapter";

const statementCntroller = {
  repo: new RepositoryService(),

  async getClaims() {
    try {
      const { data } = await request("GET", "/claims");
      this.repo.actions.set("claims", data);
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  },
};

export default statementCntroller;
