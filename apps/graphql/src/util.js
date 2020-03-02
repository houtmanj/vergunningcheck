const debug = require("debug")("graphql:util");
const xml2js = require("xml2js");
const fetch = require("node-fetch");
const LRU = require("lru-cache");
const config = require("config");
const redis = require("redis");
const { stringify } = require("querystring");
const { promisify } = require("util");

const parser = new xml2js.Parser();
const redisURL = process.env.REDIS_URL || null;
const cachePrefix = "2_";

const qs = obj => (obj ? "?" + stringify(obj) : "");
const noop = async (_, fn) => await fn();
const getUrl = (path, params) => path + qs(params);
const withLog = (msg, res) => {
  debug(msg);
  return res;
};
const fetchJson = url => {
  debug(`fetching '${url}'`);
  return fetch(url).then(res => res.json());
};
const gql = input => input.toString();

const cache = redisURL
  ? redis.createClient({
      url: redisURL
    })
  : new LRU({
      max: 1000
    });

let getAsync;
if (redisURL) {
  getAsync = promisify(cache.get).bind(cache);
}

const withCache = async (key, fn, ttlInSeconds) => {
  const cacheKey = `${cachePrefix}${key}`;
  const cached = redisURL ? await getAsync(cacheKey) : cache.get(cacheKey);
  if (cached) {
    debug("cache hit", cacheKey);
    return redisURL ? JSON.parse(cached) : cached;
  }
  debug("cache miss", cacheKey);
  const result = await fn();
  if (redisURL) {
    cache.set(cacheKey, JSON.stringify(result), "EX", ttlInSeconds);
  } else {
    cache.set(cacheKey, result, ttlInSeconds * 1000);
  }
  return result;
};

const postXml = (url, body) => {
  debug(`fetching '${url}'`);
  return fetch(url, {
    method: "POST",
    body
  })
    .then(response => response.text())
    .then(xml => parser.parseStringPromise(xml));
};

module.exports = {
  fetchJson,
  gql,
  getUrl,
  postXml,
  withLog,
  withCache: config.cache.withCacheEnabled ? withCache : noop
};
