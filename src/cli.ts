import meow from 'meow'

export const cli = meow(`
  Usage
    $ degitlab [options]

  Options
    -i, --id        <project-id>      Project id
    -o, --output    <dir-name>        Directory where to store repo files
    -s, --subDir    <sub-dir>         Sub directory to download 
    --help                            display help for command
    --version                         display version for command

  Examples
    $ degitlab -i 2259 -o dist
`, {
  importMeta: import.meta,
  autoHelp: true,
  autoVersion: true,
  flags: {
    id: {
      type: 'number',
      alias: 'i',
      isRequired: true,
    },
    output: {
      type: 'string',
      alias: 'o',
    },
    subDir: {
      type: 'string',
      alias: 's',
      isMultiple: true,
    },
  },
})
