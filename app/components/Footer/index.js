import React from 'react';

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
      <Link href="/" variant="with-chevron">
        Over deze site
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Over OIS
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Databeleid
      </Link>
    </FooterLinkListItem>
    <FooterLinkListItem>
      <Link href="/" variant="with-chevron">
        Bronnen
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

// import './style.scss';

const Footer = () => (
  <FooterComp>
    <FooterTop>
      <Row>
        <Column wrap span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}>
          <>
            <FooterToggle title="Colofon" hideAt="tabletM">
              <FooterContent indent>
                <ColofonLinks />
              </FooterContent>
            </FooterToggle>
            <FooterContent showAt="tabletM">
              <FooterHeading $as="h3">Colofon</FooterHeading>
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
    </FooterTop>
    <FooterBottom>
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
    </FooterBottom>
  </FooterComp>
);

export default Footer;
