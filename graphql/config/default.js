module.exports = {
  port: 4000,
  path: "graphql",
  graphql: { graphiql: true },
  cache: {
    dataLoaderEnabled: true,
    requestCacheEnabled: true,
    dnsCacheEnabled: true,
    withCacheEnabled: true
  },
  loaders: {
    datapunt: {
      HOST: "http://api.data.amsterdam.nl",
      CACHE_TIMEOUT: 600,

      bag: {
        url: "/bag/v1.1/",
        cacheTimeout: 600
      },
      bagSearch: {
        url: "/atlas/"
      },
      geoSearch: {
        url: "/geosearch/"
      },
      monument: {
        url: "/monumenten/"
      }
    },
    zoningPlan: {
      url:
        "https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied",
      cacheTimeout: 600
    }
  }
};
