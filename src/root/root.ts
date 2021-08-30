import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

gitHubStore
  .getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
  })
  .then((result) => {
    /* eslint-disable no-console */
    console.log(result);
    /* eslint-disable no-console */
  });
