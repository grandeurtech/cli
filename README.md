grandeur
=============

This command line interface has been designed to let users work with Grandeur Cloud over command prompt

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/grandeur-cli.svg)](https://npmjs.org/package/grandeur-cli)
[![Downloads/week](https://img.shields.io/npm/dw/grandeur-cli.svg)](https://npmjs.org/package/grandeur-cli)
[![License](https://img.shields.io/npm/l/grandeur-cli.svg)](https://github.com/grandeurtech/grandeur-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g grandeur-cli
$ grandeur COMMAND
running command...
$ grandeur (-v|--version|version)
grandeur-cli/1.0.2 darwin-x64 node-v12.13.1
$ grandeur --help [COMMAND]
USAGE
  $ grandeur COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`grandeur deploy`](#grandeur-deploy)
* [`grandeur help [COMMAND]`](#grandeur-help-command)
* [`grandeur init`](#grandeur-init)
* [`grandeur serve`](#grandeur-serve)

## `grandeur deploy`

deploy site to grandeur

```
USAGE
  $ grandeur deploy

DESCRIPTION
  ...
  This command will deploy the site from local folder to grandeur
```

_See code: [src/commands/deploy.js](https://github.com/grandeurtech/cli/blob/v1.0.2/src/commands/deploy.js)_

## `grandeur help [COMMAND]`

display help for grandeur

```
USAGE
  $ grandeur help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `grandeur init`

init a directory as grandeur project workspace

```
USAGE
  $ grandeur init

DESCRIPTION
  ...
  This command initialize a directory as grandeur project workspace from where you can interact with your project with 
  CLI.
```

_See code: [src/commands/init.js](https://github.com/grandeurtech/cli/blob/v1.0.2/src/commands/init.js)_

## `grandeur serve`

run a local development server

```
USAGE
  $ grandeur serve

OPTIONS
  -p, --port=port  port on which server should be started

DESCRIPTION
  ...
  This command will run a local development server in the workspace with auto reload functionality.
```

_See code: [src/commands/serve.js](https://github.com/grandeurtech/cli/blob/v1.0.2/src/commands/serve.js)_
<!-- commandsstop -->
