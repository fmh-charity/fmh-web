import { request } from "../request-service";
import { RepositoryService } from "../repository-service/adapter";

const statementCntroller = {
  repo: new RepositoryService(),

  async getClaims() {
    try {
      const { data } = await request("GET", "/claims");
      this.repo.actions.set("claims", data);
      console.log("DTAAT", data);
    } catch (error) {
      console.error("Error", error);
    }
  },

  openFilterModal() {
    this.repo.actions.set("openFilterModal", true);
  },

  closeFilterModal() {
    this.repo.actions.set("openFilterModal", false);
  },

  editFilter(filterBy) {
    this.repo.actions.set("filterBy", {
      ...this.repo.actions.get("filterBy"),
      ...filterBy,
    });
  },

  async getFilteredClaims() {
    try {
      const { data } = await request("GET", "/claims");

      const filter = this.repo.actions.get("filterBy");
      const filterArr = Object.keys(filter).filter((key) => filter[key]);

      const filteredData = data.filter((obj) => (filterArr.includes(obj.status) ? obj : ""));
      this.repo.actions.set("claims", filteredData);
      this.closeFilterModal();
    } catch (error) {
      console.error("ERROR", error);
    }
  },
};

export default statementCntroller;
