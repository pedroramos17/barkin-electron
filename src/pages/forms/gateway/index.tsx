import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Toolbar, Tooltip, IconButton, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GatewayTable from '../../../components/table/gatewayForm/table';
import RoundedTabs from '../../../components/tabs/roundedTabs';

const Container = styled.div`
  overflow: auto;
  padding: 16px 24px;
  gap: 24px;
`;

export default function GatewayForm() {
  const [tabValue, setTabValue] = useState(0);

  const handleParkedTab = (
    event: React.SyntheticEvent<Element, Event> | null,
    value: number | string | null,
  ) => {
    setTabValue(Number(value));
  };

  const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Header = styled.header`
    width: '100%';
    display: flex;
    align-items: end;
    padding: 24px 0;
  `;

  return (
    <Container>
      <h1>Cadastro da Portaria</h1>
      <TabsContainer className="flex justify-center">
        <RoundedTabs handleParkedTab={handleParkedTab} />
      </TabsContainer>
      <Header>
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
            <Fab color="primary" size="large">
              <AddIcon sx={{ fontSize: 48 }} />
            </Fab>
          </Tooltip>
        </Toolbar>
      </Header>
      <GatewayTable tabValue={tabValue} />
    </Container>
  );
}
