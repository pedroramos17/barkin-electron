import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { loginUser } from '../../api/services/auth.service';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import { UserLoginForm } from '../../interfaces/user.interface';
import logo from '../../../assets/logo.png';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

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
  const onSubmit = async (
    formValue: UserLoginForm,
    { setSubmitting }: FormikHelpers<UserLoginForm>,
  ) => {
    const response = await loginUser(formValue);
    setAuth({
      ...formValue,
      accessToken: window.electron.store.get('user')?.accessToken,
    });
    setSubmitting(false);
    console.log(response);
    return navigate('/driver', { replace: true, state: { from } });
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
            <Link to="/driver">To Driver</Link>
          </div>
        </Wrapper>
      </form>
    </ContainerCentered>
  );
}
