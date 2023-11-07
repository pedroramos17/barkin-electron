import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import logo from '../../../assets/logo.png';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 124px;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

export default function Login() {
  return (
    <Container>
      <Image src={logo} alt="logo" />
      <form
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
          // required
        />
        <TextField
          type="password"
          name="pwd"
          id="pwd"
          label="Sua senha"
          // required
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
    </Container>
  );
}
