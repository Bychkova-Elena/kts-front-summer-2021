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
  org?: string;
  type?: string;
  sort?: string;
  direction?: string;
};

export type RepoItem = [];

export type ApiResp<RepoItem> =
  | {
      success: true;
      data: RepoItem;
      status: string;
    }
  | {
      success: false;
      data: RepoItem;
      status: string;
    };

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResp<RepoItem[]>>;
}
