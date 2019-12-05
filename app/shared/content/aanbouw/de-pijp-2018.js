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
      cond: ['tussenpand.true'],
    },
    {
      type: 'input',
      vraagTekst: 'Gaat u bouwen in een beschermd stads- of dorpsgezicht?',
      id: 'stadsgezicht',

      toelichting:
        'Het gaat hier om een beschermd stads- of dorpsgezicht dat door het Rijk is aangewezen. Twijfelt u? Wilt u meer informatie? Neem dan contact op met de gemeente.',
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
        'Openbaar toegankelijk gebied: weg als bedoeld in artikel 1, eerste lid, onder b, van de Wegenverkeerswet 1994, alsmede pleinen, parken, plantsoenen, openbaar vaarwater en ander openbaar gebied dat voor publiek algemeen toegankelijk is, met uitzondering van wegen uitsluitend bedoeld voor de ontsluiting van percelen door langzaam verkeer;',
      langeToelichting: `De wat de voor- en achtergevel zijn kan meestal worden bepaald door plek van de (hoofd)ingang. Die zit in de voorgevel. De achtergevel zit precies aan de andere kant. Als u twijfelt: neem contact op met de gemeente.
        
Het gebied achter de achtergevel mag niet grenzen aan openbaar toegankelijk gebied.

Daarmee wordt bedoelt: een weg of een vaarweg.

Daarmee wordt niet bedoeld:
- een weg voor langzaam verkeer (voetpad of fietspad)
- een sloot

En weer wel:
- een weg met voetpad (stoep) en/of fietspad erlangs
- een weg met sloot erlangs

Als u twijfelt: neem contact op met de gemeente.`,
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
      id: 'artikel-3-vraag-1',
      vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
      toelichting: 'De aanbouw moet direct op de grond worden gebouwd',
      child: true,
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
      cond: ['stadsgezicht.false', 'stadsgezicht-zichtbaar.false'],
    },
    {
      type: 'input',
      id: 'artikel-3-vraag-2',
      vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
      toelichting:
        "Anders gezegd:\nGaat u de aanbouw voor hetzelfde doel gebruiken als het gebouw waar u tegenaan bouwt? Voorbeeld: u gaat de uitbouw van uw woning (gebouw met bestemming 'wonen') ook voor wonen gebruiken.",
      langeToelichting: '',
      child: true,
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
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
    },
    {
      type: 'input',
      vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
      id: 'artikel-3-vraag-3',
      toelichting:
        'Het achtererfgebied is het gedeelte van een perceel dat begint op een afstand van 1 meter uit de voorgevel. Bij een rijtjeshuis is dat het gebied dat achter de achtergevel ligt en wordt begrenst door de belendende percelen',
      langeToelichting: '',
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
      vraagTekst: 'Wordt de hoogte van de aanbouw hoger dan 5 m?',
      id: 'artikel-3-vraag-4',
      toelichting:
        'Hiermee wordt bedoeld de hoogte van de aanbouw ten opzichte van aangrenzende terrein. Twijfelt u vanaf welk punt u moet meten? Neem dan contact op met de gemeente.',
      langeToelichting: '',
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
      toelichting:
        'Openbaar toegankelijk gebied: weg als bedoeld in artikel 1, eerste lid, onder b, van de Wegenverkeerswet 1994, alsmede pleinen, parken, plantsoenen, openbaar vaarwater en ander openbaar gebied dat voor publiek algemeen toegankelijk is, met uitzondering van wegen uitsluitend bedoeld voor de ontsluiting van percelen door langzaam verkeer;',
      langeToelichting: `De wat de voor- en achtergevel zijn kan meestal worden bepaald door plek van de (hoofd)ingang. Die zit in de voorgevel. De achtergevel zit precies aan de andere kant. Als u twijfelt: neem contact op met de gemeente.

Het gebied achter de achtergevel mag niet grenzen aan openbaar toegankelijk gebied.

Daarmee wordt bedoelt: een weg of een vaarweg.

Daarmee wordt niet bedoeld:
- een weg voor langzaam verkeer (voetpad of fietspad)
- een sloot

En weer wel:
- een weg met voetpad (stoep) en/of fietspad erlangs
- een weg met sloot erlangs

Als u twijfelt: neem contact op met de gemeente.`,
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
      toelichting:
        'Met een bouwlaag bedoelen we een verdieping. Hoe meer bouwlagen, hoe hoger de eisen zijn die aan een bouwwerk worden gesteld.',
      langeToelichting: '',
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
      toelichting:
        'Met ‘verblijven’ bedoelen we dat mensen er vaak langere tijd zijn. Dus wel een slaapkamer, woonkamer, badkamer of een keuken, maar niet een wc, bergruimte of een technische ruimte.',
      langeToelichting:
        'Wanneer er op de 2e bouwlaag mensen verblijven - en wanneer die bouwlaag dus veel gebruikt gaat worden door mensen, worden er strengere eisen gesteld aan de aanbouw.',
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
      toelichting: '',
      langeToelichting: '',
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
      cond: ['artikel-3-vraag-1.true', 'artikel-3-vraag-1.false'],
      antwoordOpties: [
        {
          id: '1',
          optieText: 'Ja',
          value: 'true',
          cond: [
            [
              'artikel-3-vraag-1.false',
              'artikel-3-vraag-2.true',
              'artikel-3-vraag-3.true',
              'artikel-3-vraag-4.false',
              'artikel-3-vraag-5.true',
              'artikel-3-vraag-6.false',
              'artikel-3-vraag-8.false',
            ],
            [
              'artikel-3-vraag-1.false',
              'artikel-3-vraag-2.true',
              'artikel-3-vraag-3.true',
              'artikel-3-vraag-4.false',
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
            'artikel-3-vraag-2.false',
            'artikel-3-vraag-3.false',
            'artikel-3-vraag-4.true',
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
        "Let op:\nMet 'bebouwen' bedoelen zowel de nieuwe aanbouw, als bestaande bebouwing (bijvoorbeeld: schuur, pergola, vlonder, konijnenhok).",
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
      toelichting: 'De aanbouw moet direct op de grond worden gebouwd.',
      langeToelichting: '',
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
      toelichting: `Anders gezegd: Gaat u de aanbouw voor hetzelfde doel gebruiken als het gebouw waar u tegenaan bouwt? Voorbeeld: u gaat de uitbouw van uw woning (gebouw met bestemming 'wonen') ook voor wonen gebruiken.`,
      langeToelichting: '',
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
      toelichting:
        'Het achtererfgebied is het gedeelte van een perceel dat begint op een afstand van 1 meter uit de voorgevel. Bij een rijtjeshuis is dat het gebied dat achter de achtergevel ligt en wordt begrenst door de belendende percelen.',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      toelichting:
        'Hiermee wordt bedoeld de hoogte van de aanbouw ten opzichte van aangrenzende terrein. Twijfelt u vanaf welk punt u moet meten? Neem dan contact op met de gemeente.',
      langeToelichting: '',
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
      toelichting:
        'Let op: Met de vloer van de 2e bouwlaag wordt in de meeste gevallen bedoeld, de 1e verdiepingsvloer van het hoofdgebouw. (Kelder en souterrain tellen niet als 1e bouwlaag)',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar toegankelijk gebied?',
      id: 'artikel-2-vraag-8',
      toelichting: `Openbaar toegankelijk gebied: weg als bedoeld in artikel 1, eerste lid, onder b, van de Wegenverkeerswet 1994, alsmede pleinen, parken, plantsoenen, openbaar vaarwater en ander openbaar gebied dat voor publiek algemeen toegankelijk is, met uitzondering van wegen uitsluitend bedoeld voor de ontsluiting van percelen door langzaam verkeer;`,
      langeToelichting: `"De wat de voor- en achtergevel zijn kan meestal worden bepaald door plek van de (hoofd)ingang. Die zit in de voorgevel. De achtergevel zit precies aan de andere kant.
Als u twijfelt: neem contact op met de gemeente.

Het gebied achter de achtergevel mag niet grenzen aan openbaar toegankelijk gebied.

Daarmee wordt bedoelt: een weg of een vaarweg."`,
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
      toelichting:
        'Met een bouwlaag bedoelen we een verdieping. Hoe meer bouwlagen, hoe hoger zijn de eisen die aan een bouwwerk worden gesteld.',
      langeToelichting: '',
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
      toelichting:
        'Met ‘verblijven’ bedoelen we dat mensen er vaak langere tijd zijn. Dus wel een slaapkamer, woonkamer, badkamer of een keuken, maar niet een wc, bergruimte of een technische ruimte.',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
    // toelichting: 'Let op: bij een rijtjeshuis is dat de oppervlakte achter het hoofdgebouw inclusief de oppervlakten van aan- en bijgebouwen.',
    // langeToelichting: '',
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
        'Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
      id: 'artikel-2-vraag-13',
      toelichting:
        'Let op: Hierbij telt ook de oppervlakte van al gerealiseerde bouwwerken in het bebouwingsgebied mee. ',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      toelichting:
        'woonwagen: voor bewoning bestemd gebouw dat in zijn geheel of in delen kan worden verplaatst en op een daartoe bestemd perceel is geplaatst.',
      langeToelichting: '',
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
      toelichting:
        'Is het hoofdgebouw (woning, bedrijfsruimte), waar de aanbouw aan vast komt, gebouwd met een tijdelijke omgevingsvergunning? Voorbeelden: Tijdelijke studentenwoningen of een tijdelijk noodlokaal voor onderwijs.',
      langeToelichting: '',
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
      toelichting: '',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-1',
      vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
      toelichting: '',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-2',
      vraagTekst: 'Wordt de aanbouw meer dan 2,5 m diep (achter de achtergevel)?',
      toelichting: '',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-3',
      vraagTekst: 'Wordt uw aanbouw hoger dan 5 m?',
      toelichting:
        'Hiermee wordt bedoeld de hoogte van de aanbouw ten opzichte van aangrenzende terrein. Twijfelt u vanaf welk punt u moet meten? Neem dan contact op met de gemeente.',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-4',
      vraagTekst: 'Wordt uw aanbouw max 0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
      toelichting:
        'Let op: Met de vloer van de 2e bouwlaag wordt in de meeste gevallen bedoeld, de 1e verdiepingsvloer van het hoofdgebouw. (Kelder en souterrain tellen niet als 1e bouwlaag)',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-5',
      vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
      toelichting: '',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-6',
      vraagTekst: 'Wordt met de aanbouw meer dan 50% van het perceel (binnen bestemming Tuin) Bebouwd?',
      toelichting: '',
      langeToelichting: '',
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
      id: 'bestemmingsplan-vraag-7',
      vraagTekst: 'Krijgt de aanbouw een groen dak met een waterbergend vermogen van 60 mm in één uur?',
      toelichting:
        'Let op: Een groen dak is dakbedekking waarop een plantaardige laag is aangebracht, dwz. een laag die hoofdzakelijk bestaat uit levende planten. Het groene karakter varieert van mossen, sedum, grassen tot een daktuin. Ook moet zo’n dak in 1 uur, 60 mm regenwater kunnen opnemen.',
      langeToelichting: '',
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
      type: 'decision',
      vraagTekst: 'Voldoet u aan alle regels van het bestemmingsplan?',
      id: 'bestemmingsplan-conclusie',
      cond: ['bestemmingsplan-vraag-1.true', 'bestemmingsplan-vraag-1.false'],
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
      cond: ['tussenpand.true', 'monument.true', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '2) Vergunning nodig: Bouwvergunning, Wijzigen Monument, Afwijken bestemmingsplan',
      cond: ['tussenpand.true', 'monument.true', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '3) Vergunning nodig: Bouwen',
      cond: ['tussenpand.true', 'stadsgezicht-zichtbaar.true', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '4) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['tussenpand.true', 'stadsgezicht-zichtbaar.true', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '5) Vergunning nodig: NEE 😁',
      cond: [
        'tussenpand.true',
        'stadsgezicht-zichtbaar.false',
        'artikel-3-conclusie.true',
        'bestemmingsplan-conclusie.true',
      ],
    },
    {
      label: '6) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: [
        'tussenpand.true',
        'stadsgezicht-zichtbaar.false',
        'artikel-3-conclusie.true',
        'bestemmingsplan-conclusie.false',
      ],
    },
    {
      label: '7) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['tussenpand.true', 'stadsgezicht-zichtbaar.false', 'artikel-3-conclusie.false'],
    },
    {
      label: '8) Vergunning nodig: Bouwen, Afwijken bestemmingsplan',
      cond: ['tussenpand.true', 'stadsgezicht.false', 'artikel-3-conclusie.false'],
    },
    {
      label: '9) Vergunning nodig: NEE 😁',
      cond: ['tussenpand.true', 'artikel-2-specifiek.true', 'artikel-2-conclusie.true'],
    },
    {
      label: '10) Vergunning nodig: NEE 😁',
      cond: ['tussenpand.true', 'artikel-2-specifiek.false', 'bestemmingsplan-conclusie.true'],
    },
    {
      label: '11) Vergunning nodig: NEE 😁',
      cond: [
        'tussenpand.true',
        'artikel-2-specifiek.true',
        'artikel-2-conclusie.false',
        'bestemmingsplan-conclusie.true',
      ],
    },
    {
      label: '12) Vergunning nodig: Afwijken bestemmingsplan',
      cond: ['tussenpand.true', 'artikel-2-specifiek.false', 'bestemmingsplan-conclusie.false'],
    },
    {
      label: '13) Vergunning nodig: Afwijken bestemmingsplan',
      cond: [
        'tussenpand.true',
        'artikel-2-specifiek.true',
        'artikel-2-conclusie.false',
        'bestemmingsplan-conclusie.false',
      ],
    },
    {
      label: '14) Neem contact op met de gemeente',
      cond: ['tussenpand.false'],
    },
  ],
};
