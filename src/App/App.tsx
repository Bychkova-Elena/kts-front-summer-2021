import { createContext, useContext } from "react";

import RepoItemBranches from "@pages/RepoItemBranches";
import ReposSearchPage from "@pages/ReposSearchPage";
import "./App.css";
import { RepoItemModel } from "@store/models/gitHub";
import ReposListStore from "@store/ReposListStore";
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
  loading: string;
  load: () => void;
};

const ReposContext = createContext<ReposContextType>({
  list: [],
  loading: "",
  load: () => {},
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
  const reposListStore = useLocalStore(() => new ReposListStore());
  let list = reposListStore.list;
  let loading = reposListStore.meta;

  const load = async () => {
    await reposListStore.getOrganizationReposList({
      organizationName: "kubernetes",
      per_page: 10,
      page: 1,
    });
  };

  return (
    <Provider value={{ list, loading, load }}>
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
