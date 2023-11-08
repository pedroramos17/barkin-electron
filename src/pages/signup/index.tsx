import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import logo from '../../../assets/logo.png';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ipcRenderer.send('signup-form', formData);
  };

  useEffect(() => {
    ipcRenderer.on('form-submission-success', (_event, _data) => {
      alert('Cadastrado com sucesso');
    });

    ipcRenderer.on('form-submission-error', (_event, error) => {
      alert(error);
    });

    return () => {
      ipcRenderer.removeAllListeners('form-submission-success');
      ipcRenderer.removeAllListeners('form-submission-error');
    };
  }, []);
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
