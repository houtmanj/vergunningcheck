import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";

const Error = ({ error }) => (
  <>
    <Heading $as="h2">Er is een fout opgetreden.</Heading>
    <Paragraph>{error.message}</Paragraph>
    {process.env.NODE_ENV !== "production" && <pre>{error.stack}</pre>}
  </>
);

export default Error;
