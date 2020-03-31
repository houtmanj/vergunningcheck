import React from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => (
  <Figure>
    <Img {...rest} />
    <FigCaption>{title}</FigCaption>
  </Figure>
);
