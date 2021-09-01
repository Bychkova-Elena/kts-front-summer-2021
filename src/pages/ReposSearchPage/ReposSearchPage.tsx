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
  const [value, setValue] = useState("");

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

  if (repoList === undefined || !repoList.length) {
    return <p>Loading repoList...</p>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="repositories-page">
      <Input
        placeholder="Введите название репозитория"
        onChange={handleChange}
        value={value}
      />
      <Button>
        <SearchIcon />
      </Button>
      {repoList.length &&
        repoList.map((repo, i) => (
          <React.Fragment key={i}>
            <RepoTile repo={repo} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default ReposSearchPage;
