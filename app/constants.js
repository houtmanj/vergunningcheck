export const SCOPE = 'Vergunningchecker';
export const REGEX = {
  postalCode: /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i,
};
export const EXTERNAL_URLS = {
  olo: 'https://www.omgevingsloket.nl/Particulier/particulier/home',
};
export const ROUTES = {
  aanbouw: {
    title: 'Vergunningchecker Aanbouw',
  },
  '': {
    title: 'Vergunningchecker Aanbouw',
  },
};
export const MATOMO_CONFIG = {
  BASE_URL: 'https://analytics.data.amsterdam.nl/',
  SITE_ID: 29,
};
