import ApiStore from "@store/ApiStore";
import { HTTPMethod } from "@store/ApiStore/types";
import {
  BranchItemApi,
  BranchItemModel,
  normalizeBranchItem,
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
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
  GetRepoBranchesLisParams,
  GetOrganizationRepoByIdParams,
} from "./types";

const BASE_URL: string = "https://api.github.com";

type PrivateFields = "_list" | "_meta" | "_branches";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<string, RepoItemModel> =
    getInitialCollectionModel();
  private _branches: BranchItemModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _branches: observable.ref,
      _meta: observable,
      list: computed,
      branches: computed,
      meta: computed,
      getOrganizationReposList: action,
      getRepoBranchesList: action,
    });
  }

  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get branches(): BranchItemModel[] {
    return this._branches;
  }

  // Список репозиториев
  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos?per_page=${params.per_page}&page=${params.page}`,
      headers: {},
      data: {},
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list: RepoItemModel[] = [];
        for (const item of response.data) {
          list.push(normalizeRepoItem(item));
        }
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getOrganizationRepoById(
    params: GetOrganizationRepoByIdParams
  ): Promise<void> {
    // return await this._apiStore.request({
    //   method: HTTPMethod.GET,
    //   endpoint: `/repos/${params.organizationName}/${params.name}`,
    //   headers: {},
    //   data: {},
    // });
  }

  // Список веток репозитория
  async getRepoBranchesList(params: GetRepoBranchesLisParams): Promise<void> {
    this._meta = Meta.loading;
    this._branches = [];

    const response = await this._apiStore.request<BranchItemApi[]>({
      method: HTTPMethod.GET,
      endpoint: `/repos/${params.ownerName}/${params.repoName}/branches`,
      headers: {},
      data: {},
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._branches = response.data.map(normalizeBranchItem);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._branches = [];
      }
    });
  }

  destroy(): void {}
}
