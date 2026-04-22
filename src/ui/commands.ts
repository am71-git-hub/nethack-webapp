// Canonical command registry. Single source of truth for:
//   - button labels, badges, tooltips (src/ui/Button, ButtonGroup)
//   - keyboard dispatch (src/ui/* key handlers)
//   - settings (keybinding overrides)
//   - help panel (renders groups + long descriptions)
//
// Rule: never hard-code a NetHack key label, description, or group
// elsewhere in the codebase. Import from here.

export type Group =
  | 'move'
  | 'look'
  | 'items'
  | 'use'
  | 'combat'
  | 'dungeon'
  | 'extended'
  | 'meta'

export type BindingLayout = 'numpad' | 'vi' | 'ctrl' | 'ext' | 'universal'

export interface KeyBinding {
  /**
   * Raw characters sent to the engine when this binding fires.
   * Single printable: 'i', ','
   * Control codes: use \x04 for Ctrl+D, \x10 for Ctrl+P, etc.
   * Extended commands: '#pray\n' — the # prefix + name + Enter.
   */
  send: string
  /** Human-readable label for UI badges, e.g. "8", "l", "⌃D", "#pray". */
  label: string
  /** Which input scheme this binding belongs to. */
  layout: BindingLayout
}

export interface Command {
  /** Stable id. Kebab-case, scoped by group when useful. */
  id: string
  /** Short UI label (button, help entry). */
  label: string
  group: Group
  /** One-line tooltip. */
  description: string
  /** Optional long description for the help panel. */
  longDescription?: string
  /** Key bindings. Movement commands get both numpad + vi. */
  bindings: KeyBinding[]
  /** NetHack glyph associated with the command (decorative). */
  glyph?: string
  /** Hide on mobile layouts (default false — shown everywhere). */
  hideOnMobile?: boolean
}

// ---------------------------------------------------------------------------
// Movement — 8 directions + wait. Numpad + vi bindings per direction.
// Numpad layout:             Vi layout:
//   7  8  9                    y  k  u
//   4  .  6                    h  .  l
//   1  2  3                    b  j  n
// ---------------------------------------------------------------------------

const movement: Command[] = [
  {
    id: 'move-north',
    label: 'North',
    group: 'move',
    description: 'Move or attack north.',
    bindings: [
      { send: '8', label: '8', layout: 'numpad' },
      { send: 'k', label: 'k', layout: 'vi' },
    ],
  },
  {
    id: 'move-south',
    label: 'South',
    group: 'move',
    description: 'Move or attack south.',
    bindings: [
      { send: '2', label: '2', layout: 'numpad' },
      { send: 'j', label: 'j', layout: 'vi' },
    ],
  },
  {
    id: 'move-east',
    label: 'East',
    group: 'move',
    description: 'Move or attack east.',
    bindings: [
      { send: '6', label: '6', layout: 'numpad' },
      { send: 'l', label: 'l', layout: 'vi' },
    ],
  },
  {
    id: 'move-west',
    label: 'West',
    group: 'move',
    description: 'Move or attack west.',
    bindings: [
      { send: '4', label: '4', layout: 'numpad' },
      { send: 'h', label: 'h', layout: 'vi' },
    ],
  },
  {
    id: 'move-northeast',
    label: 'Northeast',
    group: 'move',
    description: 'Move or attack northeast.',
    bindings: [
      { send: '9', label: '9', layout: 'numpad' },
      { send: 'u', label: 'u', layout: 'vi' },
    ],
  },
  {
    id: 'move-northwest',
    label: 'Northwest',
    group: 'move',
    description: 'Move or attack northwest.',
    bindings: [
      { send: '7', label: '7', layout: 'numpad' },
      { send: 'y', label: 'y', layout: 'vi' },
    ],
  },
  {
    id: 'move-southeast',
    label: 'Southeast',
    group: 'move',
    description: 'Move or attack southeast.',
    bindings: [
      { send: '3', label: '3', layout: 'numpad' },
      { send: 'n', label: 'n', layout: 'vi' },
    ],
  },
  {
    id: 'move-southwest',
    label: 'Southwest',
    group: 'move',
    description: 'Move or attack southwest.',
    bindings: [
      { send: '1', label: '1', layout: 'numpad' },
      { send: 'b', label: 'b', layout: 'vi' },
    ],
  },
  {
    id: 'wait',
    label: 'Wait',
    group: 'move',
    description: 'Wait one turn (search if pressed repeatedly).',
    bindings: [
      { send: '5', label: '5', layout: 'numpad' },
      { send: '.', label: '.', layout: 'vi' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Look
// ---------------------------------------------------------------------------

const look: Command[] = [
  {
    id: 'look-here',
    label: 'Look here',
    group: 'look',
    description: 'Describe what you are standing on.',
    bindings: [{ send: ':', label: ':', layout: 'universal' }],
  },
  {
    id: 'look-at',
    label: 'Look at',
    group: 'look',
    description: 'Move a cursor and describe any tile on screen.',
    bindings: [{ send: ';', label: ';', layout: 'universal' }],
  },
  {
    id: 'identify-tile',
    label: 'Identify tile',
    group: 'look',
    description: 'Click a tile to identify its symbol.',
    bindings: [{ send: '/', label: '/', layout: 'universal' }],
  },
  {
    id: 'messages',
    label: 'Messages',
    group: 'look',
    description: 'Re-read recent game messages.',
    bindings: [{ send: '\x10', label: '⌃P', layout: 'ctrl' }],
  },
]

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

const items: Command[] = [
  {
    id: 'pickup',
    label: 'Pick up',
    group: 'items',
    description: 'Pick up item(s) under you.',
    bindings: [{ send: ',', label: ',', layout: 'universal' }],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    group: 'items',
    description: 'Open your inventory.',
    bindings: [{ send: 'i', label: 'i', layout: 'universal' }],
  },
  {
    id: 'drop',
    label: 'Drop',
    group: 'items',
    description: 'Drop an item from inventory.',
    bindings: [{ send: 'd', label: 'd', layout: 'universal' }],
  },
  {
    id: 'toggle-autopickup',
    label: 'Autopickup',
    group: 'items',
    description: 'Toggle autopickup on/off.',
    bindings: [{ send: '@', label: '@', layout: 'universal' }],
  },
]

// ---------------------------------------------------------------------------
// Use — applying inventory items
// ---------------------------------------------------------------------------

const use: Command[] = [
  {
    id: 'eat',
    label: 'Eat',
    group: 'use',
    description: 'Eat food or a corpse.',
    bindings: [{ send: 'e', label: 'e', layout: 'universal' }],
    glyph: '%',
  },
  {
    id: 'wield',
    label: 'Wield',
    group: 'use',
    description: 'Wield a weapon.',
    bindings: [{ send: 'w', label: 'w', layout: 'universal' }],
    glyph: ')',
  },
  {
    id: 'wear',
    label: 'Wear',
    group: 'use',
    description: 'Wear armor.',
    bindings: [{ send: 'W', label: 'W', layout: 'universal' }],
    glyph: '[',
  },
  {
    id: 'put-on',
    label: 'Put on',
    group: 'use',
    description: 'Put on a ring or amulet.',
    bindings: [{ send: 'P', label: 'P', layout: 'universal' }],
    glyph: '=',
  },
  {
    id: 'take-off',
    label: 'Take off',
    group: 'use',
    description: 'Take off armor.',
    bindings: [{ send: 'T', label: 'T', layout: 'universal' }],
    glyph: '[',
  },
  {
    id: 'remove',
    label: 'Remove',
    group: 'use',
    description: 'Remove a ring or amulet.',
    bindings: [{ send: 'R', label: 'R', layout: 'universal' }],
    glyph: '=',
  },
  {
    id: 'quaff',
    label: 'Quaff',
    group: 'use',
    description: 'Drink a potion.',
    bindings: [{ send: 'q', label: 'q', layout: 'universal' }],
    glyph: '!',
  },
  {
    id: 'read',
    label: 'Read',
    group: 'use',
    description: 'Read a scroll or spellbook.',
    bindings: [{ send: 'r', label: 'r', layout: 'universal' }],
    glyph: '?',
  },
  {
    id: 'zap',
    label: 'Zap',
    group: 'use',
    description: 'Zap a wand.',
    bindings: [{ send: 'z', label: 'z', layout: 'universal' }],
    glyph: '/',
  },
  {
    id: 'apply',
    label: 'Apply',
    group: 'use',
    description: 'Apply a tool (lockpick, lamp, horn...).',
    bindings: [{ send: 'a', label: 'a', layout: 'universal' }],
    glyph: '(',
  },
]

// ---------------------------------------------------------------------------
// Combat
// ---------------------------------------------------------------------------

const combat: Command[] = [
  {
    id: 'throw',
    label: 'Throw',
    group: 'combat',
    description: 'Throw an item, then choose a direction.',
    bindings: [{ send: 't', label: 't', layout: 'universal' }],
  },
  {
    id: 'fire',
    label: 'Fire',
    group: 'combat',
    description: 'Fire from your quiver.',
    bindings: [{ send: 'f', label: 'f', layout: 'universal' }],
  },
]

// ---------------------------------------------------------------------------
// Dungeon
// ---------------------------------------------------------------------------

const dungeon: Command[] = [
  {
    id: 'search',
    label: 'Search',
    group: 'dungeon',
    description: 'Search adjacent tiles for hidden doors and traps.',
    bindings: [{ send: 's', label: 's', layout: 'universal' }],
  },
  {
    id: 'open',
    label: 'Open',
    group: 'dungeon',
    description: 'Open a door.',
    bindings: [{ send: 'o', label: 'o', layout: 'universal' }],
  },
  {
    id: 'close',
    label: 'Close',
    group: 'dungeon',
    description: 'Close a door.',
    bindings: [{ send: 'c', label: 'c', layout: 'universal' }],
  },
  {
    id: 'kick',
    label: 'Kick',
    group: 'dungeon',
    description: 'Kick a door, monster, or sink.',
    longDescription:
      'Kick in a chosen direction. Useful for forcing open locked doors ' +
      '(damages you too), attacking barehanded, or trying a sink.',
    bindings: [{ send: '\x04', label: '⌃D', layout: 'ctrl' }],
  },
  {
    id: 'stairs-down',
    label: 'Down stairs',
    group: 'dungeon',
    description: 'Go down the stairs under you.',
    bindings: [{ send: '>', label: '>', layout: 'universal' }],
  },
  {
    id: 'stairs-up',
    label: 'Up stairs',
    group: 'dungeon',
    description: 'Go up the stairs under you.',
    bindings: [{ send: '<', label: '<', layout: 'universal' }],
  },
  {
    id: 'identify-trap',
    label: 'Identify trap',
    group: 'dungeon',
    description: 'Identify a trap on the tile you are standing on.',
    bindings: [{ send: '^', label: '^', layout: 'universal' }],
  },
]

// ---------------------------------------------------------------------------
// Extended commands — prefix '#' then name + Enter
// ---------------------------------------------------------------------------

const extended: Command[] = [
  {
    id: 'pray',
    label: 'Pray',
    group: 'extended',
    description: 'Pray to your god (emergency heal; long cooldown).',
    longDescription:
      'Pray in desperate straits. Works once in a while — over-use angers your god.',
    bindings: [{ send: '#pray\n', label: '#pray', layout: 'ext' }],
  },
  {
    id: 'chat',
    label: 'Chat',
    group: 'extended',
    description: 'Talk to a shopkeeper or peaceful NPC.',
    bindings: [{ send: '#chat\n', label: '#chat', layout: 'ext' }],
  },
  {
    id: 'sit',
    label: 'Sit',
    group: 'extended',
    description: 'Sit on a throne, sink, or altar.',
    bindings: [{ send: '#sit\n', label: '#sit', layout: 'ext' }],
  },
  {
    id: 'offer',
    label: 'Offer',
    group: 'extended',
    description: 'Sacrifice a corpse on an altar.',
    bindings: [{ send: '#offer\n', label: '#offer', layout: 'ext' }],
  },
  {
    id: 'rub',
    label: 'Rub',
    group: 'extended',
    description: 'Rub a lamp or touchstone.',
    bindings: [{ send: '#rub\n', label: '#rub', layout: 'ext' }],
  },
  {
    id: 'tip',
    label: 'Tip',
    group: 'extended',
    description: 'Tip a container to dump its contents.',
    bindings: [{ send: '#tip\n', label: '#tip', layout: 'ext' }],
  },
]

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Command[] = [
  {
    id: 'help',
    label: 'Help',
    group: 'meta',
    description: 'Open the in-game help.',
    bindings: [{ send: '?', label: '?', layout: 'universal' }],
  },
  {
    id: 'name',
    label: 'Name',
    group: 'meta',
    description: 'Name your character or pet.',
    bindings: [{ send: 'C', label: 'C', layout: 'universal' }],
  },
  {
    id: 'save',
    label: 'Save',
    group: 'meta',
    description: 'Save and quit. Resumes next time you play.',
    bindings: [{ send: 'S', label: 'S', layout: 'universal' }],
  },
  {
    id: 'stats',
    label: 'Stats',
    group: 'meta',
    description: 'Show your character stats.',
    bindings: [{ send: '\x18', label: '⌃X', layout: 'ctrl' }],
  },
]

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const commands: Command[] = [
  ...movement,
  ...look,
  ...items,
  ...use,
  ...combat,
  ...dungeon,
  ...extended,
  ...meta,
]

export const groupLabels: Record<Group, string> = {
  move: 'Move',
  look: 'Look',
  items: 'Items',
  use: 'Use',
  combat: 'Combat',
  dungeon: 'Dungeon',
  extended: 'Extended',
  meta: 'Meta',
}

export const groupOrder: Group[] = [
  'move',
  'look',
  'items',
  'use',
  'combat',
  'dungeon',
  'extended',
  'meta',
]

/** Find a command by id. Throws if missing — call sites should reference
 *  known ids; a miss is a programming error, not a runtime condition. */
export function getCommand(id: string): Command {
  const cmd = commands.find((c) => c.id === id)
  if (!cmd) throw new Error(`Unknown command id: ${id}`)
  return cmd
}

export function commandsByGroup(group: Group): Command[] {
  return commands.filter((c) => c.group === group)
}
