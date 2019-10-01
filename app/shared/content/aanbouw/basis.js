export default {
  name: 'Basis vragenlijst de Pijp',
  uitvoeringsregels: [
    {
      type: 'input',
      vraagTekst: 'Input 1',
      id: '1',
      index: 0,
    },
    {
      type: 'decision',
      vraagTekst: 'Decision 1',
      id: '2',
      index: 1,
      group: [
        {
          type: 'input',
          vraagTekst: 'Input 2',
          id: '3',
          index: 2,
        },
        {
          type: 'decision',
          vraagTekst: 'Decision 2',
          id: '4',
          index: 3,
          group: [
            {
              type: 'input',
              vraagTekst: 'Input 3',
              id: '5',
              index: 4,
            },
            {
              type: 'decision',
              vraagTekst: 'Decision 3',
              id: '6',
              index: 5,
              group: [
                {
                  type: 'input',
                  vraagTekst: 'Input 4',
                  id: '7',
                  index: 6,
                },
                {
                  type: 'decision',
                  vraagTekst: 'Decision 4',
                  id: '8',
                  index: 7,
                  group: [
                    {
                      type: 'input',
                      vraagTekst: 'Input 5',
                      id: '9',
                      index: 8,
                    },
                    {
                      type: 'decision',
                      vraagTekst: 'Decision 5',
                      id: '10',
                      index: 9,
                      group: [
                        {
                          type: 'input',
                          vraagTekst: 'Input 6',
                          id: '11',
                          index: 10,
                        },
                        {
                          type: 'input',
                          vraagTekst: 'Input 7',
                          id: '12',
                          index: 11,
                        },
                      ],
                    },
                    {
                      type: 'input',
                      vraagTekst: 'Input 8',
                      id: '13',
                      index: 12,
                    },
                  ],
                },
                {
                  type: 'input',
                  vraagTekst: 'Input 9',
                  id: '14',
                  index: 13,
                },
              ],
            },
            {
              type: 'input',
              vraagTekst: 'Input 10',
              id: '15',
              index: 14,
            },
          ],
        },
        {
          type: 'input',
          vraagTekst: 'Input 11',
          id: '16',
          index: 15,
        },
      ],
    },
    {
      type: 'input',
      vraagTekst: 'Input 12',
      id: '17',
      index: 16,
    },
    {
      type: 'decision',
      vraagTekst: 'Decision 6',
      id: '18',
      index: 17,
      group: [
        {
          type: 'input',
          vraagTekst: 'Input 13',
          id: '19',
          index: 18,
        },
        {
          type: 'input',
          vraagTekst: 'Input 14',
          id: '20',
          index: 19,
        },
      ],
    },
    {
      type: 'decision',
      vraagTekst: 'Decision 7',
      id: '21',
      index: 20,
      group: [
        {
          type: 'input',
          vraagTekst: 'Input 15',
          id: '22',
          index: 21,
        },
        {
          type: 'input',
          vraagTekst: 'Input 16',
          id: '23',
          index: 22,
        },
      ],
    },
    {
      type: 'input',
      vraagTekst: 'Laatste Input 17',
      id: '24',
      index: 23,
    },
  ],
};
