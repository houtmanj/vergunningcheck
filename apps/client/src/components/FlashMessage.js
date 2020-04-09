import React from "react";
import { Paragraph } from "@datapunt/asc-ui";

const types = {
  warning: {
    background: "orange",
    color: "black",
  },
  danger: {
    background: "red",
    color: "white",
  },
};
export default ({ type, children }) => (
  <Paragraph
    style={{
      padding: "1em",
      color: types[type].color,
      background: types[type].background,
    }}
  >
    {children}
  </Paragraph>
);
