import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import logo from '../../../assets/logo.png';
import { ContainerCentered, Image, Wrapper } from '../../components/styles';

export default function Login() {
  return (
    <ContainerCentered>
      <Image src={logo} alt="logo" />
      <form
        method="post"
        action="/driver"
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
