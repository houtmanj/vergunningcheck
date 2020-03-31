import React, { useContext, useEffect, useState } from "react";
import { MenuItem, MenuButton } from "@datapunt/asc-ui";
import { StyledHeader, StyledMenuInline } from "./HeaderStyles";
import Context from "../context";
import { Hidden } from "./HiddenDebugInfo";

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

export const Header = ({ showLinks }) => {
  const context = useContext(Context);
  const [config, setConfig] = useState(context.config.autofill);

  return (
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
                <label style={{ display: "block" }}>
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
        </>
      }
    />
  );
};

export default Header;
