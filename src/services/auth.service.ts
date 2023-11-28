import axios from 'axios';
import API_URL from '../config/api';
import { UserLoginForm, UserRegisterForm } from '../interfaces/user.interface';

type GetUserResponse = {
  message?: string;
  token?: string;
};

const REGISTER_URL = '/register';

const LOGIN_URL = '/login';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default class Auth {
  static async registerUser(userProps: UserRegisterForm) {
    const { name, email, password, passwordConfirmation } = userProps;
    try {
      const response = await axios.post<GetUserResponse>(
        API_URL + REGISTER_URL,
        {
          headers: { HEADERS },
          name,
          email,
          password,
          passwordConfirmation,
        },
      );
      console.log(JSON.stringify(response, null, 4));
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      }
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }

  static async loginUser(userProps: UserLoginForm) {
    const { email, password } = userProps;
    try {
      const response = await axios.post<GetUserResponse>(API_URL + LOGIN_URL, {
        headers: { HEADERS },
        email,
        password,
      });

      console.log(JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      }
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
