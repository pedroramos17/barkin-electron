import { useContext } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import logo from '../../../assets/logo.png';
import { loginUser } from '../../services/auth.service';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import { UserLoginForm } from '../../interfaces/user.interface';
import { AuthContext } from '../../context/AuthProvider';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória'),
});

export default function Login() {
  const { setAuth } = useContext(AuthContext);

  // let auth;
  const onSubmit = async (
    formValue: UserLoginForm,
    { setSubmitting, setFieldError }: FormikHelpers<UserLoginForm>,
  ) => {
    await loginUser(formValue, { redirectTo: '/driver' }).then(
      (response) => {
        const accessToken = window.electron.store.get('user')?.token;
        setAuth({
          ...formValue,
          accessToken,
        });
        setSubmitting(false);

        if (accessToken) {
          window.location.href = '/driver';
        }
        console.log(response);
        return response;
      },
      (error) => {
        console.log(error);
        // if (auth.errors === 422) {
        //   setFieldError('password', 'Email ou senha inválidos.');
        //   setSubmitting(true);
        // } else if (auth.errors === 401) {
        //   setFieldError('password', 'Não autorizado a acessar.');
        //   setSubmitting(true);
        // } else if (auth.errors === 400) {
        //   setFieldError('password', 'Está faltando o email ou a senha.');
        //   setSubmitting(true);
        // } else if (auth.errors === 500) {
        //   setFieldError('password', 'Servidor indisponível.');
        //   setSubmitting(true);
        // }
      },
    );
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ContainerCentered>
      <Image src={logo} alt="logo" />
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          gap: 20,
        }}
      >
        <TextField
          type="text"
          name="email"
          id="email"
          label="Seu email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="Sua senha"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Wrapper>
          <Button type="submit" variant="contained">
            Entrar
          </Button>
          <div>
            <Typography variant="body1" style={{ marginTop: 16 }}>
              Não tem conta ainda? <Link to="/signup">Cadastre-se</Link>
            </Typography>
          </div>
        </Wrapper>
      </form>
    </ContainerCentered>
  );
}
