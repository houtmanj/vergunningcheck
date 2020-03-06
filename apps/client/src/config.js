const STAGE = process.env.REACT_APP_STTR_STAGE; // shorthand

export const matamo = {
  urlBase: "https://analytics.data.amsterdam.nl/",
  siteId: 29
};

const oloHome =
  process.env.REACT_APP_OLO_URL || "https://www.omgevingsloket.nl/";

export const OLO = {
  home: oloHome,
  intro: `${oloHome}Particulier/particulier/home/checken`,
  location: `${oloHome}Particulier/particulier/home/checken/LocatieWerkzaamheden`
};

const topics = [
  // {
  //   slug: 'some-blaat',
  //   redirectToOlo: true,
  // },
  {
    slug: "dakkapel-plaatsen",
    sttrFile: "DakkapelBouwen.json",
    text: {
      heading: "Vergunningchecker dakkapel plaatsen",
      topic: "een dakkapel te plaatsen",
      topicLocation: "de dakkapel wilt gaan plaatsen"
    }
  },
  {
    slug: "dakraam-plaatsen",
    sttrFile:
      STAGE !== "production" &&
      "WasstraatOfWasplaatsVoorAutoSBussenTreinenEnTrams.json",
    text: {
      heading: "Vergunningchecker dakraam plaatsen",
      topic: "een dakraam te plaatsen",
      topicLocation: "het dakraam wilt gaan plaatsen"
    }
  },
  {
    slug: "aanbouw-of-uitbouw-maken",
    text: {
      heading: "Vergunningchecker aanbouw of uitbouw maken",
      topic: "een aanbouw of een uitbouw te maken",
      topicLocation: "de aanbouw of uitbouw wilt gaan maken"
    }
  },
  {
    slug: "kozijnen-plaatsen-of-vervangen",
    text: {
      heading: "Vergunningchecker kozijnen plaatsen of vervangen",
      topic: "kozijnen te plaatsen of te vervangen",
      topicLocation: "de kozijnen wilt gaan plaatsen of vervangen"
    }
  },
  {
    slug: "zonnepanelen-of-warmtecollectoren-plaatsen",
    text: {
      heading: "Vergunningchecker zonnepanelen of warmtecollectoren plaatsen",
      topic: "zonnepanelen of warmtecollectoren te plaatsen",
      topicLocation: "de zonnepanelen of warmtecollectoren wilt gaan plaatsen"
    }
  },
  {
    slug: "bouwwerk-slopen",
    text: {
      heading: "Vergunningchecker bouwwerk slopen",
      topic: "een bouwwerk te slopen,",
      topicLocation: "het bouwwerk wilt gaan slopen"
    }
  },
  {
    slug: "intern-verbouwen",
    text: {
      heading: "Intern verbouwen",
      topic: "intern te verbouwen",
      topicLocation: "intern wilt gaan verbouwen"
    }
  }
];

if (STAGE !== "production") {
  topics.push({
    slug: "test",
    sttrFile: "AanOfUitbouwBouwen.json",
    text: {
      heading: "Vergunningchecker dakkapel plaatsen",
      topic: "een dakkapel te plaatsen",
      topicLocation: "de dakkapel wilt gaan plaatsen"
    }
  });
}

export { topics };
