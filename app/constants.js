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
  // Quick hack to test the routs, use: http://localhost:3000/a/
  a: {
    status: STATUS.LIVE,
    sttrPath: '/shared/content/sttr/DakkapelBouwen.json',
    text: {
      entity: 'dakkapel',
      heading: 'Vergunningchecker dakkapel plaatsen',
      topic: 'een dakkapel te plaatsen',
      topicLocation: 'de dakkapel wilt gaan plaatsen',
    },
  },
  'kappen-of-snoeien': {},
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
    sttrPath: '/shared/content/sttr/DakkapelBouwen.json',
    text: {
      entity: 'dakkapel',
      heading: 'Vergunningchecker dakkapel plaatsen',
      topic: 'een dakkapel te plaatsen',
      topicLocation: 'de dakkapel wilt gaan plaatsen',
    },
  },
  'dakraam-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: 'dakraam',
      heading: 'Vergunningchecker dakraam plaatsen',
      topic: 'een dakraam te plaatsen',
      topicLocation: 'het dakraam wilt gaan plaatsen',
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
  'zonnepanelen-of-warmtecollectoren-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      entity: 'zonnepaneel of warmtecollector',
      heading: 'Vergunningchecker zonnepanelen of warmtecollectoren plaatsen',
      topic: 'zonnepanelen of warmtecollectoren te plaatsen',
      topicLocation: 'de zonnepanelen of warmtecollectoren wilt gaan plaatsen',
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
};

export const GET_TEXT =
  GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].text : TOPICS['404'].text;

export const GET_STTR = GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].sttrPath : '';

export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};
