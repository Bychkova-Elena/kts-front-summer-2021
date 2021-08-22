import ApiStore from "../../shared/store/ApiStore";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  ApiResp,
  RepoItem
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<any> {
    try {
      const response = await this.apiStore.request({
        method: "GET",
        endpoint: `orgs/${params.organizationName}/repos`,
        headers: { "Content-Type": "application/json" }
      });
      return response;
    } catch (error) {
      return {
        data: error
      };
    }
  }
}
