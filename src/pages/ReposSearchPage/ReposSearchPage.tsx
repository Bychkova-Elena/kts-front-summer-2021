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
import { Spin, BackTop } from "antd";
import { useHistory } from "react-router-dom";

function ReposSearchPage() {
  let history = useHistory();
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getRepos = async () => {
      const EXAMPLE_ORGANIZATION = "kubernetes";
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
    <Spin spinning={isLoading} tip="Loading...">
      <div className="repositories-page">
        <BackTop>
          <Button className="backTop">
            <b>&#8593;</b>
          </Button>
        </BackTop>
        <Input
          placeholder="Введите название репозитория"
          onChange={handleChange}
          value={value}
        />
        <Button onClick={handleSearch} disabled={disabled}>
          <SearchIcon />
        </Button>
        <div className="repositories-page__repoItem">
          {repoList.map((repo) => (
            <React.Fragment key={repo.id}>
              <RepoTile
                repo={repo}
                onClick={() => {
                  history.push(`/repos/${repo.id}`);
                }}
              />
            </React.Fragment>
          ))}
        </div>
        {!repoList.length && <span>Репозиториев не найдено</span>}
      </div>
    </Spin>
  );
}

export default ReposSearchPage;
