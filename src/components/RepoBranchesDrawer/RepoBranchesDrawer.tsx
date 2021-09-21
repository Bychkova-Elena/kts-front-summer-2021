import React, { useEffect } from "react";

import GitHubStore from "@store/GitHubStore";
import { RepoItemModel } from "@store/models/gitHub";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
declare type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItemModel;
  onClose: (e: EventType) => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  visible,
}) => {
  const gitHubStore = useLocalStore(() => new GitHubStore());

  useEffect(() => {
    gitHubStore.getRepoBranchesList({
      ownerName: selectedRepo.owner.login,
      repoName: selectedRepo.name,
    });
  }, [gitHubStore, selectedRepo]);

  return (
    <Drawer
      title="Список веток"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {gitHubStore.branches.length &&
        gitHubStore.branches.map((branch, i) => (
          <p key={i}>
            {i + 1}. {branch.name}
          </p>
        ))}
    </Drawer>
  );
};

export default React.memo(RepoBranchesDrawer);
