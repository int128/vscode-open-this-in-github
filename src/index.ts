import * as path from 'node:path'
import * as vscode from 'vscode'
import * as git from './git.ts'

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'extension.openThisInGitHub',
      async (textEditor) => await openThisInGitHub(textEditor),
    ),
  )
}

const openThisInGitHub = async (textEditor: vscode.TextEditor) => {
  const githubURL = await getGitHubURL(textEditor.document.fileName, textEditor.selection)
  vscode.window.showInformationMessage(githubURL)
  await vscode.env.openExternal(vscode.Uri.parse(githubURL))
}

const getGitHubURL = async (fileName: string, range: vscode.Range) => {
  const fileDir = path.dirname(fileName)
  const remoteBaseURL = await git.getRemoteBaseURL(fileDir)
  const headSHA = await git.getHeadSHA(fileDir)
  const relativePath = await git.getRelativePath(fileDir, fileName)

  const blobURL = getBlobURL(remoteBaseURL, headSHA, relativePath)
  const rangeFragment = getRangeFragment(range)
  return `${blobURL}#${rangeFragment}`
}

const getBlobURL = (remoteBaseURL: string, headSHA: string, relativePath: string) =>
  `${remoteBaseURL}/blob/${headSHA}/${relativePath}`

const getRangeFragment = (range: vscode.Range) => {
  if (range.isSingleLine) {
    return `L${range.start.line + 1}`
  }
  if (range.end.character === 0) {
    return `L${range.start.line + 1}-L${range.end.line}`
  }
  return `L${range.start.line + 1}-L${range.end.line + 1}`
}
