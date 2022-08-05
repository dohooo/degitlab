import { execSync } from 'child_process'
import { resolve } from 'path'
import { cwd } from 'process'
import { cli } from './cli'

const pwd = cwd()

;(() => {
  const { url, output: _output = pwd } = cli.flags
  const output = resolve(_output)
  execSync(`
    git clone ${url} ${output} && rm -rf ${output}/.git
  `, { stdio: 'inherit' })
})()
