/**
 * WARNING: this file is shared across all development environments
 * including all developers.
 * If you want to make changes for your env only create a `local.js`
 * file in this directory.
 */
module.exports = {
  cache: {
    redis: false
  },
  loaders: {
    datapunt: {
      host: "http://acc.api.data.amsterdam.nl",
      CACHE_TIMEOUT: 10
    }
  },
  graphql: {
    graphiql: {
      defaultQuery: `
      query findAddress {
        findAddress(postalCode: "1055xd", houseNumberFull: "19c") {
          exactMatch {
            ... on Address {
              streetName
              postalCode
              houseNumber
              houseNumberFull
              residence
            }
            restrictions {
              __typename
              ... on CityScape {
                name
                __typename
              }
              ... on Monument {
                name
                __typename
              }
            }
            zoningPlans {
              name
              __typename
            }
            __typename
          }
          matches {
            ... on Address {
              streetName
              postalCode
              houseNumber
              houseNumberFull
              residence
            }
            __typename
          }
          __typename
        }
      }`
    }
  }
};
