# MarsMoon

MarsMoon is a portable, open-source browser-game shelf.

- The Worker serves the static site from `public/`.
- Game builds are bundled under `public/games/`.
- The catalogue lives in `public/games.json`.
- No account or external database is required.

## Local preview

Install Wrangler, then run:

```sh
npx wrangler dev
```

## Deploy

```sh
npx wrangler deploy
```

Fork the repository or download it to share your own copy. Keep each game's source and required assets inside `public/games/<game-id>/`.

## Game sources

See the source links in the in-site catalogue. Imported game folders retain their original file structure.
