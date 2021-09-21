/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

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

export type GetOrganizationRepoByIdParams = {
  name: string;
  organizationName: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;

  getRepoBranchesList(params: GetRepoBranchesLisParams): Promise<void>;

  getOrganizationRepoById(params: GetOrganizationRepoByIdParams): Promise<void>;
}
