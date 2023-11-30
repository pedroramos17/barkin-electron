import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import logo from '../../../assets/logo.png';
import { UserRegisterForm } from '../../interfaces/user.interface';
import { registerUser } from '../../api/services/auth.service';

const initialValues: UserRegisterForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  password: Yup.string().min(6).required('Senha obrigatória'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas precisam ser iguais',
  ),
});

const onSubmit = async (
  formValue: UserRegisterForm,
  { setSubmitting }: FormikHelpers<UserRegisterForm>,
) => {
  let response: AxiosResponse;
  response = await registerUser(formValue);
  setSubmitting(false);
};
export default function Signup() {
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
          name="name"
          id="name"
          label="Seu nome"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <TextField
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          label="Confirme sua senha"
          required
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <Wrapper>
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
          <Typography variant="body1" style={{ marginTop: 16 }}>
            Já tem uma conta? <Link to="/">Clique aqui para entrar</Link>
          </Typography>
        </Wrapper>
      </form>
    </ContainerCentered>
  );
}
