import { User } from 'src/types/User';

export function validateUser(user: User): boolean {
  if (
    !user.name ||
    !user.age ||
    !user.zipCode ||
    !user.district ||
    !user.city ||
    !user.address ||
    !user.addressNumber ||
    !user.state ||
    !user.githubUsername ||
    !user.githubUrl ||
    !user.githubId ||
    !user.nodeId ||
    !user.githubType ||
    !user.reposUrl
  ) {
    return false;
  }

  return true;
}
