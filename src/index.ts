import { resolve } from 'path'
import { cwd } from 'process'

import pkg from 'fs-extra'
import type { Config } from 'parse-git-config'
import parse from 'parse-git-config'
import getGitConfigPath from 'git-config-path'

import { cli } from './cli'
import { buildRepoURL } from './utils'
import { git } from './git'

const pwd = cwd()

const { removeSync } = pkg

;(async () => {
  const { url, output: _output = pwd } = cli.flags
  const output = resolve(_output)
  const gitConfigPath = getGitConfigPath('global')
  let gitConfig: Config

  if (!cli.flags.output)
    console.log(`output is not set, using current working directory ${output}.`)

  if (!gitConfigPath) {
    console.log(`no global git config found, will clone only with ${url}.`)
    gitConfig = parse.sync() || {}
  }
  else {
    gitConfig = parse.sync({ path: gitConfigPath }) || {}
  }

  const { PAT, USERNAME } = gitConfig
  const repoURL = buildRepoURL(url, USERNAME, PAT)

  await git.clone(repoURL, output)
  removeSync(`${output}/.git`)
})()
