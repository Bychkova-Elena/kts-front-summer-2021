import React, { useState, useEffect, useCallback } from "react";

import Button from "@components/Button";
import Error from "@components/Error";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { Meta } from "@utils/meta";
import { Spin, BackTop } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import { useReposContext } from "../../App/App";
import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const reposContext = useReposContext();
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    reposContext.load();
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setDisabled(false);
    },
    []
  );

  const handleSearch = useCallback(() => {
    reposContext.list = reposContext.list.filter((repo) => {
      return repo.name.toLowerCase().includes(value.toLowerCase());
    });
    setDisabled(true);
  }, [reposContext, value]);

  return (
    <div>
      {reposContext.loading !== Meta.error && (
        <Spin spinning={reposContext.loading === Meta.loading} tip="Loading...">
          <BackTop>
            <Button className={styles.backTop}>
              <b>&#8593;</b>
            </Button>
          </BackTop>
          <div className={styles.repositoriesPage}>
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
                dataLength={reposContext.list.length}
              >
                {reposContext.list.map((repo) => (
                  <React.Fragment key={repo.id}>
                    <Link to={`/repos/${repo.id}`}>
                      <RepoTile repo={repo} />
                    </Link>
                  </React.Fragment>
                ))}
                {!reposContext.list.length && (
                  <span>Репозиториев не найдено</span>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </Spin>
      )}
      {reposContext.loading === Meta.error && (
        <Error
          title="Что-то пошло не так."
          subTitle="Пожалуйста, перезагрузите страницу"
        />
      )}
    </div>
  );
};

export default ReposSearchPage;
