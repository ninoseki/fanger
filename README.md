# fanger

[![npm version](https://badge.fury.io/js/fanger.svg)](https://badge.fury.io/js/fanger)
[![Build Status](https://travis-ci.org/ninoseki/fanger.svg?branch=master)](https://travis-ci.org/ninoseki/fanger)
[![CodeFactor](https://www.codefactor.io/repository/github/ninoseki/fanger/badge)](https://www.codefactor.io/repository/github/ninoseki/fanger)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/fanger/badge.svg?branch=master)](https://coveralls.io/github/ninoseki/fanger?branch=master)

fanger is an npm package for defang and refang IoC.

## What are defang and refang

Defang means to change a part of IoC to make inaccessible or unclickable. (e.g. `example.com` => `example[.]com`)

Refang means to revert a defanged IoC to the original one. (e.g. `example[.]com` => `example.com`)

## Installation

```bash
npm install fanger -g
```

## Usage

### As a CLI

```bash
$ echo "example.com" | defang
example[.]com

$ echo "test@example.com" | defang
test@example[.]com

$ echo "https://example.com" | defang
hxxps://example[.]com
```

```bash
$ echo "example[.]com" | refang
example.com

$ echo "test@example[.]com" | refang
test@example.com

$ echo "hxxps://example[.]com" | refang
https://example.com
```

#### As a library

```typescript
import { defang, refang } from "fanger";

const text = "example.com";
console.log(defang(text));
// example[.]com

const defangedText = "example[.]com";
console.log(refang(defangedText));
// example.com
```

## Supported defang/refang techniques

### Defang

The following defang techniques are supported.

#### IPv4

- `1.1.1.1` => `1[.]1.1.1`

The first dot of an IPv4 will be replaced with `[.]`.

#### Domain

- `example.com` => `example[.]com`
- `test.com.example.com` => `test[.]com.example[.]com`

A dot before a label which is registered as a TLD will be replaced with `[.]`.

#### HTTP scheme

- `http` => `hxxp`
- `https` =>  `hxxps`

### Supported refang techniques

The following refang techniques are supported.

| Techniques       | Defanged                               | Refanged                        |
|------------------|----------------------------------------|---------------------------------|
| `[.]` => `.`     | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `(.)` => `.`     | `1.1.1(.)1`                            | `1.1.1.1`                       |
| `\.`  => `.`     | `example\.com`                         | `example.com`                   |
| `[/]` => `/`     | `http://example.com[/]path`            | `http://example.com/path`       |
| `[:]` => `:`     | `http[:]//example.com`                 | `http://example.com`            |
| `hxxp` => `http` | `hxxps://google.com`                   | `https://google.com`            |
| `[at]` => `@`    | `test[at]example.com`                  | `test@example.com`              |
| `[@]` => `@`     | `test[@]example.com`                   | `test@example.com`              |
| `(@)` => `@`     | `test(@)example.com`                   | `test@example.com`              |
| `[dot]` => `.`   | `test@example[dot]com`                 | `test@example.com`              |
| `(dot)` => `.`   | `test@example(dot)com`                 | `test@example.com`              |
| Partial          | `1.1.1[.1`                             | `1.1.1.1`                       |
| Any combination  | `hxxps[:]//test\.example[.)com[/]path` | `https://test.example.com/path` |
