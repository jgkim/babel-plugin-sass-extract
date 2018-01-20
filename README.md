# babel-plugin-sass-extract

Babel plugin for [sass-extract](https://github.com/jgranstrom/sass-extract).

Require sass files and get an object containing extracted sass variables. Supports `require()` and `import`.

**Note** that this is an early prototype.

## Options

### compileOptions

Same as `node-sass` options, defaults to `{}`.

### extractOptions

Same as that of `sass-extract`, defaults to `{ plugins: ['minimal'] }`.

## Install

You need to install the sass compiler, sass-extract and the plugin since they are all [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/).

```
npm install --save node-sass sass-extract babel-plugin-sass-extract
```

## Usage

```
const styleVariables = require('./styles.scss');
```

```
import styleVariables from './styles.scss';
```

## Requirements
- `node-sass >= 3.8.0`
- `node >= 4`

## Contributing

##### Running tests

```bash
npm test
```

##### Commits

In order to have readable commit messages and the ability to generate a changelog the commit messages should follow a certain structure.

To make it easier install `npm install -g commitizen` and commit using `git-cz`.

Generate changelog using `npm install -g conventional-changelog` and `npm run changelog`.

##### Releasing new versions

1. Make changes
2. Commit those changes
4. Set new version in package.json
5. `npm run changelog`
6. Commit package.json and CHANGELOG.md files
7. Tag
8. Push