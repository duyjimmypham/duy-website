import * as THREE from 'three';
import { GLTFLoader } from './vendor/loaders/GLTFLoader.js';

const viewer = document.querySelector('#molecule-viewer');
const status = document.querySelector('#molecule-status');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

export async function start() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  viewer.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera();
  camera.position.set(0, 0.275, 0.45);
  camera.lookAt(0, 0.075, 0);

  // Broad luminous panels give the ceramic and steel photographic reflections.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x999b96);
  const panels = [
    { at: [-3.5, 5, 4], size: [5, 6], color: 0xfff6e9, power: 4.2 },
    { at: [4, 3, -2], size: [2, 5], color: 0xebf3ff, power: 5 },
    { at: [0, 6, -1], size: [4, 3], color: 0xffffff, power: 2.2 },
    { at: [-1, 1, -5], size: [3, 4], color: 0x202323, power: 1 },
  ];
  for (const panel of panels) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(...panel.size), new THREE.MeshBasicMaterial({
      color: new THREE.Color(panel.color).multiplyScalar(panel.power), side: THREE.DoubleSide,
    }));
    mesh.position.set(...panel.at);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.025, 0.1, 50);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.1;
  pmrem.dispose();
  studio.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });

  const key = new THREE.DirectionalLight(0xfff6eb, 0.4);
  key.position.set(-3, 7, 5);
  key.target.position.set(0, 0.055, 0);
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xe8efff, 0.5);
  fill.position.set(4, 3, -2);
  scene.add(fill);

  // Project the actual geometry onto the floor, attenuating with height.
  // Two Gaussian passes turn that projection into a broad studio contact shadow.
  const shadowTarget = new THREE.WebGLRenderTarget(256, 256);
  const blurTarget = new THREE.WebGLRenderTarget(256, 256, { depthBuffer: false });
  const shadowCamera = new THREE.OrthographicCamera(-0.225, 0.225, 0.225, -0.225, 0.0001, 0.4);
  shadowCamera.position.y = -0.0001;
  shadowCamera.up.set(0, 0, 1);
  shadowCamera.lookAt(0, 1, 0);
  const heightMaterial = new THREE.ShaderMaterial({
    vertexShader: `varying float height;
      void main() {
        height = (modelMatrix * vec4(position, 1.)).y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `varying float height;
      void main() { gl_FragColor = vec4(0., 0., 0., exp(-max(height, 0.) * 35.)); }`,
  });
  const blurMaterial = new THREE.ShaderMaterial({
    uniforms: { map: { value: shadowTarget.texture }, direction: { value: new THREE.Vector2() } },
    vertexShader: `varying vec2 coord;
      void main() { coord = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `uniform sampler2D map; uniform vec2 direction; varying vec2 coord;
      void main() {
        vec4 color = vec4(0.); float weight = 0.;
        for (int i = -16; i <= 16; i++) {
          float w = exp(-float(i * i) / 98.);
          color += texture2D(map, coord + direction * float(i)) * w;
          weight += w;
        }
        gl_FragColor = color / weight;
      }`,
    depthTest: false, depthWrite: false,
  });
  const blurScene = new THREE.Scene();
  blurScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blurMaterial));
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), new THREE.MeshBasicMaterial({
    map: shadowTarget.texture, transparent: true, depthWrite: false, side: THREE.DoubleSide,
  }));
  ground.name = 'TableShadow';
  ground.rotation.x = Math.PI / 2;
  scene.add(ground);

  function updateShadow(lift) {
    ground.visible = false;
    scene.overrideMaterial = heightMaterial;
    renderer.setRenderTarget(shadowTarget);
    renderer.render(scene, shadowCamera);
    scene.overrideMaterial = null;
    const radius = THREE.MathUtils.lerp(0.32, 1.55, lift) / 256;
    for (const [target, input, x, y] of [
      [blurTarget, shadowTarget.texture, radius, 0],
      [shadowTarget, blurTarget.texture, 0, radius],
    ]) {
      blurMaterial.uniforms.map.value = input;
      blurMaterial.uniforms.direction.value.set(x, y);
      renderer.setRenderTarget(target);
      renderer.render(blurScene, shadowCamera);
    }
    renderer.setRenderTarget(null);
    ground.material.opacity = THREE.MathUtils.lerp(0.38, 0.33, lift);
    ground.scale.setScalar(1 + lift * 0.12);
    ground.visible = true;
  }

  const { scene: asset } = await new GLTFLoader().loadAsync(new URL('./assets/methane.glb', import.meta.url).href);
  const molecule = new THREE.Group();
  molecule.name = 'TabletopRig';
  molecule.add(asset);
  scene.add(molecule);

  const rest = new THREE.Quaternion();
  const { rest_height: restHeight, pickup_height: pickupHeight } = asset.getObjectByName('Methane').userData;
  const spheres = [];
  asset.traverse(object => {
    if (object.userData.radius) spheres.push({ center: object.position.clone(), radius: object.userData.radius });
  });
  const point = new THREE.Vector3();
  function contactHeight() {
    return Math.max(...spheres.map(sphere => sphere.radius - point.copy(sphere.center).applyQuaternion(molecule.quaternion).y));
  }
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function hitsObject(event) {
    const bounds = viewer.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(asset, true).length > 0;
  }
  const turn = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const dropRotation = new THREE.Quaternion();
  let state = 'resting';
  let dropHeight = restHeight;
  let dropTime = 0;
  let pointerId = null;
  let lastX = 0;
  let lastY = 0;
  let previousTime = 0;
  let frame = 0;
  let visible = true;
  let ready = false;
  molecule.position.y = restHeight;
  viewer.dataset.state = state;

  function resize() {
    const { width, height } = viewer.getBoundingClientRect();
    const aspect = width / height;
    const halfHeight = Math.max(0.155, 0.122 / aspect);
    Object.assign(camera, { left: -halfHeight * aspect, right: halfHeight * aspect, top: halfHeight, bottom: -halfHeight, near: 0.001, far: 2 });
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    wake();
  }

  function render(time) {
    frame = 0;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
    previousTime = time;
    if (state === 'held') {
      const target = contactHeight() + 0.0003 + pickupHeight;
      molecule.position.y += (target - molecule.position.y) * (1 - Math.exp(-dt * (reducedMotion.matches ? 90 : 18)));
    } else if (state === 'settling') {
      const t = Math.min((time - dropTime) / (reducedMotion.matches ? 120 : 780), 1);
      const rotationT = Math.min(t * 1.45, 1);
      molecule.quaternion.slerpQuaternions(dropRotation, rest, rotationT * rotationT * (3 - 2 * rotationT));
      molecule.position.y = THREE.MathUtils.lerp(dropHeight, restHeight, t * t * (3 - 2 * t));
      if (t === 1) setState('resting');
    }
    // Any dragged orientation stays above the table, including a fast flip.
    molecule.position.y = Math.max(molecule.position.y, contactHeight() + 0.0003);
    const lift = THREE.MathUtils.clamp((molecule.position.y - contactHeight() - 0.0003) / pickupHeight, 0, 1);
    updateShadow(lift);
    renderer.render(scene, camera);
    if (state !== 'resting') wake();
  }

  function wake() {
    if (ready && !frame && visible && !document.hidden) frame = requestAnimationFrame(render);
  }

  function setState(next) {
    state = next;
    viewer.dataset.state = next;
    viewer.setAttribute('aria-pressed', String(next === 'held'));
  }

  function pickUp() {
    setState('held');
    previousTime = performance.now();
    wake();
  }

  function placeDown() {
    if (state !== 'held') return;
    const captured = pointerId;
    pointerId = null;
    if (captured !== null && viewer.hasPointerCapture(captured)) viewer.releasePointerCapture(captured);
    dropRotation.copy(molecule.quaternion);
    dropHeight = molecule.position.y;
    dropTime = performance.now();
    setState('settling');
    wake();
  }

  viewer.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || !hitsObject(event)) return;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    viewer.setPointerCapture(pointerId);
    pickUp();
  });
  viewer.addEventListener('pointermove', event => {
    if (state !== 'held' || event.pointerId !== pointerId) {
      viewer.dataset.hover = String(hitsObject(event));
      return;
    }
    euler.set((event.clientY - lastY) * 0.0048, (event.clientX - lastX) * 0.0048, 0);
    molecule.quaternion.premultiply(turn.setFromEuler(euler)).normalize();
    lastX = event.clientX;
    lastY = event.clientY;
  });
  function release(event) {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    placeDown();
  }
  viewer.addEventListener('pointerup', release);
  viewer.addEventListener('pointercancel', release);
  viewer.addEventListener('lostpointercapture', release);
  viewer.addEventListener('pointerleave', () => { viewer.dataset.hover = 'false'; });
  viewer.addEventListener('keydown', event => {
    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      if (!event.repeat) pickUp();
      return;
    }
    if (event.key === 'Home') { event.preventDefault(); placeDown(); return; }
    const steps = { ArrowLeft: [0, -0.18], ArrowRight: [0, 0.18], ArrowUp: [-0.18, 0], ArrowDown: [0.18, 0] };
    if (!steps[event.key] || state !== 'held') return;
    event.preventDefault();
    euler.set(...steps[event.key], 0);
    molecule.quaternion.premultiply(turn.setFromEuler(euler)).normalize();
  });
  viewer.addEventListener('keyup', event => {
    if ([' ', 'Enter'].includes(event.key)) { event.preventDefault(); placeDown(); }
  });
  viewer.addEventListener('blur', placeDown);
  window.addEventListener('blur', placeDown);
  document.addEventListener('visibilitychange', () => { if (document.hidden) placeDown(); previousTime = 0; wake(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; previousTime = 0; wake(); }).observe(viewer);
  new ResizeObserver(resize).observe(viewer);
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    visible = false;
    viewer.dataset.ready = 'false';
    status.textContent = 'Still view. Reload to interact with the model.';
    viewer.disabled = true;
  });
  resize();
  // Prepare the materials and first shadow/render behind the loading screen.
  await renderer.compileAsync(scene, camera);
  ready = true;
  render(performance.now());
  await new Promise(requestAnimationFrame);
  if (renderer.getContext().isContextLost()) throw new Error('WebGL context lost during startup.');
  viewer.dataset.ready = 'true';
  viewer.disabled = false;
}
