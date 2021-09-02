import { useState } from "react";
import React from "react";
import { useEffect } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

function ReposSearchPage() {
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getRepos = async () => {
      const EXAMPLE_ORGANIZATION = "ktsstudio";
      try {
        await new GitHubStore()
          .getOrganizationReposList({
            organizationName: EXAMPLE_ORGANIZATION,
          })
          .then((repo) => setRepoList(repo.data))
          .finally(() => {
            setIsLoading(false);
            setDisabled(false);
          });
      } catch (err) {}
    };
    getRepos();
  }, [value]);

  if (isLoading) {
    return <p>Loading repoList...</p>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = repoList.filter((repo) => {
      return repo.name.toLowerCase().includes(value.toLowerCase());
    });
    setRepoList(filteredData);
    setDisabled(true);
  };

  return (
    <div className="repositories-page">
      <Input
        placeholder="Введите название репозитория"
        onChange={handleChange}
        value={value}
      />
      <Button onClick={handleSearch} disabled={disabled}>
        <SearchIcon />
      </Button>
      {repoList.length &&
        repoList.map((repo) => (
          <React.Fragment key={repo.id}>
            <RepoTile repo={repo} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default ReposSearchPage;
