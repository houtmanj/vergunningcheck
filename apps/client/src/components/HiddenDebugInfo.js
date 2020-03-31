import React from "react";
import { HiddenDiv, Title } from "./HiddenDebugInfoStyles";

export const Hidden = ({ children }) => (
  <HiddenDiv className="hiddendebuginfo">{children}</HiddenDiv>
);

export default ({ children, title }) => (
  <Hidden>
    <Title>{title}</Title>
    {children}
  </Hidden>
);
