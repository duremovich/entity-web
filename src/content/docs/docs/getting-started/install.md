---
title: Install
description: Download and install entity on your machine.
sidebar:
  order: 1
---

entity is currently developed for **Windows 10 / 11 (64-bit)**. macOS (Metal)
and Linux (Vulkan) ports are on the roadmap but not yet shipping.

## System requirements

**Minimum**

- Windows 10 / 11 (64-bit)
- DirectX 12 compatible GPU (NVIDIA GTX 1060 / AMD RX 580 or newer)
- 16 GB RAM
- SSD for media storage

**Recommended for multi-layer realtime playback**

- NVIDIA RTX 3060 or better
- 32 GB RAM
- NVMe SSD
- Display outputs matching your projector / screen count

## Install

:::caution[Pre-release]
entity hasn't shipped a packaged binary yet. The download page will go live
when the first signed release lands. For now, install from source.
:::

### Build from source

You need:

- Visual Studio 2022 (with the "Desktop development with C++" workload and a
  Windows 10 / 11 SDK)
- CMake 3.21 or newer
- `git` and `vcpkg`

```powershell
git clone https://github.com/duremovich/Entity.git
cd Entity

# vcpkg picks up dependencies from vcpkg.json
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=C:/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build --config Release
```

The editor binary lands at `build\bin\Release\EntityMediaEditor.exe`.

## First launch

Double-click `EntityMediaEditor.exe`. You'll see the project launcher — a
dialog that asks you to open an existing project or create a new one.

Continue to [Your first project →](/docs/getting-started/first-project/)
