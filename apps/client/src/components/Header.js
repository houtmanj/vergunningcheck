import React, { useContext, useState } from "react";
import Context from "../context";
import { Hidden } from "./HiddenDebugInfo";

import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo
} from "./HeaderStyles";

export const Header = ({ showLinks }) => {
  const context = useContext(Context);
  const [config, setConfig] = useState(context.config.autofill);
  return (
    <StyledHeader
      tall
      css={StyledHeaderWrapper}
      logo={() => (
        <StyledLogoWrapper
          href={
            process.env.NODE_ENV === "production" ? "https://amsterdam.nl" : "/"
          }
          tabIndex={4}
        >
          <StyledLogo />
        </StyledLogoWrapper>
      )}
    >
      <Hidden>
        <span
          onClick={e => {
            const style = e.target.nextSibling.style;
            style.display = style.display === "none" ? "block" : "none";
          }}
        >
          config
        </span>
        <div style={{ display: "none" }}>
          {Object.entries(config).map(([key, checked]) => (
            <label style={{ display: "block" }} key={key}>
              {key}:{" "}
              <input
                type="checkbox"
                checked={checked}
                onChange={e => {
                  const x = Object.assign({}, config, {
                    [key]: e.target.checked
                  });
                  setConfig(x);
                  context.config = {
                    autofill: x
                  };
                }}
              />
            </label>
          ))}
        </div>
      </Hidden>
    </StyledHeader>
  );
};

export default Header;
