import { useState } from "react";
import React from "react";
import { useEffect } from "react";

import { useReposContext } from "@App/App";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { Spin, BackTop } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";

import styles from "./ReposSearchPage.module.scss";

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
      <div className={styles.repositoriesPage}>
        <BackTop>
          <Button className={styles.repositoriesPage__backTop}>
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
        <div className={styles.repositoriesPage__repoItem}>
          <InfiniteScroll
            next={reposContext.fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            dataLength={reposContext.repoList.length}
          >
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
            {!reposContext.repoList.length && (
              <span>Репозиториев не найдено</span>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </Spin>
  );
}

export default ReposSearchPage;
