# Vergunnginschecker

Chappie is the permit checker for Gemeente Amsterdam.
This repo contains 2 apps, `client` and `graphql`.
We use lerna under the hood to install deps and run on both apps.
But you can also run and configure then individually!

[![pipeline status](https://gitlab.com/afjlambert1/vergunningschecker/badges/chappie1.0/pipeline.svg)](https://gitlab.com/afjlambert1/vergunningschecker/-/commits/chappie1.0)
[![coverage report](https://gitlab.com/afjlambert1/vergunningschecker/badges/chappie1.0/coverage.svg)](https://gitlab.com/afjlambert1/vergunningschecker/-/commits/chappie1.0)

## Install / run

```bash
npm i
npm start
```

## TODO

### Chappie 0.1 differences

- Als geen adres gevonden klopt de dropdown nog niet.
- Teksten nalopen vd afgelopen 3 weken?

## Deployment

- gitlab build/deploy script
- deployen

### Improvements

- xml parsing refactoring
- 301 headers van client nginx backend?

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
- reload support doen we nog niet (localstorage aka sessions ondersteunen)

