import * as vscode from 'vscode'

export const activate = (context: vscode.ExtensionContext) => {
  console.log(`${context.extension.id} is now active!`)

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World!')
    }),
  )
}
