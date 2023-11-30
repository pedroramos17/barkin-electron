import { TextField } from '@mui/material';
import GatewayTable from '../../components/table/gateway';
import SearchTool from '../../components/SearchTool';
import { Container, HeaderContainer } from '../../components/styles';
import DrawerLayout from '../../components/DrawerLayout';

export default function Gateway() {
  return (
    <DrawerLayout>
      <Container>
        <h1>Portaria</h1>
        <HeaderContainer className="flex justify-between items-center">
          <TextField
            placeholder="Pesquisar"
            variant="standard"
            sx={{ width: '100%' }}
          />
          <SearchTool />
        </HeaderContainer>
        <GatewayTable />
      </Container>
    </DrawerLayout>
  );
}
