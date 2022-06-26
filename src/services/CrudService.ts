import { User } from 'src/types/User';
import api from './Api';

async function getAll(): Promise<User[]> {
  try {
    const response = await api.get('users');

    console.log(response);

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getUser(id: number): Promise<User[]> {
  try {
    const response = await api.get(`users/${id}`);

    console.log(response.data);

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteUser(id: number): Promise<void> {
  try {
    await api.delete(`users/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getAll, getUser, deleteUser };
