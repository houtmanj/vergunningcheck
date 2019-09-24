export default {
  id: '_8743984',
  name: 'Test vragenlijst',
  uitvoeringsregels: [
    {
      id: 'monument',
      type: 'input',
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
    {
      id: 'stadsgezicht',
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

      cond: ['monument."Nee"'],
    },
    {
      id: 'stadsgezicht-zichtbaar',
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

      cond: ['stadsgezicht."Ja"'],
    },
    {
      id: 'artikel-3',
      vraagTekst: 'Voldoet Artikel 3 volledig?',
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

      cond: ['stadsgezicht-zichtbaar."Nee"', 'stadsgezicht."Nee"'],
    },
    {
      id: 'artikel-2-s',
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

      cond: [['stadsgezicht."Nee"', 'artikel-3.Ja']],
    },
    {
      id: 'artikel-2-o',
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

      cond: ['artikel-2-s."Ja"'],
    },
    {
      id: 'bestemmingsplan',
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

      cond: [
        'monument."Ja"',
        'stadsgezicht-zichtbaar."Ja"',
        ['stadsgezicht-zichtbaar."Nee"', 'artikel-3."Ja"'],
        'artikel-2-s."Nee"',
        ['artikel-2-s."Ja"', 'artikel-2-o."Nee"'],
      ],
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
      label: '3) Vergunning nodig: Bouwen',
      cond: ['stadsgezicht-zichtbaar."Ja"', 'bestemmingsplan."Ja"'],
    },
    {
      label: '4) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar."Ja"', 'bestemmingsplan."Nee"'],
    },
    {
      label: '5) Vergunning nodig: NEE 😁',
      cond: ['stadsgezicht-zichtbaar."Nee"', 'artikel-3."Ja"', 'bestemmingsplan."Ja"'],
    },
    {
      label: '6) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar."Nee"', 'artikel-3."Ja"', 'bestemmingsplan."Nee"'],
    },
    {
      label: '7) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar."Nee"', 'artikel-3."Nee"'],
    },
    {
      label: '8) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht."Nee"', 'artikel-3."Nee"'],
    },
    {
      label: '9) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-s."Ja"', 'artikel-2-o."Ja"'],
    },
    {
      label: '10) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-s."Nee"', 'bestemmingsplan."Ja"'],
    },
    {
      label: '11) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-s."Ja"', 'artikel-2-o."Nee"', 'bestemmingsplan."Ja"'],
    },
    {
      label: '12) Vergunning nodig: Afwijken bestemmingsplan',
      cond: ['artikel-2-s."Nee"', 'bestemmingsplan."Nee"'],
    },
    {
      label: '13) Vergunning nodig: Afwijken bestemmingsplan',
      cond: ['artikel-2-s."Ja"', 'artikel-2-o."Nee"', 'bestemmingsplan."Nee"'],
    },
  ],
};
