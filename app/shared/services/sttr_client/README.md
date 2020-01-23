# STTR-client

This module makes it easy to work with STTR xml. It creates
a `checker` instance based on the JSON format from 'sttr_build`.

With the checker you can build questionnaires.

# Setup

To start, you'll need to include this module in your application.

```bash
npm i sttr_client --save
```

## Generate JSON with sttr_build

You will need the checker configuration based on the JSON
from `sttr_build`.
Please refer to it's documentation to generate the JSON files.

## Create the checker

```js
const fs = require('fs');
const sttrclient = require('sttrclient').default;

// or use fetch to get your json
const config = JSON.parse(fs.readFileSync('../.build/WzTvyyRGkp2pf79aQ.json').toString());
const checker = sttrclient(config);

checker.next(); // get first question
```

# API

There are a couple of classes you can interact with.

TODO

# Contribute

TODO
