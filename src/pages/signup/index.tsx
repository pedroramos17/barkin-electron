import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';
import logo from '../../../assets/logo.png';

const API_HOST = 'http://localhost';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_HOST}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const body = await response.json();
        const { token } = body;
        // Save the token securely in your Electron app or database
        window.electron.store.set('token', token);
      }
    } catch (error) {
      // Handle network errors
    }
  };
  return (
    <ContainerCentered>
      <Image src={logo} alt="logo" />
      <form
        onSubmit={handleSubmit}
        action="/driver"
        method="post"
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
          value={formData.name}
          onChange={handleInputChange}
          id="name"
          label="Seu nome"
          required
        />
        <TextField
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          id="email"
          label="Seu email"
          required
        />
        <TextField
          type="password"
          name="pwd"
          value={formData.pwd}
          onChange={handleInputChange}
          id="pwd"
          label="Sua senha"
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
