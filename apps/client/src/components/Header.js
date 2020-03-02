import React from "react";
import { MenuItem, MenuButton } from "@datapunt/asc-ui";
import { StyledHeader, StyledMenuInline } from "./HeaderStyles";

const MenuChildren = () => (
  <>
    <MenuItem>
      <MenuButton
      //   onClick={() =>
      //     history.push(
      //       `/${GET_CURRENT_TOPIC()}/${PAGES.locationIntroduction}`
      //     )
      //   }
      // active={GET_CURRENT_PAGE() === PAGES.locationIntroduction}
      >
        Start
      </MenuButton>
    </MenuItem>
    <MenuItem>
      <MenuButton
      //   onClick={() =>
      //     history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`)
      //   }
      // active={GET_CURRENT_PAGE() === PAGES.location}
      >
        Locatie
      </MenuButton>
    </MenuItem>
  </>
);
export const Header = ({ showLinks }) => (
  <StyledHeader
    tall
    backgroundColor="#fff"
    homeLink={
      process.env.NODE_ENV === "production" ? "https://amsterdam.nl" : "/"
    }
    title="Vergunningen"
    navigation={
      <>
        <StyledMenuInline>{showLinks && <MenuChildren />}</StyledMenuInline>
      </>
    }
  />
);

export default Header;
