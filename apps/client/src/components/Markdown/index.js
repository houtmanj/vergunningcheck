import React from "react";
import ReactMarkdown from "react-markdown";

import { StyledListItem } from "../Layouts/BaseLayoutStyles";
import ListRenderer from "./renderers/ListRenderer";
import BlockRenderer from "./renderers/BlockRenderer";
import LinkRenderer from "./renderers/LinkRenderer";
import Visual from "../Visual";

export default ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={{
      paragraph: BlockRenderer,
      list: ListRenderer,
      listItem: StyledListItem,
      image: Visual,
      link: LinkRenderer
    }}
  />
);
