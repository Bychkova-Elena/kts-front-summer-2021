import React from "react";
import { createContext, useCallback, useContext, useState } from "react";

import "./App.css";
import routes from "@config/routes";
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
  fetchData: () => void;
};

const ReposContext = createContext<ReposContextType>({
  list: [],
  loading: "",
  load: () => {},
  fetchData: () => {},
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
  const reposListStore = useLocalStore(() => new ReposListStore());
  const [page, setPage] = useState(1);
  const list = reposListStore.list;
  const loading = reposListStore.meta;

  const load = useCallback(async () => {
    await reposListStore.getOrganizationReposList({
      organizationName: "kubernetes",
      per_page: 10,
      page: page,
    });
  }, [reposListStore, page]);

  //TODO: FIX
  const fetchData = () => {};

  const value = React.useMemo(
    () => ({ list, loading, load, fetchData }),
    [list, loading, load]
  );

  return (
    <Provider value={value}>
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path={routes.reposList.path}
              component={routes.reposList.component}
            />
            <Route
              path={routes.repoItem.path}
              component={routes.repoItem.component}
            />
            <Redirect to={routes.reposList.path} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default observer(App);
