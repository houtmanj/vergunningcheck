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

export const CURRENT_ACTIVITY = window.location?.pathname.split('/')[1]?.toLowerCase();

export const CURRENT_PAGE = window.location?.pathname.split('/')[2]?.toLowerCase();

export const PAGES = {
  intro: 'inleiding',
  location: 'locatie',
  questions: 'vragen',
  overview: 'conclusie',
};

const TEXT = {
  aanbouw: {
    title: 'Vergunningchecker Aanbouw',
    locationHeading: 'Waar wilt u uw aanbouw maken?',
  },
  default: {
    title: 'Vergunningchecker',
    locationHeading: '',
  },
};

export const GET_TEXT = CURRENT_ACTIVITY && TEXT[CURRENT_ACTIVITY] ? TEXT[CURRENT_ACTIVITY] : TEXT.default;

export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};
