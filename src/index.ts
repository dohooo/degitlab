import { join, resolve } from 'path'
import { cwd } from 'process'

import { writeFileSync } from 'fs'
import type { ExtractOptions } from 'tar'
import tar from 'tar'
import pkg from 'fs-extra'
import type { Config } from 'parse-git-config'
import parse from 'parse-git-config'
import getGitConfigPath from 'git-config-path'
import { Gitlab } from '@gitbeaker/node'

import { cli } from './cli'

const pwd = cwd()

const { removeSync, mkdirSync, existsSync } = pkg

;(async () => {
  const { id, subDir, output: _output = pwd } = cli.flags
  const output = resolve(_output)
  const gitConfigPath = getGitConfigPath('global')
  const gitConfig: Config = parse.sync({ path: gitConfigPath! }) || {}

  if (!cli.flags.output)
    console.log(`[🫥 digitlab] Output directory not specified, using current directory: ${pwd}`)

  if (!gitConfig)
    throw new Error('git config not found')

  const { degitlabHost, degitlabPAT } = gitConfig?.core || {}
  const { origin, host } = new URL(degitlabHost)
  const api = new Gitlab({ host: origin, token: degitlabPAT })
  const fileType = 'tar.gz'
  const projectExport = await api.Repositories.showArchive(id, { fileType })
  const tempFilePath = join(output, `${host}-${id}.${fileType}`)

  if (!existsSync(output)) {
    console.log(`[🫥 digitlab] 🛠  "${output}" not exists, creating...`)
    mkdirSync(output)
  }

  writeFileSync(tempFilePath, projectExport as any)

  const extractOptions = { f: tempFilePath, C: output, strip: 1 } as ExtractOptions
  if (subDir?.length) {
    let baseDir: string[] = []
    extractOptions.filter = (path) => {
      if (!baseDir.length)
        baseDir = subDir.map(s => join(path, s))

      const matched = baseDir.some(b => path.startsWith(b))
      if (matched)
        console.log(`[🫥 digitlab] 📦 Extracting ${path}...`)

      return matched
    }
  }
  await tar.x(extractOptions)
  removeSync(tempFilePath)

  console.log(`[🫥 digitlab] 🚀 The project ${id} successfully downloaded to ${output}.`)
})()
