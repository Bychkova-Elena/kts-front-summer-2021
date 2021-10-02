import React from "react";

import { createContext, useCallback, useContext, useState } from "react";

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
  let [page, setPage] = useState(1);
  let list = reposListStore.list;
  let loading = reposListStore.meta;

  const load = useCallback(async () => {
    await reposListStore.getOrganizationReposList({
      organizationName: "kubernetes",
      per_page: 10,
      page: page,
    });
  }, [reposListStore, page]);

  //TODO: FIX
  const fetchData = () => {
    setPage(page++);
  };

  return (
    <Provider value={{ list, loading, load, fetchData }}>
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
