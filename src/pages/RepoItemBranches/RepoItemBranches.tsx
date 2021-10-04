import { useEffect } from "react";
import React from "react";

import Error from "@components/Error";
import { RepoItemModel } from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { Spin, Breadcrumb } from "antd";
import { useParams, Link } from "react-router-dom";

import { useReposContext } from "../../App/App";
import RepoCard from "./components/RepoCard";
import styles from "./RepoItemBranches.module.scss";

const RepoItemBranches: React.FC = () => {
  const reposContext = useReposContext();
  const { id } = useParams<{ id: string }>();
  const repo = reposContext.list.filter((repo: RepoItemModel) => repo.id == id);

  useEffect(() => {
    reposContext.load();
  }, [id]);

  return (
    <div>
      {reposContext.loading !== Meta.error && (
        <Spin spinning={reposContext.loading === Meta.loading} tip="Loading...">
          <div className={styles.repoItemPage}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/repos">Список репозиториев</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Репозиторий № {id}</Breadcrumb.Item>
            </Breadcrumb>
            {repo.map((repo) => (
              <React.Fragment key={repo.id}>
                <h2>Репозиторий {repo.name}</h2>
                <RepoCard repo={repo} />
              </React.Fragment>
            ))}
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

export default RepoItemBranches;
