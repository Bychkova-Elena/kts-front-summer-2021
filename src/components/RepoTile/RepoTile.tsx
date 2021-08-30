import Avatar from "@components/Avatar";
import StartIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";
import "./RepoTile.css";

export type RepoTileProps = {
  onClick: (e: React.MouseEvent) => void;
  item: RepoItem;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, item }) => (
  <div className="git-repo-tile" onClick={onClick}>
    <div className="git-repo-tile__avatar">
      <Avatar src={item.owner.avatar_url}></Avatar>
    </div>
    <div className="git-repo-tile__content">
      <div className="git-repo-tile__repo-name">
        <b> {item.name} </b>
      </div>
      <div className="git-repo-tile__org-link">
        <a href={item.owner.url}> {item.owner.login}</a>
      </div>
      <div className="git-repo-tile__info">
        <div className="git-repo-tile__stars">
          <StartIcon></StartIcon>
          <small>{item.stargazers_count}</small>
        </div>
        <small> Updated 21 Jul</small>
      </div>
    </div>
  </div>
);

export default RepoTile;
