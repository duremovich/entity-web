---
title: CLI arguments
description: Command-line flags for the editor.
sidebar:
  order: 3
---

`EntityMediaEditor.exe` accepts a small set of command-line arguments,
primarily for scripted runs and Windows file associations.

## Positional argument

```powershell
EntityMediaEditor.exe path\to\my-show\my-show.entity
```

A path to a `.entity` file opens that project at startup. This is how
Windows file associations work — double-click a `.entity` file in
Explorer and entity opens it.

If the file fails to load, the editor falls back to the project launcher
so a stale association doesn't dead-end.

## `--script <path>`

```powershell
EntityMediaEditor.exe --script my-script.json
```

Run a [JSON script](/docs/control/scripts/) and exit. Used for tests,
repros, and automation.

## `--headless`

```powershell
EntityMediaEditor.exe --headless --script my-script.json
```

Run without opening a window. Useful for CI, automated regression runs,
and content-pipeline scripts. Combine with `--script`.
