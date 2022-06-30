import axios from 'axios';

export const emptyUrl = axios.create({
  baseURL: '',
});

export const crudApi = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const zipCodeApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export const gitHubApi = axios.create({
  baseURL: 'https://api.github.com/search',
});
