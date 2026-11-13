/* Exile Catch-Up: renders the hash routes from window.EXILE (data files) with window.ExileLogic. */
(function () {
  'use strict';
  const L = window.ExileLogic;
  const E = window.EXILE;
  const G = E.game;
  const main = document.getElementById('main');
  const PACK = G.pack;

  // ---------- data ----------
  const changes = E.changes;
  const byId = new Map(changes.map((c) => [c.id, c]));
  const newest = (versions) => versions.sort(L.compareVersions).pop() || null;
  const version = newest(Object.keys(E.leagues)) || newest(Object.keys(E.notes)) ||
    newest(changes.map((c) => c.league).filter((v) => v !== PACK));
  const league = E.leagues[version] || null;
  const packCards = changes.filter((c) => c.league === PACK);

  const usedIn = new Map();
  const termsOf = new Map(changes.map((c) => [c.id, []]));
  changes.forEach((c) => ['before', 'now', 'so'].forEach((field) => L.parseMarkup(c[field]).forEach((part) => {
    if (!part.term) return;
    if (!usedIn.has(part.term)) usedIn.set(part.term, new Set());
    usedIn.get(part.term).add(c);
    const ids = termsOf.get(c.id);
    if (Object.hasOwn(E.glossary, part.term) && !ids.includes(part.term)) ids.push(part.term);
  })));
  // In lists, a change with no picture of its own shows the emblem of its area.
  const rowArt = (c) => (Object.hasOwn(E.images, `card:${c.id}`) ? `card:${c.id}` : G.areaArt[c.area] || '');
  const keyArt = E.images[`league:${version}`];
  // An absolute address: a relative one would resolve against styles.css, which the PoE2 page loads from the folder above.
  if (keyArt && keyArt.src) document.documentElement.style.setProperty('--key-art', `url("${new URL(keyArt.src, document.baseURI).href}")`);

  // ---------- storage: optional, the site works without it ----------
  const KEY = G.storageKey;
  let storageWorks = true;
  const saved = (() => {
    let text = null;
    try { text = localStorage.getItem(KEY); } catch (e) { storageWorks = false; }
    try { return JSON.parse(text) || {}; } catch (e) { return {}; }
  })();
  let profile = L.sanitizeProfile(saved.profile, changes, G);
  const read = new Set(Array.isArray(saved.read) ? saved.read.filter((id) => typeof id === 'string') : []);
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ profile, read: [...read] })); } catch (e) { storageWorks = false; }
  }

  const mine = () => L.buildDeck(changes, profile, G);
  const eligible = () => L.available(changes, profile.skippedPack, G);

  // ---------- html helpers: every piece of data text goes through esc() ----------
  const esc = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
  const plural = (n, word) => `${n} ${n === 1 ? word : word + 's'}`;
  // A button is an atomic box, so a line could break between a term and the "." or "'s" touching it.
  // Pieces with no space between them that include a term are kept together on one line.
  function parts(list) {
    const pieces = list.flatMap((p) => (p.term && Object.hasOwn(E.glossary, p.term)
      ? [`<button type="button" class="term" data-term="${esc(p.term)}" aria-haspopup="dialog" aria-expanded="false">${esc(p.text)}</button>`]
      : p.text.split(/(\s+)/).filter(Boolean).map(esc)));
    let html = '';
    let word = [];
    const endWord = () => {
      html += word.length > 1 && word.some((x) => x.startsWith('<button')) ? `<span class="nobr">${word.join('')}</span>` : word.join('');
      word = [];
    };
    pieces.forEach((x) => { if (/^\s/.test(x)) { endWord(); html += x; } else word.push(x); });
    endWord();
    return html;
  }
  const rich = (text) => parts(L.parseMarkup(text));
  const linked = (line) => parts(L.linkTerms(line, E.glossary));
  const cardHref = (c) => `#/card/${encodeURIComponent(c.id)}`;

  const chip = (c, short) => `<span class="chip v-${esc(c.verdict)}">${esc(short && c.verdict === 'skip'
    ? "If it's your build" : L.VERDICTS[c.verdict] || c.verdict)}</span>`;
  const kindLabel = (c) => `<span class="label k-${esc(c.kind)}">${esc(L.KINDS[c.kind] || c.kind)}</span>`;
  const fromPack = (c) => (c.league === PACK ? `<span class="label pack">From ${esc(PACK)}</span>` : '');
  const tick = (c) => (read.has(c.id) ? '<span class="tick">Read</span>' : '');

  // Decorative pictures sit beside text that already names them, so they carry no alt text.
  function picture(key, className, decorative) {
    const image = Object.hasOwn(E.images, key) ? E.images[key] : null;
    return image && image.src
      ? `<span class="${className}" data-pic><img src="${esc(image.src)}" alt="${decorative ? '' : esc(image.alt)}" loading="lazy" decoding="async"></span>`
      : '';
  }

  // A socket never stays empty: with no picture of its own it shows the game's icon (site:fallback), dimmed.
  const socket = (key) => (Object.hasOwn(E.images, key) ? picture(key, 'thumb', true) : picture('site:fallback', 'thumb fallback', true));

  function statusText(term) {
    const word = L.TERM_STATUSES[term.status];
    const label = !word ? '' : term.status === 'unchanged' ? word : `${word} in ${version || 'this league'}`;
    if (!term.statusNote) return label;
    return !label || term.statusNote.startsWith(label) ? term.statusNote : `${label}. ${term.statusNote}`;
  }

  function row(c, withKind) {
    return `<li><a class="row" href="${cardHref(c)}">
      ${chip(c, true)}
      <span class="row-art">${socket(rowArt(c))}</span>
      <span class="row-text">${withKind ? `<span class="row-meta">${kindLabel(c)}${fromPack(c)}</span>` : ''}
        <b>${esc(L.plainText(c.headline))}</b><span class="row-so">${esc(L.plainText(c.so))}</span></span>
      ${tick(c)}</a></li>`;
  }

  // Art frames lean toward the pointer with a moving glare (vanilla-tilt). Not on touch or with reduced motion.
  const canTilt = window.VanillaTilt && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  let tilted = [];
  function tiltArt() {
    if (!canTilt) return;
    tilted.forEach((el) => el.vanillaTilt && el.vanillaTilt.destroy());
    tilted = [...main.querySelectorAll('.key-art, .art')];
    window.VanillaTilt.init(tilted, { max: 6, speed: 600, scale: 1.02, glare: true, 'max-glare': 0.25, gyroscope: false });
  }

  // ---------- router ----------
  const views = { start: viewStart, cards: viewDeck, card: viewDeck, all: viewAll, glossary: viewGlossary, term: viewGlossary, notes: viewNotes };
  const navName = { card: 'cards', term: 'glossary' };
  const titles = { start: 'Start', cards: 'My cards', all: 'All changes', glossary: 'Glossary', notes: 'Full notes' };
  let current = '';

  // On a route change, focus moves to the new heading (or the deep-linked target). Not on first load,
  // so the first Tab still reaches the skip link and the navigation.
  function route(event) {
    closePop(false);
    let path = [];
    try { path = decodeURIComponent(location.hash.slice(1)).split('/').filter(Boolean); } catch (e) { /* malformed hash: go to Start */ }
    let name = path[0];
    if (!Object.hasOwn(views, name)) {
      name = 'start';
      if (location.hash) try { history.replaceState(null, '', '#/start'); } catch (e) { /* sandboxed frame */ }
    }
    current = name;
    const nav = navName[name] || name;
    document.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.dataset.nav === nav) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.title = `${titles[nav]} · ${G.name} · Exile Catch-Up`;
    const target = views[name](path.slice(1).join('/'), name);
    tiltArt();
    window.scrollTo(0, 0);
    const focus = target || (event && main.querySelector('h1'));
    if (focus) {
      if (!focus.hasAttribute('tabindex')) focus.setAttribute('tabindex', '-1');
      focus.focus({ preventScroll: true });
      if (target) target.scrollIntoView({ block: 'start' });
    }
  }

  // ---------- Start ----------
  function viewStart(arg) {
    main.innerHTML = heroHtml() + recapHtml() + nextHtml() + tldrHtml() + profileHtml() +
      '<div class="action-bar"><p class="count" aria-live="polite" data-count></p><a class="btn primary" href="#/cards" data-go></a></div>';
    syncProfile();
    return arg === 'profile' ? document.getElementById('profile') : null;
  }

  function heroHtml() {
    if (!league) {
      return `<header class="stack"><h1 class="display">Exile Catch-Up</h1>
        <p class="lede">The league file has not loaded, so there is no league summary to show.</p></header>`;
    }
    const day = new Date(`${league.launch}T12:00:00`);
    const when = isNaN(day) ? '' : ` · ${new Date() < day ? 'launches' : 'launched'} ${day.toLocaleDateString('en-GB',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
    return `<header class="stack">
      ${picture(`league:${league.version}`, 'key-art')}
      <p class="eyebrow">${esc(G.name)} ${esc(league.version)}${esc(when)}</p>
      <h1 class="display">${esc(league.name)}</h1>
      <p class="lede">${rich(league.oneLine)}</p>
    </header>`;
  }

  function recapHtml() {
    const steps = league && Array.isArray(league.recap) ? league.recap : [];
    if (!steps.length) return '';
    return `<section class="stack" aria-labelledby="recap-h">
      <h2 id="recap-h">${esc(G.recapTitle)}</h2>
      <ol class="recap">${steps.map((s) => `<li${s.version === version ? ' class="now"' : ''}>
        <span class="ver">${esc(s.version)}${s.version === version ? ' · this league' : ''}</span>
        <b>${esc(s.name)}</b>
        <p>${rich(s.oneThing)}</p>
        ${s.version === PACK && packCards.length ? '<button type="button" class="link-btn" data-pack-button aria-pressed="false">I skipped this one</button><span class="quiet" data-pack-note aria-live="polite"></span>' : ''}
      </li>`).join('')}</ol>
    </section>`;
  }

  // What is announced for the patch after this one. Facts only, with their source; there are no cards for it yet.
  function nextHtml() {
    const next = league && league.next;
    if (!next || !Array.isArray(next.points) || !next.points.length) return '';
    const day = new Date(`${next.date}T12:00:00`);
    const when = isNaN(day) ? '' : `, ${day.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    return `<section class="stack notice" aria-labelledby="next-h">
      <h3 id="next-h">Coming next: ${esc(next.name)}${esc(when)}</h3>
      <ul class="lines">${next.points.map((point) => `<li><p>${rich(point)}</p></li>`).join('')}</ul>
      <p class="quiet">These cards cover the game as it is today.${next.sourceUrl
        ? ` Source: <a href="${esc(next.sourceUrl)}" target="_blank" rel="noopener">${esc(next.sourceLabel || next.sourceUrl)}</a>.` : ''}</p>
    </section>`;
  }

  function tldrHtml() {
    let picks = (league && Array.isArray(league.tldr) ? league.tldr : []).map((id) => byId.get(id)).filter(Boolean);
    if (!picks.length) picks = L.sortDeck(changes.filter((c) => c.league !== PACK)).slice(0, 5);
    if (!picks.length) return '';
    return `<section class="stack" aria-labelledby="tldr-h">
      <h2 id="tldr-h">The 60-second version</h2>
      <ul class="rows">${picks.map((c) => row(c, false)).join('')}</ul>
    </section>`;
  }

  function profileHtml() {
    return `<section class="stack profile" id="profile" aria-labelledby="profile-h">
      <h2 id="profile-h">How do you play?</h2>
      <p>Pick what you do. Changes that don't touch you are hidden from your cards.</p>
      ${pickerHtml()}
      ${packCards.length ? `<label class="check"><input type="checkbox" id="pack">
        <span>I skipped last league (${esc(PACK)})<small>Adds <span data-pack-count></span> for how you play, before the ${esc(version || 'new')} ones, marked “From ${esc(PACK)}”.</small></span></label>` : ''}
      ${storageWorks ? '' : '<p class="quiet">This browser is blocking storage, so these choices last only until you close the page.</p>'}
    </section>`;
  }

  // Only styles and tags that a card on offer uses, so every button changes something. Redrawn when the pack toggles.
  function pickerHtml() {
    const pool = eligible();
    const styles = Object.keys(G.styles).filter((key) => pool.some((c) => c.who.includes(key)));
    const groups = L.tagGroups(pool, G);
    return `<div class="stack" data-picker>
      <div class="toggles" role="group" aria-label="How you play">${styles.map((key) =>
        `<button type="button" class="toggle" data-style="${key}" aria-pressed="false">${esc(G.styles[key])}</button>`).join('')}</div>
      ${groups.length ? `<div class="stack build">
        <h3>My build</h3>
        <div class="field"><label for="tag-q">Find a skill, ascendancy or unique</label>
          <input id="tag-q" type="search" autocomplete="off" spellcheck="false"></div>
        <div class="chips picked" data-picked></div>
        <div class="tag-box">${groups.map((g) => `<div class="tag-group">
          <h4 class="label">${esc(G.tagPrefixes[g.prefix])}</h4>
          <div class="chips">${g.tags.map((t) => `<button type="button" class="tag" data-tag="${esc(t.tag)}" aria-pressed="false">${esc(t.label)}</button>`).join('')}</div>
        </div>`).join('')}<p class="quiet" data-no-tag hidden>No skill, ascendancy or unique matches that.</p></div>
        <p class="quiet">Not in the list? Then ${profile.skippedPack ? `neither this patch nor the ${esc(PACK)} cards change` : "this patch didn't change"} it.</p>
      </div>` : ''}
    </div>`;
  }

  function syncProfile() {
    main.querySelectorAll('[data-style]').forEach((b) => b.setAttribute('aria-pressed', profile.styles.includes(b.dataset.style)));
    main.querySelectorAll('[data-tag]').forEach((b) => b.setAttribute('aria-pressed', profile.tags.includes(b.dataset.tag)));
    // The pack adds only the catch-up cards that match how you play.
    const packMine = plural(packCards.filter((c) => L.matchesProfile(c, Object.assign({}, profile, { skippedPack: true }), G)).length, 'catch-up card');
    const box = main.querySelector('#pack');
    if (box) {
      box.checked = profile.skippedPack;
      main.querySelector('[data-pack-count]').textContent = packMine;
    }
    const packButton = main.querySelector('[data-pack-button]');
    if (packButton) {
      packButton.setAttribute('aria-pressed', profile.skippedPack);
      main.querySelector('[data-pack-note]').textContent = profile.skippedPack ? `${packMine} added.` : '';
    }
    // Chosen tags stay in view above the list, whatever the search hides, and each one removes itself.
    const picked = main.querySelector('[data-picked]');
    if (picked) {
      const name = (t) => esc(L.tagLabel(t, changes));
      picked.innerHTML = profile.tags.length ? profile.tags.map((t) => `<button type="button" class="tag" data-untag="${esc(t)}"
        aria-label="Remove ${name(t)}">${name(t)}<span aria-hidden="true"> ✕</span></button>`).join('') +
        '<button type="button" class="link-btn" data-clear-tags>Clear all</button>' : '';
    }
    const deck = mine();
    const total = eligible().length;
    const left = deck.filter((c) => !read.has(c.id)).length;
    const go = main.querySelector('[data-go]');
    main.querySelector('[data-count]').textContent = total
      ? `${deck.length} of ${plural(total, 'change')} ${deck.length === 1 ? 'is' : 'are'} yours. ${deck.filter((c) => c.verdict === 'do').length} need action; those come first.`
      : 'No change files have loaded yet.';
    go.hidden = !deck.length;
    go.textContent = left === deck.length ? `Read my ${plural(deck.length, 'card')}`
      : left ? `Continue, ${left} left` : `Open my cards (all ${deck.length} read)`;
  }

  function setProfile(update) {
    const packToggled = 'skippedPack' in update && update.skippedPack !== profile.skippedPack;
    profile = L.sanitizeProfile(Object.assign({}, profile, update), changes, G);
    save();
    if (packToggled) main.querySelector('[data-picker]').outerHTML = pickerHtml();
    syncProfile();
  }

  const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : list.concat(value));

  // ---------- My cards (the deck) ----------
  let deck = { list: [], i: 0, outside: null };

  function viewDeck(arg, name) {
    const ownDeck = mine();
    if (name === 'card') {
      const target = byId.get(arg);
      if (!target) {
        main.innerHTML = `<section class="stack"><h1 class="display">Not found</h1>
          <p>There is no card called “${esc(arg)}”.</p><p><a href="#/cards">Open my cards</a></p></section>`;
        return null;
      }
      const inDeck = ownDeck.includes(target);
      const list = inDeck ? ownDeck : L.sortDeck(changes.filter((c) => c === target || ownDeck.includes(c)));
      deck = { list, i: list.indexOf(target), outside: inDeck ? null : target.id };
    } else {
      deck = { list: ownDeck, i: L.firstUnread(ownDeck, read), outside: null };
    }
    if (!deck.list.length) {
      main.innerHTML = changes.length
        ? '<section class="stack"><h1 class="display">My cards</h1><p>None of the changes match how you play right now.</p><p><a href="#/start/profile">Change how you play</a></p></section>'
        : '<section class="stack"><h1 class="display">My cards</h1><p>No change files have loaded yet, so there are no cards to read.</p></section>';
      return null;
    }
    main.innerHTML = `<div class="stack">
      <div data-slot></div>
      <div class="deck-bar">
        <div class="meter" aria-hidden="true"><div class="meter-fill"></div></div>
        <button type="button" class="btn" data-back aria-keyshortcuts="ArrowLeft">Back</button>
        <p class="pos"><b data-pos></b> <span data-left></span></p>
        <button type="button" class="btn primary" data-next aria-keyshortcuts="ArrowRight">Got it, next <kbd aria-hidden="true">→</kbd></button>
      </div>
      <p class="sr-only" aria-live="polite" data-say></p>
    </div>`;
    showCard(0);
    return null;
  }

  function showCard(direction) {
    const { list, i } = deck;
    const atEnd = i >= list.length;
    const slot = main.querySelector('[data-slot]');
    slot.innerHTML = atEnd ? endHtml() : cardHtml(list[i]);
    if (direction) slot.lastElementChild.classList.add(direction > 0 ? 'in-next' : 'in-back');
    const left = list.filter((c) => !read.has(c.id)).length;
    main.querySelector('[data-pos]').textContent = atEnd ? 'All done' : `${i + 1} of ${list.length}`;
    const doLeft = list.filter((c) => c.verdict === 'do' && !read.has(c.id)).length;
    // The "Do this" cards come first, so say when the reader can safely stop.
    main.querySelector('[data-left]').textContent = !left ? `all ${list.length} read`
      : doLeft ? `${left} left, ${doLeft} to act on` : `${left} left, none need action`;
    main.querySelector('.meter-fill').style.width = `${(1 - left / list.length) * 100}%`;
    const backButton = main.querySelector('[data-back]');
    const nextButton = main.querySelector('[data-next]');
    const focused = document.activeElement;
    backButton.disabled = i === 0;
    nextButton.hidden = atEnd;
    // Keep keyboard focus when the focused button just disabled or hid itself.
    if ((focused === backButton && backButton.disabled) || (focused === nextButton && atEnd)) {
      (atEnd ? main.querySelector('#end-h') : nextButton).focus();
    }
    if (direction) {
      tiltArt();
      main.querySelector('[data-say]').textContent = atEnd ? "You're caught up." : `Card ${i + 1} of ${list.length}: ${list[i].headline}`;
      if (slot.getBoundingClientRect().top < 0) slot.scrollIntoView({ block: 'start' });
    }
  }

  function cardHtml(c) {
    const key = `card:${c.id}`;
    const art = picture(key, 'art');
    const viz = vizHtml(c);
    // An icon with no chart beside it gets its name, so it reads as an item and not as a gap.
    const name = art && !viz ? `<span class="label pic-name" aria-hidden="true">${esc(E.images[key].alt)}</span>` : '';
    return `${deck.outside === c.id ? '<p class="quiet outside">Not in your cards.</p>' : ''}
    <article class="card v-${esc(c.verdict)}" aria-labelledby="card-h">
      <header class="card-head">
        <div class="card-top">${chip(c)}<span class="label">${esc(G.areas[c.area] || c.area)}</span>${kindLabel(c)}${fromPack(c)}${tick(c)}</div>
        <h1 class="card-h" id="card-h">${esc(L.plainText(c.headline))}</h1>
      </header>
      <div class="card-body">
      <div class="wns">
        <section><h2>Before</h2><p>${rich(c.before)}</p></section>
        <section><h2>Now</h2><p>${rich(c.now)}</p></section>
        <section class="so"><h2>So what${c.soType === 'prediction' ? ' <span class="pred">Prediction</span>' : ''}</h2><p>${rich(c.so)}</p></section>
      </div>
      ${art || viz ? `<div class="pic"${viz ? '' : ' data-pic'}>${art}${viz}${name}</div>` : ''}
      ${wordsHtml(c)}
      ${sourcesHtml(c)}
      </div>
    </article>`;
  }

  // The glossary entries this card uses, so several unfamiliar words can be read at once. Stays open from card to card.
  let wordsOpen = false;
  function wordsHtml(c) {
    const ids = termsOf.get(c.id);
    if (!ids.length) return '';
    return `<details class="words" data-words${wordsOpen ? ' open' : ''}><summary>Words on this card (${ids.length})</summary>
      <ul>${ids.map((id) => `<li><span class="word-art">${socket(`term:${id}`)}</span>
        <div><a href="#/term/${encodeURIComponent(id)}">${esc(E.glossary[id].name)}</a><p>${esc(L.plainText(E.glossary[id].def))}</p></div></li>`).join('')}</ul>
    </details>`;
  }

  function vizHtml(c) {
    const v = c.viz;
    if (!v) return '';
    if (v.type === 'bars' && Array.isArray(v.rows) && v.rows.length) {
      const max = Math.max(...v.rows.map((r) => Number(r.value) || 0)) || 1;
      const tone = c.kind === 'buff' || c.kind === 'nerf' ? ` ${c.kind}` : '';
      return `<figure class="viz"><figcaption>${esc(v.caption)}</figcaption><div class="bars">${v.rows.map((r, i) => `
        <span>${esc(r.label)}</span>
        <span class="track"><span class="fill${i ? tone : ''}" style="width:${((Math.max(0, Number(r.value) || 0) / max) * 100).toFixed(1)}%"></span></span>
        <b class="bar-value">${esc(r.display)}</b>`).join('')}</div></figure>`;
    }
    if (v.type === 'slots' && v.total > 0) {
      const total = Math.min(v.total, 20);
      const labels = Array.isArray(v.labels) ? v.labels : [];
      return `<figure class="viz"><figcaption>${esc(v.caption)}<span class="sr-only">: ${esc(v.filled)} of ${total} filled</span></figcaption>
        <div class="slots${labels.length ? '' : ' bare'}" aria-hidden="true">${Array.from({ length: total }, (_, i) =>
          `<span class="slot${i < v.filled ? ' on' : ''}">${esc(labels[i] || '')}</span>`).join('')}</div></figure>`;
    }
    return '';
  }

  function sourcesHtml(c) {
    const sections = E.notes[c.league] || [];
    const shown = new Set();
    const items = (c.sources || []).map((source) => {
      for (const section of sections) {
        const line = section.lines.find((l) => l.includes(source));
        if (!line) continue;
        if (shown.has(line)) return '';
        shown.add(line);
        const at = line.indexOf(source);
        const quote = line === source ? linked(line)
          : `${linked(line.slice(0, at))}<mark>${linked(source)}</mark>${linked(line.slice(at + source.length))}`;
        const title = c.league === version
          ? `<a href="#/notes/${encodeURIComponent(section.id)}">${esc(section.title)}</a>` : esc(section.title);
        return `<li><span class="label">${title}</span><p>${quote}</p></li>`;
      }
      return `<li><p>${linked(source)}</p></li>`;
    }).join('');
    return items ? `<details class="src"><summary>Show the original patch note</summary><ul>${items}</ul></details>` : '';
  }

  function endHtml() {
    const hidden = eligible().length - mine().length;
    return `<section class="end stack" aria-labelledby="end-h">
      <h1 class="display" id="end-h" tabindex="-1">You're caught up.</h1>
      <p>You read all ${plural(deck.list.length, 'card')}. ${hidden > 0
        ? `${plural(hidden, 'other change')} ${hidden === 1 ? 'is' : 'are'} hidden by how you play.`
        : 'Nothing is hidden by how you play.'}</p>
      <ul class="end-links"><li><a href="#/all">Browse all changes</a></li><li><a href="#/start/profile">Change how you play</a></li></ul>
      <div class="confirm" data-confirm><button type="button" class="btn" data-reset>Start over</button></div>
    </section>`;
  }

  function next() {
    const { list, i } = deck;
    if (i >= list.length) return;
    read.add(list[i].id);
    save();
    const after = list.findIndex((c, j) => j > i && !read.has(c.id));
    const j = after >= 0 ? after : L.firstUnread(list, read);
    deck.i = j;
    showCard(1);
  }

  function back() {
    if (deck.i <= 0) return;
    deck.i -= 1;
    showCard(-1);
  }

  // ---------- All changes ----------
  const allState = { query: '', kinds: [], mine: false, pack: false };

  function viewAll() {
    if (!changes.length) {
      main.innerHTML = '<section class="stack"><h1 class="display">All changes</h1><p>No change files have loaded yet.</p></section>';
      return null;
    }
    const packOn = profile.skippedPack && packCards.length > 0;
    if (!packOn) allState.pack = false;
    main.innerHTML = `<section class="stack">
      <h1 class="display">All changes</h1>
      <div class="stack">
        <div class="field"><label for="all-q">Search the changes</label>
          <input id="all-q" type="search" autocomplete="off" value="${esc(allState.query)}"></div>
        <div class="toggles small" role="group" aria-label="Kind of change">${Object.entries(L.KINDS).map(([key, label]) =>
          `<button type="button" class="toggle" data-kind="${key}" aria-pressed="${allState.kinds.includes(key)}">${label}</button>`).join('')}</div>
        <div class="filter-row">
          <label class="check"><input type="checkbox" id="all-mine"${allState.mine ? ' checked' : ''}><span>Only my cards</span></label>
          ${packOn ? `<div class="seg" role="radiogroup" aria-label="League">
            <label><input type="radio" name="all-league" value="main"${allState.pack ? '' : ' checked'}><span>${esc(version || 'This league')}</span></label>
            <label><input type="radio" name="all-league" value="pack"${allState.pack ? ' checked' : ''}><span>From ${esc(PACK)}</span></label>
          </div>` : ''}
        </div>
      </div>
      <p class="quiet" aria-live="polite" data-count></p>
    </section>
    <div class="results" data-results></div>`;
    renderAll();
    return null;
  }

  function renderAll() {
    const pool = changes.filter((c) => (allState.pack ? c.league === PACK : c.league !== PACK));
    const found = L.sortDeck(L.searchChanges(pool, { query: allState.query, kinds: allState.kinds }))
      .filter((c) => !allState.mine || L.matchesProfile(c, profile, G));
    const filtered = allState.kinds.length > 0 || allState.mine;
    main.querySelector('[data-count]').textContent = found.length === pool.length
      ? `Showing all ${plural(pool.length, 'change')}.` : `Showing ${found.length} of ${plural(pool.length, 'change')}.`;
    const results = main.querySelector('[data-results]');
    if (!found.length) {
      const what = allState.query.trim() ? `No changes match “${allState.query.trim()}”${filtered ? ' with these filters' : ''}.` : 'No changes match these filters.';
      results.innerHTML = `<div class="empty stack"><p>${esc(what)}</p><p><button type="button" class="btn" data-clear-search>Clear search</button></p></div>`;
      return;
    }
    results.innerHTML = Object.keys(G.areas).map((area) => {
      const list = found.filter((c) => c.area === area);
      return list.length ? `<section class="group stack" aria-labelledby="area-${area}">
        <h2 id="area-${area}">${esc(G.areas[area])} <span class="n">${list.length}</span></h2>
        <ul class="rows">${list.map((c) => row(c, true)).join('')}</ul>
      </section>` : '';
    }).join('');
  }

  // ---------- Glossary ----------
  function viewGlossary(arg, name) {
    const entries = Object.entries(E.glossary).sort((a, b) => String(a[1].name).localeCompare(String(b[1].name)));
    if (!entries.length) {
      main.innerHTML = '<section class="stack"><h1 class="display">Glossary</h1><p>No glossary terms have loaded yet.</p></section>';
      return null;
    }
    const wanted = name === 'term' ? arg : '';
    const kinds = Object.keys(L.TERM_KINDS).filter((k) => entries.some(([, t]) => t.kind === k));
    const other = entries.filter(([, t]) => !Object.hasOwn(L.TERM_KINDS, t.kind));
    const groups = kinds.map((k) => [k, L.TERM_KINDS[k], entries.filter(([, t]) => t.kind === k)]);
    if (other.length) groups.push(['other', 'Other', other]);
    main.innerHTML = `<section class="stack">
      <h1 class="display">Glossary</h1>
      ${wanted && !Object.hasOwn(E.glossary, wanted) ? `<p class="notice">There is no glossary entry called “${esc(wanted)}”. Here is the full glossary.</p>` : ''}
      <div class="field"><label for="g-q">Search the glossary</label><input id="g-q" type="search" autocomplete="off" spellcheck="false"></div>
      <nav class="jump" aria-label="Kinds of term">${groups.map(([k, label, list]) =>
        `<button type="button" class="link-btn" data-jump="${k}">${esc(label)} <span class="n">${list.length}</span></button>`).join('')}</nav>
      <p class="quiet" aria-live="polite" data-count>${plural(entries.length, 'term')}.</p>
    </section>
    <div class="results" data-results>${groups.map(([k, label, list]) => `<section class="group stack" data-group id="kind-${k}" aria-labelledby="kind-h-${k}">
      <h2 id="kind-h-${k}">${esc(label)}</h2>
      <div class="tips">${list.map(([id, term]) => termHtml(id, term)).join('')}</div>
    </section>`).join('')}
    <div class="empty stack" data-empty hidden><p data-empty-text></p><p><button type="button" class="btn" data-clear-glossary>Clear search</button></p></div></div>`;
    const entry = wanted && Object.hasOwn(E.glossary, wanted) ? document.getElementById(`term-${wanted}`) : null;
    if (entry) entry.classList.add('hit');
    return entry;
  }

  function termHtml(id, term) {
    // This league's cards first; the deck order would put the catch-up pack ahead of them.
    const cards = L.sortDeck([...(usedIn.get(id) || [])]).sort((a, b) => (a.league === PACK) - (b.league === PACK));
    const link = (c) => `<li><a href="${cardHref(c)}">${esc(L.plainText(c.headline))}</a></li>`;
    const search = [term.name].concat(term.aliases || [], L.plainText(term.def)).join(' ').toLowerCase();
    return `<article class="tip entry" id="term-${esc(id)}" data-search="${esc(search)}" aria-labelledby="tn-${esc(id)}">
      <h3 class="tip-name" id="tn-${esc(id)}">${esc(term.name)}</h3>
      <div class="tip-body">
        ${picture(`term:${id}`, 'tip-icon')}
        <p>${rich(term.def)}</p>
        <p class="tip-status">${esc(statusText(term))}</p>
        ${cards.length ? `<div class="tip-used"><span class="label">Used in</span>
          <ul>${cards.slice(0, 3).map(link).join('')}</ul>
          ${cards.length > 3 ? `<details><summary>${cards.length - 3} more</summary><ul>${cards.slice(3).map(link).join('')}</ul></details>` : ''}
        </div>` : ''}
      </div>
    </article>`;
  }

  function filterGlossary(query) {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    main.querySelectorAll('.entry').forEach((entry) => {
      entry.hidden = !words.every((w) => entry.dataset.search.includes(w));
      if (!entry.hidden) shown += 1;
    });
    main.querySelectorAll('[data-group]').forEach((group) => { group.hidden = !group.querySelector('.entry:not([hidden])'); });
    const total = main.querySelectorAll('.entry').length;
    main.querySelector('[data-count]').textContent = words.length ? `${shown} of ${plural(total, 'term')}.` : `${plural(total, 'term')}.`;
    main.querySelector('[data-empty]').hidden = shown > 0;
    main.querySelector('[data-empty-text]').textContent = `No term matches “${query.trim()}”.`;
  }

  // ---------- Full notes ----------
  function viewNotes(arg) {
    const sections = E.notes[version] || [];
    if (!sections.length) {
      main.innerHTML = '<section class="stack"><h1 class="display">Full patch notes</h1><p>The patch notes have not loaded.</p></section>';
      return null;
    }
    const summaries = (league && league.sections) || {};
    const pool = changes.filter((c) => c.league === version);
    main.innerHTML = `<section class="stack">
      <h1 class="display">Full patch notes</h1>
      <p>The official ${esc(version)}.0 notes, section by section. A plain summary comes first, and the original lines are one tap away.</p>
      ${league ? `<p class="quiet">${league.notesSource ? `The text is from the ${esc(league.notesSource)}. ` : ''}${league.officialUrl
        ? `The league's official page is <a href="${esc(league.officialUrl)}" target="_blank" rel="noopener">${esc(league.officialUrl.replace(/^https?:\/\/(www\.)?/, ''))}</a>.` : ''}</p>` : ''}
      <nav class="toc" aria-label="Sections"><ol>${sections.map((s) =>
        `<li><a href="#/notes/${encodeURIComponent(s.id)}">${esc(s.title)}</a></li>`).join('')}</ol></nav>
    </section>
    ${sections.map((s) => sectionHtml(s, summaries[s.id], pool)).join('')}`;
    const target = arg ? document.getElementById(`sec-${arg}`) : null;
    if (!target) return null;
    target.querySelector('details').open = true;
    return target.querySelector('h2');
  }

  function sectionHtml(section, summary, pool) {
    const items = section.lines.map((line, i) => {
      const sub = section.subheads && section.subheads[i] ? `<li class="sub"><h3>${esc(section.subheads[i])}</h3></li>` : '';
      const ids = L.findCards(line, pool);
      return `${sub}<li><p>${linked(line)}</p>${ids.length ? `<p class="line-cards">${ids.map((id) =>
        `<a href="${cardHref(byId.get(id))}">${esc(L.plainText(byId.get(id).headline))}</a>`).join('')}</p>` : ''}</li>`;
    }).join('');
    return `<section class="note-sec stack" id="sec-${esc(section.id)}" aria-labelledby="h-${esc(section.id)}">
      <h2 id="h-${esc(section.id)}">${esc(section.title)}</h2>
      ${summary ? `<p>${rich(summary)}</p>` : ''}
      <details><summary>Show the ${plural(section.lines.length, 'original line')}</summary><ul class="lines">${items}</ul></details>
    </section>`;
  }

  // ---------- term popover (a dark item tooltip) ----------
  const pop = document.createElement('div');
  pop.className = 'tip pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-labelledby', 'pop-name');
  pop.tabIndex = -1;
  pop.hidden = true;
  document.body.append(pop);
  let popFrom = null;

  function openPop(button) {
    const id = button.dataset.term;
    if (popFrom === button) return closePop(true);
    closePop(false);
    const term = E.glossary[id];
    pop.innerHTML = `<p class="tip-name" id="pop-name">${esc(term.name)}</p>
      <div class="tip-body"><p>${esc(L.plainText(term.def))}</p>
      <p class="tip-status">${esc(statusText(term))}</p>
      <a href="#/term/${encodeURIComponent(id)}">Open in glossary</a></div>`;
    pop.hidden = false;
    popFrom = button;
    button.setAttribute('aria-expanded', 'true');
    placePop();
    pop.focus({ preventScroll: true });
  }

  function placePop() {
    const r = popFrom.getBoundingClientRect();
    const width = pop.offsetWidth;
    const height = pop.offsetHeight;
    const left = Math.max(16, Math.min(r.left + r.width / 2 - width / 2, document.documentElement.clientWidth - 16 - width));
    const below = r.bottom + 8;
    const top = below + height > window.innerHeight - 8 && r.top - height - 8 > 8 ? r.top - height - 8 : below;
    pop.style.left = `${left + window.scrollX}px`;
    pop.style.top = `${top + window.scrollY}px`;
  }

  function closePop(returnFocus) {
    if (!popFrom) return;
    pop.hidden = true;
    popFrom.setAttribute('aria-expanded', 'false');
    if (returnFocus && popFrom.isConnected) popFrom.focus({ preventScroll: true });
    popFrom = null;
  }

  // The popover sits at the end of the page, so Tab out of it goes back to its term: Shift+Tab lands on the
  // term, Tab past the last link moves on from the term.
  pop.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || (!e.shiftKey && document.activeElement !== pop.querySelector('a'))) return;
    closePop(true);
    if (e.shiftKey) e.preventDefault();
  });
  pop.addEventListener('focusout', (e) => {
    if (e.relatedTarget && !pop.contains(e.relatedTarget) && e.relatedTarget !== popFrom) closePop(false);
  });
  window.addEventListener('resize', () => { if (popFrom) placePop(); });

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a');
    if (popFrom && !pop.contains(e.target) && el !== popFrom) closePop(false);
    if (!el) return;
    const data = el.dataset;
    if (el.classList.contains('term')) openPop(el);
    else if (el.classList.contains('skip')) { e.preventDefault(); main.focus(); }
    else if (data.style) setProfile({ styles: toggle(profile.styles, data.style) });
    else if (data.tag) setProfile({ tags: toggle(profile.tags, data.tag) });
    else if (data.untag || 'clearTags' in data) {
      setProfile({ tags: data.untag ? profile.tags.filter((t) => t !== data.untag) : [] });
      (main.querySelector('[data-untag]') || main.querySelector('#tag-q')).focus();
    }
    else if ('packButton' in data) setProfile({ skippedPack: !profile.skippedPack });
    else if ('next' in data) next();
    else if ('back' in data) back();
    else if ('reset' in data) {
      el.parentElement.innerHTML = `<p>Clear the read marks on all your cards and start from the first one?</p>
        <p class="buttons"><button type="button" class="btn danger" data-reset-yes>Clear and start over</button>
        <button type="button" class="btn" data-reset-no>Keep them</button></p>`;
      main.querySelector('[data-reset-no]').focus();
    } else if ('resetNo' in data) {
      el.closest('[data-confirm]').innerHTML = '<button type="button" class="btn" data-reset>Start over</button>';
      main.querySelector('[data-reset]').focus();
    } else if ('resetYes' in data) {
      read.clear();
      save();
      deck.i = 0;
      showCard(-1);
      main.querySelector('[data-next]').focus();
    } else if (data.kind) {
      allState.kinds = toggle(allState.kinds, data.kind);
      el.setAttribute('aria-pressed', allState.kinds.includes(data.kind));
      renderAll();
    } else if ('clearSearch' in data) {
      Object.assign(allState, { query: '', kinds: [], mine: false });
      viewAll();
      main.querySelector('#all-q').focus();
    } else if (data.jump) {
      const heading = document.getElementById(`kind-h-${data.jump}`);
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: 'start' });
    } else if ('clearGlossary' in data) {
      const input = main.querySelector('#g-q');
      input.value = '';
      filterGlossary('');
      input.focus();
    }
  });

  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.id === 'all-q') { allState.query = el.value; renderAll(); }
    else if (el.id === 'g-q') filterGlossary(el.value);
    else if (el.id === 'tag-q') filterTags(el.value);
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.id === 'pack') setProfile({ skippedPack: el.checked });
    else if (el.id === 'all-mine') { allState.mine = el.checked; renderAll(); }
    else if (el.name === 'all-league') { allState.pack = el.value === 'pack'; renderAll(); }
  });

  function filterTags(query) {
    const plainCase = (text) => text.toLowerCase().replace(/['’]/g, '');
    const q = plainCase(query.trim());
    main.querySelectorAll('[data-tag]').forEach((b) => { b.hidden = !plainCase(b.textContent).includes(q); });
    main.querySelectorAll('.tag-group').forEach((g) => { g.hidden = !g.querySelector('[data-tag]:not([hidden])'); });
    main.querySelector('[data-no-tag]').hidden = !!main.querySelector('[data-tag]:not([hidden])');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popFrom) { closePop(true); return; }
    if ((current !== 'cards' && current !== 'card') || popFrom || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); back(); }
  });

  // Swipe left for "Got it, next", right for "Back". Mouse drags are left alone so text can be selected.
  let swipe = null;
  main.addEventListener('pointerdown', (e) => {
    swipe = e.pointerType !== 'mouse' && e.target.closest('.card') ? { x: e.clientX, y: e.clientY } : null;
  });
  main.addEventListener('pointerup', (e) => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < 2 * Math.abs(dy)) return;
    if (dx < 0) next(); else back();
  });
  main.addEventListener('pointercancel', () => { swipe = null; });

  // A missing or broken image hides its frame (and a picture row holding only that frame), so nothing is drawn.
  document.addEventListener('error', (e) => {
    if (e.target.tagName !== 'IMG') return;
    e.target.hidden = true;
    for (let box = e.target.closest('[data-pic]'); box; box = box.parentElement.closest('[data-pic]')) box.hidden = true;
  }, true);

  document.addEventListener('toggle', (e) => { if (e.target.matches('[data-words]')) wordsOpen = e.target.open; }, true);

  document.getElementById('notes-source').textContent = league && league.notesSource
    ? `Patch notes: ${league.notesSource}.` : '';
  // The edition switch beside the brand, in label order so it reads the same in both editions.
  const editions = [[G.label, '#/start', true], [G.other.label, G.other.href, false]].sort((a, b) => a[0].localeCompare(b[0]));
  document.querySelector('.brand').insertAdjacentHTML('afterend', `<div class="editions" role="group" aria-label="Game">${editions.map(([label, href, current]) =>
    `<a href="${esc(href)}"${current ? ' aria-current="true"' : ''}>${esc(label)}</a>`).join('')}</div>`);
  window.addEventListener('hashchange', route);
  route();
})();
