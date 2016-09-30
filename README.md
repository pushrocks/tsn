# tsn

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/tsn)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/tsn)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/tsn)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/tsn/)

## Status for master
[![build status](https://gitlab.com/pushrocks/tsn/badges/master/build.svg)](https://gitlab.com/pushrocks/tsn/commits/master)
[![coverage report](https://gitlab.com/pushrocks/tsn/badges/master/coverage.svg)](https://gitlab.com/pushrocks/tsn/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/tsn.svg)](https://david-dm.org/pushrocks/tsn)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/tsn/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/tsn/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/tsn/badges/code.svg)](https://www.bithound.io/github/pushrocks/tsn)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Tsn uses the **latest** npm version of typescript

```typescript
import * as tsn from 'tsn'

let myGlobStringObject = {
    './myTsFolder/**/*.ts': './myDestinationFolder/',
    './someOtherTsFolder/**/*.ts': './myOtherDestinationFolder/'
}

let tsOptions = {
    // ...
}

let myCwd = process.cwd()

tsn.compileGlobStringObject(
    myGlobStringObject, // the glob string object describing from where to compile what to where
    tsOptions, // the options for TypeScript
    myCwd // a custom cwd, optional, defaults to process.cwd()
)
```

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
