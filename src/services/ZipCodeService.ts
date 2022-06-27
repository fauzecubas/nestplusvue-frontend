import { Address } from 'src/types/Address';
import { zipCodeApi } from './Api';

async function getAddressByZipCode(zipCode: number): Promise<Address> {
  try {
    const response = await zipCodeApi.get(`${zipCode}/json`);

    console.log(response);

    if (response.status === 200) {
      return response.data;
    }

    return {} as Address;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getAddressByZipCode };
