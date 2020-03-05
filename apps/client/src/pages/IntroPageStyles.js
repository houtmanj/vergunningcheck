import styled from "@datapunt/asc-core";
import { List } from "@datapunt/asc-ui";

export const StyledList = styled(List)`
  margin-top: 5px;
  margin-bottom: 0;

  li {
    position: relative;
    list-style-type: none;
    counter-increment: unset;
  }
  li::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #000000;
    left: -19px;
    top: 8px;
    padding-right: 0;
  }
`;
