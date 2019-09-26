export default {
  uitvoeringsregels: [
    {
      type: 'input',
      index: 0,
      vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
      id: 'monument',
    },
    {
      type: 'input',
      index: 1,
      vraagTekst: 'Gaat u bouwen in een beschermd stads- of dorpsgezicht?',
      id: 'stadsgezicht',
    },
    {
      type: 'input',
      index: 2,
      vraagTekst: 'Is de locatie waar je gaat bouwen zichtbaar vanaf de openbare ruimte?',
      id: 'stadsgezicht-zichtbaar',
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet u aan Artikel 3',
      id: 'id-1',
      group: [
        {
          type: 'input',
          index: 3,
          vraagTekst: 'Wordt de hoogte van de aanbouw hoger dan 5 m?',
          id: 'artikel-3-vraag-1',
        },
        {
          type: 'input',
          index: 4,
          vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
          id: 'artikel-3-vraag-2',
        },
        {
          type: 'input',
          index: 5,
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: 'artikel-3-vraag-3',
        },
        {
          type: 'input',
          index: 6,
          vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
          id: 'artikel-3-vraag-4',
        },
        {
          type: 'input',
          index: 7,
          vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
          id: 'artikel-3-vraag-5',
        },
        {
          type: 'input',
          index: 8,
          vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
          id: 'artikel-3-vraag-6',
        },
        {
          type: 'input',
          index: 9,
          vraagTekst:
            'Zo ja; Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
          id: 'artikel-3-vraag-7',
        },
        {
          type: 'input',
          index: 10,
          vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
          id: 'artikel-3-vraag-8',
        },
      ],
    },
    {
      type: 'input',
      index: 11,
      vraagTekst:
        'Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
      id: 'artikel-2-specifiek',
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet uw bouwwerk aan artikel O2?',
      id: 'artikel-2',
      group: [
        {
          type: 'input',
          index: 12,
          vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
          id: 'artikel-2-vraag-1',
        },
        {
          type: 'input',
          index: 13,
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: 'artikel-2-vraag-2',
        },
        {
          type: 'input',
          index: 14,
          vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
          id: 'artikel-2-vraag-3',
        },
        {
          type: 'input',
          index: 15,
          vraagTekst: 'Wordt de aanbouw meer dan 4 m diep (achter de achtergevel)?',
          id: 'artikel-2-vraag-4',
        },
        {
          type: 'input',
          index: 16,
          vraagTekst: 'Indien nee; Wordt uw aanbouw hoger dan 5 m?',
          id: 'artikel-2-vraag-5',
        },
        {
          type: 'input',
          index: 17,
          vraagTekst:
            'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
          id: 'artikel-2-vraag-6',
        },
        {
          type: 'input',
          index: 18,
          vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
          id: 'artikel-2-vraag-7',
        },
        {
          type: 'input',
          index: 19,
          vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 20,
          vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 21,
          vraagTekst:
            'Zo ja; Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 22,
          vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 23,
          vraagTekst: 'Hoe groot is het bebouwingsgebied in uw situatie?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 24,
          vraagTekst:
            '1b..Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 25,
          vraagTekst:
            '2b. Gaat u met de aanbouw meer bebouwen dan 50%, vermeerderd met 20% van het deel dat groter is dan 100 m2?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 26,
          vraagTekst:
            '3b. Gaat u met de aanbouw meer bebouwen dan 90 m2, vermeerderd met 10% van het deel dat groter is dan 300 m2?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 27,
          vraagTekst: '3c. Gaat u met de aanbouw meer bebouwen dan 150 m2?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 28,
          vraagTekst: 'Gaat u tegen een woonwagen aanbouwen?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 29,
          vraagTekst: 'Gaat u tegen een tijdelijk hoofdgebouw aanbouwen?',
          id: 'artikel-2-vraag-8',
        },
        {
          type: 'input',
          index: 30,
          vraagTekst: 'Gaat u tegen een recreatief nachtverblijf (voor één huishouden) aanbouwen?',
          id: 'artikel-2-vraag-8',
        },
      ],
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet u aan bestemmingsplan De Pijp 2018?',
      id: 'bestemmingsplan',
      group: [
        {
          type: 'input',
          index: 31,
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: 'bestemmingsplan-vraag-1',
        },
        {
          type: 'input',
          index: 32,
          vraagTekst: 'Wordt de aanbouw meer dan 2,5 m diep (achter de achtergevel)?',
          id: 'bestemmingsplan-vraag-2',
        },
        {
          type: 'input',
          index: 33,
          vraagTekst: 'Wordt uw aanbouw hoger dan 5 m?',
          id: 'bestemmingsplan-vraag-3',
        },
        {
          type: 'input',
          index: 34,
          vraagTekst:
            'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
          id: 'bestemmingsplan-vraag-4',
        },
        {
          type: 'input',
          index: 35,
          vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
          id: 'bestemmingsplan-vraag-5',
        },
        {
          type: 'input',
          index: 36,
          vraagTekst: 'Wordt met de aanbouw meer dan 50% van het perceel (binnen bestemming Tuin) Bebouwd?',
          id: 'bestemmingsplan-vraag-6',
        },
        {
          type: 'input',
          index: 37,
          vraagTekst: 'Krijgt de aanbouw een groen dak met een waterbergend vermogen van 60 mm in één uur?',
          id: 'bestemmingsplan-vraag-7',
        },
      ],
    },
  ],
};
