import styled from "styled-components";
import { themeColor, themeSpacing } from "@datapunt/asc-ui";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;

export const ContentContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  background-color: white;
`;

export const FormTitle = styled.h4`
  margin: ${themeSpacing(6, 0)};
  padding-bottom: 6px;
  border-bottom: 1px solid ${themeColor("tint", "level5")};
  color: ${themeColor("tint", "level5")};
`;

export const Content = styled.div`
  display: block;
  width: 100%;
`;
