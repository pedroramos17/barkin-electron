import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import GatewayTable from '../../../components/table/gatewayForm/table';
import RoundedTabs from '../../../components/tabs/roundedTabs';
import SearchTool from '../../../components/SearchTool';

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
        <SearchTool />
      </Header>
      <GatewayTable tabValue={tabValue} />
    </Container>
  );
}
