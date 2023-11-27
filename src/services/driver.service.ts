import axios from 'axios';
import authHeader from './authHeader';
import API_HOST from '../config/api';

const DRIVER_ROUTE = `${API_HOST}driver/`;

const getDrivers = async () => {
  return axios.get(DRIVER_ROUTE, { headers: authHeader() });
};

const getDriver = async (id: string) => {
  return axios.get(`${DRIVER_ROUTE}${id}`, { headers: authHeader() });
};

const postDriver = async (driver: any) => {
  return axios.post(DRIVER_ROUTE, driver, { headers: authHeader() });
};

const putDriver = async (id: string, driver: any) => {
  return axios.put(`${DRIVER_ROUTE}${id}`, driver, { headers: authHeader() });
};

const deleteDriver = async (id: string) => {
  return axios.delete(`${DRIVER_ROUTE}${id}`, { headers: authHeader() });
};

export { getDrivers, getDriver, postDriver, putDriver, deleteDriver };
