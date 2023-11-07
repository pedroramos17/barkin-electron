import styled from '@emotion/styled';
import { TextField, IconButton, Toolbar, Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DriverTable from '../../components/table/driver/table';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 32px 40px;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 4px;
  width: 100%;
  margin-bottom: 24px;
`;

export default function Driver() {
  return (
    <Container>
      <h1>Motoristas</h1>
      <HeaderContainer>
        <TextField
          placeholder="Pesquisar"
          variant="standard"
          sx={{ width: '100%' }}
        />
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            gap: 4,
          }}
        >
          <Tooltip title="Filtrar">
            <IconButton>
              <FilterAltIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Adicionar">
            <Fab color="primary" size="large" href="/driver/create">
              <AddIcon sx={{ fontSize: 48 }} />
            </Fab>
          </Tooltip>
        </Toolbar>
      </HeaderContainer>
      <DriverTable />
    </Container>
  );
}
