import { User } from 'src/types/User';
import { crudApi } from './Api';

async function getAll(): Promise<User[]> {
  try {
    const response = await crudApi.get('users');

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
    const response = await crudApi.get(`users/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function createUser(user: User): Promise<void> {
  try {
    const data = {
      name: `${user.name}`,
      age: +user.age,
      zipCode: +user.zipCode,
      address: `${user.address}`,
      addressNumber: `${user.addressNumber}`,
      city: `${user.city}`,
      district: `${user.district}`,
      state: `${user.state}`,
      githubUsername: `${user.githubUsername}`,
      githubUrl: `${user.githubUrl}`,
      githubId: user.githubId,
      nodeId: `${user.nodeId}`,
      githubType: `${user.githubType}`,
      reposUrl: `${user.reposUrl}`,
    };

    await crudApi.post('users/', data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function updateUser(user: User, id: number): Promise<void> {
  try {
    await crudApi.patch(`users/${id}`, {
      name: `${user.name}`,
      age: +user.age,
      zipCode: +user.zipCode,
      address: `${user.address}`,
      addressNumber: `${user.addressNumber}`,
      city: `${user.city}`,
      district: `${user.district}`,
      state: `${user.state}`,
      githubUsername: `${user.githubUsername}`,
      githubUrl: `${user.githubUrl}`,
      githubId: user.githubId,
      nodeId: `${user.nodeId}`,
      githubType: `${user.githubType}`,
      reposUrl: `${user.reposUrl}`,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteUser(id: number): Promise<void> {
  try {
    await crudApi.delete(`users/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteAllUsers(): Promise<void> {
  try {
    await crudApi.delete('users');
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getAll, getUser, createUser, updateUser, deleteUser, deleteAllUsers };
