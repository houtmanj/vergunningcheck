export default {
  id: '_8743984',
  name: 'Conclusie vergunningscheck Aanbouw',
  uitvoeringsregels: [
    {
      id: 'monument',
      vraag: {
        vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
        vraagType: 'boolean',
        vergunningplichtig: 'Ja',
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
      id: 'stadsgezicht1',
      vraag: {
        vraagTekst: 'Woont u in een stadsgezicht?',
        vraagType: 'boolean',
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
      content: {
        toelichting:
          'Let op: Omdat uw locatie in een beschermd stadsgezicht ligt, kunt u alleen zonder vergunning bouwen als het niet zichtaar is vanaf de openbare weg.',
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
      id: 'stadsgezicht2',
      vraag: {
        vraagTekst: 'Is uw bouwerk zichtbaar vanaf de openbare weg?',
        vraagType: 'boolean',
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
      content: {
        toelichting:
          'Let op: Omdat uw locatie in een beschermd stadsgezicht ligt, kunt u alleen zonder vergunning bouwen als het niet zichtaar is vanaf de openbare weg.',
      },
      juridischeBronnen: [
        {
          label: 'Titel bron 1',
          uri: 'http://toepasbare-regels.omgevingswet.overheid.nl/',
        },
      ],
      cond: ['stadsgezicht1."Ja"'],
      interactieRegels: [{}],
    },
    {
      id: 'diepte',
      vraag: {
        vraagTekst: 'Wordt uw aanbouw minder dan 2,5 m diep (vanaf de achtergevel)?',
        vraagType: 'boolean',
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
      id: 'oppervlakte',
      vraag: {
        vraagTekst: 'Wilt u minder dan de helft van uw tuin gaan bebouwen?',
        vraagType: 'boolean',
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
      content: {
        toelichting: `Let op:

Met ‘uw tuin’ bedoelen we de tuin zoals die oorspronkelijk is opgeleverd bij de bouw. Dat is zonder bebouwing. Dit kan u vinden in het bestemmingsplan.

Met ‘bebouwen‘ bedoelen zowel de nieuwe aanbouw, als bestaande bebouwing (bijvoorbeeld: schuur, pergola, vlonder, konijnenhok).`,
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
      id: 'vloer sluit aan',
      vraag: {
        vraagTekst: 'Sluit de vloer van de aanbouw aan op de vloer van de 1e bouwlaag?',
        vraagType: 'list',
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
      content: {
        toelichting: '',
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
      id: 'op kelder of soutterrain',
      vraag: {
        vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of soutterrain?',
        vraagType: 'list',
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
      content: {
        toelichting: '',
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
      id: 'hoogte',
      vraag: {
        vraagTekst: 'Wordt uw aanbouw minder dan 5 m hoog?',
        vraagType: 'list',
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
      content: {
        toelichting: '',
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
      id: 'hoogte tov vloer',
      vraag: {
        vraagTekst: 'Wordt uw aanbouw maximaal 0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande gebouw?',
        vraagType: 'list',
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
      content: {
        toelichting: `Let op:

Kelder en souterrain tellen niet als 1e bouwlaag.`,
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
      id: 'dakterras',
      vraag: {
        vraagTekst: 'Krijgt uw aanbouw een dakterras?',
        vraagType: 'list',
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
      content: {
        toelichting: '',
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
      id: 'balkonafstand',
      vraag: {
        vraagTekst: 'Komt er voldoende afstand tussen uw aanbouw en een (eventueel) bestaand balkon?',
        vraagType: 'list',
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
      content: {
        toelichting: `Let op:

Met ‘voldoende afstand’ bedoelen we dat er minimaal 1 bouwlaag tussen balkon en aanbouw zit.`,
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
      id: 'groen dak',
      vraag: {
        vraagTekst: `Krijgt uw aanbouw een 'groen' dak?`,
        vraagType: 'list',
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
      content: {
        toelichting: `Let op:

Met een ‘groen’ dak bedoelen we een dak dat geheel is bedekt met planten. Ook moet zo’n dak in 1 uur, 60 mm regenwater kunnen opnemen. Als het klaar is, moet u dit kunnen aantonen met een certificaat van uw leverancier.`,
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
      id: 'tijdelijke omgevingsvergunning',
      vraag: {
        vraagTekst:
          'Is het hoofdgebouw (woning, bedrijfsruimte), waar de aanbouw aan vast komt, gebouwd met een tijdelijke omgevingsvergunning?',
        vraagType: 'list',
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
      content: {
        toelichting: '',
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
};
