const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(process.argv[2] || __dirname);
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const links = [...homepage.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
const launches = links.filter(link => link.startsWith('simulations/'));
assert.equal(launches.length, 3);
assert.equal((homepage.match(/<style\b/g) || []).length, 1);
assert(homepage.includes('class="no-script"'), 'Static content must be available before startup');
for (const script of homepage.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
const storageScript = homepage.match(/<script id="desktop-storage">([\s\S]*?)<\/script>/)[1];
const blocked = { window: {} };
Object.defineProperty(blocked, 'localStorage', { get() { throw Error('Unavailable'); } });
vm.runInNewContext(storageScript, blocked);
const storage = blocked.window.desktopStorage;
assert.equal(storage.read('missing', 'fallback'), 'fallback');
assert.equal(storage.write('duy-notes', 'A note'), false);
assert.equal(storage.read('duy-notes'), 'A note');
for (const malformed of ['null', '[]', '{bad', '{"todo":false,"doing":[null,4,"keep"],"done":{}}']) {
  storage.write('duy-tasks', malformed);
  const tasks = storage.readTasks();
  for (const column of ['todo', 'doing', 'done']) assert(tasks[column].every(item => typeof item === 'string'));
}
assert.deepEqual(Array.from(storage.readTasks().doing), ['keep']);
for (const href of links) {
  if (href.startsWith('#')) {
    assert(homepage.includes(`id="${href.slice(1)}"`), `Missing anchor: ${href}`);
  } else if (!href.startsWith('data:')) {
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
