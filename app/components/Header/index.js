import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styled from '@datapunt/asc-core';
import { Header as HeaderComp, MenuInline, MenuItem, MenuButton } from '@datapunt/asc-ui';
import { PAGES, CURRENT_PAGE } from '../../constants';
import './style.scss';

const StyledHeader = styled(HeaderComp)`
  max-width: 960px;
`;

const StyledMenuInline = styled(MenuInline)`
  margin-left: -10px;
`;

const MenuChildren = () => {
  const { pathname } = useLocation();

  // Scroll to top when `pathname` changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MenuItem>
        <MenuButton active={CURRENT_PAGE === PAGES.location}>Locatie</MenuButton>
      </MenuItem>
    </>
  );
};

export const Header = () => (
  <StyledHeader
    tall
    fullWidth={false}
    backgroundColor="#fff"
    homeLink="https://amsterdam.nl"
    title="Vergunningen"
    navigation={
      <>
        <StyledMenuInline showAt="tabletM">
          <MenuChildren />
        </StyledMenuInline>
      </>
    }
  />
);

export default Header;
