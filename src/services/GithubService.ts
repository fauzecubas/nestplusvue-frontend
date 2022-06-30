import { GithubUser } from 'src/types/GithubUser';
import { emptyUrl, gitHubApi } from './Api';

async function getGithubProfile(gitHubUser: string): Promise<GithubUser> {
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

async function getRepositories(url: string): Promise<[]> {
  try {
    const response = await emptyUrl.get(`${url}`);

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getGithubProfile, getRepositories };
