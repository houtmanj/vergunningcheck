export default {
  id: '_8743984',
  name: 'Conclusie vergunningscheck Aanbouw (De Pijp)',
  uitvoeringsregels: [
    // // Tussenpand
    {
      type: 'input',
      vraagTekst: 'Is het gebouw een tussenpand?',
      toelichting: '',
      id: 'tussenpand',
      media: [{ id: 1, url: 'https://via.placeholder.com/220x151.png', description: 'Lorem ipsum dolor sit amet' }],
      antwoordOpties: [
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
        },
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
        },
      ],
    },
    // // Monument
    {
      id: 'monument',
      type: 'input',
      vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
      toelichting:
        'Deze vraag is al door de gemeente beantwoord, op basis van de gegevens die bij ons bekend zijn. Het is mogelijk dat een gebouw nog niet geregistreerd staat als monument, maar al wel beschermd wordt. Wanneer u denkt dat het antwoord van de gemeente niet klopt, kunt u dit aanpassen. Twijfelt u? Wilt u meer informatie? Neem contact op met de gemeente.',
      langeToelichting: '',
      media: [
        { id: 1, url: 'https://via.placeholder.com/220x151.png', description: 'Lorem ipsum dolor sit amet' },
        { id: 2, url: 'https://placekitten.com/g/220/151', description: 'Lorem' },
      ],
      registerbevraging: 'monument',
      antwoordOpties: [
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
        },
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
        },
      ],
    },
    {
      type: 'input',
      vraagTekst: 'Gaat u bouwen in een beschermd stads- of dorpsgezicht?',
      id: 'stadsgezicht',

      toelichting:
        'Het gaat hier om een beschermd stads- of dorpsgezicht dat door het Rijk is aangewezen. Twijfelt u? Wilt u meer informatie? Neem dan contact op met de gemeente.',
      media: [
        { id: 1, url: 'https://via.placeholder.com/220x151.png', description: 'Lorem ipsum dolor sit amet' },
        { id: 2, url: 'https://placekitten.com/g/220/151', description: 'Lorem' },
        {
          id: 3,
          url: 'https://via.placeholder.com/220x151.png',
          description: 'Lorem ipsum dolor sit amet dolor sit amet',
        },
      ],
      antwoordOpties: [
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
        },
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
        },
      ],
    },
  ],
  uitkomsten: [
    {
      label: 'Bedankt voor het bekijken van de plaatjes',
      cond: ['tussenpand.true'],
    },
    {
      label: 'Bedankt voor het bekijken van de plaatjes',
      cond: ['tussenpand.false'],
    },
  ],
};
