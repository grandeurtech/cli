grandeurcloud
=============

This command line interface has been designed to let users work with Grandeur Cloud over command prompt

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/grandeurcloud.svg)](https://npmjs.org/package/grandeurcloud)
[![Downloads/week](https://img.shields.io/npm/dw/grandeurcloud.svg)](https://npmjs.org/package/grandeurcloud)
[![License](https://img.shields.io/npm/l/grandeurcloud.svg)](https://github.com/grandeurtech/grandeurcloud-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g grandeurcloud
$ grandeurcloud COMMAND
running command...
$ grandeurcloud (-v|--version|version)
grandeurcloud/0.0.2 darwin-x64 node-v12.13.1
$ grandeurcloud --help [COMMAND]
USAGE
  $ grandeurcloud COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`grandeurcloud help [COMMAND]`](#grandeurcloud-help-command)
* [`grandeurcloud serve`](#grandeurcloud-serve)

## `grandeurcloud help [COMMAND]`

display help for grandeurcloud

```
USAGE
  $ grandeurcloud help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `grandeurcloud serve`

Run a local development server

```
USAGE
  $ grandeurcloud serve

OPTIONS
  -p, --port=port  port on which server should be started

DESCRIPTION
  ...
  This command will run a local development server in the workspace with auto reload functionality.
```

_See code: [src/commands/serve.js](https://github.com/grandeurtech/grandeurcloud-cli/blob/v0.0.2/src/commands/serve.js)_
<!-- commandsstop -->
