---
title: Installing plugins
description: Drop a plugin into the install directory and restart.
sidebar:
  order: 1
---

Plugins live in `<install-dir>/plugins/`. entity discovers them on
startup.

## To install

1. Quit the editor.
2. Copy the plugin file (typically a `.dll` on Windows) into
   `<install-dir>/plugins/`.
3. Launch the editor.

Plugin-specific configuration appears in **Settings → Plugins**.

## To remove

Quit the editor. Delete the plugin file. Restart.

## Bundled plugins

entity ships with one first-party plugin out of the box:

- **OSC Receiver** — inbound OSC over UDP. See
  [OSC control](/docs/control/osc/).

More plugins (control-plane and hot-path) are on the roadmap.
