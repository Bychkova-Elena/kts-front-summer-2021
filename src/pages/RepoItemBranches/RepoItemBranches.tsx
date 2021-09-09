import { useEffect, useState } from "react";
import React from "react";

import Button from "@components/Button";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

function RepoItemBranches() {
  const [repo, setRepo] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getRepo = async () => {
      const EXAMPLE_ORGANIZATION = "kubernetes";
      try {
        await new GitHubStore()
          .getOrganizationRepoById({
            id: id,
            organizationName: EXAMPLE_ORGANIZATION,
          })
          .then((repo) => setRepo(repo))
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {}
    };
    getRepo();
  }, [id]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div>
        {repo.map((repo) => (
          <React.Fragment key={repo.id}>
            {repo.name}
            <RepoBranchesDrawer
              selectedRepo={repo}
              visible={visible}
              onClose={onClose}
            />
          </React.Fragment>
        ))}
        <Button onClick={showDrawer}>Показать ветки репозитория</Button>
      </div>
    </Spin>
  );
}

export default RepoItemBranches;
