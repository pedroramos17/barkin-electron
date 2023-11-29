import axios, { AxiosResponse } from 'axios';
import { redirect } from 'react-router-dom';
import API_URL from '../config/api';
import { UserLoginForm, UserRegisterForm } from '../interfaces/user.interface';

const REGISTER_URL = '/register';

const LOGIN_URL = '/login';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function registerUser(
  userProps: UserRegisterForm,
  { redirectTo = '/' }: { redirectTo?: string },
) {
  const { name, email, password, passwordConfirmation } = userProps;
  let response: AxiosResponse;
  try {
    response = await axios.post(API_URL + REGISTER_URL, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      headers: { HEADERS },
      withCredentials: true,
    });
  } catch (error: any) {
    return { errors: error };
  }
  let userData: { token?: string } = {};
  if (window.electron.store.get('user')) {
    userData = window.electron.store.get('user');
  }
  userData.token = response.data.token;
  window.electron.store.set('user', userData);

  return {
    redirector: redirect(redirectTo),
  };
}

export async function loginUser(
  userProps: UserLoginForm,
  { redirectTo = '/' }: { redirectTo?: string },
) {
  const { email, password } = userProps;
  let response: AxiosResponse;
  try {
    response = await axios.post(API_URL + LOGIN_URL, {
      email,
      password,
      headers: { HEADERS },
      withCredentials: true,
    });
  } catch (error: any) {
    return { errors: error?.response?.data?.status };
  }

  let userData: { token?: string } = {};
  if (window.electron.store.get('user')) {
    userData = window.electron.store.get('user');
  }
  userData.token = response.data.token;
  window.electron.store.set('token', userData);

  return {
    redirector: redirect(redirectTo),
  };
}
