export default {
  name: 'Basis vragenlijst de Pijp',
  uitvoeringsregels: [
    {
      type: 'input',
      vraagTekst: 'Gaat u bouwen aan (op, of bij) een monument?',
      id: '0-monument',
    },
    {
      type: 'input',
      vraagTekst: 'Gaat u bouwen in een beschermd stads- of dorpsgezicht?',
      id: '1-stadsgezicht',
    },
    {
      type: 'input',
      vraagTekst: 'Is de locatie waar je gaat bouwen zichtbaar vanaf de openbare ruimte?',
      id: '2-stadsgezicht-zichtbaar',
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet u aan Artikel 3',
      id: '3-artikel-3',
      group: [
        {
          type: 'input',
          vraagTekst: 'Wordt de hoogte van de aanbouw hoger dan 5 m?',
          id: '4-artikel-3-vraag-1',
        },
        {
          type: 'input',
          vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
          id: '5-artikel-3-vraag-2',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: '6-artikel-3-vraag-3',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
          id: '7-artikel-3-vraag-4',
        },
        {
          type: 'input',
          vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
          id: '8-artikel-3-vraag-5',
        },
        {
          type: 'input',
          vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
          id: '9-artikel-3-vraag-6',
        },
        {
          type: 'input',
          vraagTekst:
            'Zo ja; Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
          id: '10-artikel-3-vraag-7',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
          id: '11-artikel-3-vraag-8',
        },
      ],
    },
    {
      type: 'input',
      vraagTekst:
        'Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
      id: '12-artikel-2-specifiek',
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet uw bouwwerk aan artikel O2?',
      id: '13-artikel-2',
      group: [
        {
          type: 'input',
          vraagTekst: 'Komt de aanbouw op een nieuwe (of uitgebreide) kelder of souterrain?',
          id: '14-artikel-2-vraag-1',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: '15-artikel-2-vraag-2',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u de aanbouw bouwen in het achtererfgebied?',
          id: '16-artikel-2-vraag-3',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt de aanbouw meer dan 4 m diep (achter de achtergevel)?',
          id: '17-artikel-2-vraag-4',
        },
        {
          type: 'input',
          vraagTekst: 'Indien nee; Wordt uw aanbouw hoger dan 5 m?',
          id: '18-artikel-2-vraag-5',
        },
        {
          type: 'input',
          vraagTekst:
            'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
          id: '19-artikel-2-vraag-6',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
          id: '20-artikel-2-vraag-7',
        },
        {
          type: 'input',
          vraagTekst: 'Bevindt uw aanbouw zich op afstand van meer dan 1 m vanaf het openbaar terrein?',
          id: '21-artikel-2-vraag-8',
        },
        {
          type: 'input',
          vraagTekst: 'Krijgt uw aanbouw een tweede bouwlaag?',
          id: '22-artikel-2-vraag-9',
        },
        {
          type: 'input',
          vraagTekst:
            'Zo ja; Gaat u de tweede bouwlaag van uw aanbouw gebruiken als een verblijfsruimte (eten, slapen of verblijven)?',
          id: '23-artikel-2-vraag-10',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u een dakterras op of een balkon direct boven uw aanbouw plaatsen?',
          id: '24-artikel-2-vraag-11',
        },
        {
          type: 'input',
          vraagTekst: 'Hoe groot is het bebouwingsgebied in uw situatie?',
          id: '25-artikel-2-vraag-12',
        },
        {
          type: 'input',
          vraagTekst:
            '1b..Gaat u met de aanbouw meer dan 50% van het oppervlakte van het als bebouwingsgebied (erf) aangewezen gebied bebouwen ?',
          id: '26-artikel-2-vraag-13',
        },
        {
          type: 'input',
          vraagTekst:
            '2b. Gaat u met de aanbouw meer bebouwen dan 50%, vermeerderd met 20% van het deel dat groter is dan 100 m2?',
          id: '27-artikel-2-vraag-14',
        },
        {
          type: 'input',
          vraagTekst:
            '3b. Gaat u met de aanbouw meer bebouwen dan 90 m2, vermeerderd met 10% van het deel dat groter is dan 300 m2?',
          id: '28-artikel-2-vraag-15',
        },
        {
          type: 'input',
          vraagTekst: '3c. Gaat u met de aanbouw meer bebouwen dan 150 m2?',
          id: '29-artikel-2-vraag-16',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u tegen een woonwagen aanbouwen?',
          id: '30-artikel-2-vraag-17',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u tegen een tijdelijk hoofdgebouw aanbouwen?',
          id: '31-artikel-2-vraag-18',
        },
        {
          type: 'input',
          vraagTekst: 'Gaat u tegen een recreatief nachtverblijf (voor één huishouden) aanbouwen?',
          id: '32-artikel-2-vraag-19',
        },
      ],
    },
    {
      type: 'decision',
      vraagTekst: 'Voldoet u aan bestemmingsplan De Pijp 2018?',
      id: '33-bestemmingsplan',
      group: [
        {
          type: 'input',
          vraagTekst: 'Gaat u de aanbouw gebruiken overeenkomstig het gebruik van het hoofdgebouw?',
          id: '34-bestemmingsplan-vraag-1',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt de aanbouw meer dan 2,5 m diep (achter de achtergevel)?',
          id: '35-bestemmingsplan-vraag-2',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt uw aanbouw hoger dan 5 m?',
          id: '36-bestemmingsplan-vraag-3',
        },
        {
          type: 'input',
          vraagTekst:
            'Wordt uw aanbouw max  0,3 m hoger dan de vloer van de 2e bouwlaag van het bestaande hoofdgebouw?',
          id: '37-bestemmingsplan-vraag-4',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt uw aanbouw hoger dan het bestaande hoofdgebouw?',
          id: '38-bestemmingsplan-vraag-5',
        },
        {
          type: 'input',
          vraagTekst: 'Wordt met de aanbouw meer dan 50% van het perceel (binnen bestemming Tuin) Bebouwd?',
          id: '39-bestemmingsplan-vraag-6',
        },
        {
          type: 'input',
          vraagTekst: 'Krijgt de aanbouw een groen dak met een waterbergend vermogen van 60 mm in één uur?',
          id: '40-bestemmingsplan-vraag-7',
        },
      ],
    },
  ],
};
