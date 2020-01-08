import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import history from 'utils/history';
import styled from '@datapunt/asc-core';
import {
  Header as HeaderComp,
  MenuInline,
  MenuItem,
  MenuButton,
  // MenuToggle,
} from '@datapunt/asc-ui';

import './style.scss';

const StyledHeader = styled(HeaderComp)`
  max-width: 960px;
`;

const StyledMenuInline = styled(MenuInline)`
  margin-left: -10px;
`;

const pages = {
  intro: '/aanbouw/inleiding',
  location: '/aanbouw/locatie',
  questions: '/aanbouw/vragen',
  overview: '/aanbouw/conclusie',
};

const MenuChildren = () => {
  const { pathname } = useLocation();

  // Scroll to top when `pathname` changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MenuItem>
        <MenuButton onClick={() => history.push(pages.intro)} active={pathname === pages.intro}>
          Inleiding
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton onClick={() => history.push(pages.location)} active={pathname === pages.location}>
          Locatie
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton onClick={() => history.push(pages.questions)} active={pathname === pages.questions}>
          Vragen
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton onClick={() => history.push(pages.overview)} active={pathname === pages.overview}>
          Conclusie
        </MenuButton>
      </MenuItem>
    </>
  );
};

export const Header = () => (
  <StyledHeader
    tall
    backgroundColor="#fff"
    homeLink="/"
    navigation={
      <>
        <StyledMenuInline showAt="tabletM">
          <MenuChildren />
        </StyledMenuInline>
        {/* <MenuToggle hideAt="tabletM">
          <MenuChildren />
        </MenuToggle> */}
      </>
    }
  />
);

export default Header;
