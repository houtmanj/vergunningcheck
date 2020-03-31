import React from "react";
import ReactMarkdown from "react-markdown";

import { ListItem } from "@datapunt/asc-ui";
import { StyledParagraph, MarkDownList } from "./MarkdownStyles";
import Visual from "./Visual";

export default ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={{
      paragraph: StyledParagraph,
      list: MarkDownList,
      listItem: ListItem,
      image: Visual
    }}
    linkTarget="_blank"
  />
);
