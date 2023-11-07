import { TextField, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
  padding: 24px auto;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function DriverForm() {
  return (
    <Box sx={{ mx: 4 }}>
      <h1>Cadastrar Motorista</h1>
      <form action="/driver" method="post">
        <Container>
          <TextField label="Nome" variant="standard" />
          <TextField label="RG" variant="standard" />
          <TextField label="Telefone" variant="standard" />
          <h2>Adicionar Veículo</h2>
          <TextField label="Modelo" variant="standard" />
          <TextField label="Cor" variant="standard" />
          <TextField label="Placa" variant="standard" />
          <Box sx={{ my: 4 }}>
            <Button variant="contained" color="info">
              +1 Veículo
            </Button>
          </Box>
          <ButtonContainer>
            <Button variant="outlined" LinkComponent="a" href="/driver">
              Voltar
            </Button>
            <Button variant="contained">Salvar</Button>
          </ButtonContainer>
        </Container>
      </form>
    </Box>
  );
}
