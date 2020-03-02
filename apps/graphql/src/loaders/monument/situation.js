const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;

const loader = {
  reducer: o => ({
    monumentId: o.hoort_bij_monument.identificerende_sleutel_monument
  }),
  load: id =>
    fetchJson(
      getUrl(`${HOST}${config.url}situeringen/`, {
        betreft_nummeraanduiding: id
      })
    ).then(data => data.results.map(loader.reducer)),
  cached: key =>
    withCache(`momument:situation:${key}`, () => loader.load(key), TTL)
};

module.exports = {
  load: async keys => keys.map(loader.cached)
};
