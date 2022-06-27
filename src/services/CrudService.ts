import { User } from 'src/types/User';
import { crudApi } from './Api';

async function getAll(): Promise<User[]> {
  try {
    const response = await crudApi.get('users');

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
    const response = await crudApi.get(`users/${id}`);

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

async function createUser(user: User): Promise<void> {
  try {
    await crudApi.post('users/', {
      name: `${user.name}`,
      age: +user.age,
      zipCode: +user.zipCode,
      address: `${user.address}`,
      addressNumber: `${user.addressNumber}`,
      city: `${user.city}`,
      district: `${user.district}`,
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

export { getAll, getUser, createUser, deleteUser };
