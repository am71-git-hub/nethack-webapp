# After `/compact` — read these in order

1. `PLAN.md` — what we're building and why.
2. `TODO.md` — where we are; look for the last `[~]` or next `[ ]`.
3. Run `git log -5 --oneline` — what just shipped.
4. `CLAUDE.md` — golden rules; don't break the 3-layer boundary.

## Session opener template

When starting a session after compact, post this in the first message:

> Re-seeding: last phase was **<N>**, last commit was `<hash: subject>`.
> Next up: `<TODO line>`.

## What to leave in context

- The file currently being edited.
- The sandbox route for the component in question, if any.
- `src/ui/commands.ts` if touching UI or keyboard.
- `src/engine/GameEngine.ts` if touching engine/display seam.

## What NOT to spend context on

- Re-reading the full `~/games/nethack/TUTORIAL.md` — the canonical copy is
  `HELP.md` in this repo.
- Re-fetching NetHackWeb details until engine phase.
- Browsing unrelated parts of the am71 website.

## Compact cadence

Good times to `/compact`:

- Just finished a phase and committed. Next phase is mostly independent.
- Finished a component + its sandbox page and moved on to the next.
- Agent chains grew large (research subagents, doc writes). Keep the
  `.md` files authoritative; drop the transcript.

Avoid compacting:

- Mid-debug with half an error trace unread.
- While a server/subagent/test is running in the background.
- Before committing or before TODO.md reflects the last box change.
