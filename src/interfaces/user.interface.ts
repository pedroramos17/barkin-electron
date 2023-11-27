export interface UserLoginForm {
  email: string;
  password: string;
}
export interface UserRegisterForm extends UserLoginForm {
  name: string;
  passwordConfirmation: string;
}
