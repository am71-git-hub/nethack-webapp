# NetHack Web — Help

> **Status:** v0.1 is a shell-only build (no real game yet). Most of this
> document describes NetHack gameplay so it's ready the moment the engine
> lands. UI and sync sections describe what the shell does today.

## Quick start

1. **Sign in** (top-right). Google or email/password. You can't play without an account.
2. Click **New Game** (once the engine is wired — until then the Display is a
   mock that echoes keypresses).
3. Move with:
   - your keyboard's **numpad** 1-9 (5 = wait)
   - **vi keys** `h j k l y u b n`
   - the on-screen **direction pad** (d-pad)
4. Press or click **?** for help on any command.

---

## The screen (once a game runs)

```
                    --------
                    |......|
                    |.....@|        @  = you
                    |......+        +  = door
                    -------.        .  = floor
                           #####    #  = corridor
                              ..    $  = gold
                Dlvl:1  $:0  HP:16(16)  Pw:2(2)  AC:6  Exp:1
```

**Status bar:**

| Field | Meaning |
|-------|---------|
| `Dlvl` | Dungeon level (go deeper to win) |
| `$` | Gold carried |
| `HP:current(max)` | Hit points. Zero = dead |
| `Pw` | Spell power (ignore early) |
| `AC` | Armor class. **Lower is better** |
| `Exp` | Experience level |

---

## Action tree

```
From the main screen you can:
│
├── MOVE ─── numpad 1-9 (5 = wait) · vi keys h j k l y u b n
│            walking into a monster attacks it
│
├── LOOK
│   ├── ;        look at any tile on screen
│   ├── :        describe item you're standing on
│   ├── /        identify a tile
│   └── ^P       re-read recent messages
│
├── ITEMS
│   ├── ,        pick up item(s) under you
│   ├── i        open inventory
│   ├── d        drop an item
│   └── USE
│       ├── e    eat food (or corpse)
│       ├── w    wield a weapon
│       ├── W    wear armor
│       ├── P    put on ring or amulet
│       ├── T    take off armor
│       ├── R    remove ring/amulet
│       ├── q    quaff (drink) a potion
│       ├── r    read a scroll or spellbook
│       ├── z    zap a wand
│       └── a    apply a tool (lockpick, lamp)
│
├── COMBAT
│   ├── (move)   bump into monster to attack
│   ├── t        throw an item
│   └── f        fire from quiver
│
├── DUNGEON
│   ├── s        search for hidden doors/traps
│   ├── o        open a door
│   ├── ^D       kick (door, monster, sink)
│   ├── >        go down stairs
│   ├── <        go up stairs
│   └── ^        identify trap under you
│
├── EXTENDED  (#)  — press # then type the command name
│   ├── #pray    pray to your god (emergency heal, cooldown)
│   ├── #chat    talk to shopkeeper / peaceful NPC
│   ├── #sit     throne, sink, altar
│   ├── #offer   sacrifice a corpse on an altar
│   ├── #rub     rub a lamp or touchstone
│   └── #tip     tip a container
│
└── META
    ├── ?        in-game help
    ├── i        inventory
    ├── C        name your character/pet
    ├── S        save and quit (resumes next time)
    └── ^X       show character stats
```

---

## Item glyphs

| Symbol | Type | What to do |
|--------|------|------------|
| `)` | weapon | `w` to wield |
| `[` | armor | `W` to wear |
| `=` | ring | `P` to put on |
| `"` | amulet | `P` to put on |
| `!` | potion | `q` to drink |
| `?` | scroll | `r` to read |
| `/` | wand | `z` to zap |
| `%` | food | `e` to eat |
| `(` | tool | `a` to apply |
| `$` | gold | auto-picked up |
| `+` | spellbook | `r` to learn |

---

## First 10 turns

1. Press `i` — see what you started with.
2. `w` — wield your starting weapon.
3. `W` — wear any starting armor.
4. Walk around; autopickup grabs items.
5. `,` on anything autopickup missed.
6. `s` — search walls near dead ends (hidden doors).
7. Find the stairs `>`; don't descend at low HP.
8. Eat before you get Hungry.

---

## Ctrl keys and the browser

Your browser intercepts some Ctrl combos before the game can see them. Keys
we **can** intercept:

- `Ctrl+D` (kick), `Ctrl+P` (messages), `Ctrl+X` (stats), `Ctrl+S` (save)

Keys we **cannot** intercept — your OS/browser wins:

- `Ctrl+W` (close tab)
- `Ctrl+T` (new tab)
- `Ctrl+N` (new window)
- `Ctrl+Tab` (switch tab)
- `Cmd+Q` (macOS quit)

**Rule of thumb:** if a Ctrl combo would change browser/OS state, don't use
it in the game — use the on-screen button or the CtrlBar on mobile.

## Ctrl on mobile

No hardware Ctrl key — you have two options:

1. **Use the dedicated buttons.** `⌃D Kick`, `⌃P Messages`, `⌃X Stats` send
   the raw control character directly, no modifier chord needed.
2. **CtrlBar.** Tap `Ctrl`, then tap a letter. Modifier auto-releases after
   the next key. Works for any Ctrl combo, even ones without a button.

---

## Layout profiles

Your UI locks to your device type by default:

- **desktop-numpad** — display centered, numpad cluster right, action groups below
- **desktop-laptop** — display centered, vi-key pad right, action groups below
- **mobile-portrait** — display up top, d-pad bottom-left, action wheel bottom-right, CtrlBar

Turn off **Lock layout to device type** in Settings to try other profiles on
any device, or to design your own.

You can drag panels, resize them, collapse button groups, and save the
arrangement as a new named profile.

---

## Save and sync

- Your game saves to your account on clean exit, death, or when you close the
  tab (`beforeunload`).
- Sign in on another device, same account — your game picks up from there.
- Don't play in two tabs simultaneously — you'll see a **lock** banner.
  "Force takeover" hands control to the current tab.

---

## Troubleshooting

- **"Locked by another session"** — a different tab or device has the game
  open. Close the other, or tap "Force takeover" if you're sure.
- **"Can't save"** — sign out and back in to refresh auth. If the issue
  persists, file an issue on GitHub.
- **Buttons don't send keypresses** — click inside the display once to
  focus it, then try again.
