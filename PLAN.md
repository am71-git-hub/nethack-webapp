# NetHack Web GUI — v0.1 Plan (Shell-First)

> This plan was approved on 2026-04-21. The active working copy lives in
> `~/.claude/plans/cached-swimming-petal.md`; this file is the in-repo mirror
> for offline reference and session re-seeding.

## Context

Customizable web UI around NetHack. Lives at `~/am71/games/nethack-web`,
pushes to `github.com/am71-git-hub/nethack-webapp`, deploys under the
Firebase-hosted `am71` site at `/games/nethack-web/`.

User is new to NetHack and wants to play while iterating the UI — v0.1 must
be playable end-to-end, which in turn drives v0.2 requirements.

**Auth required to play** (no anon). Save files + UI layouts persist per-user
in Firestore. Layouts lock to device class (desktop / tablet / mobile) by
default, with an unlock toggle.

**v0.1 scope excludes the real engine.** The full GUI shell is built and
playtested against a `MockEngine` first; the WASM engine is a separate
milestone.

## Architecture

Three layers, separated so the engine can slot in later without touching
Shell or Display.

```
┌──────────────────────────────────────────────────────────┐
│ GUI Shell                                                 │
│   Shell, ButtonGroup, LayoutManager, SettingsPanel,      │
│   HelpPanel, TouchControls, CtrlBar, commands registry   │
├──────────────────────────────────────────────────────────┤
│ Display (swappable)                                       │
│   v0.1: TerminalDisplay (xterm.js) fed by engine bytes   │
│   v0.2: CanvasMapDisplay + InventoryPanel + StatsBar     │
├──────────────────────────────────────────────────────────┤
│ Engine (stubbed in v0.1)                                  │
│   GameEngine interface                                    │
│   MockEngine — echo + scripted responses (v0.1)          │
│   WasmEngine — real NetHack (v0.2, approach TBD)         │
└──────────────────────────────────────────────────────────┘

Storage: Firestore  users/{uid}/nethack/{save, lock, layouts, prefs}
Auth:    Firebase Google + Email/Password (no anon)
```

`GameEngine` contract:

```ts
interface GameEngine {
  start(saveBlob?: Uint8Array): Promise<void>
  sendKey(key: string): void
  onTerminalBytes(cb: (data: Uint8Array) => void): Unsubscribe
  onGameState(cb: (state: GameState) => void): Unsubscribe  // v0.2
  getSave(): Promise<Uint8Array>
  stop(): Promise<void>
}
```

## Tech choices

- Vite + TypeScript + React 18, strict TS.
- xterm.js 5.x with fit addon for the Display.
- `zustand` for app state.
- `react-rnd` for draggable / resizable panels.
- Firebase Web SDK v10 (Google + email/password; no anon).
- Fonts: **PxPlus IBM VGA 9x16** for the map (square-ratio bitmap), **Cascadia Mono** for UI chrome. Bundled locally in `public/fonts/`.
- Vitest + React Testing Library for unit tests.
- ESLint + Prettier.

## v0.1 Phases

1. **Scaffold & docs** — repo, tooling, all six `.md` files.
2. **Theme + fonts** — purple palette, font loading, xterm theme.
3. **Commands registry** — single source of truth at `src/ui/commands.ts`.
4. **Button groups** — `Button` + `ButtonGroup`, hover + badge modes.
5. **Layout manager** — dockable panels + three starter profiles.
6. **Keyboard + Ctrl** — interceptor, CtrlBar for mobile.
7. **Settings panel** — app prefs + `.nethackrc` options.
8. **Auth + save sync** — Firestore blob + lock + beforeunload + force takeover.
9. **Help panel** — renders `HELP.md` as a collapsible tree.
10. **Device class + lock** — detect + apply correct layout by default.
11. **Deploy** — rsync script + link card in am71 site.
12. **Playtest against MockEngine** — tag `v0.1`.

## Ctrl keys

**Desktop:** intercept `keydown` and `preventDefault()` when game is focused.
Interceptable: `Ctrl+D`, `Ctrl+P`, `Ctrl+X`, `Ctrl+S`.
Not interceptable: `Ctrl+W`, `Ctrl+T`, `Ctrl+N`, `Ctrl+Tab`, `Cmd+Q`. Doc'd in HELP.md.

**Mobile:** dedicated buttons for all Ctrl combos (send raw control chars)
*and* a CtrlBar (virtual modifier strip) for coverage.

## Device-class layout lock

`deviceClass.ts`: `matchMedia('(pointer: coarse)')` + viewport breakpoints
(≥1024 desktop, 600–1024 tablet, <600 mobile).

Prefs: `{ deviceLock: boolean, layouts: {desktop, tablet, mobile} }`. On
load, auto-pick `layouts[currentClass]` when `deviceLock` is on.

## Firebase data model

```
users/{uid}/nethack/
  ├── save                 { blob, updatedAt, fromSession, version }
  ├── lock                 { sessionId, acquiredAt }  (absent = unlocked)
  ├── prefs                { theme, fontSize, showBadges, showTooltips,
  │                           deviceLock, layouts, nethackrc }
  └── layouts/{layoutId}   { name, panels[], groups[] }
```

Security rules: each user read/writes only under their own `users/{uid}/...`.

## Save sync flow

```
sign-in         → read prefs; seed starter layouts if absent
engine start    → check lock; acquire (sessionId, now); pull save; feed engine
heartbeat       → every 60s re-stamp lock.acquiredAt
on S / death    → getSave → upload → release lock
beforeunload    → sync getSave → Firestore (sendBeacon fallback)
on tab focus    → re-check lock; banner if stolen; view-only or force
```

## Engine decision (deferred; documented)

### Option A — Build NetHack → WASM ourselves (Recommended)

Submodule `NetHack/NetHack@NetHack-3.7`, install `emsdk`, run upstream's own
`make CROSS_TO_WASM=1`, write our own TypeScript window-port in
`WasmEngine.ts`. Upstream game source, our bindings, reproducible build.
~1-2 weeks of engine work.

### Option B — Our WASM + NetHackWeb's `lib/` wrapper

Build WASM ourselves as Option A, but reuse NetHackWeb's small TypeScript
wrapper (auditable; credit preserved). Skips the window-port binding work.

### Option C — NetHackWeb's prebuilt artifacts

Rejected: untrusted binary, conflicts with user's "build from ground up"
preference.

**Supply-chain check:** diff `vendor/nethack` against
`NetHack/NetHack@NetHack-3.7` — zero diffs proves game source is unmodified.

## Verification (before tagging v0.1)

All against MockEngine. Full checklist lives in the approved plan file at
`~/.claude/plans/cached-swimming-petal.md`. Highlights: auth gate works, all
sandbox routes live, Ctrl+D intercepts, layouts persist, beforeunload
flushes to Firestore, lock banner + force takeover works, deploy pipeline
serves the built bundle live.

## Out of scope for v0.1

- Real engine (WASM)
- Custom canvas renderer
- Persistent inventory sidebar / stats bar
- Per-tile tooltips
- Tile graphics
- Leaderboard / achievements / replays
