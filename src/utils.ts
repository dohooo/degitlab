import type { IRef } from './git'

export function buildRepoURL(url: string, username?: string, token?: string) {
  let searchValue: string

  if (url.startsWith('https://'))
    searchValue = 'https://'

  else if (url.startsWith('http://'))
    searchValue = 'http://'

  else
    throw new Error('url must start with http:// or https://')

  if (!username)
    console.log(`"USERNAME" is not set, will clone only with ${url}.`)
  if (!token)
    console.log(`"PAT" is not set, will clone only with ${url}.`)

  if (username && token)
    return url.replace(searchValue, `https://${username}:${token}@`)

  return url
}

// Download the tarball of the repo
export function buildTarURL(repoURL: string, ref: IRef) {
  const extIdx = repoURL.lastIndexOf('.git')
  const repoURLWithoutExt = repoURL.slice(0, extIdx)
  const repoName = repoURLWithoutExt.split('/').pop()
  const mainBranchName = ref[1].replace('refs/heads/', '')
  const tarURL = `${repoURLWithoutExt}/-/archive/${mainBranchName}/${repoName}-${mainBranchName}.tar`
  return tarURL
}
