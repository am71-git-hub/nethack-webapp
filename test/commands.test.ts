import { describe, expect, it } from 'vitest'
import {
  commands,
  commandsByGroup,
  getCommand,
  groupLabels,
  groupOrder,
  type BindingLayout,
  type Command,
} from '../src/ui/commands'

describe('commands registry', () => {
  it('has commands', () => {
    expect(commands.length).toBeGreaterThan(30)
  })

  it('every command has required fields', () => {
    for (const cmd of commands) {
      expect(cmd.id).toBeTruthy()
      expect(cmd.label).toBeTruthy()
      expect(cmd.description).toBeTruthy()
      expect(cmd.group).toBeTruthy()
      expect(cmd.bindings.length).toBeGreaterThan(0)
      for (const b of cmd.bindings) {
        expect(b.send, `${cmd.id} binding missing send`).toBeTruthy()
        expect(b.label, `${cmd.id} binding missing label`).toBeTruthy()
        expect(b.layout, `${cmd.id} binding missing layout`).toBeTruthy()
      }
    }
  })

  it('ids are unique', () => {
    const ids = commands.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('no two commands share a binding within the same layout', () => {
    // Collisions within a layout mean the same keystroke would mean two
    // different things — that's a bug in the registry. Across layouts is
    // fine ('l' means east in vi, nothing in numpad).
    const byLayout: Record<BindingLayout, Map<string, string>> = {
      numpad: new Map(),
      vi: new Map(),
      ctrl: new Map(),
      ext: new Map(),
      universal: new Map(),
    }
    for (const cmd of commands) {
      for (const b of cmd.bindings) {
        const existing = byLayout[b.layout].get(b.send)
        expect(
          existing,
          `conflict in ${b.layout}: ${cmd.id} and ${existing} both send ${JSON.stringify(b.send)}`,
        ).toBeUndefined()
        byLayout[b.layout].set(b.send, cmd.id)
      }
    }
  })

  it('universal bindings do not conflict with layout-specific ones either', () => {
    // A 'universal' binding like `i` for inventory must not also be a numpad
    // or vi key for a different command.
    const universalSends = new Set(
      commands.flatMap((c) => c.bindings.filter((b) => b.layout === 'universal').map((b) => b.send)),
    )
    for (const cmd of commands) {
      for (const b of cmd.bindings) {
        if (b.layout === 'universal') continue
        if (universalSends.has(b.send)) {
          const universalOwner = commands.find((c) =>
            c.bindings.some((bb) => bb.layout === 'universal' && bb.send === b.send),
          )
          if (universalOwner?.id !== cmd.id) {
            throw new Error(
              `${cmd.id} (${b.layout}) sends ${JSON.stringify(b.send)} which is already universal for ${universalOwner?.id}`,
            )
          }
        }
      }
    }
  })

  it('groupOrder covers every group used by commands', () => {
    const used = new Set(commands.map((c) => c.group))
    for (const g of used) {
      expect(groupOrder).toContain(g)
    }
  })

  it('groupLabels has a label for every group in groupOrder', () => {
    for (const g of groupOrder) {
      expect(groupLabels[g]).toBeTruthy()
    }
  })

  it('commandsByGroup partitions commands', () => {
    const total = groupOrder.reduce((n, g) => n + commandsByGroup(g).length, 0)
    expect(total).toBe(commands.length)
  })

  it('getCommand returns by id and throws on miss', () => {
    const sample: Command = getCommand('inventory')
    expect(sample.label).toBe('Inventory')
    expect(() => getCommand('does-not-exist')).toThrow()
  })

  it('every movement command has both numpad and vi bindings', () => {
    const moves = commandsByGroup('move')
    for (const m of moves) {
      const layouts = m.bindings.map((b) => b.layout)
      expect(layouts, `${m.id} missing numpad`).toContain('numpad')
      expect(layouts, `${m.id} missing vi`).toContain('vi')
    }
  })

  it('extended commands all start with # and end with newline', () => {
    const ext = commandsByGroup('extended')
    for (const e of ext) {
      for (const b of e.bindings) {
        if (b.layout === 'ext') {
          expect(b.send.startsWith('#')).toBe(true)
          expect(b.send.endsWith('\n')).toBe(true)
        }
      }
    }
  })

  it('ctrl bindings send a single control character', () => {
    for (const cmd of commands) {
      for (const b of cmd.bindings) {
        if (b.layout === 'ctrl') {
          expect(b.send.length).toBe(1)
          expect(b.send.charCodeAt(0)).toBeLessThan(0x20)
        }
      }
    }
  })
})
