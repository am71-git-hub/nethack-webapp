# nethack-webapp

A customizable web GUI for NetHack — runs in the browser.

Sign in, customize your layout, play on desktop / tablet / phone, saves sync
across devices.

Live: *(URL after first deploy)*

## Status

**v0.1 — shell only.** The GUI, layouts, auth, and save sync are in place;
the real NetHack engine (WASM) is the next milestone. A `MockEngine` provides
a sandbox Display so the shell is fully usable before the engine lands.

## Build

```
npm install
npm run dev         # http://localhost:5173/
```

Sandbox workbench (component-by-component): `http://localhost:5173/sandbox.html`

## Deploy

```
npm run build
npm run deploy     # rsyncs dist/ into ~/am71/website/public/games/nethack-web/
```

Then from `~/am71/website/`:

```
firebase deploy --only hosting
```

## Layout

- `src/engine` — `GameEngine` contract + `MockEngine` (v0.1) + `WasmEngine` (v0.2)
- `src/display` — how the game renders (xterm.js in v0.1, custom canvas later)
- `src/ui` — Shell, ButtonGroup, LayoutManager, SettingsPanel, HelpPanel, TouchControls, CtrlBar, commands registry
- `src/storage` — Firebase auth, save sync with lock, layout profiles, prefs
- `src/theme` — purple palette + xterm ANSI theme
- `src/sandbox` — isolated component workbenches at `/sandbox.html`

See `PLAN.md`, `TODO.md`, `CLAUDE.md` for conventions and roadmap.

## Licence

TBD. NetHack itself is licensed under the
[NetHack General Public License (NGPL)](https://nethack.org/common/license.html).

## Acknowledgements

- [NetHack](https://nethack.org) — the game
- [NetHackWeb](https://github.com/guillaumebrunerie/NetHackWeb) — reference port that confirmed WASM is viable
- [Oldschool PC Font Resource](https://int10h.org/oldschool-pc-fonts/) — BIOS-style font
