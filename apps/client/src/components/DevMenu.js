import React, { useContext, useState } from "react";
import Context from "../context";
import styled from "styled-components";

const StyledDevMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`;

export default () => {
  const context = useContext(Context);
  const [config, setConfig] = useState(context.config.autofill);
  return (
    <StyledDevMenu>
      <span
        onClick={(e) => {
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
              onChange={(e) => {
                const x = Object.assign({}, config, {
                  [key]: e.target.checked,
                });
                setConfig(x);
                context.config = {
                  autofill: x,
                };
              }}
            />
          </label>
        ))}
      </div>
    </StyledDevMenu>
  );
};
