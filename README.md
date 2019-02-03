danger-plugin-typetalk
======================

[![CircleCI](https://circleci.com/gh/is2ei/danger-plugin-typetalk.svg?style=svg)][circleci]
[![Coverage Status](https://coveralls.io/repos/github/is2ei/danger-plugin-typetalk/badge.svg?branch=master)][coveralls]
[![npm version](https://badge.fury.io/js/danger-plugin-typetalk.svg)][npm]
[![Join the chat at https://gitter.im/is2ei/passport-typetalk](https://badges.gitter.im/is2ei/danger-plugin-typetalk.svg)][gitter]

[circleci]: https://circleci.com/gh/is2ei/danger-plugin-typetalk
[coveralls]: https://coveralls.io/github/is2ei/danger-plugin-typetalk?branch=master
[npm]: https://badge.fury.io/js/danger-plugin-typetalk
[gitter]: https://gitter.im/is2ei/danger-plugin-typetalk

## Install

```
$ yarn add danger-plugin-typetalk
```

## Usage

1) You need to set environment variables

`TOPIC_ID`: Typetalk topic ID.  
`TYPETALK_TOKEN`: Typetalk token.  

2) Set dangerfile.js

```
const typetalk = require('danger-plugin-typetalk')

typetalk.default()
```

## Changelog

See the GitHub [release history](https://github.com/is2ei/danger-plugin-typetalk/releases).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
