import { GithubUser } from 'src/types/GithubUser';
import { gitHubApi } from './Api';

async function getGitHubProfile(gitHubUser: string): Promise<GithubUser> {
  try {
    const response = await gitHubApi.get(`users?q=${gitHubUser}`);

    if (response.status === 200 && response.data.total_count > 0) {
      return response.data.items[0];
    }

    return {} as GithubUser;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getGitHubProfile };
