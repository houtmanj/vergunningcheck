export const SCOPE = 'Vergunningchecker';

export const REGEX = {
  postalCode: /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i,
};

export const EXTERNAL_URLS = {
  oloChecker: {
    omgevingsloket: 'https://www.omgevingsloket.nl/',
    intro: 'https://www.omgevingsloket.nl/Particulier/particulier/home/checken',
    location: 'https://www.omgevingsloket.nl/Particulier/particulier/home/checken/LocatieWerkzaamheden',
  },
};

export const GET_CURRENT_TOPIC = () => window.location?.pathname.split('/')[1]?.toLowerCase();

export const GET_CURRENT_PAGE = () => window.location?.pathname.split('/')[2]?.toLowerCase();

const STATUS = {
  // NO STATUS MEANT REDIRECT TO OLO DIRECTLY
  PRE_LIVE: 'ONLY SHOW THE LOCATION PAGE',
  LIVE: 'SHOW CHECKER FETCHED FROM API',
};

const TOPICS = {
  'kappen-of-snoeien': {
    text: {
      heading: 'Vergunningchecker kappen of snoeien',
    },
  },
  'aanbouw-of-uitbouw-maken': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: 'aanbouw of uitbouw',
      heading: 'Vergunningchecker aanbouw of uitbouw maken',
      topic: 'een aanbouw of een uitbouw te maken',
      topicLocation: 'de aanbouw of uitbouw wilt gaan maken',
    },
  },
  'dakkapel-plaatsen': {
    status: STATUS.LIVE,
    sttrPath: '/shared/content/sttr/OefenDakkapelPlaatsenOfVeranderen.json',
    text: {
      entity: 'dakkapel',
      heading: 'Vergunningchecker dakkapel plaatsen',
      topic: 'een dakkapel te plaatsen',
      topicLocation: 'de dakkapel wilt gaan plaatsen',
      locationPageIntro:
        'Wilt u de dakkapel plaatsen op een woonwagen, een tijdelijk gebouw, een blokhut of een vakantiehuis?',
      locationResultsPageDescription:
        'U hebt deze informatie nodig om de vergunningcheck dakkapel te doen. De informatie over de bestemmingsplannen is pas nodig als u een vergunning gaat aanvragen.',
      locationResultsPageDescription2: 'Gaat u meer dan 1 dakkapel plaatsen? Doe dan per dakkapel de vergunningcheck.',
    },
  },
  'dakraam-plaatsen': {
    status: STATUS.LIVE,
    sttrPath: '/shared/content/sttr/WasstraatOfWasplaatsVoorAutoSBussenTreinenEnTrams.json',
    text: {
      entity: 'dakraam',
      heading: 'Vergunningchecker dakraam plaatsen',
      topic: 'een dakraam te plaatsen',
      topicLocation: 'het dakraam wilt gaan plaatsen',
      locationPageIntro:
        'Wilt u de dakraam plaatsen op een woonwagen, een tijdelijk gebouw, een blokhut of een vakantiehuis?',
      locationResultsPageDescription:
        'U hebt deze informatie nodig om de vergunningcheck dakraam te doen. De informatie over de bestemmingsplannen is pas nodig als u een vergunning gaat aanvragen.',
      locationResultsPageDescription2: 'Gaat u meer dan 1 dakraam plaatsen? Doe dan per dakraam de vergunningcheck.',
    },
  },
  'zonnepanelen-of-warmtecollectoren-plaatsen': {
    status: STATUS.PRE_LIVE, // LIVE ON ACC, PRE_LIVE ON PROD
    sttrPath: '/shared/content/sttr/OefenHekOfSchuttingPlaatsenVeranderenOfVerwijderen.json',
    text: {
      entity: 'zonnepaneel of warmtecollector',
      heading: 'Vergunningchecker zonnepanelen of warmtecollectoren plaatsen',
      topic: 'zonnepanelen of warmtecollectoren te plaatsen',
      topicLocation: 'de zonnepanelen of warmtecollectoren wilt gaan plaatsen',
      locationResultsPageDescription:
        'U hebt deze informatie nodig om de vergunningcheck zonnepanelen of warmtecollectoren te doen. De informatie over de bestemmingsplannen is pas nodig als u een vergunning gaat aanvragen.',
      locationResultsPageDescription2:
        'Gaat u zonnepanelen op meer dan 1 dak plaatsen? Doe dan per dak de vergunningcheck. Gaat u zowel zonnepanelen als een warmtecollector plaatsen? Doe dan voor voor zowel zonnepanelen als warmtecollector een vergunningcheck.',
    },
  },
  'kozijnen-plaatsen-of-vervangen': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: 'kozijn',
      heading: 'Vergunningchecker kozijnen plaatsen of vervangen',
      topic: 'kozijnen te plaatsen of te vervangen',
      topicLocation: 'de kozijnen wilt gaan plaatsen of vervangen',
    },
  },
  'bouwwerk-slopen': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: 'bouwwerk slopen',
      heading: 'Vergunningchecker bouwwerk slopen',
      topic: 'een bouwwerk te slopen,',
      topicLocation: 'het bouwwerk wilt gaan slopen',
    },
  },
  'intern-verbouwen': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: '',
      heading: 'Intern verbouwen',
      topic: 'intern te verbouwen',
      topicLocation: 'intern wilt gaan verbouwen',
    },
  },
  '404': {
    text: {
      heading: '',
      topic: '',
      topicLocation: '',
    },
  },
};

export const TOPIC_EXISTS = TOPICS[GET_CURRENT_TOPIC()];

export const REDIRECT_TO_OLO = TOPIC_EXISTS && !TOPICS[GET_CURRENT_TOPIC()]?.status;

export const ALLOW_LOCATION_PAGE = TOPIC_EXISTS && TOPICS[GET_CURRENT_TOPIC()]?.status === STATUS.PRE_LIVE;

export const ALLOW_CHECKER = TOPIC_EXISTS && TOPICS[GET_CURRENT_TOPIC()]?.status === STATUS.LIVE;

export const PAGES = {
  intro: 'inleiding',
  locationIntroduction: 'locatie-introductie',
  location: 'locatie',
  locationResult: 'locatie-uitkomst',
  checkerIntroduction: 'introductie',
  checkerLocation: 'locatie',
  checkerQuestions: 'vragen',
  checkerResult: 'uitkomsten',
  checkerConclusions: 'conclusies',
  checkerContactAmsterdam: 'neem-contact-op-met-de-gemeente',
};

export const GET_TEXT =
  GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].text : TOPICS['404'].text;

export const GET_STTR = GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].sttrPath : '';

export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};

export const booleanOptions = [
  {
    label: 'Nee',
    formValue: 'no',
    value: false,
  },
  {
    label: 'Ja',
    formValue: 'yes',
    value: true,
  },
];
