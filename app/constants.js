export const SCOPE = 'Vergunningchecker';

export const REGEX = {
  postalCode: /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i,
};

export const EXTERNAL_URLS = {
  oloChecker: {
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
  'kappen-of-snoeien': {},
  'aanbouw-of-uitbouw-maken': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker aanbouw of uitbouw maken',
      topic: 'een aanbouw of een uitbouw te maken',
      topicLocation: 'de aanbouw of uitbouw wil gaan maken',
    },
  },
  'dakkapel-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker dakkapel plaatsen',
      topic: 'een dakkapel te plaatsen',
      topicLocation: 'de dakkapel wil gaan plaatsen',
    },
  },
  'dakraam-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker dakraam plaatsen',
      topic: 'een dakraam te plaatsen',
      topicLocation: 'het dakraam wil gaan plaatsen',
    },
  },
  'kozijnen-plaatsen-of-vervangen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker kozijnen plaatsen of vervangen',
      topic: 'kozijnen te plaatsen of te vervangen',
      topicLocation: 'de kozijnen wil gaan plaatsen of vervangen',
    },
  },
  'zonnepanelen-of-warmtecollectoren-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker zonnepanelen of warmtecollectoren plaatsen',
      topic: 'zonnepanelen of warmtecollectoren te plaatsen',
      topicLocation: 'de zonnepanelen of warmtecollectoren wil gaan plaatsen',
    },
  },
  'bouwwerk-slopen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Vergunningchecker bouwwerk slopen',
      topic: 'een bouwwerk te slopen,',
      topicLocation: 'het bouwwerk wil gaan slopen',
    },
  },
  'intern-verbouwen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Intern verbouwen',
      topic: 'intern te verbouwen',
      topicLocation: 'intern wil gaan verbouwen',
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

export const PAGES = {
  intro: 'inleiding',
  locationIntroduction: 'locatie-introductie',
  location: 'locatie',
  locationResult: 'locatie-uitkomst',
  questions: 'vragen',
  overview: 'conclusie',
};

export const GET_TEXT =
  GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].text : TOPICS['404'].text;

export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};
