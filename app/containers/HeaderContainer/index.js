import React from 'react';
import { Header, MenuInline, MenuItem, MenuButton } from '@datapunt/asc-ui';

import './style.scss';

export const HeaderContainer = () => (
  <Header
    tall
    title="Vergunningchecker aanbouw"
    backgroundColor="#fff"
    homeLink="/"
    fullWidth
    navigation={
      <MenuInline>
        <MenuItem>
          <MenuButton>Inleiding</MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton>Vragen</MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton>Conclusie</MenuButton>
        </MenuItem>
      </MenuInline>
    }
  />
);

export default HeaderContainer;
