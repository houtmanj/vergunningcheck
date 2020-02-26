import React, { useContext } from "react";
import { Row, Column } from "@datapunt/asc-ui";
import {
  Container,
  ContentContainer,
  FormTitle,
  Content
} from "./BaseLayoutStyles";

import Context from "../../context";
import Header from "../Header";
import Footer from "../Footer";

export interface BaseLayoutProps {
  heading: string;
  children: React.ReactNode;
}

function BaseLayout({ heading, children }: BaseLayoutProps) {
  const { topic } = useContext(Context);
  const title = topic ? <FormTitle>{topic.text?.heading}</FormTitle> : null;
  // const showNavLink = !topic || !topic.sttrPath;
  const showNavLink = false;

  return (
    <Container>
      <Header showLinks={showNavLink} />
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 5,
              large: 9,
              xLarge: 9
            }}
          >
            <Content>
              {title}
              {children}
            </Content>
          </Column>
        </Row>
      </ContentContainer>
      <Footer />
      <div
        // comment to see app version and environment
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<!--
            Version: ${process.env.REACT_APP_VERSION}
            Environment: ${process.env.NODE_ENV}
            -->`
        }}
      />
    </Container>
  );
}

export default BaseLayout;
