/* Exile Catch-Up: this edition's game. logic.js and app.js read every game-specific word and version from here. */
EXILE.setGame({
  id: 'poe2', // matches <html data-game> in poe2/index.html
  name: 'Path of Exile 2',
  label: 'PoE 2', // in the edition switch
  storageKey: 'exile-catch-up-poe2',
  recapTitle: 'Previously in Wraeclast',
  // "How do you play?", in order. Card `who` uses these keys.
  styles: {
    maps: 'I run maps',
    bosses: 'I fight pinnacle bosses',
    crafting: 'I craft gear',
    trade: 'I care about currency and trade',
    leveling: 'I mostly play the campaign',
    trials: 'I run the Trials',
    party: 'I play with friends',
    controller: 'I play on controller or console',
  },
  defaultStyles: ['maps'],
  areas: {
    league: 'Leagues', atlas: 'Endgame and Atlas', build: 'Your build', crafting: 'Crafting and loot',
    bosses: 'Bosses', campaign: 'Campaign and Trials', qol: 'Quality of life',
  },
  // In lists, a change with no picture of its own shows the emblem of its area (image keys from data/images.js).
  areaArt: {
    league: 'term:remnant', atlas: 'term:waystone', build: 'term:skill-gem', crafting: 'term:exalted-orb',
    bosses: 'term:arbiter-of-divinity', campaign: 'term:trial-of-the-sekhemas', qol: 'term:gold',
  },
  // PoE2 skills are tied to weapon types, so a weapon is a build choice. "class" is for class-wide changes.
  tagPrefixes: { skill: 'Skills', asc: 'Ascendancies', class: 'Classes', weapon: 'Weapons', unique: 'Uniques', support: 'Supports' },
  // The patch before this one: its cards are the catch-up pack for players who skipped it. null for none.
  pack: '0.4',
  other: { label: 'PoE 1', href: '../poe1.html' },
});
