/* eslint consistent-return:0 import/order:0 */
const fs = require('fs');
const https = require('https');
const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const { resolve } = require('path');
const app = express();
const SSL = isDev && process.env.HTTPS;
let options = {};

if (isDev) {
  const key = fs.readFileSync(`${__dirname}/cert/server.key`);
  const cert = fs.readFileSync(`${__dirname}/cert/server.crt`);
  options = {
    key,
    cert,
  };
  // Start server to load local STTR files
  app.use(express.static('app'));
}

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const server = SSL ? https.createServer(options, app) : app;

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
server.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  const scheme = SSL ? 'https' : 'http';

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url, scheme);
  } else {
    logger.appStarted(port, prettyHost, undefined, scheme);
  }
});