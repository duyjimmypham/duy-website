const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(process.argv[2] || __dirname);
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const desktop = fs.readFileSync(path.join(root, 'retro-desktop.html'), 'utf8');
const tutoring = fs.readFileSync(path.join(root, 'tutoring.html'), 'utf8');
const simulationLicense = fs.readFileSync(path.join(root, 'simulations', 'LICENSE.md'), 'utf8');
const links = [...homepage.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
const launches = links.filter(link => link.startsWith('simulations/'));
assert.equal(launches.length, 11);
assert.equal((homepage.match(/<style\b/g) || []).length, 1);
for (const html of [homepage, desktop]) {
  for (const [, attributes, contents] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="importmap"/.test(attributes)) JSON.parse(contents);
    else new vm.Script(contents);
  }
  assert(html.includes('@view-transition{navigation:auto}'), 'Preserve page transitions');
}
assert.equal((homepage.match(/<a class="tile"/g) || []).length, 13);
assert.equal((homepage.match(/data-icon="[a-z]+">/g) || []).length, 18);
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
assert(homepage.includes('href="tutoring.html"'), 'Homepage must link to tutoring');
assert(!tutoring.includes('data-placeholder'), 'Fill in the tutoring placeholders before publishing');
assert(simulationLicense.includes('creativecommons.org/licenses/by-nc-sa/4.0/'), 'Missing shared simulation license');
const jokes = desktop.match(/const trashJokes = (\[[^\n]+\]);/);
assert(jokes, 'Preserve the original trash jokes');
assert.equal(vm.runInNewContext(jokes[1]).length, 6);
for (const html of [homepage, desktop, tutoring]) {
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      assert(html.includes(`id="${href.slice(1)}"`), `Missing anchor: ${href}`);
    } else if (!/^(data:|https?:|mailto:)/.test(href)) {
      let directory = root;
      for (const part of href.split('#')[0].split('/')) {
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
for (const slug of ['ideal-gas-law', 'electron-configuration', 'build-an-atom', 'molecular-shape-polarity', 'bond-models', 'le-chatelier', 'titration', 'acid-base-strength', 'buffer', 'nuclear-decay', 'iupac-naming']) {
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
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(fs.readFileSync(path.join(root, 'simulations/buffer/index.html'), 'utf8')), 'Buffers must remain standalone');
// Nuclear decay: every step conserves mass number and atomic number and changes them as its mode says, every
// chain ends at a stable nuclide (or where the data deliberately stops), and uranium-238 reaches lead-206 by the
// textbook 8 alpha and 6 beta decays. A seeded sample of 10,000 nuclei lands within 3σ of half after one half-life.
const nuclear = loadModel('nuclear-decay', 'nuclear-model', 'nuclearModel');
const shifts = { alpha: [-2, -4], 'beta-': [1, 0], 'beta+': [-1, 0], ec: [-1, 0], gamma: [0, 0] };
for (const [key, nuclide] of Object.entries(nuclear.NUCLIDES)) {
  assert(nuclear.ELEMENTS[nuclide.Z], `${key}: element`);
  assert.equal(key.replace(/m$|\*$/, ''), `${nuclear.ELEMENTS[nuclide.Z][0]}-${nuclide.A}`, `${key}: key matches Z and A`);
  if (nuclide.stable || nuclide.more) continue;
  const step = nuclear.decay(key), [dZ, dA] = shifts[nuclide.mode];
  assert(nuclear.NUCLIDES[nuclide.to], `${key}: daughter ${nuclide.to} is listed`);
  assert.equal(step.A[0], step.A[1], `${key}: mass number conserved`);
  assert.equal(step.Z[0], step.Z[1], `${key}: atomic number conserved`);
  assert.deepEqual([step.daughter.Z - nuclide.Z, step.daughter.A - nuclide.A], [dZ, dA], `${key}: ${nuclide.mode} shift`);
  assert(nuclide.mode === 'gamma' ? nuclide.state : step.daughter.key !== key, `${key}: only an excited nucleus emits gamma`);
}
// The band of stability agrees with the nuclide table: 251 stable nuclides, every endpoint among them, no decaying nuclide.
assert.equal(Object.values(nuclear.STABLE_NUCLIDES).flat().length, 251);
for (const [key, nuclide] of Object.entries(nuclear.NUCLIDES)) {
  const listed = (nuclear.STABLE_NUCLIDES[nuclide.Z] || []).includes(nuclide.A) && !nuclide.state;
  assert.equal(listed, !!nuclide.stable, `${key}: stability matches the stable-nuclide list`);
}
for (const [, keys] of nuclear.STARTS) for (const key of keys) {
  const steps = nuclear.chain(key), end = nuclear.NUCLIDES[steps[steps.length - 1].daughter.key];
  assert(end.stable || end.more, `${key}: chain ends`);
}
const uranium = nuclear.chain('U-238'), modeCount = mode => uranium.filter(step => step.mode === mode).length;
assert.equal(uranium[uranium.length - 1].daughter.key, 'Pb-206');
assert.deepEqual([uranium.length, modeCount('alpha'), modeCount('beta-')], [14, 8, 6], 'U-238 series');
for (const [key, product] of Object.entries(nuclear.HALF_LIFE)) assert(nuclear.NUCLIDES[key].half && nuclear.NUCLIDES[product], key);
const decayTimes = nuclear.sample(10000, 12345), half = nuclear.remaining(decayTimes, 1);
assert(Math.abs(half - 5000) < 150, `Half-life sample: ${half} of 10000 left after one half-life`);
assert(Math.abs(nuclear.remaining(decayTimes, 3) - 1250) < 3 * Math.sqrt(10000 * .125 * .875), 'Three half-lives leave an eighth');
assert.equal(nuclear.fraction(2), .25);
assert(Math.abs(nuclear.halfLivesFor(.25) - 2) < 1e-12);
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(fs.readFileSync(path.join(root, 'simulations/nuclear-decay/index.html'), 'utf8')), 'Nuclear decay must remain standalone');
// IUPAC naming: the engine gives the 2013 preferred name for reference structures, including the rules that
// differ from older textbooks, and every tier generates named, drawable, plausible questions whose
// wrong options are never accepted names. (Names were also round-tripped through OPSIN and RDKit offline.)
const iupac = loadModel('iupac-naming', 'iupac-model', 'IupacModel');
const iupacGold = {
  'CC(C)C': '2-methylpropane', 'CCC(CC)CC': '3-ethylpentane', 'CCC(C)(CC)C(C)CC': '3-ethyl-3,4-dimethylhexane',
  'CC(C)CC(CC)CC(C)C': '4-ethyl-2,6-dimethylheptane', 'CCCC(C(C)C)CCC': '4-(propan-2-yl)heptane',
  'CC(Br)CC(C)Cl': '2-bromo-4-chloropentane', 'CC(C)(C)CCl': '1-chloro-2,2-dimethylpropane', 'CCCl': 'chloroethane',
  'FC(F)(F)C(Cl)Br': '2-bromo-2-chloro-1,1,1-trifluoroethane', 'CC1CCCCC1': 'methylcyclohexane',
  'CCC1CCC(C)C1': '1-ethyl-3-methylcyclopentane', 'CCCCCC1CC1': 'pentylcyclopropane', 'C=CC': 'propene',
  'C=CCC': 'but-1-ene', 'C=CC=C': 'buta-1,3-diene', 'CC1CCCC=C1': '3-methylcyclohex-1-ene', 'C1=CCCCC1': 'cyclohexene',
  'C#CCC=C': 'pent-1-en-4-yne', 'CC=CC#C': 'pent-3-en-1-yne', 'CC(C)O': 'propan-2-ol', 'CC(O)CO': 'propane-1,2-diol',
  'OC1CCCCC1': 'cyclohexanol', 'CC1CCCCC1O': '2-methylcyclohexan-1-ol', 'ClCCO': '2-chloroethan-1-ol',
  'OC1C=CCCC1': 'cyclohex-2-en-1-ol', 'OCCC1CCCCC1': '2-cyclohexylethan-1-ol', 'CC=O': 'acetaldehyde',
  'CC(C)C=O': '2-methylpropanal', 'CC(C)=O': 'propan-2-one', 'CC(=O)CC(C)=O': 'pentane-2,4-dione', 'CC(O)=O': 'acetic acid',
  'OC(=O)CC(O)=O': 'propanedioic acid', 'CC(=O)CC(O)=O': '3-oxobutanoic acid', 'NCCC(O)=O': '3-aminopropanoic acid',
  'COC(C)=O': 'methyl acetate', 'CC(C)OC(=O)CCC': 'propan-2-yl butanoate', 'CCCN': 'propan-1-amine',
  'CCN(CC)CC': 'N,N-diethylethanamine', 'CNC(C)=O': 'N-methylacetamide', 'NC(=O)CCO': '3-hydroxypropanamide',
  'C/C=C/C': '(2E)-but-2-ene', 'C/C=C\\C': '(2Z)-but-2-ene', 'Cl/C=C/Cl': '(E)-1,2-dichloroethene',
  'C/C(Cl)=C/C': '(2Z)-2-chlorobut-2-ene', 'C/C=C/C=C/C': '(2E,4E)-hexa-2,4-diene', 'CC/C(Cl)=C/CO': '(2Z)-3-chloropent-2-en-1-ol',
  // Ethers (P-63.2.2) and benzene rings (P-22.1.3, P-62, P-63, P-65, P-66): toluene and anisole are PINs only unsubstituted.
  'CCOC': 'methoxyethane', 'CC(C)(C)OC': '2-methoxy-2-methylpropane', 'COC1CCCCC1': 'methoxycyclohexane', 'COCCO': '2-methoxyethan-1-ol',
  'CC1=CC=CC=C1': 'toluene', 'CC1=CC=C(Cl)C=C1': '1-chloro-4-methylbenzene', 'COC1=CC=CC=C1': 'anisole', 'COC1=CC=C(Cl)C=C1': '1-chloro-4-methoxybenzene',
  'OC1=CC=C(Cl)C=C1': '4-chlorophenol', 'CNC1=CC=CC=C1': 'N-methylaniline', 'OC(=O)C1=CC=C(C)C=C1': '4-methylbenzoic acid',
  'O=CC1=CC=CC=C1': 'benzaldehyde', 'COC(=O)C1=CC=CC=C1': 'methyl benzoate', 'CC(C)C1=CC=CC=C1': '(propan-2-yl)benzene',
  'CC(=O)C1=CC=CC=C1': '1-phenylethan-1-one', 'OCCC1=CC=CC=C1': '2-phenylethan-1-ol',
};
for (const [smiles, expected] of Object.entries(iupacGold)) assert.equal(iupac.name(iupac.fromSmiles(smiles)).text, expected, smiles);
// 2013: the longer chain beats the unsaturated one, which older books would name 2-ethylpent-1-ene; out of scope, so never asked.
assert.throws(() => iupac.name(iupac.fromSmiles('CCC(=C)CCC')), iupac.Unsupported);
assert(!iupac.name(iupac.fromSmiles('CCCCCC1CC1')).sameParentAsOld, 'Ring-versus-chain questions are filtered out');
const butene = iupac.name(iupac.fromSmiles('C/C=C/CC'));
for (const accepted of ['(2E)-pent-2-ene', '(E)-pent-2-ene', 'trans-2-pentene', 'E-pent-2-ene']) assert(iupac.diagnose(butene, accepted).correct, accepted);
assert(/E\/Z/.test(iupac.diagnose(butene, '(2Z)-pent-2-ene').why), 'Flipped E/Z is diagnosed');
assert(/lowest locants/.test(iupac.diagnose(iupac.name(iupac.fromSmiles('CCCC(C)C')), '4-methylpentane').why), 'Wrong numbering is diagnosed');
assert(/longest chain/.test(iupac.diagnose(iupac.name(iupac.fromSmiles('CCC(C)CC(C)CC')), '2-ethyl-4-methylhexane').why), 'Wrong chain is diagnosed');
assert(/alphabetically/.test(iupac.diagnose(iupac.name(iupac.fromSmiles('CC(Cl)C(Br)C')), '2-chloro-3-bromobutane').why), 'Prefix order is diagnosed');
for (const [smiles, accepted] of [['CCOC', 'ethyl methyl ether'], ['CC1=CC=CC=C1C', 'o-xylene'], ['OC1=CC=C(Cl)C=C1', 'p-chlorophenol'], ['CC1=CC=CC=C1', 'methylbenzene']]) {
  assert(iupac.diagnose(iupac.name(iupac.fromSmiles(smiles)), accepted).correct, accepted);
}
assert.equal(iupac.TIERS.length, 15);
for (const tier of iupac.TIERS) {
  const seen = new Set();
  for (let seed = 1; seed <= 25; seed++) {
    const item = iupac.generate(tier.id, seed * 7919, seen);
    assert(item, `${tier.id}: generates`);
    seen.add(item.result.text);
    assert(iupac.plausible(item.mol) && item.result.sameParentAsOld, `${tier.id}: ${item.result.text}`);
    assert.equal(item.result.stereo.marks.length > 0, tier.id === 'stereo', `${tier.id}: E/Z only in its tier`);
    assert(item.mol.atoms.every(a => Number.isFinite(a.x) && Number.isFinite(a.y)), `${tier.id}: drawn`);
    assert(iupac.diagnose(item.result, item.result.text).correct, `${tier.id}: own name accepted`);
    const wrong = iupac.distractors(item.result, 3, iupac.mulberry32(seed));
    assert(wrong.length >= 1, `${tier.id}: ${item.result.text} has wrong options`);
    for (const option of wrong) assert(!iupac.diagnose(item.result, option).correct, `${tier.id}: ${option} must be wrong`);
    // Pick the structure: the other drawings are named, drawn, and never this compound.
    if (seed % 5 === 0) for (const other of iupac.structureChoices(item.result, 3, iupac.mulberry32(seed))) {
      assert(!iupac.diagnose(item.result, other.result.text).correct, `${tier.id}: ${other.result.text} must be another compound`);
      assert(other.mol.atoms.every(a => Number.isFinite(a.x) && Number.isFinite(a.y)), `${tier.id}: other structure drawn`);
    }
  }
}
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(fs.readFileSync(path.join(root, 'simulations/iupac-naming/index.html'), 'utf8')), 'IUPAC naming must remain standalone');
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
console.log('Release checks passed: links, homepage, atom actions, H–Ca configurations, gas-law relationships, molecular geometry/polarity, covalent/ionic bonds, Le Chatelier equilibria, the titration endpoint, acid and base strength, buffers, nuclear decay, and IUPAC naming.');
