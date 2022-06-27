import { User } from 'src/types/User';

export function validateNewUser(user: User): boolean {
  if (
    !user.name ||
    !user.age ||
    !user.zipCode ||
    !user.district ||
    !user.city ||
    !user.address ||
    !user.addressNumber ||
    !user.state
  ) {
    return false;
  }

  return true;
}
