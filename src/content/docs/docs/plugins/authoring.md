---
title: Writing a plugin
description: Get started building a plugin against the entity SDK.
sidebar:
  order: 2
---

:::caution[Heads up]
The plugin SDK is stable enough to build against but the docs are still
catching up to the code. The canonical reference is the source tree in
the engine repo. Pull requests to clarify this page welcome.
:::

## Pick a tier

- **Control-plane** plugin — observe and trigger commands. Lower
  performance ceiling, simpler API. Examples: OSC receiver, timecode
  reader, telemetry exporter.
- **Hot-path** plugin — sits inside the per-frame loop. Implements a
  C++ ABI (`OutputDriver`, `CodecProvider`). Examples: NDI / SDI output,
  custom codec.

Most new plugins are control-plane. Start there unless you need to be
inside the render or decode loop.

## Start from an example

The first-party control-plane example is the OSC receiver plugin in the
engine repo at `plugins/osc-receiver/`. Copy that as your starting
point — it shows how to:

- Implement the plugin entry point
- Spin up a worker thread
- Enqueue commands into the dispatcher
- Read settings via the narrow context API
- Register a shutdown hook so the engine joins your thread cleanly

The `bus-logger` plugin shows the same pattern for bus-subscribing
plugins.

## Boundary rules

The plugin SDK headers live in `plugin-api/include/entity/plugin/`.
They are **Apache 2.0**.

Headers in `plugin-api/` deliberately exclude:

- `<entt/entt.hpp>` (ECS internals)
- `<d3d12.h>` (renderer internals)
- Anything from `entity/core/`, `entity/render/`, `entity/timeline/`,
  `entity/director/`, `entity/renderer/`

Stay inside `plugin-api/` and your plugin can ship under any license.

## License

The SDK is **Apache 2.0**. Build closed-source commercial plugins — the
GPL on the engine core doesn't apply to your plugin code as long as it
only uses the SDK headers.
