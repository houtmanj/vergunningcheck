export default {
  id: '_8743984',
  name: 'Test vragenlijst',
  uitvoeringsregels: [
    {
      id: 'monument',
      type: 'input',
      index: 0,
      vraagTekst: 'Ben je momument?',
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
    {
      id: 'stadsgezicht',
      index: 1,
      type: 'input',
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

      // cond: ['monument."Nee"'],
    },
    {
      id: 'stadsgezicht-zichtbaar',
      index: 2,
      type: 'input',
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

      // cond: ['stadsgezicht."Ja"'],
    },
    {
      id: 'artikel-3',
      type: 'decision',
      vraagTekst: 'Voldoet Artikel 3 volledig?',
      group: [
        {
          id: 'artikel-3-vraag-1',
          index: 3,
          type: 'input',
          vraagTekst: 'Aritkel 3 vraag 1',
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
          // cond: ['monument."Nee"'],
        },
        {
          id: 'artikel-3-vraag-2',
          index: 4,
          type: 'input',
          vraagTekst: 'Aritkel 3 vraag 2',
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
          // cond: ['monument."Nee"'],
        },
      ],

      // cond: ['stadsgezicht-zichtbaar."Nee"', 'stadsgezicht."Nee"'],
    },
    {
      id: 'artikel-2-s',
      index: 5,
      type: 'input',
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

      // cond: [['stadsgezicht."Nee"', 'artikel-3.Ja']],
    },
    {
      id: 'artikel-2-o',
      type: 'decision',
      vraagTekst: 'Voldoet Artikel 2 -overige vragen-?',
      group: [
        {
          id: 'artikel-2-vraag-1',
          index: 6,
          type: 'input',
          vraagTekst: 'Aritkel 2 vraag 1',
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
          // cond: ['monument."Nee"'],
        },
        {
          id: 'artikel-2-vraag-2',
          index: 7,
          type: 'input',
          vraagTekst: 'Aritkel 2 vraag 2',
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
          // cond: ['monument."Nee"'],
        },
      ],

      // cond: ['artikel-2-s."Ja"'],
    },
    {
      id: 'bestemmingsplan',
      index: 8,
      type: 'input',
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

      // cond: [
      //   'monument."Ja"',
      //   'stadsgezicht-zichtbaar."Ja"',
      //   ['stadsgezicht-zichtbaar."Nee"', 'artikel-3."Ja"'],
      //   'artikel-2-s."Nee"',
      //   ['artikel-2-s."Ja"', 'artikel-2-o."Nee"'],
      // ],
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
