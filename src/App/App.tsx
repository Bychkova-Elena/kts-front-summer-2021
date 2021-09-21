import { createContext, useCallback, useContext } from "react";

import RepoItemBranches from "@pages/RepoItemBranches";
import ReposSearchPage from "@pages/ReposSearchPage";
import GitHubStore from "@store/GitHubStore";
import "./App.css";
import { RepoItemModel } from "@store/models/gitHub";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

type ReposContextType = {
  list: RepoItemModel[];
  filteredData: (value: string) => void;
  loading: string;
  load: () => void;
  fetchData: () => void;
};

const ReposContext = createContext<ReposContextType>({
  list: [],
  loading: "",
  filteredData: () => {},
  load: () => {},
  fetchData: () => {},
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
  const gitHubStore = useLocalStore(() => new GitHubStore());
  let list = gitHubStore.list;
  let loading = gitHubStore.meta;

  const load = async () => {
    await gitHubStore.getOrganizationReposList({
      organizationName: "kubernetes",
      per_page: 10,
      page: 1,
    });
  };

  const filteredData = (value: string) => {
    list = gitHubStore.list.filter((repo) => {
      return repo.name.toLowerCase().includes(value.toLowerCase());
    });
  };

  const fetchData = useCallback(() => {
    setTimeout(() => {
      // list = (prev) => [...prev, ...prev];
    }, 2000);
  }, []);

  return (
    <Provider value={{ list, loading, load, filteredData, fetchData }}>
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

export default observer(App);
