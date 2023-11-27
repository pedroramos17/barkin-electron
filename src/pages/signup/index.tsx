import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import logo from '../../../assets/logo.png';
import { UserRegisterForm } from '../../interfaces/user.interface';
import Auth from '../../services/auth.service';

export default function Signup() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().email('Email inválido').required('Email obrigatório'),
      password: Yup.string().min(6).required('Senha obrigatória'),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password')],
        'As senhas precisam ser iguais',
      ),
    }),

    onSubmit: async (
      formValue: UserRegisterForm,
      { setSubmitting }: FormikHelpers<UserRegisterForm>,
    ) => {
      const response = await Auth.registerUser(formValue);
      if (response !== null) {
        console.log(response);
        return;
      }
      setSubmitting(false);
    },
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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      >
        <TextField
          type="text"
          name="name"
          id="name"
          label="Seu nome"
          required
        />
        <TextField
          type="text"
          name="email"
          id="email"
          label="Seu email"
          required
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="Sua senha"
          required
        />
        <TextField
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          label="Confirme sua senha"
          required
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
