import { createContext, useCallback, useContext, useState } from "react";

import RepoItemBranches from "@pages/RepoItemBranches";
import ReposSearchPage from "@pages/ReposSearchPage";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

type ReposContextType = {
  repoList: RepoItem[];
  setRepoList: (repoList: RepoItem[]) => void;
  isLoading: boolean;
  load: () => void;
  fetchData: () => void;
};

const ReposContext = createContext<ReposContextType>({
  repoList: [],
  isLoading: true,
  setRepoList: () => {},
  load: () => {},
  fetchData: () => {},
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    const getRepos = async () => {
      const EXAMPLE_ORGANIZATION = "kubernetes";
      const PER_PAGE = 10;
      const PAGE = 1;
      try {
        await new GitHubStore()
          .getOrganizationReposList({
            organizationName: EXAMPLE_ORGANIZATION,
            per_page: PER_PAGE,
            page: PAGE,
          })
          .then((repo) => setRepoList(repo.data))
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {}
    };
    getRepos();
  };

  const fetchData = useCallback(() => {
    setTimeout(() => {
      setRepoList((prev) => [...prev, ...prev]);
    }, 2000);
  }, []);

  return (
    <Provider value={{ repoList, isLoading, load, setRepoList, fetchData }}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/repos" component={ReposSearchPage} />
            <Route path="/repos/:id" component={RepoItemBranches} />
            <Redirect to="/repos" />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
