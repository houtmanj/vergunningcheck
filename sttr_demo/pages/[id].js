import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import activities from '../public/sttr/activities';
import Tabs from '../components/Tabs';
import Checker from '../components/Checker';
import Layout from '../components/Layout';

const preface = {
  AanOfUitbouwBouwen: (
    <>
      <h1>Vergunningchecker Aanbouw</h1>
      <h2>Inleiding</h2>
      <p>
        Met de vergunningchecker ziet u of u een omgevingsvergunning nodig hebt. Als u alle vragen beantwoord heeft,
        geeft u dat inzicht waar u rekening mee moet houden.
      </p>
      <h3>Proclaimer</h3>
      <p>
        Deze vergunningchecker is een product in ontwikkeling, het is onvolledig en er kunnen nog fouten in zitten. Komt
        u iets tegen wat niet correct is of beter kan, dan stellen wij uw reactie op prijs. U kunt ons dit laten weten
        door gebruik te maken van de feedbackknop aan de rechterkant van alle pagina's. Hieronder leest u in welke
        gevallen u de vergunningchecker kunt gebruiken.
      </p>
      <ul>
        <li>
          U kunt de vergunningchecker alleen gebruiken voor adressen die binnen het bestemmingsplangebied "De Pijp 2018"
          vallen.
        </li>
        <li>
          U kunt de vergunningchecker alleen gebruiken voor
          <em>tussenwoningen</em>
        </li>
        <li>De vergunningchecker voldoet nog niet aan de Web Content Accessibilty Guidelines.</li>
      </ul>
      <p>
        Nog niet alle regels zijn in de vergunningchecker verwerkt. Een deel van de regels uit het Besluit
        Omgevingsrecht (Bor) is nog niet verwerkt:
      </p>
      <ul>
        <li>
          De vergunningchecker geldt op het moment alleen voor bouwwerken direct achter het hoofdgebouw. Bouwwerken op
          een afstand groter dan 4 meter achter de achtergevel zijn nog niet mogelijk binnen de vergunningchecker
          (artikel 2 onderdeel 3 sub b van Bijlage II Bor).
        </li>
        <li>
          De regels over het toenemen van het aantal woningen, mantelzorg, illegale bouwwerken, veiligheidszones en
          archeologische monumentenzorg zijn nog niet meegenomen (artikel 5 van Bijlage II Bor).
        </li>
        <li>
          De regels over mantelzorg, inwendige scheidingsconstructie en functionele verbondenheid zijn nog niet
          meegenomen (artikel 7 van Bijlage II Bor).
        </li>
      </ul>
      <p>
        De precieze tekst van deze artikelen is te vinden in
        <a
          href="https://wetten.overheid.nl/jci1.3:c:BWBR0027464&amp;bijlage=II&amp;z=2019-07-01&amp;g=2019-07-01"
          target="_blank"
        >
          Bijlage II bij het Besluit Omgevingsrecht
        </a>
      </p>
    </>
  ),
  DakkapelBouwen: <p>Specifieke inleiding voor dakkapel bouwen...</p>,
  WasstraatOfWasplaatsVoorAutoSBussenTreinenEnTrams: <p>Wasstraat of wasplaats voor auto's</p>,
};

const MainActivity = ({ activity }) => {
  return (
    <Layout>
      <Checker activity={activity} />
    </Layout>
  );
};

MainActivity.getInitialProps = async ({ query }) => {
  const activity = activities.find(activity => activity.id === query.id);
  const res = await fetch(`http://localhost:3000/sttr/${activity.file}`);
  return {
    activity: await res.json(),
  };
};

export default MainActivity;
