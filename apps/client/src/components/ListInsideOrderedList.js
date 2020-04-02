import styled from "@datapunt/asc-core";
import { StyledList } from "./Layouts/BaseLayoutStyles";

export default styled(StyledList)`
  margin-top: 5px;
  margin-bottom: 0;
  margin-left: -5px; /* Fix to align with other Lists on the page */

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
