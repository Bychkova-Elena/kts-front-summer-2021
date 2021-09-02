import React, { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItem, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";
declare type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem;
  onClose: (e: EventType) => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  visible,
}) => {
  const [branchesList, setBranchesList] = useState<BranchItem[]>([]);

  useEffect(() => {
    const getBranches = async () => {
      const EXAMPLE_ORGANIZATION = selectedRepo.owner.login;
      const EXAMPLE_REPO = selectedRepo.name;
      try {
        await new GitHubStore()
          .getRepoBranchesList({
            ownerName: EXAMPLE_ORGANIZATION,
            repoName: EXAMPLE_REPO,
          })
          .then((branch) => setBranchesList(branch.data));
      } catch (err) {}
    };
    getBranches();
  }, [selectedRepo.owner.login, selectedRepo.name]);

  return (
    <Drawer
      title="Branches"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {branchesList.length &&
        branchesList.map((branch, i) => (
          <React.Fragment key={i}>
            <p>
              {i + 1}. Name: {branch.name}
            </p>
          </React.Fragment>
        ))}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
