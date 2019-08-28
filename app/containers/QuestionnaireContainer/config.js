export default {
  id: '_8743984',
  name: 'Conclusie vergunningscheck Aanbouw',
  uitvoeringsregels: [
    {
      id: '4e98togyhv',
      vraag: {
        vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
        vraagType: 'boolean',
        antwoordOpties: [
          {
            id: '1',
            optieText: 'Ja',
            prefilled: true,
          },
          {
            id: '2',
            optieText: 'Nee',
          },
        ],
      },
      content: {
        toelichting: '',
      },
      juridischeBronnen: [
        {
          label: 'Titel bron 1',
          uri: 'http://toepasbare-regels.omgevingswet.overheid.nl/',
        },
      ],
      interactieRegels: [{}],
    },
    {
      id: 'UitvId0001',
      vraag: {
        vraagTekst: 'Wordt uw aanbouw minder dan 2,5 m diep (vanaf de achtergevel)?',
        vraagType: 'boolean',
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
      content: {
        toelichting: 'Dit is vraag 1....',
      },
      juridischeBronnen: [
        {
          label: 'Titel bron 1',
          uri: 'http://toepasbare-regels.omgevingswet.overheid.nl/',
        },
      ],
      interactieRegels: [{}],
    },
    {
      id: 'UitvId0002',
      vraag: {
        vraagTekst: 'Wilt u minder dan de helft van uw tuin gaan bebouwen?',
        vraagType: 'boolean',
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
      content: {
        toelichting: 'Dit is vraag 2...',
        media: [
          {
            type: 'image',
            path: '/path/to/img.jpg',
            caption: 'titel van afbeelding',
          },
        ],
      },
      juridischeBronnen: [
        {
          label: 'Titel bron 1',
          uri: 'http://toepasbare-regels.omgevingswet.overheid.nl/',
        },
      ],
      interactieRegels: [{}],
    },
    {
      id: 'UitvId0003',
      vraag: {
        vraagTekst: 'Wordt uw aanbouw minder dan 5 m hoog?',
        vraagType: 'list',
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
      content: {
        toelichting: 'Dit is vraag 3',
        media: [
          {
            type: 'image',
            path: '/path/to/img.jpg',
            caption: 'titel van afbeelding',
          },
        ],
      },
      juridischeBronnen: [
        {
          label: 'Titel bron 1',
          uri: 'http://toepasbare-regels.omgevingswet.overheid.nl/',
        },
      ],
      interactieRegels: [{}],
    },
  ],
  questions: [
    {
      id: 'q2',
      label: 'Komt er voldoende afstand tussen uw aanbouw en een (eventueel) bestaand balkon?',
      comment:
        '<em>Let op:</em> <br />Met ‘voldoende afstand’ bedoelen we dat er minimaal 1 bouwlaag tussen balkon en aanbouw zit.',
      condition: [{ q1: 'true' }],
      images: [
        {
          id: '7weiruy4fhue',
          src: 'https://images.amsterdam.nl/7weiruy4fhue.jpg',
          caption: 'Aanbouw onder een balkon, met tenminste 1 bouwlaag ertussen.',
        },
      ],
      explanation: {
        type: 'modal',
        buttonLabel: 'Toelichting',
        label: 'Vlak onder een balkon',
        images: [
          {
            id: '6y3e5tgwr5',
            src: 'https://images.amsterdam.nl/6y3e5tgwr5.jpg',
            caption: 'Aanbouw onder een balkon, met tenminste 1 bouwlaag ertussen.',
          },
        ],
        content:
          '<h4>Balkon dicht op aanbouw</h4><p>Wanneer het balkon dicht op het dak van de aanbouw zit, of wanneer het balkon onderdeel wordt van dak van de aanbouw, kunnen er speciale eisen worden gesteld. Daarom kan dit niet zonder vergunning.</p>',
      },
      answers: {
        type: 'boolean',
        comment: '* Vergunning nodig',
        answerOptions: [
          {
            id: 'q1a',
            label: 'Ja',
            value: 'true',
            prefilled: 'true',
          },
          {
            id: 'q1b',
            label: 'Nee *',
            value: 'false',
          },
        ],
      },
      externalLinks: {
        type: 'modal',
        label: 'Overzicht van de jurisiche regels',
        links: [
          {
            label: 'Artikel 2.1 eerste lid',
            url: 'https://amsterdam.nl/regels/1/',
          },
        ],
      },
    },
  ],
};
