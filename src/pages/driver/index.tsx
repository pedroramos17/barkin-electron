import styled from '@emotion/styled';
import { TextField, IconButton, Toolbar, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DriverTable from '../../components/table/driver/table';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 32px 40px;
`;

export default function Driver() {
  return (
    <Container>
      <h1 className="text-2xl font-bold">Motoristas</h1>
      <div className="flex px-2 items-end">
        <TextField
          placeholder="Pesquisar"
          variant="standard"
          className="w-full"
        />
        <Toolbar className="flex justify-between items-end p-0 space-x-4">
          <Tooltip title="Filtrar">
            <IconButton>
              <FilterAltIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Adicionar">
            <IconButton>
              <AddCircleIcon color="primary" sx={{ fontSize: 64 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </div>
      <DriverTable />
    </Container>
  );
}
