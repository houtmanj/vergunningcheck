import styled from "@datapunt/asc-core";
import { OrderedList, List } from "@datapunt/asc-ui";

export const BulletList = styled(List)`
  li {
    list-style-type: none;
  }
  li:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #000000;
    left: -19px;
    top: 7px;
    padding-right: 0;
  }
`;

export const OrderList = styled(OrderedList)`
   {
    counter-reset: item 2;
  }
`;
