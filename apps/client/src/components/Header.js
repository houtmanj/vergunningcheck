import React from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";

export const Header = ({ showLinks }) => (
  <StyledHeader
    tall
    css={StyledHeaderWrapper}
    homeLink={
      process.env.NODE_ENV === "production" ? "https://amsterdam.nl" : "/"
    }
    logo={() => (
      <StyledLogoWrapper>
        <StyledLogo />
      </StyledLogoWrapper>
    )}
  />
);

export default Header;
