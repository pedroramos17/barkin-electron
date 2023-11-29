import React from 'react';
import styled from '@emotion/styled';

const StyledDrawer = styled.div``;
export default function Drawer({ children }: { children: React.ReactNode }) {
  return <StyledDrawer>{children}</StyledDrawer>;
}
