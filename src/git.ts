import * as child_process from 'node:child_process'
import { promisify } from 'node:util'

const execGit = async (args: string[], options: child_process.ExecFileOptions) => {
  const execFileAsync = promisify(child_process.execFile)
  console.debug(`${options.cwd ?? ''}> git ${args.join(' ')}`)
  return await execFileAsync('git', args, options)
}

export const getRemoteBaseURL = async (cwd: string) => {
  const origin = await getOriginRemoteName(cwd)
  const originURL = await getRemoteURL(cwd, origin)
  return originURL.replace(/\.git$/, '')
}

const getOriginRemoteName = async (cwd: string) => {
  const gitRemote = await execGit(['remote'], { cwd })
  const remotes = gitRemote.stdout.toString().trim().split(/\n/)
  if (remotes.includes('origin')) {
    return 'origin'
  }
  return remotes[0]
}

const getRemoteURL = async (cwd: string, origin: string) => {
  const gitRemoteGetURL = await execGit(['remote', 'get-url', origin], { cwd })
  return gitRemoteGetURL.stdout.toString().trim()
}

export const getHeadSHA = async (cwd: string) => {
  const gitRevParse = await execGit(['rev-parse', 'HEAD'], { cwd })
  return gitRevParse.stdout.toString().trim()
}

export const getRelativePath = async (cwd: string, absPath: string) => {
  const gitLsFiles = await execGit(['ls-files', '--full-name', absPath], { cwd })
  return gitLsFiles.stdout.toString().trim()
}
