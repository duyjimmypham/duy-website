/* Exile Catch-Up data registry. Every data file is a plain script that calls one of these. */
window.EXILE = { leagues: {}, changes: [], glossary: {}, notes: {}, images: {}, game: null };

(function (E) {
  // Checks every key first, so a file with a duplicate adds nothing.
  function addAll(store, entries, what) {
    const seen = new Set();
    entries.forEach(([key]) => {
      if (seen.has(key) || Object.prototype.hasOwnProperty.call(store, key)) throw new Error(`Duplicate ${what}: ${key}`);
      seen.add(key);
    });
    entries.forEach(([key, value]) => { store[key] = value; });
  }

  // Each edition's data/game.js sets its game once, right after this file.
  E.setGame = (game) => {
    if (E.game) throw new Error(`Game already set: ${E.game.id}`);
    E.game = game;
  };
  E.addLeague = (league) => addAll(E.leagues, [[league.version, league]], 'league');
  E.addTerms = (terms) => addAll(E.glossary, Object.entries(terms), 'term id');
  E.addNotes = (version, sections) => addAll(E.notes, [[version, sections]], 'notes version');
  E.addImages = (images) => addAll(E.images, Object.entries(images), 'image key');
  E.addChanges = (changes) => {
    const ids = {};
    E.changes.forEach((c) => { ids[c.id] = true; });
    addAll(ids, changes.map((c) => [c.id, true]), 'change id');
    E.changes.push(...changes);
  };
})(window.EXILE);
