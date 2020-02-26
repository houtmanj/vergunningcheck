const express = require("express");
const { server } = require("./src/graphql");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const port = process.env.PORT || config.port;

const app = express();

// hardening
// app.use(helmet());
// app.disable("x-powered-by");

// no need to log IP
// app.use(
//   morgan(
//     ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
//   )
// );

//
app.use(cors());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use("/" + config.path, server);
app.use("/", (req, res) =>
  res.send(`pls go to <a href="/${config.path}">/${config.path}</a>`)
);
app.listen(port);

console.log(`🚀Server running at http://localhost:${port}/`);
