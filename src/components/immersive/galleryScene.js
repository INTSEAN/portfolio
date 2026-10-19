import * as THREE from "three";

// One renderer, local assets, and bounded geometry: the gallery stays self-contained.
export function createGalleryScene(host, projects, onSelect, onReady, onUnavailable) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x071017, 0.014);
  const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 130);
  camera.position.set(0, 1, 12);
  const state = { selected: null, paused: false, reducedMotion: false };
  const pointer = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  const clock = new THREE.Clock();
  let disposed = false;
  let dragging = false;
  let moved = false;
  let lastX = 0;
  let startX = 0;
  let startY = 0;
  let pan = 0;
  let hover = null;
  let elapsed = 0;
  const cards = [];
  const disposables = new Set();
  const track = (item) => { disposables.add(item); return item; };
  const sphere = track(new THREE.SphereGeometry(1, 24, 20));
  const capsule = track(new THREE.CapsuleGeometry(1, 1, 6, 16));
  const plant = new THREE.Group();

  scene.add(new THREE.HemisphereLight(0xacc8d8, 0x131b14, 2.8));
  const key = new THREE.DirectionalLight(0xf3e3c7, 3.5);
  key.position.set(-5, 9, 9); scene.add(key);
  const rim = new THREE.PointLight(0x9ac6fc, 100, 30, 1.7);
  rim.position.set(7, 2, 1); scene.add(rim);
  const warm = new THREE.PointLight(0xf1bd78, 45, 20, 2);
  warm.position.set(-8, -2, 4); scene.add(warm);

  // Seeded star positions do not shimmer or jump when React remounts the scene.
  let seed = 7281;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const positions = new Float32Array(700 * 3);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (random() - 0.5) * 90;
    positions[i + 1] = random() * 47 - 10;
    positions[i + 2] = -random() * 70 - 15;
  }
  const starGeometry = track(new THREE.BufferGeometry());
  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(starGeometry, track(new THREE.PointsMaterial({ color: 0xc2d1d7, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false })));
  scene.add(stars);

  const ground = new THREE.Mesh(track(new THREE.PlaneGeometry(100, 100)), track(new THREE.MeshStandardMaterial({ color: 0x07100d, roughness: 0.65, metalness: 0.35 })));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -5.6; scene.add(ground);
  const ringMaterial = track(new THREE.MeshBasicMaterial({ color: 0x748776, transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
  [2.4, 2.55].forEach(radius => {
    const ring = new THREE.Mesh(track(new THREE.RingGeometry(radius, radius + 0.012, 90)), ringMaterial);
    ring.rotation.x = -Math.PI / 2; ring.position.set(0, -5.59, 1); scene.add(ring);
  });

  // A quiet sculptural visitor gives the room human scale without a large model download.
  const visitor = new THREE.Group();
  const fabric = track(new THREE.MeshStandardMaterial({ color: 0x18242a, roughness: 0.94, metalness: 0.02 }));
  const skin = track(new THREE.MeshStandardMaterial({ color: 0x79513d, roughness: 0.72 }));
  const hair = track(new THREE.MeshStandardMaterial({ color: 0x171614, roughness: 1 }));
  const bodyPart = (geometry, material, position, scale, rotation = 0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position); mesh.scale.set(...scale); mesh.rotation.z = rotation; visitor.add(mesh); return mesh;
  };
  bodyPart(sphere, fabric, [0, 2.12, 0], [0.59, 0.87, 0.32]);
  bodyPart(sphere, fabric, [0, 1.4, 0], [0.42, 0.4, 0.28]);
  bodyPart(capsule, skin, [0, 2.93, 0], [0.14, 0.15, 0.14]);
  bodyPart(sphere, skin, [0, 3.3, 0], [0.29, 0.38, 0.29]);
  bodyPart(sphere, hair, [0, 3.45, -0.04], [0.291, 0.25, 0.28]);
  [-1, 1].forEach(side => {
    bodyPart(capsule, fabric, [side * 0.26, 0.73, 0], [0.19, 0.56, 0.2], side * -0.025);
    bodyPart(sphere, fabric, [side * 0.26, 0.08, 0.1], [0.23, 0.12, 0.34]);
    bodyPart(capsule, fabric, [side * 0.64, 2.11, 0], [0.2, 0.3, 0.2], side * 0.14);
    bodyPart(capsule, skin, [side * 0.77, 1.55, 0.03], [0.12, 0.3, 0.13], side * 0.1);
    bodyPart(sphere, skin, [side * 0.82, 1.12, 0.07], [0.12, 0.19, 0.09]);
  });
  visitor.position.set(0, -4.55, 3.6); visitor.rotation.y = Math.PI;
  scene.add(visitor);

  // Thin stems and instanced leaves frame the foreground, keeping draw calls modest.
  const leafGeometry = track(new THREE.SphereGeometry(1, 6, 4));
  const leafMaterial = track(new THREE.MeshStandardMaterial({ color: 0x85937b, roughness: 0.9, side: THREE.DoubleSide }));
  const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, 240);
  const dummy = new THREE.Object3D();
  const stems = [];
  for (let i = 0; i < 30; i++) {
    const x = (i < 15 ? -1 : 1) * (3.2 + random() * 10);
    const z = random() * 6 - 1;
    const height = 0.6 + random() * 2.1;
    const bend = (random() - 0.5) * 1.1;
    stems.push(x, -5.6, z, x + bend, -5.6 + height, z);
    for (let j = 0; j < 8; j++) {
      const t = 0.2 + (j / 8) * 0.8;
      const direction = j % 2 ? 1 : -1;
      dummy.position.set(x + bend * t + direction * 0.1, -5.6 + height * t, z);
      dummy.rotation.set(random(), 0, direction * -0.7);
      dummy.scale.set(0.065, 0.19, 0.018); dummy.updateMatrix(); leaves.setMatrixAt(i * 8 + j, dummy.matrix);
    }
  }
  const stemGeometry = track(new THREE.BufferGeometry());
  stemGeometry.setAttribute("position", new THREE.Float32BufferAttribute(stems, 3));
  plant.add(leaves, new THREE.LineSegments(stemGeometry, track(new THREE.LineBasicMaterial({ color: 0x78826a, transparent: true, opacity: 0.65 }))));
  scene.add(plant);

  const tileGeometry = track(new THREE.PlaneGeometry(7.45, 4.1, 24, 1));
  const vertices = tileGeometry.attributes.position;
  for (let i = 0; i < vertices.count; i++) {
    const angle = vertices.getX(i) / 23;
    vertices.setX(i, Math.sin(angle) * 23);
    vertices.setZ(i, 23 * (1 - Math.cos(angle)));
  }
  vertices.needsUpdate = true; tileGeometry.computeVertexNormals();
  projects.forEach((project, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const theta = (col - 1) * 0.355;
    const home = new THREE.Vector3(Math.sin(theta) * 23, 4.15 - row * 4.55, 13 - Math.cos(theta) * 23);
    const canvas = document.createElement("canvas"); canvas.width = 1280; canvas.height = 704;
    const context = canvas.getContext("2d");
    const texture = track(new THREE.CanvasTexture(canvas)); texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    const draw = (image) => {
      context.fillStyle = "#101719"; context.fillRect(0, 0, 1280, 704);
      if (image) {
        const ratio = Math.max(1280 / image.width, 616 / image.height);
        context.save(); context.beginPath(); context.rect(0, 30, 1280, 616); context.clip();
        context.drawImage(image, (1280 - image.width * ratio) / 2, 30, image.width * ratio, image.height * ratio); context.restore();
      } else {
        const gradient = context.createLinearGradient(0, 0, 1280, 700); gradient.addColorStop(0, "#253c3b"); gradient.addColorStop(1, "#101722");
        context.fillStyle = gradient; context.fillRect(0, 30, 1280, 616);
        context.fillStyle = "#e5e8dd"; context.font = "70px sans-serif"; context.fillText(project.title, 72, 350);
      }
      context.fillStyle = "#1a2425"; context.fillRect(0, 0, 1280, 30);
      context.fillStyle = "#758079";
      [18, 32, 46].forEach(x => { context.beginPath(); context.arc(x, 15, 3, 0, Math.PI * 2); context.fill(); });
      context.fillStyle = "#101719"; context.fillRect(0, 646, 1280, 58);
      context.fillStyle = "#eee9f6"; context.font = "500 28px Centra, sans-serif"; context.fillText(project.title, 24, 683);
      texture.needsUpdate = true;
    };
    draw();
    const image = new Image(); image.onload = () => { if (!disposed) draw(image); }; image.src = project.imgUrl;
    document.fonts.ready.then(() => { if (!disposed) draw(image.complete && image.naturalWidth ? image : null); });
    const mesh = new THREE.Mesh(tileGeometry, track(new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, toneMapped: false })));
    mesh.position.copy(home); mesh.rotation.y = -theta; mesh.userData.index = index;
    cards.push({ mesh, home, theta }); scene.add(mesh);
  });

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.fov = width < 760 ? 54 : 43;
    camera.updateProjectionMatrix(); renderer.setSize(width, height);
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const raycast = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(cards.map(card => card.mesh))[0]?.object.userData.index ?? null;
  };
  const down = event => {
    if (!event.isPrimary || event.button !== 0) return;
    dragging = true; moved = false; lastX = event.clientX; startX = event.clientX; startY = event.clientY; renderer.domElement.setPointerCapture(event.pointerId);
  };
  const move = event => {
    if (!event.isPrimary) return;
    if (dragging) {
      const delta = event.clientX - lastX;
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6) moved = true;
      pan = THREE.MathUtils.clamp(pan - delta * 0.001, -0.4, 0.4); lastX = event.clientX;
    }
    hover = raycast(event);
    host.style.cursor = dragging ? "grabbing" : hover !== null ? "pointer" : "grab";
  };
  const up = event => {
    if (!dragging) return;
    const selected = raycast(event);
    if (!moved && selected !== null) onSelect(selected);
    dragging = false; host.style.cursor = selected !== null ? "pointer" : "grab";
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
  };
  const cancel = () => { dragging = false; moved = false; host.style.cursor = "grab"; };
  const wheel = event => {
    if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) return;
    event.preventDefault();
    pan = THREE.MathUtils.clamp(pan + event.deltaX * 0.00035, -0.4, 0.4);
  };
  const lost = event => { event.preventDefault(); onUnavailable(); };
  const element = renderer.domElement;
  element.addEventListener("pointerdown", down); element.addEventListener("pointermove", move);
  element.addEventListener("pointerup", up); element.addEventListener("pointercancel", cancel);
  element.addEventListener("wheel", wheel, { passive: false }); element.addEventListener("webglcontextlost", lost);
  const target = new THREE.Vector3();
  const selectedPosition = new THREE.Vector3(-1.8, 0.65, 1.6);
  const color = new THREE.Color();
  renderer.setAnimationLoop(() => {
    if (disposed || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!state.paused && !state.reducedMotion) elapsed += dt;
    const damping = state.reducedMotion ? 1 : 1 - Math.exp(-8 * dt);
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - 1.6);
    const visibleWidth = visibleHeight * camera.aspect;
    const focusScale = Math.min(1.52, visibleWidth * 0.88 / 7.45, visibleHeight * 0.78 / 4.1);
    const focusOffset = Math.min(1.8, Math.max(0, (visibleWidth * 0.88 - 7.45 * focusScale) / 2));
    selectedPosition.set(-focusOffset, camera.aspect < 1 ? 1.8 : 0.9, 1.6);
    cards.forEach((card, index) => {
      const focused = state.selected === index;
      target.copy(focused ? selectedPosition : card.home);
      card.mesh.position.lerp(target, damping);
      card.mesh.rotation.y = THREE.MathUtils.lerp(card.mesh.rotation.y, focused ? 0 : -card.theta, damping);
      const size = focused ? focusScale : hover === index && state.selected === null ? 1.025 : 1;
      card.mesh.scale.setScalar(THREE.MathUtils.lerp(card.mesh.scale.x, size, damping));
      color.set(state.selected !== null && !focused ? 0x515966 : 0xffffff); card.mesh.material.color.lerp(color, damping);
    });
    const calm = state.reducedMotion || state.paused;
    const cameraPan = state.selected === null ? pan : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraPan * 3 + (calm || state.selected !== null ? 0 : pointer.x * 0.16), damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1 + (calm ? 0 : pointer.y * 0.1), damping);
    camera.lookAt(cameraPan * 8, 0.15, -10);
    visitor.position.x = THREE.MathUtils.lerp(visitor.position.x, state.selected === null ? 0 : 3.2, damping);
    visitor.rotation.y = Math.PI + Math.sin(elapsed * 0.3) * 0.025;
    visitor.position.y = -4.55 + Math.sin(elapsed * 1.3) * 0.013;
    plant.rotation.z = Math.sin(elapsed * 0.35) * 0.008;
    stars.rotation.y = elapsed * 0.001;
    renderer.render(scene, camera);
  });
  onReady();
  return {
    update(next) {
      if (next.reset || (next.selected !== undefined && next.selected !== state.selected)) { pan = 0; pointer.set(0, 0); }
      Object.assign(state, next);
    },
    dispose() {
      disposed = true; renderer.setAnimationLoop(null); observer.disconnect();
      element.removeEventListener("pointerdown", down); element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up); element.removeEventListener("pointercancel", cancel);
      element.removeEventListener("wheel", wheel); element.removeEventListener("webglcontextlost", lost);
      leaves.dispose(); disposables.forEach(resource => resource.dispose()); renderer.dispose();
      element.remove(); host.style.cursor = "";
    },
  };
}
