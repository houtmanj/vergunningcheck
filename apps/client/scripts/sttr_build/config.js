module.exports = {
  production: {
    // aanbouw: [
    //   {
    //     id: "WzTvyyRGkp2pf79aQ",
    //     naam: "Aanbouw bouwen"
    //   },
    //   {
    //     id: "FMbPHJhi3B3mwb7pT",
    //     naam: "test"
    //   }
    // ],
    dakraam: [
      // {
      //   id: "mpQ4YsJWhRTzxkM8n",
      //   naam: "Bouwen van bijbehorend bouwwerk"
      // },
      {
        id: "hMwHKR7Wz4FP8Dm4x",
        naam: "Het wijzigen van een monument bij een dakraam"
      }
    ],
    dakkapel: [
      {
        id: "WKPxKx4YBJ5fqYSni",
        naam: "Dakkapel monument"
      },
      {
        id: "Aa2EX3YprpZQ65non",
        naam: "Dakkapel bouwen"
      }
    ]
  },
  staging: {
    dakkapel: [
      {
        id: "KtAQGNzyyPjYe5mPc",
        name: "Dakkapel bouwen"
      },
      {
        id: "BTEm6sJJ6ZQEP9rJx",
        name: "Het wijzigen van een monument bij een dakkapel"
      }
    ],
    dakraam: [
      {
        id: "gzMTczepTCdxFnvYe",
        name: "Dakraam bouwen"
      },
      {
        id: "rpqSbyPsSK29JcAm9",
        name: "Het wijzigen van een monument bij een dakraam"
      }
    ],
    outcomes: [
      {
        id: "p3a48QBHA48YkZrRs",
        name: "Testing different outcomes/conclusions"
      }
    ]
  }
}[process.env.STTR_ENV];