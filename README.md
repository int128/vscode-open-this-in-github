# Open this in GitHub [![ts](https://github.com/int128/vscode-open-this-in-github/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/vscode-open-this-in-github/actions/workflows/ts.yaml)

This extension provides a command to open the current file in GitHub.

## Getting Started

Press `shift`+`cmd`+`P` and choose "Open this in GitHub" command:

<img width="1021" height="128" alt="image" src="https://github.com/user-attachments/assets/cc14c0f7-c6a6-413b-9601-59ff66c9b6e8" />

## Specification

This extension finds the current commit SHA of the repository using `git` command.

It opens the blob URL with the active line number, for example,

```
https://github.com/{owner}/{repo}/blob/{commit-sha}/{path}#L{number}
```

If multiple lines are selected, it opens the the blob URL with the range, for example,

```
https://github.com/{owner}/{repo}/blob/{commit-sha}/{path}#L{number}-L{number}
```

## Installation

https://marketplace.visualstudio.com/items?itemName=int128.vscode-open-this-in-github
