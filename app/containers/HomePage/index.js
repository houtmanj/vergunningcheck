/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import history from 'utils/history';
import { Question } from 'components/Questionnaire';
import Navigation from 'components/Navigation';

const HomePageText = () => (
  <>
    <p>
      Met de vergunningchecker ziet u of u een omgevingsvergunning nodig hebt. Als u alle vragen beantwoord heeft, geeft
      u dat inzicht waar u rekening mee moet houden.
    </p>
    <div>
      <h3>Proclaimer</h3>
      <p>
        Deze vergunningchecker is een product in ontwikkeling, het is onvolledig en er kunnen nog fouten in zitten. Komt
        u iets tegen wat niet correct is of beter kan, dan stellen wij uw reactie op prijs. U kunt ons dit laten weten
        door gebruik te maken van de feedbackknop aan de rechterkant van alle pagina&#39;s. Hieronder leest u in welke
        gevallen u de vergunningchecker kunt gebruiken.
      </p>
      <ul>
        <li>
          U kunt de vergunningchecker alleen gebruiken voor adressen die binnen het bestemmingsplangebied &#34;De Pijp
          2018&#34; vallen.
        </li>
        <li>
          U kunt de vergunningchecker alleen gebruiken voor <em>tussenwoningen</em>
        </li>
        <li>De vergunningchecker voldoet nog niet aan de Web Content Accessibilty Guidelines.</li>
        <li>
          Nog niet alle regels zijn in de vergunningchekcer verwerkt. Maakt u gebruik van de checker, dan zult u ook de
          volgende bronnen moeten raadplegen:
          <ul>
            <li>
              De begrippen <em>achtererfgebied</em> en <i>bebouwingsgebied</i> uit Artikel 1.
            </li>
            <li>Artikel 2 onderdeel 3 sub b. Dit artikel gaat over bouwerken op een afstand groter dan 4m.</li>
            <li>
              Artikel 5. Dit artikel gaat onder andere over aantal woningen en mantelzorg, illegaal bouwwerk,
              veiligheidszones, archeologische monumentenzorg.
            </li>
            <li>
              Artikel 7. Dit artikel gaat onder andere over de inwendige scheidingsconstructie en functionele
              verbondenheid, mantelzorg.
            </li>
            <li>
              De tekst van deze artikelen is te vinden in{' '}
              <a
                href="https://wetten.overheid.nl/jci1.3:c:BWBR0027464&amp;bijlage=II&amp;z=2019-07-01&amp;g=2019-07-01"
                target="_blank"
              >
                Bijlage II bij het Besluit Omgevingsrecht
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </>
);

const HomePage = () => (
  <Question headingDataId="bestemmingsplan" heading="Inleiding" onSubmit={() => history.push('/aanbouw/locatie')}>
    <HomePageText />
    <Navigation showNext />
  </Question>
);

export default HomePage;
