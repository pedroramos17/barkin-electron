import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  getFormLabelUtilityClasses,
} from '@mui/material';
import logo from '../../../assets/logo.png';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import { UserLoginForm } from '../../interfaces/user.interface';
import Auth from '../../services/auth.service';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email inválido').required('Email obrigatório'),
      password: Yup.string().min(6).required('Senha obrigatória'),
    }),

    onSubmit: async (
      formValue: UserLoginForm,
      { setSubmitting }: FormikHelpers<UserLoginForm>,
    ) => {
      const response = await Auth.loginUser(formValue);

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
