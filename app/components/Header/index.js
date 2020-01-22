import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styled from '@datapunt/asc-core';
import { Header as HeaderComp, MenuInline, MenuItem, MenuButton } from '@datapunt/asc-ui';
import history from 'utils/history';
import { PAGES, GET_CURRENT_PAGE, ALLOW_LOCATION_PAGE, GET_CURRENT_TOPIC } from '../../constants';
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
      {ALLOW_LOCATION_PAGE && (
        <>
          <MenuItem>
            <MenuButton
              onClick={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.locationIntroduction}`)}
              active={GET_CURRENT_PAGE() === PAGES.locationIntroduction}
            >
              Start
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton
              onClick={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`)}
              active={GET_CURRENT_PAGE() === PAGES.location}
            >
              Locatie
            </MenuButton>
          </MenuItem>
        </>
      )}
    </>
  );
};

export const Header = () => (
  <StyledHeader
    tall
    backgroundColor="#fff"
    homeLink="https://amsterdam.nl"
    title="Vergunningen"
    navigation={
      <>
        <StyledMenuInline>
          <MenuChildren />
        </StyledMenuInline>
      </>
    }
  />
);

export default Header;
