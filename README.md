danger-plugin-typetalk
======================

| Badge | Description |
| ------------- | ------------- |
| [![CircleCI](https://circleci.com/gh/is2ei/danger-plugin-typetalk.svg?style=svg)][circleci] | CircleCI Build Status |
| [![npm version](https://badge.fury.io/js/danger-plugin-typetalk.svg)][npm] | Latest version |

[circleci]: https://circleci.com/gh/is2ei/danger-plugin-typetalk
[npm]: https://badge.fury.io/js/danger-plugin-typetalk

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
