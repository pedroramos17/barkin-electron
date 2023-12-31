import { TextField } from '@mui/material';
import DriverTable from '../../components/table/driver/table';
import SearchTool from '../../components/SearchTool';
import { Container, HeaderContainer } from '../../components/styles';
import DrawerLayout from '../../components/DrawerLayout';

export default function Driver() {
  return (
    <DrawerLayout>
      <Container>
        <h1>Motoristas</h1>
        <HeaderContainer>
          <TextField
            placeholder="Pesquisar"
            variant="standard"
            sx={{ width: '100%' }}
          />
          <SearchTool />
        </HeaderContainer>
        <DriverTable />
      </Container>
    </DrawerLayout>
  );
}
