import RepoItemBranches from "@pages/RepoItemBranches";
import ReposSearchPage from "@pages/ReposSearchPage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/repos" component={ReposSearchPage} />
          <Route path="/repos/:id" component={RepoItemBranches} />
          <Redirect to="/repos" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
