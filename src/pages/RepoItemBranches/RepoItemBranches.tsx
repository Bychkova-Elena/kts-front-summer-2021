import { useEffect, useState } from "react";
import React from "react";

import { useReposContext } from "@App/App";
import Button from "@components/Button";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

function RepoItemBranches() {
  const reposContext = useReposContext();
  const [visible, setVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const repo = reposContext.repoList.filter((repo: RepoItem) => repo.id == id);

  useEffect(() => {
    reposContext.load();
  }, [id]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Spin spinning={reposContext.isLoading} tip="Loading...">
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
