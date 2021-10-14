import RepoItemBranches from "@pages/RepoItemBranches";
import ReposSearchPage from "@pages/ReposSearchPage";

const routes = {
  reposList: {
    path: "/repos",
    component: ReposSearchPage,
    create: () => `/repos`,
  },

  repoItem: {
    path: "/repos/:id",
    component: RepoItemBranches,
    create: (id: string): string => `/repos/${id}`,
  },
};

export default routes;
