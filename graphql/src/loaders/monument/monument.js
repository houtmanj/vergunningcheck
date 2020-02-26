const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: o => ({
    _type: "Monument",
    name: o.monumentstatus,
    type:
      o.monumentstatus === "Rijksmonument"
        ? "NATIONAL_MONUMENT"
        : "MUNICIPAL_MONUMENT"
  }),
  load: id => fetchJson(getUrl(`${URL}monumenten/${id}`)).then(loader.reducer),
  cached: key => withCache(`momument:${key}`, () => loader.load(key), TTL)
};

module.exports = {
  load: async keys => keys.map(loader.cached)
};
