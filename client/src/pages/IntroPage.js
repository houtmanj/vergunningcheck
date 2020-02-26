import React from "react";
import { Heading, OrderedList, List, ListItem } from "@datapunt/asc-ui";
import { routes, geturl } from "../routes";
import withTopic from "../hoc/withTopic";

import Form from "../components/Form";
import Nav from "../components/Nav";
import Layout from "../components/Layouts/DefaultLayout";
import { OrderList, BulletList } from "./IntroPageStyles";

const IntroductionText = ({ text }) => (
  <>
    <Heading $as="h3">Hoe het werkt:</Heading>
    <OrderedList style={{ marginBottom: "-24px" }}>
      <ListItem>
        U voert op de volgende pagina eerst het adres van het gebouw in.
      </ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <div>
          <BulletList variant="bullet">
            <ListItem>of het gebouw een monument is</ListItem>
            <ListItem>
              of het gebouw in een beschermd stads- of dorpsgezicht ligt
            </ListItem>
            <ListItem>welk bestemmingsplan er geldt</ListItem>
          </BulletList>
        </div>
      </ListItem>
    </OrderedList>
    <OrderList>
      <ListItem>
        Daarna gebruikt u deze informatie om de vergunningcheck dakkapel te doen
      </ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet
      </ListItem>
      <ListItem>
        Wij vertellen u waar u verder op moet letten als u de dakkapel gaat
        plaatsen.
      </ListItem>
    </OrderList>
    <Heading $as="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        {text.locationPageIntro} Bel dan de gemeente op 14 020, maandag tot en
        met vrijdag van 08.00 uur tot 18.00 uur
      </ListItem>
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op
        14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
      </ListItem>
    </List>
  </>
);
const IntroPage = ({ topic: { text, slug } }) => {
  return (
    <Layout>
      <IntroductionText text={text} />

      <Form action={geturl(routes.location, { slug })}>
        <Nav showNext />
      </Form>
    </Layout>
  );
};

export default withTopic(IntroPage);
