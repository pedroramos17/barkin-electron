import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import logo from '../../../assets/logo.png';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';

export default function Signup() {
  return (
    <ContainerCentered>
      <Image src={logo} alt="logo" />
      <form
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
          name="pwd"
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
