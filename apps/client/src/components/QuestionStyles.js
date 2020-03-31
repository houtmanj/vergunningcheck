import React from "react";
import styled from "@datapunt/asc-core";
import { Paragraph, List } from "@datapunt/asc-ui";

// IE11 Fix
export const StyledParagraph = styled(Paragraph)`
  flex-shrink: 0;
`;

// List from Markdown
export const MarkDownList = ({ children }) => (
  <List variant="bullet">{children}</List>
);
