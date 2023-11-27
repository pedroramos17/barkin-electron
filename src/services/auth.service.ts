import axios from 'axios';
import API_HOST from '../config/api';
import { UserLoginForm, UserRegisterForm } from '../interfaces/user.interface';

type GetUserResponse = {
  message?: string;
  token?: string;
};
const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
export default class Auth {
  static async registerUser(userProps: UserRegisterForm) {
    const { name, email, password, passwordConfirmation } = userProps;
    try {
      const response = await axios.post<GetUserResponse>(
        `${API_HOST}register`,
        {
          headers: {
            jsonHeaders,
          },
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
      const response = await axios.post<GetUserResponse>(`${API_HOST}login`, {
        headers: {
          jsonHeaders,
        },
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
