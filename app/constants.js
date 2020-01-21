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
      heading: 'Aanbouw of uitbouw maken',
      locationHeading: 'Waar wilt u uw aanbouw of uitbouw maken?',
    },
  },
  'dakkapel-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Dakkapel plaatsen',
      locationHeading: 'Waar wilt u uw dakkapel plaatsen?',
    },
  },
  'dakraam-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Dakraam plaatsen',
      locationHeading: 'Waar wilt u uw dakraam plaatsen?',
    },
  },
  'kozijnen-plaatsen-of-vervangen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Konzijnen plaatsen of vervangen',
      locationHeading: 'Waar wilt u uw kozijnen plaatsen of vervangen?',
    },
  },
  'zonnepanelen-of-warmtecollectoren-plaatsen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Zonnepanelen of warmtecollectoren plaatsen',
      locationHeading: 'Waar wilt u uw zonnepanelen of warmtecollectoren plaatsen?',
    },
  },
  'bouwwerk-slopen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Bouwwerk slopen',
      locationHeading: 'Waar wilt u een bouwwerk slopen?',
    },
  },
  'intern-verbouwen': {
    status: STATUS.PRE_LIVE,
    text: {
      heading: 'Intern verbouwen',
      locationHeading: 'Waar wilt u intern verbouwen?',
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
  GET_CURRENT_TOPIC() && TOPICS[GET_CURRENT_TOPIC()] ? TOPICS[GET_CURRENT_TOPIC()].text : TOPICS.default.text;

export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};
