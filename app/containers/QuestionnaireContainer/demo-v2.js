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
        vraagTekst: 'Betreft beschermd stads/dorps stadsgezicht?',
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
        vraagTekst: 'Betreft "zichtbaar" stads/dorp gezicht?',
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
      id: 'artikel-3',
      vraag: {
        vraagTekst: 'Voldoen Artikel 3 volledig?',
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
      cond: ['stadsgezicht-zichtbaar."Nee"'],
    },
    {
      id: 'artikel-2-s',
      vraag: {
        vraagTekst: 'Voldoet Artikel 2 -specifieke vraag-?',
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
      cond: ['stadsgezicht-zichtbaar."Nee"'],
    },
    {
      id: 'artikel-2-o',
      vraag: {
        vraagTekst: 'Voldoet Artikel 2 -overige vragen-?',
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
      cond: ['stadsgezicht-zichtbaar."Nee"'],
    },
    {
      id: 'bestemmingsplan',
      vraag: {
        vraagTekst: 'Wordt voldaan aan ALLE regels van bestemmingsplan "De Pijp"?',
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
      cond: ['artikel-3."Ja"', 'monument."Ja"'],
    },
  ],
  uitkomsten: [
    {
      label: '1) Vergunning nodig: Bouwvergunning, Wijzigen Monument',
      cond: ['monument."Ja"', 'bestemmingsplan."Ja"'],
    },
    {
      label: '2) Vergunning nodig: Bouwvergunning, Wijzigen Monument, Afwijken bestemmingsplan',
      cond: ['monument."Ja"', 'bestemmingsplan."Nee"'],
    },
    {
      label: 'Vergunning nodig: Bouwen',
      cond: ['stadsgezicht-zichtbaar."Ja"', 'artikel-3."Nee"'],
    },
    // {
    //   label: 'Vergunning nodig: Afwijken bestemmingsplan (Geen bouw-vergunning nodig)',
    //   cond: ['bestemmingsplan."Nee"'],
    // },
    {
      label: 'GEEN vergunning nodig',
      cond: ['artikel-2."Ja"', 'bestemmingsplan."Ja"'],
    },
  ],
};
