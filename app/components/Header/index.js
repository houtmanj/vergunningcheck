import React from 'react';
import history from 'utils/history';
import { Row, Column, Header as HeaderComp, MenuInline, MenuItem, MenuButton, MenuFlyOut } from '@datapunt/asc-ui';

import './style.scss';

export const Header = () => (
  <Row halign="center" valign="center" debug={false}>
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
              <MenuButton $as="a" onClick={() => history.push('/aanbouw/inleiding')}>
                Inleiding
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" onClick={() => history.push('/aanbouw/locatie')}>
                Locatie
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" onClick={() => history.push('/aanbouw/vragen')}>
                Vragen
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton $as="a" onClick={() => history.push('/aanbouw/conclusie')}>
                Conclusie
              </MenuButton>
            </MenuItem>
            <MenuFlyOut label="Debugging!">
              <MenuItem>
                <MenuButton $as="a" onClick={() => history.push('/aanbouw/alle-vragen')}>
                  Alle vragen
                </MenuButton>
              </MenuItem>
              <MenuItem>
                <MenuButton $as="a" onClick={() => history.push('/aanbouw/alle-routes')}>
                  Alle routes
                </MenuButton>
              </MenuItem>
              <MenuItem>
                <MenuButton $as="a" onClick={() => history.push('/adres/')}>
                  Adres informatie
                </MenuButton>
              </MenuItem>
            </MenuFlyOut>
          </MenuInline>
        }
      />
    </Column>
  </Row>
);

export default Header;
