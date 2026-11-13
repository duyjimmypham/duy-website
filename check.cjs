const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(process.argv[2] || __dirname);
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const desktop = fs.readFileSync(path.join(root, 'retro-desktop.html'), 'utf8');
const simulationLicense = fs.readFileSync(path.join(root, 'simulations', 'LICENSE.md'), 'utf8');
const links = [...homepage.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
const launches = links.filter(link => link.startsWith('simulations/'));
assert.equal(launches.length, 8);
assert.equal((homepage.match(/<style\b/g) || []).length, 1);
for (const html of [homepage, desktop]) {
  for (const [, attributes, contents] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="importmap"/.test(attributes)) JSON.parse(contents);
    else new vm.Script(contents);
  }
  assert(html.includes('@view-transition{navigation:auto}'), 'Preserve page transitions');
}
assert.equal((homepage.match(/<a class="tile"/g) || []).length, 10);
assert.equal((homepage.match(/data-initial="[A-Z]">/g) || []).length, 15);
assert(homepage.includes('Initials.mount()') && !homepage.includes('src="initials.js"'), 'Homepage initials must ship inline');
for (const id of ['about', 'research', 'teaching', 'for-fun', 'arrival', 'typed-description']) {
  assert(homepage.includes(`id="${id}"`), `Missing homepage section: ${id}`);
}
assert(homepage.includes('<h1>Duy Pham</h1>'), 'Homepage name must be immediately readable');
assert(!/mascot|·|&middot;|&#(?:183|x0*b7);/i.test(homepage), 'Homepage must omit mascots and middle-dot separators');
assert(homepage.includes('href="retro-desktop.html"'), 'Homepage must link to the desktop');
assert(!homepage.includes('Compare the first version'), 'Do not publish mockup comparison links');
assert(desktop.includes('id="homepage-project" href="index.html"'), 'Desktop must link back to the homepage');
assert(desktop.includes('id="boot-screen"'), 'Preserve the desktop boot sequence');
assert(simulationLicense.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), 'Missing shared simulation license');
const jokes = desktop.match(/const trashJokes = (\[[^\n]+\]);/);
assert(jokes, 'Preserve the original trash jokes');
assert.equal(vm.runInNewContext(jokes[1]).length, 6);
for (const html of [homepage, desktop]) {
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      assert(html.includes(`id="${href.slice(1)}"`), `Missing anchor: ${href}`);
    } else if (!/^(data:|https?:|mailto:)/.test(href)) {
      let directory = root;
      for (const part of href.split('/')) {
        assert(fs.readdirSync(directory).includes(part), `Missing or incorrectly cased path: ${href}`);
        directory = path.join(directory, part);
      }
    }
  }
}

function loadModel(slug, id, exportName) {
  const html = fs.readFileSync(path.join(root, 'simulations', slug, 'index.html'), 'utf8');
  const script = html.match(new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`));
  assert(script, `Missing model: ${slug}`);
  const context = { window: {} };
  vm.runInNewContext(script[1], context);
  return context.window[exportName];
}
const atom = loadModel('build-an-atom', 'build-atom-model', 'buildAtomModel');
let state = atom.createState();
state = atom.reduce(state, { type: 'preset', preset: 'carbon-14' });
assert.equal(atom.getSnapshot(state).isotopeName, 'Carbon-14');
assert.equal(atom.getSnapshot(state).stability, 'unstable');
assert.equal(atom.getSnapshot(state).lewisDots, 4);
assert.equal(atom.getSnapshot({ protons: 3, neutrons: 4, electrons: 2 }).lewisDots, 0);
assert.equal(atom.getSnapshot({ protons: 8, neutrons: 8, electrons: 10 }).lewisDots, 8);
state = atom.reduce(state, { type: 'remove', particle: 'electrons' });
assert.equal(atom.getSnapshot(state).charge, 1);
state = atom.reduce(state, { type: 'undo' });
assert.equal(atom.getSnapshot(state).charge, 0);
state = atom.reduce(state, { type: 'reset' });
assert.equal(atom.getSnapshot(state).element, null);

const electrons = loadModel('electron-configuration', 'electron-config-model', 'electronConfigModel');
assert.equal(Object.keys(electrons.ELEMENTS).length, 20);
for (const [symbol, element] of Object.entries(electrons.ELEMENTS)) {
  const complete = electrons.getSnapshot(symbol, element.atomicNumber);
  assert.equal(complete.electronCount, element.atomicNumber, symbol);
  assert.equal(complete.notation, element.notation, symbol);
  assert.equal(complete.complete, true, symbol);
  assert.equal(electrons.getSnapshot(symbol, 0).electronCount, 0, symbol);
}
assert.equal(electrons.getSnapshot('Ca', 20).notation, '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²');

const gasHtml = fs.readFileSync(path.join(root, 'simulations/ideal-gas-law/index.html'), 'utf8');
for (const slug of ['ideal-gas-law', 'electron-configuration', 'build-an-atom', 'molecular-shape-polarity', 'bond-models', 'le-chatelier', 'titration', 'acid-base-strength']) {
  const html = fs.readFileSync(path.join(root, 'simulations', slug, 'index.html'), 'utf8');
  assert(!/folsom|losrios|chem[ _-]*305/i.test(html), `${slug} has institutional branding`);
  assert(html.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), `${slug} must use the shared simulation license`);
  assert(html.includes('aria-label="Site navigation"'), `${slug} must have site navigation`);
  assert(html.includes('href="../../index.html#teaching"'), `${slug} must link back to the homepage`);
  // Opt in only without reduced motion, as the homepage does; otherwise returning home aborts the transition.
  const optIns = html.match(/@view-transition\s*\{/g) || [];
  const motionOnly = html.match(/@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{\s*@view-transition\s*\{\s*navigation:\s*auto\s*\}/g) || [];
  assert(optIns.length && optIns.length === motionOnly.length, `${slug} must opt in to page transitions only without reduced motion`);
}
const gasScript = gasHtml.match(/<script>([\s\S]*?)<\/script>/)[1];
const modelStart = gasScript.indexOf('const R =');
const modelEnd = gasScript.indexOf('function updateControls');
assert(modelStart >= 0 && modelEnd > modelStart, 'Gas model boundaries must exist');
const gas = vm.createContext({ document: { getElementById: () => ({ step: '1' }) } });
vm.runInContext(gasScript.slice(modelStart, modelEnd), gas);
for (const [mode, variable, value] of [['boyle', 'V', 10], ['charles', 'T', 450], ['gaylussac', 'T', 450], ['avogadro', 'n', 2], ['ideal', 'V', 30]]) {
  const result = vm.runInContext(`resetState('${mode}'); state.${variable} = ${value}; reconcile('${variable}'); ({...state})`, gas);
  assert(Math.abs(result.P * result.V - result.n * 0.0821 * result.T) < 1e-9, mode);
  if (mode === 'charles' || mode === 'avogadro') assert.equal(result.P, 1, mode);
  if (mode === 'gaylussac') assert.equal(result.V, 20, mode);
}
const molecularHtml = fs.readFileSync(path.join(root, 'simulations/molecular-shape-polarity/index.html'), 'utf8');
const imports = JSON.parse(molecularHtml.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]).imports;
assert.equal(Object.keys(imports).length, 5);
assert(Object.values(imports).every(url => url.startsWith('data:text/javascript;base64,')), 'Molecular modules must be bundled');
assert(molecularHtml.includes('Permission is hereby granted'), 'Preserve the Three.js MIT license');
const molecularCode = Buffer.from(imports['molecule-model'].split(',')[1], 'base64').toString('utf8');
const molecular = vm.runInNewContext(molecularCode.replace(/^export /gm, '') + '\n({molecules, netDipole})');
assert.equal(Object.keys(molecular.molecules).length, 15);
const polar = ['sulfur', 'ammonia', 'water', 'seesaw', 'tshape', 'squarePyramid', 'tshape6'];
for (const [key, model] of Object.entries(molecular.molecules)) {
  assert.equal(model.positions.length + model.lonePairs.length, model.electronDomains, key);
  assert.equal(Math.hypot(...molecular.netDipole(model)) > 1e-8, polar.includes(key), key);
}
const bondHtml = fs.readFileSync(path.join(root, 'simulations/bond-models/index.html'), 'utf8');
const bondScripts = [...bondHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
for (const script of bondScripts) new vm.Script(script);
const bonds = vm.runInNewContext(bondScripts[0] + '; ({ examples, tally })');
const bondExpected = {
  h2: [2, 2, [2, 2], [0, 0]], cl2: [14, 2, [8, 8], [0, 0]],
  o2: [12, 4, [8, 8], [0, 0]], n2: [10, 6, [8, 8], [0, 0]],
  nacl: [8, 0, [0, 8], [1, -1]], mgo: [8, 0, [0, 8], [2, -2]],
  cacl2: [16, 0, [0, 8, 8], [2, -1, -1]],
};
assert.deepEqual(Array.from(bonds.examples, example => example.id).sort(), Object.keys(bondExpected).sort());
for (const example of bonds.examples) {
  const before = bonds.tally(example, false), after = bonds.tally(example, true);
  assert.deepEqual(JSON.parse(JSON.stringify([after.total, after.shared, after.counts, after.charges])), bondExpected[example.id], example.id);
  assert.equal(before.total, after.total, example.id + ': electrons conserved');
}
assert.equal((bondHtml.match(/<style>/g) || []).length, 1);
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(bondHtml), 'Bond models must remain standalone');
const equilibrium = loadModel('le-chatelier', 'equilibrium-model', 'Equilibrium');
for (const key of ['no2', 'hi', 'haber']) {
  const start = equilibrium.create(key);
  assert(Math.abs(Math.log(equilibrium.Q(start) / equilibrium.K(start))) < 1e-9, key);
}
// Heating favours the endothermic direction: K rises for N₂O₄ ⇌ 2 NO₂ and falls for the Haber process.
assert(equilibrium.Kc(equilibrium.reactions.no2, 373.15) > equilibrium.Kc(equilibrium.reactions.no2, 298.15));
assert(equilibrium.Kc(equilibrium.reactions.haber, 873.15) < equilibrium.Kc(equilibrium.reactions.haber, 773.15));
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(fs.readFileSync(path.join(root, 'simulations/le-chatelier/index.html'), 'utf8')), 'Le Chatelier must remain standalone');
// Titration: its images ship beside the page, and the endpoint is the first lasting pink at 25.05 mL.
const titrationHtml = fs.readFileSync(path.join(root, 'simulations/titration/index.html'), 'utf8');
const titrationImages = [...titrationHtml.matchAll(/(?:href|src)="((?:realistic\/)?[\w-]+\.webp)"/g)].map(match => match[1]);
assert.equal(new Set(titrationImages).size, 7, 'Titration images');
for (const image of titrationImages) {
  let directory = path.join(root, 'simulations', 'titration');
  for (const part of image.split('/')) {
    assert(fs.readdirSync(directory).includes(part), `Missing or incorrectly cased titration image: ${image}`);
    directory = path.join(directory, part);
  }
}
const titration = vm.createContext({});
for (const id of ['chemistry', 'indicators']) vm.runInContext(titrationHtml.match(new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`))[1], titration);
const titrationAt = volume => vm.runInContext(`(() => { const { pH } = solutionAt(${volume}, 'hcl'); return { pH, state: indicators.phenolphthalein.appearance(pH, ${volume}).state }; })()`, titration);
assert(Math.abs(titrationAt(25.05).pH - 9.9995663577) < 1e-6 && titrationAt(25.05).state === 'faint pink', 'Titration endpoint');
assert.equal(titrationAt(25).state, 'colorless', 'Titration equivalence stays colorless');
// Acid and base strength: at 0.10 M a strong solute ionizes completely and a weak one rests at 1 of 75.
const acids = loadModel('acid-base-strength', 'acid-base-model', 'AcidBase');
for (const [key, intact, ion, left] of [['strongAcid', 'HCl', 'hydronium', 0], ['weakAcid', 'acetic', 'hydronium', 74], ['strongBase', null, 'hydroxide', 0], ['weakBase', 'ammonia', 'hydroxide', 74]]) {
  const sim = acids.create(key);
  acids.add(sim);
  for (let step = 0; step < 60 * 240; step++) acids.step(sim, 1 / 60);
  assert.equal(intact ? acids.count(sim, intact) : acids.solid(sim), left, key);
  assert.equal(acids.count(sim, ion), 75 - left, key);
}
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(fs.readFileSync(path.join(root, 'simulations/acid-base-strength/index.html'), 'utf8')), 'Acid and base strength must remain standalone');
// Exile Catch-Up, both editions: every file a page and its image list name ships with it, each links home,
// and the patch-note sources (which hold third-party text) are never published.
assert(homepage.includes('href="exile-catch-up/index.html"'), 'Homepage must link to Exile Catch-Up');
const chooser = fs.readFileSync(path.join(root, 'exile-catch-up/index.html'), 'utf8');
for (const href of ['poe1.html', 'poe2/index.html', '../index.html#for-fun']) assert(chooser.includes(`href="${href}"`), `Exile Catch-Up chooser must link to ${href}`);
for (const [edition, file, home] of [['exile-catch-up', 'poe1.html', '../index.html#for-fun'], ['exile-catch-up/poe2', 'index.html', '../../index.html#for-fun']]) {
  const editionRoot = path.join(root, edition);
  const page = fs.readFileSync(path.join(editionRoot, file), 'utf8');
  assert(page.includes(`href="${home}"`), `${edition} must link back to the homepage`);
  assert(!fs.existsSync(path.join(editionRoot, 'sources')), `${edition} must not publish its sources`);
  const editionFiles = [...page.matchAll(/(?:href|src)="(?!https?:|#)([^"#]+)/g)].map(match => match[1])
    .concat([...fs.readFileSync(path.join(editionRoot, 'data/images.js'), 'utf8').matchAll(/img\('([^']+)'/g)].map(match => `assets/img/${match[1]}`));
  assert(editionFiles.length > 50, `${edition} files`);
  for (const file of editionFiles) assert(fs.existsSync(path.join(editionRoot, file)), `Missing ${edition} file: ${file}`);
}
console.log('Release checks passed: links, homepage, atom actions, H–Ca configurations, gas-law relationships, molecular geometry/polarity, covalent/ionic bonds, Le Chatelier equilibria, the titration endpoint, and acid and base strength.');
