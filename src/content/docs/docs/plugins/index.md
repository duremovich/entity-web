---
title: Plugins
description: Install or write a plugin.
sidebar:
  order: 0
---

entity is extensible via plugins. Two transport tiers:

- **Control-plane** — observe and trigger commands (OSC, timecode,
  telemetry)
- **Hot-path** — sit inside the per-frame loop (NDI / SDI output,
  codecs)

Both tiers use the **Apache 2.0** plugin SDK header so commercial
plugins are fine.

- **[Installing plugins](/docs/plugins/installing/)** — drop into
  `plugins/`, restart
- **[Writing a plugin](/docs/plugins/authoring/)** — start from an
  example, stay inside the SDK headers
