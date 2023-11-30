import axios, { AxiosResponse } from 'axios';
import API_URL from '../config/api';
import { UserLoginForm, UserRegisterForm } from '../interfaces/user.interface';

const REGISTER_URL = '/register';

const LOGIN_URL = '/login';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function registerUser(userProps: UserRegisterForm) {
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
    let message = '';

    console.log(error);
    if (error === 422) {
      message = 'Email ou senha inválidos.';
    } else if (error === 401) {
      message = 'Não autorizado a acessar.';
    } else if (error === 500) {
      message = 'Servidor indisponível.';
    }

    return { error: message };
  }
  let userData: { token?: string } = {};
  if (window.electron.store.get('user')) {
    userData = window.electron.store.get('user');
  }
  userData.token = response.data.token;
  window.electron.store.set('user', userData);

  return {
    message: 'Conta criada com sucesso.',
  };
}

export async function loginUser(userProps: UserLoginForm) {
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
    let message = '';
    console.log(error);
    if (error === 422) {
      message = 'Email ou senha inválidos.';
    } else if (error === 401) {
      message = 'Não autorizado a acessar.';
    } else if (error === 500) {
      message = 'Servidor indisponível.';
    }

    return { error: message };
  }

  let userData: { token?: string } = {};
  if (window.electron.store.get('user')) {
    userData = window.electron.store.get('user');
  }
  userData.token = response.data.token;
  window.electron.store.set('user', userData);

  return {
    message: 'Login realizado com sucesso.',
  };
}
