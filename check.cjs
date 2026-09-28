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
assert.equal(launches.length, 5);
assert.equal((homepage.match(/<style\b/g) || []).length, 1);
for (const html of [homepage, desktop]) {
  for (const script of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
  assert(html.includes('@view-transition{navigation:auto}'), 'Preserve page transitions');
}
assert.equal((homepage.match(/class="project"/g) || []).length, 6);
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
for (const slug of ['ideal-gas-law', 'electron-configuration', 'build-an-atom', 'molecular-shape-polarity', 'bond-models']) {
  const html = fs.readFileSync(path.join(root, 'simulations', slug, 'index.html'), 'utf8');
  assert(!/folsom|losrios|chem[ _-]*305/i.test(html), `${slug} has institutional branding`);
  assert(html.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), `${slug} must use the shared simulation license`);
  assert(html.includes('aria-label="Site navigation"'), `${slug} must have site navigation`);
  assert(html.includes('href="../../index.html#teaching"'), `${slug} must link back to the homepage`);
}
const gasScript = gasHtml.match(/<script>([\s\S]*?)<\/script>/)[1];
const modelStart = gasScript.indexOf('const R =');
const modelEnd = gasScript.indexOf('function controlNote');
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
console.log('Release checks passed: links, homepage, atom actions, H–Ca configurations, gas-law relationships, molecular geometry/polarity, and covalent/ionic bonds.');
