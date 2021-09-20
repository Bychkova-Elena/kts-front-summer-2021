import ApiStore from "@store/ApiStore";
import { ApiResponse, HTTPMethod } from "@store/ApiStore/types";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  IGitHubStore,
  GetOrganizationReposListParams,
  RepoItem,
  GetRepoBranchesLisParams,
  BranchItem,
  GetOrganizationRepoByIdParams,
} from "./types";

const BASE_URL: string = "https://api.github.com";

type PrivateFields = "_list" | "_meta";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: RepoItem[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get list(): RepoItem[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const response = await this._apiStore.request<RepoItem[]>({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos?per_page=${params.per_page}&page=${params.page}`,
      headers: {},
      data: {},
    });

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._list = response.data;
        return;
      }
      this._meta = Meta.error;
    });
  }

  async getOrganizationRepoById(
    params: GetOrganizationRepoByIdParams
  ): Promise<ApiResponse<RepoItem, any>> {
    return await this._apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/repos/${params.organizationName}/${params.name}`,
      headers: {},
      data: {},
    });
  }

  async getRepoBranchesList(
    params: GetRepoBranchesLisParams
  ): Promise<ApiResponse<BranchItem[], any>> {
    return await this._apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/repos/${params.ownerName}/${params.repoName}/branches`,
      headers: {},
      data: {},
    });
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
