import { useState } from "react";
import React from "react";
import { useEffect } from "react";

import { useReposContext } from "@App/App";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.scss";
import { Spin, BackTop } from "antd";
import { useHistory } from "react-router-dom";

function ReposSearchPage() {
  let history = useHistory();
  const reposContext = useReposContext();
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    reposContext.load();
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDisabled(false);
  };

  const handleSearch = () => {
    const filteredData = reposContext.repoList.filter((repo) => {
      return repo.name.toLowerCase().includes(value.toLowerCase());
    });
    reposContext.setRepoList(filteredData);
    setDisabled(true);
  };

  return (
    <Spin spinning={reposContext.isLoading} tip="Loading...">
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
          {reposContext.repoList.map((repo) => (
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
        {!reposContext.repoList.length && <span>Репозиториев не найдено</span>}
      </div>
    </Spin>
  );
}

export default ReposSearchPage;
