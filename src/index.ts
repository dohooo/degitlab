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

import inquirer from 'inquirer'
import { cli } from './cli'

const pwd = cwd()

const { removeSync, mkdirSync, existsSync } = pkg

;(async () => {
  const { filter, name, output: _output = pwd } = cli.flags
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

  const projects = await api.Projects.search(name)
  const answers = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'path_with_namespace',
        message: 'Which project do you want to download?',
        choices: projects.map(prj => prj.path_with_namespace),
        filter(val) {
          return val.toLowerCase()
        },
      },
    ])
    .then(answers => answers as unknown as { path_with_namespace: string })

  const project = projects.find(prj => prj.path_with_namespace === answers.path_with_namespace)

  if (!project)
    throw new Error('Project not found')

  const fileType = 'tar.gz'
  const projectExport = await api.Repositories.showArchive(project.id, { fileType })
  const tempFilePath = join(output, `${host}-${project.id}.${fileType}`)

  if (!existsSync(output)) {
    console.log(`[🫥 digitlab] 🛠  "${output}" not exists, creating...`)
    mkdirSync(output)
  }

  writeFileSync(tempFilePath, projectExport as any)

  const extractOptions = { f: tempFilePath, C: output, strip: 1 } as ExtractOptions
  if (filter?.length) {
    let baseDir: string[] = []
    extractOptions.filter = (path) => {
      if (!baseDir.length)
        baseDir = filter.map(s => join(path, s))

      const matched = baseDir.some(b => path.startsWith(b))
      if (matched)
        console.log(`[🫥 digitlab] 📦 Extracting ${path}...`)

      return matched
    }
  }
  await tar.x(extractOptions)
  removeSync(tempFilePath)

  console.log(`[🫥 digitlab] 🚀 The project ${project.name} successfully downloaded to ${output}.`)
})()
