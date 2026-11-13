/* Exile Catch-Up logic: the schema's word lists and pure functions, shared by app.js and the Node tests. */
(function () {
  const STYLES = {
    maps: 'I run maps',
    bosses: 'I fight endgame bosses',
    crafting: 'I craft gear',
    trade: 'I care about currency and trade',
    mercenary: 'I use a mercenary',
    leveling: 'I mostly play the campaign',
    party: 'I play with friends',
    ruthless: 'I play Ruthless',
  };
  const AREAS = {
    league: 'New league', maps: 'Maps and Atlas', build: 'Your build', economy: 'Economy and loot',
    crafting: 'Crafting', bosses: 'Bosses', qol: 'Quality of life',
  };
  const KINDS = { new: 'New', removed: 'Removed', buff: 'Buff', nerf: 'Nerf', changed: 'Changed' };
  const VERDICTS = { do: 'Do this', know: 'Know this', skip: "Skip unless it's your build" };
  const TAG_PREFIXES = { skill: 'Skills', asc: 'Ascendancies', unique: 'Uniques', support: 'Supports' };
  const TERM_KINDS = {
    system: 'Systems', mechanic: 'Mechanics', league: 'Leagues and modes', currency: 'Currency', item: 'Items',
    boss: 'Bosses', npc: 'Characters', skill: 'Skills', stat: 'Stats',
  };
  const TERM_STATUSES = { new: 'New', removed: 'Removed', changed: 'Changed', unchanged: 'Unchanged' };
  const PACK = '3.29';

  const MARKUP = /\[\[([^[\]|]+)\|([^[\]]+)\]\]/g;
  const SMALL_WORDS = new Set(['a', 'an', 'and', 'at', 'for', 'in', 'of', 'on', 'the', 'to', 'with']);

  // "[[scarab|Scarabs]] were" -> [{text: "Scarabs", term: "scarab"}, {text: " were"}]. Everything else stays literal.
  function parseMarkup(text) {
    const s = text == null ? '' : String(text);
    const out = [];
    let last = 0;
    for (const m of s.matchAll(MARKUP)) {
      if (m.index > last) out.push({ text: s.slice(last, m.index) });
      out.push({ text: m[2], term: m[1] });
      last = m.index + m[0].length;
    }
    if (last < s.length) out.push({ text: s.slice(last) });
    return out;
  }

  function plainText(text) {
    return parseMarkup(text).map((part) => part.text).join('');
  }

  function compareVersions(a, b) {
    const x = String(a).split('.').map(Number);
    const y = String(b).split('.').map(Number);
    for (let i = 0; i < Math.max(x.length, y.length); i++) {
      if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
    }
    return 0;
  }

  // The cards that can appear at all: the new league always, the 3.29 catch-up pack only when it is on.
  function available(changes, skipped329) {
    return changes.filter((c) => c.league !== PACK || skipped329);
  }

  function matchesProfile(change, profile) {
    if (change.league === PACK && !profile.skipped329) return false;
    const who = change.who || [];
    return who.includes('all') || who.some((w) => profile.styles.includes(w)) ||
      (change.tags || []).some((t) => profile.tags.includes(t));
  }

  // Older league first, then do, know, skip, then priority 1 to 3, then file order.
  function sortDeck(changes) {
    const verdicts = Object.keys(VERDICTS);
    return changes
      .map((change, index) => ({ change, index }))
      .sort((a, b) => compareVersions(a.change.league, b.change.league) ||
        verdicts.indexOf(a.change.verdict) - verdicts.indexOf(b.change.verdict) ||
        (a.change.priority || 3) - (b.change.priority || 3) ||
        a.index - b.index)
      .map((entry) => entry.change);
  }

  function buildDeck(changes, profile) {
    return sortDeck(changes.filter((c) => matchesProfile(c, profile)));
  }

  function firstUnread(deck, readIds) {
    const i = deck.findIndex((c) => !readIds.has(c.id));
    return i < 0 ? deck.length : i;
  }

  // A tag's name as its cards spell it (the official notes first), so the apostrophe the id lost comes back:
  // "unique:shavronnes-wrappings" -> "Shavronne's Wrappings". Without a capitalised match, title-cased from the id.
  function tagLabel(tag, changes) {
    const words = tag.slice(tag.indexOf(':') + 1).split('-').filter(Boolean);
    const re = new RegExp(`\\b${words.map((w) => w.replace(/s$/, "['’]?s")).join('[ -]+')}\\b`, 'gi');
    for (const c of changes || []) {
      if (!(c.tags || []).includes(tag)) continue;
      const text = (c.sources || []).concat(c.headline, c.before, c.now, c.so).map(plainText).join('\n');
      for (const m of text.matchAll(re)) if (/[A-Z]/.test(m[0][0])) return m[0];
    }
    return words.map((w, i) => (i && SMALL_WORDS.has(w) ? w : w[0].toUpperCase() + w.slice(1))).join(' ');
  }

  // Every word of the query must appear somewhere in the card's text or tags.
  function searchChanges(changes, options) {
    const o = options || {};
    const words = String(o.query || '').toLowerCase().split(/\s+/).filter(Boolean);
    const kinds = o.kinds || [];
    return changes.filter((c) => {
      if (o.league && c.league !== o.league) return false;
      if (kinds.length && !kinds.includes(c.kind)) return false;
      if (!words.length) return true;
      const text = [c.headline, plainText(c.before), plainText(c.now), plainText(c.so)]
        .concat((c.tags || []).map((t) => t + ' ' + tagLabel(t)))
        .join('\n').toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }

  function tagGroups(changes) {
    const tags = new Set();
    changes.forEach((c) => (c.tags || []).forEach((t) => tags.add(t)));
    return Object.keys(TAG_PREFIXES)
      .map((prefix) => ({
        prefix,
        tags: [...tags].filter((t) => t.startsWith(prefix + ':'))
          .map((tag) => ({ tag, label: tagLabel(tag, changes) }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      }))
      .filter((group) => group.tags.length);
  }

  // One regex per glossary: names longest first, so "Orb of Chance" wins over "Orb" at the same spot.
  const matchers = new WeakMap();
  function termMatcher(glossary) {
    const size = Object.keys(glossary).length;
    let matcher = matchers.get(glossary);
    if (matcher && matcher.size === size) return matcher;
    const ids = new Map();
    Object.entries(glossary).forEach(([id, term]) => {
      [term.name].concat(term.aliases || []).forEach((name) => {
        if (name && !ids.has(name)) ids.set(name, id);
      });
    });
    const names = [...ids.keys()].sort((a, b) => b.length - a.length)
      .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = names.length
      ? new RegExp('(?<![\\p{L}\\p{N}])(?:' + names.join('|') + ')(?![\\p{L}\\p{N}])', 'gu')
      : null;
    matcher = { size, ids, re };
    matchers.set(glossary, matcher);
    return matcher;
  }

  // Whole words, case-sensitive, no overlaps. Only the first use of each term in a line is linked.
  function linkTerms(line, glossary) {
    const s = line == null ? '' : String(line);
    const { ids, re } = termMatcher(glossary || {});
    const out = [];
    const used = new Set();
    let last = 0;
    if (re) {
      for (const m of s.matchAll(re)) {
        const id = ids.get(m[0]);
        if (used.has(id)) continue;
        used.add(id);
        if (m.index > last) out.push({ text: s.slice(last, m.index) });
        out.push({ text: m[0], term: id });
        last = m.index + m[0].length;
      }
    }
    if (last < s.length) out.push({ text: s.slice(last) });
    return out;
  }

  function findCards(line, changes) {
    return changes.filter((c) => (c.sources || []).some((s) => s && line.includes(s))).map((c) => c.id);
  }

  // A tag is kept only while a card that can appear carries it, so turning the 3.29 pack off drops its tags.
  function sanitizeProfile(raw, changes) {
    const r = raw && typeof raw === 'object' ? raw : {};
    const skipped329 = r.skipped329 === true;
    const known = new Set();
    available(changes || [], skipped329).forEach((c) => (c.tags || []).forEach((t) => known.add(t)));
    const keep = (list, ok) => (Array.isArray(list) ? [...new Set(list)].filter(ok) : null);
    return {
      styles: keep(r.styles, (s) => Object.hasOwn(STYLES, s)) || ['maps'],
      tags: keep(r.tags, (t) => known.has(t)) || [],
      skipped329,
    };
  }

  const api = {
    STYLES, AREAS, KINDS, VERDICTS, TAG_PREFIXES, TERM_KINDS, TERM_STATUSES, PACK,
    parseMarkup, plainText, compareVersions, available, matchesProfile, sortDeck, buildDeck, firstUnread,
    tagLabel, searchChanges, tagGroups, linkTerms, findCards, sanitizeProfile,
  };
  globalThis.ExileLogic = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
