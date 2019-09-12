export default {
  id: '_8743984',
  name: 'Conclusie vergunningscheck Aanbouw',
  uitvoeringsregels: [
    {
      id: 'monument',
      vraag: {
        vraagTekst: 'Betreft (rijks / gemeentelijk) monument?',
        vergunningplichtig: 'Ja',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
            // prefilled: true,
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
    },
    {
      id: 'stadsgezicht',
      vraag: {
        vraagTekst: 'Betreft beschermd stadsgezicht?',
        vergunningplichtig: 'Ja',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      cond: ['monument."Nee"'],
    },
    {
      id: 'stadsgezicht-zichtbaar',
      vraag: {
        vraagTekst: 'Is de locatie van het bouwwerk zichtbaar?',
        vergunningplichtig: 'Ja',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      cond: ['stadsgezicht."Ja"'],
    },
    {
      id: 'artikel-2',
      vraag: {
        vraagTekst: 'Voldoen ALLE vragen volgens Artikel 2?',
        vergunningplichtig: 'Nee',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      cond: ['stadsgezicht."Nee"'],
    },
    {
      id: 'artikel-3',
      vraag: {
        vraagTekst: 'Voldoen ALLE vragen volgens Artikel 3?',
        vergunningplichtig: 'Nee',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      cond: ['artikel-2."Nee"', 'stadsgezicht-zichtbaar."Nee"'],
    },
    {
      id: 'bestemmingsplan',
      vraag: {
        vraagTekst: 'Wordt voldaan aan ALLE regels van het bestemmingsplan?',
        vergunningplichtig: 'Nee',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      cond: ['artikel-3."Ja"'],
    },
  ],
  uitkomsten: [
    {
      label: 'Vergunning nodig: Bouwen & Wijzigen Monument',
      cond: ['monument."Ja"'],
    },
    {
      label: 'Vergunning nodig: Bouwen',
      cond: ['stadsgezicht-zichtbaar."Ja"', 'artikel-3."Nee"'],
    },
    {
      label: 'Vergunning nodig: Afwijken bestemmingsplan (Geen bouw-vergunning nodig)',
      cond: ['bestemmingsplan."Nee"'],
    },
    {
      label: 'GEEN vergunning nodig',
      cond: ['artikel-2."Ja"', 'bestemmingsplan."Ja"'],
    },
  ],
};
