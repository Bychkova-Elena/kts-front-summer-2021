import React, { useCallback, useState } from "react";

import Button from "@components/Button";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import { RepoItemModel } from "@store/models/gitHub";

import styles from "./RepoCard.module.scss";

export type RepoCardProps = {
  repo: RepoItemModel;
};

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {

  const [visible, setVisible] = useState(false);

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div className={styles.repoCard}>
      <div>
        <p>
          URL: <a href={repo.url}>{repo.name}</a>
        </p>
        <p>Приватность: {repo.private ? "Да" : "Нет"}</p>
        <p>Количество звезд: {repo.stargazersCount}</p>
        <Button onClick={showDrawer}>Показать ветки репозитория</Button>
      </div>
      <div>
        <h3>Информация о владельце</h3>
        <p>Имя владельца: {repo.owner.login}</p>
        <p>
          URL: <a href={repo.owner.url}>{repo.owner.login}</a>
        </p>
      </div>
      <RepoBranchesDrawer
        selectedRepo={repo}
        visible={visible}
        onClose={onClose}
      />
    </div>
  )
};

export default React.memo(RepoCard);
