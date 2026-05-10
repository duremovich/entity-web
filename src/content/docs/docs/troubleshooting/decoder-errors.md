---
title: Decoder errors
description: Clips that won't load or play.
sidebar:
  order: 3
---

If a clip shows up greyed-out in the media bin or refuses to play:

## Check the codec

entity supports ProRes, HAP, and PNG sequences as first-class formats.
H.264 / HEVC are playable but not recommended; other long-GOP codecs
may or may not work depending on FFmpeg's coverage.

See [Supported codecs](/docs/media/codecs/) for the full list.

**Fix:** transcode the clip to ProRes 4444 or HAP. Right-click in the
media bin → **Transcode**.

## Check the file integrity

Try playing the source file in VLC or ffplay. If it doesn't play there
either, the file is damaged. Re-export from the source.

## Check file permissions

If the editor can't read the file (permissions, file locked by another
process), it'll show an error. Close any other app that has the file
open. On Windows, this is most often Adobe Premiere or After Effects
holding a lock.

## Check the log

`logs/` inside your project folder has detailed decode-pipeline logs.
Filter for `ERROR` or the file name. The exact FFmpeg error message is
usually enough to identify the issue.
