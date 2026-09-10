const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(process.argv[2] || __dirname);
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const simulationLicense = fs.readFileSync(path.join(root, 'simulations', 'LICENSE.md'), 'utf8');
const links = [...homepage.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
const launches = links.filter(link => link.startsWith('simulations/'));
assert.equal(launches.length, 3);
assert.equal((homepage.match(/<style\b/g) || []).length, 1);
for (const script of homepage.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
assert(homepage.includes('id="homepage-project"'), 'Homepage must appear in Projects');
assert(homepage.includes('id="boot-screen"'), 'Preserve the desktop boot sequence');
assert(simulationLicense.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), 'Missing shared simulation license');
const jokes = homepage.match(/const trashJokes = (\[[^\n]+\]);/);
assert(jokes, 'Preserve the original trash jokes');
assert.equal(vm.runInNewContext(jokes[1]).length, 6);
for (const href of links) {
  if (!href) continue; // An empty link opens the current homepage.
  if (href.startsWith('#')) {
    assert(homepage.includes(`id="${href.slice(1)}"`), `Missing anchor: ${href}`);
  } else if (!/^(data:|https?:)/.test(href)) {
    let directory = root;
    for (const part of href.split('/')) {
      assert(fs.readdirSync(directory).includes(part), `Missing or incorrectly cased path: ${href}`);
      directory = path.join(directory, part);
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
for (const slug of ['ideal-gas-law', 'electron-configuration', 'build-an-atom']) {
  const html = fs.readFileSync(path.join(root, 'simulations', slug, 'index.html'), 'utf8');
  assert(html.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), `${slug} must use the shared simulation license`);
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
console.log('Release checks passed: links, homepage, atom actions, H–Ca configurations, and gas-law relationships.');
