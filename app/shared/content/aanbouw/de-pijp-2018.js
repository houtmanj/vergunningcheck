export default {
  id: '_8743984',
  name: 'Conclusie vergunningscheck Aanbouw (De Pijp)',
  uitvoeringsregels: [
    // // Monument
    {
      type: 'input',
      vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
      toelichting:
        'Deze vraag is al door de gemeente beantwoord, op basis van de gegevens die bij ons bekend zijn. Wanneer u denkt dat dit niet klopt, kunt u dit aanpassen. Dit wordt later gecontroleerd.\n\nHeeft u op basis van deze vraag een vergunning nodig?\n\nDan kunt u deze vergunningschecker verlaten, en direct gaan naar Vergunning aanbouw en uitbouw om te zien wat u verder moet aanleveren.\nWij adviseren u om verder te gaan, zodat u ziet welke andere kenmerken leiden tot vergunningplicht. Zo vergroot u de kans op een vergunning.',
      id: 'monument',
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
        'LET OP: wegen en waterwegen gelden hier als openbaar toegankelijk gebied, maar wegen voor langzaam verkeer (voetpad of fietspad) niet.',
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
      cond: ['monument.false'],
    },
    {
      type: 'input',
      id: 'stadsgezicht-zichtbaar',
      vraagTekst: 'Is de locatie waar je gaat bouwen zichtbaar vanaf de openbare ruimte?',
      toelichting:
        'LET OP: wegen en waterwegen gelden hier als openbaar toegankelijk gebied, maar wegen voor langzaam verkeer (voetpad of fietspad) niet.',
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
      cond: ['stadsgezicht.true'],
    },
    // // Artikel 3 Set
    {
      type: 'input',
      vraagTekst: 'Wordt de hoogte van de aanbouw hoger dan 5 m?',
      id: 'artikel-3-vraag-1',
      child: true,
      cond: ['stadsgezicht-zichtbaar.false', 'stadsgezicht.false'],
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
      vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
      id: 'artikel-3-vraag-2',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
      id: 'artikel-3-vraag-3',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
      id: 'artikel-3-vraag-4',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
      id: 'artikel-3-vraag-5',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
      id: 'artikel-3-vraag-6',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      vraagTekst:
        'Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
      id: 'artikel-3-vraag-7',
      child: true,
      cond: ['artikel-3-vraag-6.true'],
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
      vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
      id: 'artikel-3-vraag-8',
      child: true,
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
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
      type: 'decision',
      vraagTekst: 'decision: Voldoet u aan artikel 3 volledig?',
      id: 'artikel-3-conclusie',
      cond: ['stadsgezicht-zichtbaar.false', 'stadsgezicht.false'],
      antwoordOpties: [
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
          cond: [
            [
              'artikel-3-vraag-1.false',
              'artikel-3-vraag-2.false',
              'artikel-3-vraag-3.true',
              'artikel-3-vraag-4.true',
              'artikel-3-vraag-5.true',
              'artikel-3-vraag-6.false',
              'artikel-3-vraag-8.false',
            ],
            [
              'artikel-3-vraag-1.false',
              'artikel-3-vraag-2.false',
              'artikel-3-vraag-3.true',
              'artikel-3-vraag-4.true',
              'artikel-3-vraag-5.true',
              'artikel-3-vraag-6.true',
              'artikel-3-vraag-7.false',
              'artikel-3-vraag-8.false',
            ],
          ],
        },
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
          cond: [
            'artikel-3-vraag-1.true',
            'artikel-3-vraag-2.true',
            'artikel-3-vraag-3.false',
            'artikel-3-vraag-4.false',
            'artikel-3-vraag-5.false',
            ['artikel-3-vraag-6.true', 'artikel-3-vraag-7.true'],
            'artikel-3-vraag-8.true',
          ],
        },
      ],
    },
    // // Artikel 2 Specifiek
    {
      type: 'input',
      vraagTekst:
        'Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
      toelichting:
        'Let op:\nMet ‘uw tuin’ bedoelen we de tuin zoals die oorspronkelijk is opgeleverd bij de bouw. Dat is zonder bebouwing. Dit kan u vinden in het bestemmingsplan.\n\nMet `bebouwen` bedoelen zowel de nieuwe aanbouw, als bestaande bebouwing (bijvoorbeeld: schuur, pergola, vlonder, konijnenhok).',
      id: 'artikel-2-specifiek',
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
      cond: [['stadsgezicht.false', 'artikel-3-conclusie.true']],
    },
    // // Artikel 2 Set
    {
      type: 'input',
      vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
      id: 'artikel-2-vraag-1',
      child: true,
      cond: ['artikel-2-specifiek.true'],
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
      vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
      id: 'artikel-2-vraag-2',
      child: true,
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
      id: 'artikel-2-vraag-3',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Wordt de aanbouw meer dan 4 m diep (achter de achtergevel)?',
      id: 'artikel-2-vraag-4',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Wordt uw aanbouw hoger dan 5 m?',
      id: 'artikel-2-vraag-5',
      cond: ['artikel-2-vraag-4.false'],
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
      vraagTekst: 'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
      id: 'artikel-2-vraag-6',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
      id: 'artikel-2-vraag-7',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
      id: 'artikel-2-vraag-8',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
      id: 'artikel-2-vraag-9',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst:
        'Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
      id: 'artikel-2-vraag-10',
      cond: ['artikel-2-vraag-9.true'],
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
      vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
      id: 'artikel-2-vraag-11',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
    // {
    //   type: 'input',
    //   vraagTekst: 'Hoe groot is het bebouwingsgebied in uw situatie?',
    //   id: 'artikel-2-vraag-12',
    //   cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
    //   antwoordOpties: [
    //     {
    //       id: '1',
    //       optieText: 'Ja',
    //       value: 'true',
    //     },
    //     {
    //       id: '2',
    //       optieText: 'Nee',
    //       value: 'false',
    //     },
    //   ],
    // },
    {
      type: 'input',
      vraagTekst:
        'Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen?',
      id: 'artikel-2-vraag-13',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst:
        'Gaat u met de aanbouw meer bebouwen dan 50%, vermeerderd met 20% van het deel dat groter is dan 100 m2?',
      id: 'artikel-2-vraag-14',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst:
        'Gaat u met de aanbouw meer bebouwen dan 90 m2, vermeerderd met 10% van het deel dat groter is dan 300 m2?',
      id: 'artikel-2-vraag-15',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Gaat u met de aanbouw meer bebouwen dan 150 m2?',
      id: 'artikel-2-vraag-16',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Gaat u tegen een woonwagen aanbouwen?',
      id: 'artikel-2-vraag-17',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Gaat u tegen een tijdelijk hoofdgebouw aanbouwen?',
      id: 'artikel-2-vraag-18',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      vraagTekst: 'Gaat u tegen een recreatief nachtverblijf (voor één huishouden) aanbouwen?',
      id: 'artikel-2-vraag-19',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
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
      type: 'decision',
      vraagTekst: 'Voldoet uw bouwwerk aan artikel 2?',
      id: 'artikel-2-conclusie',
      cond: ['artikel-2-vraag-1.true', 'artikel-2-vraag-1.false'],
      antwoordOpties: [
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
          cond: [
            'artikel-2-vraag-1.true',
            'artikel-2-vraag-2.false',
            'artikel-2-vraag-3.false',
            'artikel-2-vraag-4.true',
            ['artikel-2-vraag-4.false', 'artikel-2-vraag-5.true'],
            'artikel-2-vraag-6.true',
            'artikel-2-vraag-7.true',
            'artikel-2-vraag-8.true',
            ['artikel-2-vraag-9.true', 'artikel-2-vraag-10.true'],
            'artikel-2-vraag-11.true',
            'artikel-2-vraag-13.true',
            'artikel-2-vraag-14.true',
            'artikel-2-vraag-15.true',
            ['artikel-2-vraag-15.false', 'artikel-2-vraag-16.true'],
            'artikel-2-vraag-17.true',
            'artikel-2-vraag-18.true',
          ],
        },
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
          cond: [
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.true',
              'artikel-2-vraag-10.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-13.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.true',
              'artikel-2-vraag-10.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-14.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.true',
              'artikel-2-vraag-10.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-15.false',
              'artikel-2-vraag-16.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-13.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-14.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
            [
              'artikel-2-vraag-1.false',
              'artikel-2-vraag-2.true',
              'artikel-2-vraag-3.true',
              'artikel-2-vraag-4.false',
              'artikel-2-vraag-5.false',
              'artikel-2-vraag-6.false',
              'artikel-2-vraag-7.false',
              'artikel-2-vraag-8.true',
              'artikel-2-vraag-9.false',
              'artikel-2-vraag-11.false',
              'artikel-2-vraag-15.false',
              'artikel-2-vraag-16.false',
              'artikel-2-vraag-17.false',
              'artikel-2-vraag-18.false',
              'artikel-2-vraag-19.false',
            ],
          ],
        },
      ],
    },
    // // Bestemmingsplan Set
    {
      type: 'input',
      vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
      id: 'bestemmingsplan-vraag-1',
      child: true,
      cond: [
        'monument.true',
        'stadsgezicht-zichtbaar.true',
        ['stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.true'],
        'artikel-2-specifiek.false',
        'artikel-2-conclusie.false',
      ],
      // vergunningplichtig: true,
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
      vraagTekst: 'Wordt de aanbouw meer dan 2,5 m diep (achter de achtergevel)?',
      id: 'bestemmingsplan-vraag-2',
      child: true,
      cond: ['bestemmingsplan-vraag-1.true', 'bestemmingsplan-vraag-1.false'],
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
      vraagTekst: 'Wordt uw aanbouw hoger dan 5 m?',
      id: 'bestemmingsplan-vraag-3',
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
      vraagTekst: 'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
      id: 'bestemmingsplan-vraag-4',
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
      vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
      id: 'bestemmingsplan-vraag-5',
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
      vraagTekst: 'Wordt met de aanbouw meer dan 50% van het perceel (binnen bestemming Tuin) Bebouwd?',
      id: 'bestemmingsplan-vraag-6',
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
      vraagTekst: 'Krijgt de aanbouw een groen dak met een waterbergend vermogen van 60 mm in één uur?',
      id: 'bestemmingsplan-vraag-7',
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
      type: 'decision',
      vraagTekst: 'Voldoet u aan alle regels van het bestemmingsplan?',
      id: 'bestemmingsplan-conclusie',
      cond: [
        'monument.true',
        'stadsgezicht-zichtbaar.true',
        ['stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.true'],
        'artikel-2-specifiek.false',
        'artikel-2-conclusie.false',
      ],
      antwoordOpties: [
        {
          id: '2',
          optieText: 'Nee',
          value: 'false',
          cond: [
            'bestemmingsplan-vraag-1.false',
            'bestemmingsplan-vraag-2.true',
            'bestemmingsplan-vraag-3.true',
            'bestemmingsplan-vraag-4.true',
            'bestemmingsplan-vraag-5.true',
            'bestemmingsplan-vraag-6.true',
            'bestemmingsplan-vraag-7.false',
          ],
        },
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
          cond: [
            [
              'bestemmingsplan-vraag-1.true',
              'bestemmingsplan-vraag-2.false',
              'bestemmingsplan-vraag-3.false',
              'bestemmingsplan-vraag-4.false',
              'bestemmingsplan-vraag-5.false',
              'bestemmingsplan-vraag-6.false',
              'bestemmingsplan-vraag-7.true',
            ],
          ],
        },
      ],
    },
  ],
  uitkomsten: [
    {
      label: '1) Vergunning nodig: Bouwvergunning, Wijzigen Monument',
      cond: ['monument.true', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '2) Vergunning nodig: Bouwvergunning, Wijzigen Monument, Afwijken bestemmingsplan',
      cond: ['monument.true', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '3) Vergunning nodig: Bouwen',
      cond: ['stadsgezicht-zichtbaar.true', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '4) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar.true', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '5) Vergunning nodig: NEE 😁',
      cond: ['stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.true', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '6) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.true', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '7) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.false'],
    },
    {
      label: '8) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['stadsgezicht.false', 'artikel-3-conclusie.false'],
    },
    {
      label: '9) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-specifiek.true', 'artikel-2-conclusie.true'],
    },
    {
      label: '10) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-specifiek.false', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '11) Vergunning nodig: NEE 😁',
      cond: ['artikel-2-specifiek.true', 'artikel-2-conclusie.false', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '12) Vergunning nodig: Afwijken bestemmingsplan',
      cond: ['artikel-2-specifiek.false', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '13) Vergunning nodig: Afwijken bestemmingsplan',
      cond: ['artikel-2-specifiek.true', 'artikel-2-conclusie.false', 'bestemmingsplan-conclusie.false'],
    },
  ],
};
