/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

import { ApiResponse } from "@store/ApiStore/types";

// Параметры запроса
export type GetOrganizationReposListParams = {
  organizationName: string;
  per_page?: number;
  page?: number;
};

// Параметры запроса
export type GetRepoBranchesLisParams = {
  ownerName: string;
  repoName: string;
};

export type GitHubRepoOwner = {
  id: string;
  login: string;
  avatar_url: string;
  url: string;
};

export type RepoItem = {
  id: string;
  name: string;
  url: string;
  private: boolean;
  stargazers_count: number;
  owner: GitHubRepoOwner;
  updated_at: Date;
};

export type BranchItem = {
  name: string;
  protected: boolean;
  protection_url: string;
};

export type GetOrganizationRepoByIdParams = {
  name: string;
  organizationName: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;

  getRepoBranchesList(
    params: GetRepoBranchesLisParams
  ): Promise<ApiResponse<BranchItem[], any>>;

  getOrganizationRepoById(
    params: GetOrganizationRepoByIdParams
  ): Promise<ApiResponse<RepoItem, any>>;
}
