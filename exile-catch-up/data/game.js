/* Exile Catch-Up: this edition's game. logic.js and app.js read every game-specific word and version from here. */
EXILE.setGame({
  id: 'poe1', // matches <html data-game> in poe1.html
  name: 'Path of Exile',
  label: 'PoE 1', // in the edition switch
  storageKey: 'exile-catch-up',
  recapTitle: 'Previously on Wraeclast',
  // "How do you play?", in order. Card `who` uses these keys.
  styles: {
    maps: 'I run maps',
    bosses: 'I fight endgame bosses',
    crafting: 'I craft gear',
    trade: 'I care about currency and trade',
    mercenary: 'I use a mercenary',
    leveling: 'I mostly play the campaign',
    party: 'I play with friends',
    ruthless: 'I play Ruthless',
  },
  defaultStyles: ['maps'],
  areas: {
    league: 'New league', maps: 'Maps and Atlas', build: 'Your build', economy: 'Economy and loot',
    crafting: 'Crafting', bosses: 'Bosses', qol: 'Quality of life',
  },
  // In lists, a change with no picture of its own shows the emblem of its area.
  areaArt: { league: 'term:wickerman', maps: 'term:map', build: 'term:golem', economy: 'term:chaos-orb', crafting: 'term:exalted-orb', bosses: 'term:fragment', qol: 'term:portal-scroll' },
  tagPrefixes: { skill: 'Skills', asc: 'Ascendancies', unique: 'Uniques', support: 'Supports' },
  // The league before this one: its cards are the catch-up pack for players who skipped it. null for none.
  pack: '3.29',
  other: { label: 'PoE 2', href: 'poe2/index.html' },
});
