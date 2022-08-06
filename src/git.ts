import { cwd } from 'process'
import simpleGit from 'simple-git'

const pwd = cwd()
export const git = simpleGit(pwd)

export type IRef = [hash:string, ref:string]

export async function getMainBranchRef(repoURL: string): Promise<IRef> {
  const refs = await git.listRemote([repoURL])
  const normalizedRefs = (refs.split('\n') as string[]).map(item => item.split('\t')) as IRef[]
  const headBranch = normalizedRefs.find(([, ref]) => (ref === 'HEAD'))
  if (!headBranch)
    throw new Error('No HEAD branch found')

  return normalizedRefs.find(([hash, ref]) => (hash === headBranch[0] && ref !== 'HEAD'))!
}
