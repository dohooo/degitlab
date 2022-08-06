import type { IRef } from './git'

// Download the tarball of the repo
export function buildTarURL(repoURL: string, ref: IRef) {
  const extIdx = repoURL.lastIndexOf('.git')
  const repoURLWithoutExt = repoURL.slice(0, extIdx)
  const repoName = repoURLWithoutExt.split('/').pop()
  const mainBranchName = ref[1].replace('refs/heads/', '')
  const tarURL = `${repoURLWithoutExt}/-/archive/${mainBranchName}/${repoName}-${mainBranchName}.tar.gz`
  return tarURL
}
