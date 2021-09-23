import ApiStore from "@store/ApiStore";
import { HTTPMethod } from "@store/ApiStore/types";
import {
  BranchItemApi,
  BranchItemModel,
  normalizeBranchItem,
} from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { GetRepoBranchesLisParams, IRepoBranchesStore } from "./types";

const BASE_URL: string = "https://api.github.com";

type PrivateFields = "_meta" | "_branches";

export default class RepoBranchesStore
  implements IRepoBranchesStore, ILocalStore
{
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _branches: BranchItemModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,
      branches: computed,
      meta: computed,
      getRepoBranchesList: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get branches(): BranchItemModel[] {
    return this._branches;
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
