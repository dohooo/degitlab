import meow from 'meow'

export const cli = meow(`
  Usage
    $ degitlab [options]

  Options
    -u, --url <url>               Repo URL
    -o, --output <dir-name>       Directory where to store repo files
    --help                        display help for command
    --version                     display version for command

  Examples
    $ degitlab -r https://[self-managed-url]/[path-to-repo].git -o output
`, {
  importMeta: import.meta,
  autoHelp: true,
  autoVersion: true,
  flags: {
    url: {
      type: 'string',
      alias: 'u',
    },
    output: {
      type: 'string',
      alias: 'o',
    },
  },
})
