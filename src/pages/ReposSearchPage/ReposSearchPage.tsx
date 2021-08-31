import { useState } from "react";
import React from "react";
import { useEffect } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import GitHubStore from "@store/GitHubStore/GitHubStore";

function ReposSearchPage() {
  const [repoList, setRepoList] = useState([]);

  const getRepos = async () => {
    const EXAMPLE_ORGANIZATION = "ktsstudio";
    try {
      const repositories = await new GitHubStore().getOrganizationReposList({
        organizationName: EXAMPLE_ORGANIZATION,
      });
      setRepoList(repositories.data);
    } catch (err) {}
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div className="repositories-page">
      <Input placeholder="Введите название организации" />
      <Button>
        <SearchIcon />
      </Button>
      {repoList &&
        repoList.map((repo, i) => (
          <React.Fragment key={i}>
            <RepoTile repo={repo} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default ReposSearchPage;
