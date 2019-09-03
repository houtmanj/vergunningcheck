import React from 'react';
import { Row, Column, Header as HeaderComp, MenuInline, MenuItem, MenuButton } from '@datapunt/asc-ui';

import './style.scss';

export const Header = () => (
  <Row halign="center" valign="center" debug>
    <Column wrap alignSelf="flex-start" span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
      <HeaderComp
        tall
        title="Vergunningchecker aanbouw"
        backgroundColor="#fff"
        homeLink="/"
        fullWidth
        navigation={
          <MenuInline>
            <MenuItem>
              <MenuButton $as="div">Inleiding</MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="div">Vragen</MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="div">Conclusie</MenuButton>
            </MenuItem>
          </MenuInline>
        }
      />
    </Column>
  </Row>
);

export default Header;
