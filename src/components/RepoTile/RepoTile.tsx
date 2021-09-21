import React from "react";

import Avatar from "@components/Avatar";
import StartIcon from "@components/StarIcon";
import { RepoItemModel } from "@store/models/gitHub";
import { Tooltip } from "antd";
import Moment from "moment";
import { Link } from "react-router-dom";

import styles from "./RepoTile.module.scss";

export type RepoTileProps = {
  repo: RepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ repo }) => (
  <Tooltip title="Посмотреть ветки репозитория" color="#FF5555">
    <Link to={`/repos/${repo.id}`}>
      <div className={styles.gitRepoTile}>
        <div className={styles.gitRepoTile__avatar}>
          <Avatar src={repo.owner.avatarUrl}></Avatar>
        </div>
        <div className={styles.gitRepoTile__content}>
          <div className={styles.gitRepoTile__repoName}>
            <b> {repo.name} </b>
          </div>
          <div className={styles.gitRepoTile__orgLink}>
            <a href={repo.owner.url}> {repo.owner.login}</a>
          </div>
          <div className={styles.gitRepoTile__info}>
            <div className={styles.gitRepoTile__stars}>
              <StartIcon></StartIcon>
              <small>{repo.stargazersCount}</small>
            </div>
            <small>Updated {Moment(repo.updatedAt).format("D MMM")}</small>
          </div>
        </div>
      </div>
    </Link>
  </Tooltip>
);

export default React.memo(RepoTile);
