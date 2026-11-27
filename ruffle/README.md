# Marsmoon local Ruffle runtime

This folder contains Marsmoon's local Ruffle bootstrap and a reusable Flash-player page.

## Install the actual runtime

The Ruffle WebAssembly runtime is distributed as compiled release files; it is not included in this commit. To keep Marsmoon independent of third-party CDNs:

1. Download the official **Web Selfhosted** release archive from https://github.com/ruffle-rs/ruffle/releases.
2. Extract the archive.
3. Copy the contents of its self-hosted distribution into this folder, alongside `player.html` and `ruffle-loader.js`. In particular, keep the matching `ruffle.js` and `ruffle.wasm` together.
4. Do not rename the runtime files; the loader expects `./ruffle.js` and the runtime's WASM beside it.

## Use

Open `player.html?movie=relative/path/to/movie.swf` from the site root, with the SWF stored locally in the repository. URL-encode special characters in the movie path.

For example, a game page can link to:
`../../ruffle/player.html?movie=../games/example/game.swf`

The browser must serve the files over HTTP(S); opening the HTML directly as a `file://` URL may prevent WebAssembly loading.

Ruffle supports Flash/SWF content, not Adobe Shockwave Director files (`.dcr`). Check the file extension and format before adding a title.

## Notes

- This wrapper uses no CDN.
- The Ruffle JavaScript and WASM must come from the same official release.
- Ruffle is an emulator; compatibility varies by SWF and required Flash APIs.
