# nethack-webapp — Claude Conventions

Guidelines for Claude sessions working in this repo. Read this first after a
`/compact` or when picking up new work.

## What this repo is

A customizable web GUI around NetHack. NetHack itself runs client-side in
WebAssembly (engine phase not yet started — v0.1 uses a `MockEngine`).
Deployed as static files under the `am71` Firebase site at
`/games/nethack-web/`.

Remote: `https://github.com/am71-git-hub/nethack-webapp`
Deploy target: `/home/andrew/am71/website/public/games/nethack-web/`

## Golden rules

1. **Respect the three layers.** `Shell → Display → Engine`.
   - Shell never reads raw terminal bytes.
   - Display never imports from `storage/`.
   - Engine never imports React.
   If you feel the urge to cross a boundary, stop and ask.
2. **Sandbox-first.** New UI components get a `/sandbox/<name>` route before
   being mounted in Shell. Catches visual + interaction bugs in isolation.
3. **Commands registry is the source of truth.** Every command lives in
   `src/ui/commands.ts`. Buttons, settings, and help all read from it. Never
   hardcode a key label or description elsewhere.
4. **No anonymous play.** All Firestore I/O is behind the AuthGate.
5. **Never push to `main` without user approval.** Even small changes.
6. **Ask before destructive actions.** rm, git reset --hard, firebase deploy,
   schema changes, rewriting git history. Local file edits you can do freely.

## How to run

```
npm install
npm run dev         # main app at http://localhost:5173/
# sandbox is served at http://localhost:5173/sandbox.html
npm run test        # Vitest
npm run lint
npm run format
npm run build       # production build → dist/
npm run deploy      # rsync dist/ → am71 website/public/games/nethack-web/
```

After `npm run deploy`, run `firebase deploy --only hosting` from
`~/am71/website/` to push live.

## Testing strategy

- **Unit tests** for pure logic: `test/commands.test.ts`, `saveSync.test.ts`,
  `layouts.test.ts`, `deviceClass.test.ts`. Run with Vitest.
- **Sandbox routes** for visual/interactive components. Mount a single
  component in isolation with dummy data.
- **Manual playtest** for multi-layer changes: open the main app against
  `MockEngine`, exercise the feature end-to-end, then commit.

## Commits

- Conventional: `feat(ui): ...`, `fix(storage): ...`, `docs: ...`, `chore: ...`.
- One phase = one commit when feasible.
- Always update `TODO.md` in the same commit that checks a box.
- Co-author trailer is fine; never skip hooks.

## When stuck

1. Re-read `PLAN.md`, `TODO.md`, `COMPACT.md`.
2. Open the relevant sandbox page, reproduce in isolation.
3. Ask the user before deleting, refactoring, or renaming unfamiliar code.

## Layer contracts (quick reference)

```ts
// src/engine/GameEngine.ts — frozen contract across layers.
export interface GameEngine {
  start(saveBlob?: Uint8Array): Promise<void>
  sendKey(key: string): void                            // raw chars incl. control codes
  onTerminalBytes(cb: (data: Uint8Array) => void): Unsubscribe
  onGameState(cb: (state: GameState) => void): Unsubscribe  // populated in v0.2
  getSave(): Promise<Uint8Array>
  stop(): Promise<void>
}
```

Anything Shell needs from the engine must flow through this interface.
