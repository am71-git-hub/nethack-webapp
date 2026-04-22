# TODO — v0.1 shell-first

Legend: `[ ]` pending · `[~]` in progress · `[x]` done

Update this file in the same commit that finishes a box. Keep it honest.

## Phase 1 — Scaffold & docs  ✅
- [x] Init Vite + TS + React at `~/am71/games/nethack-web`
- [x] ESLint + Prettier + strict tsconfig
- [x] Write CLAUDE.md, PLAN.md, TODO.md, COMPACT.md, HELP.md, README.md
- [x] Create `sandbox.html` + `src/sandbox/index.tsx` placeholder
- [x] Add .gitignore, .editorconfig
- [x] Add LICENSE
- [x] `git init`; first commit (176e3e6)
- [x] Create gh repo `am71-git-hub/nethack-webapp`; push
- [x] Verify `npm run dev` renders placeholder

## Phase 2 — Theme + fonts  ✅
- [x] Acquire PxPlus IBM VGA 9x16 (woff) + Cascadia Mono (fontsource, latin subset)
- [x] Add `@font-face` declaration for PxPlus in `src/theme/global.css`
- [x] Define `src/theme/theme.ts` purple palette + spacing/radii/fontSizes tokens
- [x] Define `src/theme/xterm-theme.ts` 16-color ANSI palette tinted purple
- [x] Sandbox page `#theme` renders every theme token as a swatch + specimen

## Phase 3 — Commands registry  ✅
- [x] Port all commands from HELP.md into `src/ui/commands.ts`
- [x] Unit test: every command has id, label, key, description, group
- [x] Unit test: no duplicate keys within a layout (and no universal vs layout collisions)

## Phase 4 — Button groups
- [ ] `Button` component (modes: icon / label / label+badge)
- [ ] `ButtonGroup` with collapse/expand
- [ ] Hover tooltip (from `command.description`)
- [ ] Sandbox: all groups rendered with toggles

## Phase 5 — Layout manager
- [ ] Panel primitive with `react-rnd`
- [ ] `LayoutManager`: serialize + restore positions/sizes
- [ ] Three starter profiles: `desktop-numpad`, `desktop-laptop`, `mobile-portrait`
- [ ] Profile switcher UI
- [ ] Sandbox: drag/resize live

## Phase 6 — Keyboard + Ctrl
- [ ] Key interceptor (focus-aware; `event.preventDefault()` in-game)
- [ ] Numpad map, vi map, extended-command `#`, Ctrl-combos
- [ ] `CtrlBar` (mobile virtual modifiers)
- [ ] Document uninterceptable keys in HELP.md
- [ ] Sandbox: key visualizer

## Phase 7 — Settings panel
- [ ] App prefs: theme, fontSize, showBadges, showTooltips, deviceLock
- [ ] nethackrc options: number_pad, color, autopickup, pickup_types, msg_window, ...
- [ ] Persist to Firestore (prefs doc)
- [ ] Sandbox: edit + round-trip

## Phase 8 — Auth + save sync
- [ ] Firebase init (env-based config, `.env.example`)
- [ ] Google + Email/Password sign-in
- [ ] `AuthGate` blocks unsigned users
- [ ] `saveSync`: read/write blob + lock doc + heartbeat
- [ ] beforeunload flush
- [ ] sendBeacon fallback via Cloud Function
- [ ] Lock-elsewhere banner + force takeover
- [ ] Sandbox: simulate two sessions

## Phase 9 — Help panel
- [ ] `HelpPanel` renders HELP.md as collapsible tree
- [ ] Link commands in help to shell buttons (click to highlight)

## Phase 10 — Device class + lock
- [ ] `deviceClass.ts` detection (matchMedia + viewport)
- [ ] Apply correct layout on load
- [ ] Lock switcher when deviceLock on
- [ ] Toggle in settings

## Phase 11 — Deploy
- [ ] `scripts/deploy.sh` (rsync to am71 website)
- [ ] Add card link in `~/am71/website/public/index.html`
- [ ] First deploy + live URL verified

## Phase 12 — Playtest + polish
- [ ] Full playtest against MockEngine on desktop
- [ ] Same on phone device-mode + real phone
- [ ] Fix issues
- [ ] Tag `v0.1`

## v0.2+ backlog

- Real engine (Option A: build WASM from upstream NetHack 3.7).
- Custom canvas renderer + persistent inventory + stats bar.
- Per-tile hover tooltips.
- Optional tiles.
- Leaderboard / achievements (Firestore aggregates).
