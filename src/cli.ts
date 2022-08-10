import meow from 'meow'

export const cli = meow(`
  Usage
    $ degitlab [options]

  Options
    -n, --name      <project-name>    Project name
    -o, --output    <dir-name>        Directory where to store repo files
    -f, --filter    <file-name>       Filter files to download 
    --help                            display help for command
    --version                         display version for command

  Examples
    $ degitlab -n degitlab -o ./
`, {
  importMeta: import.meta,
  autoHelp: true,
  autoVersion: true,
  flags: {
    name: {
      type: 'string',
      alias: 'n',
      isRequired: true,
    },
    output: {
      type: 'string',
      alias: 'o',
    },
    filter: {
      type: 'string',
      alias: 'f',
      isMultiple: true,
    },
  },
})
