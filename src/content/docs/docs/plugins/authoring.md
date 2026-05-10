---
title: Writing a plugin
description: A worked walkthrough of building a minimal control-plane plugin.
sidebar:
  order: 2
---

This page walks through writing a minimal **control-plane** plugin —
one that runs alongside the engine, subscribes to something external,
and posts commands into entity. The plugin compiles against the
Apache 2.0 SDK, so your plugin source can carry whatever license you
like (commercial, GPL, MIT — your call).

For hot-path plugins (output drivers, codecs), the shape is different —
see the OutputDriver / CodecProvider ABI headers in `plugin-api/include/`.

## Prerequisites

- The entity engine repo cloned and building
- A C++20 toolchain matching the one the engine uses (MSVC on Windows)
- Comfort with CMake

## Start from an example

The canonical control-plane example is the **OSC receiver** plugin at
`plugins/osc-receiver/` in the engine repo. Copy that folder to
`plugins/my-plugin/` as a starting point.

The `bus-logger` plugin shows the same pattern for plugins that read
from the engine's internal bus rather than driving it.

## Plugin entry point

Every plugin exposes a single C entry function that the engine calls at
load time:

```cpp
// my-plugin/MyPlugin.cpp
#include <entity/plugin/PluginContext.hpp>

using namespace entity::plugin;

class MyPlugin {
public:
  void start(IPluginContext& ctx) {
    m_ctx = &ctx;

    // Read a setting (returns the default if unset).
    bool enabled = ctx.getBoolSetting("my-plugin.enabled", true);
    int  port    = ctx.getIntSetting("my-plugin.port", 12345);

    if (!enabled) return;

    // Register a shutdown hook so the engine joins our worker thread
    // before it tears down the dispatcher.
    ctx.registerShutdownHook([this] { stop(); });

    // Kick off our worker.
    m_worker = std::thread([this, port] { run(port); });
  }

  void stop() {
    m_running.store(false);
    if (m_worker.joinable()) m_worker.join();
  }

private:
  void run(int port) {
    // ... listen on UDP, parse messages, etc.
    // When you want to trigger entity:
    m_ctx->enqueueCommand("SectionNext", "{}");
  }

  IPluginContext*    m_ctx{nullptr};
  std::thread        m_worker;
  std::atomic<bool>  m_running{true};
};

extern "C" ENTITY_PLUGIN_EXPORT void entity_plugin_start(IPluginContext* ctx) {
  static MyPlugin instance;
  instance.start(*ctx);
}
```

Notes:

- `enqueueCommand` takes the command type name and a JSON args string.
  See the [script command reference](/docs/reference/script-commands/)
  for the available type names.
- The context API is intentionally narrow — strings in, strings out for
  settings — so the SDK header doesn't drag in engine internals.
- `registerShutdownHook` is critical for any plugin that owns threads.
  Skip it and the engine will likely deadlock on exit.

## Boundary rules

The plugin SDK headers in `plugin-api/include/entity/plugin/`
deliberately **exclude**:

- `<entt/entt.hpp>` (ECS internals)
- `<d3d12.h>` (renderer internals)
- Anything in `entity/core/`, `entity/render/`, `entity/timeline/`,
  `entity/director/`, `entity/renderer/`

Stick to `entity/plugin/` headers and your plugin can ship under any
license. Reach across the boundary and you're contaminating yourself
with the engine's GPLv3.

These rules are CI-enforced — a plugin that includes a banned header
won't build cleanly in the entity tree.

## CMake setup

```cmake
# plugins/my-plugin/CMakeLists.txt
add_library(my-plugin SHARED MyPlugin.cpp)

target_link_libraries(my-plugin PRIVATE entity-plugin-api)

set_target_properties(my-plugin PROPERTIES
  OUTPUT_NAME "my-plugin"
  PREFIX ""           # produces my-plugin.dll on Windows, not libmy-plugin.dll
)
```

The engine's top-level `CMakeLists.txt` discovers plugin subdirectories
automatically.

## Settings

Add settings via the engine's `Settings` struct (in the engine's
`src/core/Settings.cpp`). Plugins read them through the narrow
`getBoolSetting` / `getIntSetting` accessors.

For a typical plugin you'll want at minimum:

- `my-plugin.enabled` (bool, default true)
- Anything plugin-specific (ports, paths, intervals)

These are surfaced in **Preferences → Plugins** in the editor UI.

## Loading the plugin

After building, the `my-plugin.dll` lands in `build/bin/Release/plugins/`
(or equivalent) alongside other plugin binaries. The engine discovers
it at startup and calls `entity_plugin_start`.

Restart the editor any time you swap a plugin binary. There's no
hot-reload yet.

## Bus-subscribing plugins

If your plugin needs to *react* to engine state (e.g. log every section
enter), you subscribe via the engine's bus rather than enqueuing
commands. Look at `plugins/bus-logger/` for the pattern. The same
boundary rules apply — bus types are in the SDK header, internals
aren't.

## Hot-path plugins (a sketch)

Hot-path plugins implement one of:

- `OutputDriver` — receives frames from the show thread, sends them
  somewhere (NDI, SDI, file, etc.)
- `CodecProvider` — registers a decoder for a new file extension

These are C++ ABIs, statically-linked against a specific entity
release. The interfaces are stable but bound to the toolchain — a
hot-path plugin built against entity 1.x won't load into entity 2.x
without a rebuild.

Headers live in `plugin-api/include/entity/plugin/`. The OutputDriver
ABI sketch:

```cpp
class OutputDriver {
public:
  virtual ~OutputDriver() = default;
  virtual void onAttach(const OutputInfo&) = 0;
  virtual void onDetach() = 0;
  virtual void onFrame(const FrameView&) = 0;  // called on the show thread
};
```

Full reference is in the source. Pull requests to expand this section
are very welcome — hot-path plugin authoring is the part of the docs
furthest behind the code.

## License

The SDK header is **Apache 2.0**. Your plugin can be any license you
want. Build a closed-source commercial plugin — the engine's GPLv3
doesn't reach into your code as long as you only use SDK headers.

Read [`LICENSING.md`](https://github.com/duremovich/Entity/blob/master/LICENSING.md)
in the engine repo for the full legal story.
