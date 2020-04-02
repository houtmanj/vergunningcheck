import React from "react";
import styled from "@datapunt/asc-core";
import { Paragraph } from "@datapunt/asc-ui";
import { StyledList } from "./Layouts/BaseLayoutStyles";

// IE11 Fix
export const StyledParagraph = styled(Paragraph)`
  flex-shrink: 0;
`;

// List from Markdown
export const MarkDownList = ({ children }) => (
  <StyledList variant="bullet">{children}</StyledList>
);
