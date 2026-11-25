# OpenRBX Player (browser build)

The OpenRBX engine, a 2007 Roblox reconstruction, compiled to WebAssembly and driven by this page.

## Run it

    python3 serve.py          # then open http://127.0.0.1:8000/

The page cannot be opened straight from disk (browsers refuse to load the WebAssembly module from
file://). Any static web server works; `serve.py` is the smallest one.

Click **Start**, pick a render size, and (optionally) add your own content first. Smaller render sizes
are much faster: the engine draws everything in software on the CPU.

## Places

Put `.rbxl` / `.rbxm` / `.xml` files in `maps/` and list them in `maps/manifest.json`
(`[{"name": "My map", "file": "my.rbxl", "size": "2.0 MB"}]`), or use the file picker on the
"Place & content" tab. Opening a place replaces whatever is in the world.

## Content

Only placeholders are bundled (flat textures; BSD-licensed font and sky from G3D). For the original
look, choose a Roblox `content` folder (or single files such as `comics.fnt`) on the start screen. They
are read in the browser and never uploaded. `fonts/character.rbxm` enables Play Solo.

## Controls

Right mouse button drag turns the camera; the wheel (or `I` / `O`) zooms; arrow keys / `,` `.` pan.
Left click uses the engine's menu and tools. On touch, drag turns the camera and a tap clicks.

## Licence

OpenRBX is GPLv3 (https://github.com/OpenRBX-org/OpenRBX), not public domain. The patch that makes it
build for the browser is in the source archive that came with this page.
