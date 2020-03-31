import styled from "styled-components";
import { Header, MenuInline } from "@datapunt/asc-ui";

export const StyledHeader = styled(Header)`
  max-width: 960px;
  margin: 0;
  z-index: unset;
  nav {
    justify-content: flex-start;
  }
`;

export const StyledMenuInline = styled(MenuInline)`
  margin-left: -10px;
`;
