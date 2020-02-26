# PoC

Requirements:

- v next.js => cra
- v webpack
- v react-testing
- v yarn2
- v jest
- v live-reloading
- v styled components
- v amsterdam styled components (incl fonts.css from `app/index.js` without sass requirement)
- v urql / graphql => apollo-client
- v env based config
- v js sourcemaps
- v react context for state
- v flow opsplitsen obv sttrPath
- v vragen in urls
- v backbutton
- v Location componenten grouperen
- v prettier met lint-staged (en husky)
- v propTypes / typescript
- v Dockerfile with optimized build
- v redis
- v docker-compose.yaml (with redis + nginx for statics)

* o xml parsing refactoring
* o chappie1.0 branch maken in Vergunningchecker
* o gitlab build/deploy script
* o deployen

- o 301 headers van client nginx backend?

# Issues

- x css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
- x reload support doen we nog niet (localstorage aka sessions ondersteunen)
