import React from "react";

import Avatar from "@components/Avatar";
import StartIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";
import { Tooltip } from "antd";
import Moment from "moment";
import "./RepoTile.css";

export type RepoTileProps = {
  onClick?: (e: React.MouseEvent) => void;
  repo: RepoItem;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, repo }) => (
  <Tooltip title="Посмотреть ветки репозитория" color="#FF5555">
    <div className="git-repo-tile" onClick={onClick}>
      <div className="git-repo-tile__avatar">
        <Avatar src={repo.owner.avatar_url}></Avatar>
      </div>
      <div className="git-repo-tile__content">
        <div className="git-repo-tile__repo-name">
          <b> {repo.name} </b>
        </div>
        <div className="git-repo-tile__org-link">
          <a href={repo.owner.url}> {repo.owner.login}</a>
        </div>
        <div className="git-repo-tile__info">
          <div className="git-repo-tile__stars">
            <StartIcon></StartIcon>
            <small>{repo.stargazers_count}</small>
          </div>
          <small> Updated {Moment(repo.updated_at).format("D MMM")}</small>
        </div>
      </div>
    </div>
  </Tooltip>
);

export default React.memo(RepoTile);
