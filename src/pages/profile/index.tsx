import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import DrawerLayout from '../../components/DrawerLayout';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 32px 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

export default function Profile() {
  return (
    <DrawerLayout>
      <Container>
        <h1>Preferências do Perfil</h1>
        <form
          action="/profile/edit"
          method="post"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 20,
          }}
        >
          <h2>Informações Pessoais</h2>
          <TextField
            variant="standard"
            type="text"
            name="name"
            id="name"
            label="Nome"
          />
          <TextField
            variant="standard"
            type="text"
            name="email"
            id="email"
            label="Email"
          />
          <TextField
            variant="standard"
            type="password"
            name="pwd"
            id="pwd"
            label="Senha"
          />
          <h2>Atualizar a Senha</h2>
          <TextField
            variant="standard"
            type="password"
            name="pwd"
            id="pwd"
            label="Nova senha"
          />
          <TextField
            variant="standard"
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            label="Confirmar Nova senha"
          />
          <Wrapper>
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: 'end', width: '195px' }}
            >
              Salvar
            </Button>
          </Wrapper>
        </form>
      </Container>
    </DrawerLayout>
  );
}
