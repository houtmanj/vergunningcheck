const debug = require("debug")("graphql:loaders:monument");
const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: ({ monumentstatus }) => {
    if (!monumentstatus) {
      throw Error("Monument status not found!");
    }
    return {
      _type: "Monument",
      name: monumentstatus,
      type:
        monumentstatus === "Rijksmonument"
          ? "NATIONAL_MONUMENT"
          : "MUNICIPAL_MONUMENT"
    };
  },
  load: id => {
    // console.log(id);
    debug("Load monument for id", id);
    return id
      ? fetchJson(getUrl(`${URL}monumenten/${id}`)).then(loader.reducer)
      : null;
  },
  cached: key => withCache(`momument:${key}`, () => loader.load(key), TTL)
};

module.exports = {
  load: async keys => {
    console.log("module:load keys", keys);
    return keys.map(loader.cached);
  }
};
