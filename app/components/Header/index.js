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
              <MenuButton $as="a" href="/aanbouw/inleiding">
                Inleiding
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" href="/aanbouw/vragen">
                Vragen
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" href="/aanbouw/conclusie">
                Conclusie
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" href="/aanbouw/alle-vragen">
                Alle vragen
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" href="/aanbouw/alle-routes">
                Alle routes
              </MenuButton>
            </MenuItem>
          </MenuInline>
        }
      />
    </Column>
  </Row>
);

export default Header;
