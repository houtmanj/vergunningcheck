# Amsterdam Vergunningschecker

Frontend vergunningschecker voor de nieuwe omgevingswet

## Requirements

- [yarn](https://yarnpkg.com)

## Installation

Install all dependencies:

    yarn

## Development

Create a new feature branch from the `develop` branch.

Start the application:

    yarn start

Open the application in your browser at [localhost:3000](http://localhost:3000/).

Happy developing

## Releasing

These are the steps when you're ready to release a new version.

Checkout and pull all the changes from the `develop` branch:

    git checkout develop && git pull origin develop

Run the release script:

    yarn run release

Adjust the CHANGELOG if you want

    open CHANGELOG.md

Push the release tags:

    git push origin --tags

Push the release:

    git push

Merge the PR `develop` with `master`

## Deployment

After a new release is merged with `master`, log in to the CI job `VergunningsChecker`.

Make sure the `acceptance` environment is tested before you proceed :ok_hand:!

Select `master` and wait until the swimlane `Waiting for approval` is active. When active, press it and press `Proceed` in the small popup with the question `Deploy to production?`.

:checkered_flag:

## Check Webpack stats

Check the statistics of the bundle sizes.

Run:

    yarn build:stats

And upload the generated `stats.json` to [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)

## Run dockerfile locally

Run:

    docker build -t vergunningschecker .
    docker run -p8083:80 -i -t vergunningschecker

Now open `http://localhost:8083/intern-verbouwen/locatie`

To enter the docker image:

    docker ps
    docker exec -it [container-id] sh

## Techniques used

- React
- Redux
- Saga
- [Amsterdam Styled Components](https://github.com/Amsterdam/amsterdam-styled-components/)

## Conventions used

- EditorConfig (http://editorconfig.org/)
- BEM (http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- BEMIT (http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
- BEM namespaces (http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) without tags and a release branch

## Netlify

Added [Netlify](https://www.netlify.com/)

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)

