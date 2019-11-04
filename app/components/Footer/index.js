import React from 'react';
import styled from '@datapunt/asc-core';

import {
  Footer as FooterComp,
  FooterTop,
  Row,
  Column,
  Link,
  Paragraph,
  FooterToggle,
  FooterHeading,
  FooterContent,
  FooterLinkList,
  FooterLinkListItem,
  FooterBottom,
  FooterBottomLinkList,
  FooterBottomLinkListItem,
} from '@datapunt/asc-ui';

const ColofonLinks = () => (
  <FooterLinkList>
    <FooterLinkListItem>
      <Link href="/aanbouw/alle-vragen" variant="with-chevron">
        Alle vragen
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/aanbouw/alle-routes" variant="with-chevron">
        Alle routes
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/adres/" variant="with-chevron">
        Adres informatie
      </Link>
    </FooterLinkListItem>
  </FooterLinkList>
);

const FollowLinks = () => (
  <FooterLinkList>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Nieuwsbrief OIS
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Twitter
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Facerbook
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Linkedin
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        GitHub
      </Link>
    </FooterLinkListItem>
  </FooterLinkList>
);

const HelpLinks = () => (
  <>
    <Paragraph gutterBottom={8}>
      Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Of heeft u bevindingen? Neem dan contact met
      ons op.
    </Paragraph>
    <FooterLinkList>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Veelgestelde vragen
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Contact opnemen
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Feedback geven
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron">
          Uitleg gebruik
        </Link>
      </FooterLinkListItem>
    </FooterLinkList>
  </>
);

const ContentContainer = styled(`div`)`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
`;

const Footer = () => (
  <FooterComp>
    <FooterTop>
      <ContentContainer>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <>
              <FooterToggle title="Ontwikkeling" hideAt="tabletM">
                <FooterContent indent>
                  <ColofonLinks />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading $as="h3">Ontwikkeling</FooterHeading>
                <ColofonLinks />
              </FooterContent>
            </>
          </Column>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <>
              <FooterToggle title="Volg de gemeente" hideAt="tabletM">
                <FooterContent indent>
                  <FollowLinks />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading $as="h3">Volg de gemeente</FooterHeading>
                <FollowLinks />
              </FooterContent>
            </>
          </Column>
          <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
            <>
              <FooterToggle title="Vragen?" hideAt="tabletM">
                <FooterContent indent>
                  <HelpLinks />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading $as="h3" styleAs="h3">
                  Vragen?
                </FooterHeading>
                <HelpLinks />
              </FooterContent>
            </>
          </Column>
        </Row>
      </ContentContainer>
    </FooterTop>
    <FooterBottom>
      <ContentContainer>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 6, large: 10, xLarge: 10 }}>
            <FooterBottomLinkList>
              <FooterBottomLinkListItem>
                <Link href="/" variant="with-chevron">
                  Privacy en cookies
                </Link>
              </FooterBottomLinkListItem>
              <FooterBottomLinkListItem>
                <Link href="/" variant="with-chevron">
                  Over deze site
                </Link>
              </FooterBottomLinkListItem>
            </FooterBottomLinkList>
          </Column>
        </Row>
      </ContentContainer>
    </FooterBottom>
  </FooterComp>
);

export default Footer;
