import * as THREE from 'three';

interface TechKey {
  label: string;
  icon: string;
  color: number;
  row: number;
  col: number;
}

const techs: TechKey[] = [
  { label: 'C#',       icon: 'csharp/csharp-original',           color: 0x68217a, row: 0, col: 0 },
  { label: 'C',        icon: 'c/c-original',                     color: 0x00599c, row: 0, col: 1 },
  { label: 'C++',      icon: 'cplusplus/cplusplus-original',     color: 0x004482, row: 0, col: 2 },
  { label: 'Java',     icon: 'java/java-original',               color: 0xf89820, row: 0, col: 3 },
  { label: 'Python',   icon: 'python/python-original',           color: 0x3776ab, row: 0, col: 4 },
  { label: 'JS',       icon: 'javascript/javascript-original',   color: 0xf7df1e, row: 1, col: 0 },
  { label: 'TS',       icon: 'typescript/typescript-original',   color: 0x3178c6, row: 1, col: 1 },
  { label: 'HTML',     icon: 'html5/html5-original',             color: 0xe34f26, row: 1, col: 2 },
  { label: 'CSS',      icon: 'css3/css3-original',               color: 0x264de4, row: 1, col: 3 },
  { label: 'SQL',      icon: 'postgresql/postgresql-original',   color: 0x00758f, row: 1, col: 4 },
  { label: 'Angular',  icon: 'angular/angular-original',         color: 0xdd0031, row: 2, col: 0 },
  { label: 'Astro',    icon: 'astro/astro-original',             color: 0xff5d01, row: 2, col: 1 },
  { label: 'Spring',   icon: 'spring/spring-original',           color: 0x6db33f, row: 2, col: 2 },
  { label: 'Git',      icon: 'git/git-original',                 color: 0xf05032, row: 2, col: 3 },
  { label: 'Linux',    icon: 'linux/linux-original',             color: 0xfcc624, row: 2, col: 4 },
  { label: 'ASM',      icon: '',                                 color: 0x555555, row: 3, col: 0 },
  { label: 'Tailwind', icon: 'tailwindcss/tailwindcss-original', color: 0x06b6d4, row: 3, col: 1 },
  { label: '.NET',     icon: 'dotnetcore/dotnetcore-original',   color: 0x512bd4, row: 3, col: 2 },
  { label: 'Docker',   icon: 'docker/docker-original',           color: 0x2496ed, row: 3, col: 3 },
  { label: 'Node',     icon: 'nodejs/nodejs-original',           color: 0x339933, row: 3, col: 4 },
];

/**
 * Realistic keycap: tapered trapezoid, wider at bottom, narrower at top,
 * slight concave dish on top surface.
 * Returns geometry with 3 material groups: 0=sides, 1=bottom, 2=top
 */
function createKeycapGeometry(bw: number, bd: number, tw: number, td: number, h: number): THREE.BufferGeometry {
  const hbw = bw/2, hbd = bd/2, htw = tw/2, htd = td/2;
  const dish = 0.035;

  const verts: number[] = [];
  const norms: number[] = [];
  const uvArr: number[] = [];
  const indices: number[] = [];
  let vi = 0;

  function addVert(x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number) {
    verts.push(x, y, z);
    norms.push(nx, ny, nz);
    uvArr.push(u, v);
    return vi++;
  }

  function addTri(a: number, b: number, c: number) { indices.push(a, b, c); }

  // --- SIDE FACES (group 0) ---
  // Each side is a trapezoid. We subdivide each into a grid for smoother shading.
  const sideStart = vi;
  const segs = 4; // subdivisions along height

  // Helper: interpolate between bottom and top edge
  function sideStrip(
    b0: [number,number,number], b1: [number,number,number],
    t0: [number,number,number], t1: [number,number,number],
    nx: number, ny: number, nz: number
  ) {
    const base = vi;
    for (let j = 0; j <= segs; j++) {
      const t = j / segs;
      const x0 = b0[0] + (t0[0]-b0[0])*t, y0 = b0[1] + (t0[1]-b0[1])*t, z0 = b0[2] + (t0[2]-b0[2])*t;
      const x1 = b1[0] + (t1[0]-b1[0])*t, y1 = b1[1] + (t1[1]-b1[1])*t, z1 = b1[2] + (t1[2]-b1[2])*t;
      addVert(x0, y0, z0, nx, ny, nz, 0, t);
      addVert(x1, y1, z1, nx, ny, nz, 1, t);
    }
    for (let j = 0; j < segs; j++) {
      const r = base + j * 2;
      addTri(r, r+1, r+3);
      addTri(r, r+3, r+2);
    }
  }

  // Bottom corners
  const B = [[-hbw,0,-hbd],[hbw,0,-hbd],[hbw,0,hbd],[-hbw,0,hbd]] as [number,number,number][];
  // Top corners
  const T = [[-htw,h,-htd],[htw,h,-htd],[htw,h,htd],[-htw,h,htd]] as [number,number,number][];

  // Front (z negative)
  sideStrip(B[0], B[1], T[0], T[1], 0, 0.15, -1);
  // Right (x positive)
  sideStrip(B[1], B[2], T[1], T[2], 1, 0.15, 0);
  // Back (z positive)
  sideStrip(B[2], B[3], T[2], T[3], 0, 0.15, 1);
  // Left (x negative)
  sideStrip(B[3], B[0], T[3], T[0], -1, 0.15, 0);

  const sideCount = indices.length;

  // --- BOTTOM FACE (group 1) ---
  const bottomStart = indices.length;
  const bi0 = addVert(-hbw, 0, -hbd, 0,-1,0, 0,0);
  const bi1 = addVert( hbw, 0, -hbd, 0,-1,0, 1,0);
  const bi2 = addVert( hbw, 0,  hbd, 0,-1,0, 1,1);
  const bi3 = addVert(-hbw, 0,  hbd, 0,-1,0, 0,1);
  addTri(bi0, bi2, bi1);
  addTri(bi0, bi3, bi2);
  const bottomCount = indices.length - bottomStart;

  // --- TOP FACE (group 2) - subdivided dish ---
  const topStart = indices.length;
  const topSegs = 6;
  const topBase = vi;

  for (let iz = 0; iz <= topSegs; iz++) {
    for (let ix = 0; ix <= topSegs; ix++) {
      const u = ix / topSegs, v = iz / topSegs;
      const x = -htw + u * 2 * htw;
      const z = -htd + v * 2 * htd;
      // Dish: parabolic dip toward center
      const cx = (u - 0.5) * 2, cz = (v - 0.5) * 2;
      const distSq = cx*cx + cz*cz;
      const y = h - dish * (1 - distSq);
      addVert(x, y, z, 0, 1, 0, u, v);
    }
  }

  for (let iz = 0; iz < topSegs; iz++) {
    for (let ix = 0; ix < topSegs; ix++) {
      const a = topBase + iz * (topSegs+1) + ix;
      const b = a + 1;
      const c = a + (topSegs+1);
      const d = c + 1;
      addTri(a, c, b);
      addTri(b, c, d);
    }
  }
  const topCount = indices.length - topStart;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(norms, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2));
  geo.setIndex(indices);

  geo.addGroup(0, sideCount, 0);
  geo.addGroup(bottomStart, bottomCount, 1);
  geo.addGroup(topStart, topCount, 2);

  geo.computeVertexNormals();

  return geo;
}

function makeTopTexture(color: number, label: string, renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const r = (color >> 16) & 0xff, g = (color >> 8) & 0xff, b = color & 0xff;

  const grad = ctx.createRadialGradient(128, 110, 20, 128, 128, 180);
  grad.addColorStop(0, `rgb(${Math.min(r+55,255)},${Math.min(g+55,255)},${Math.min(b+55,255)})`);
  grad.addColorStop(1, `rgb(${r},${g},${b})`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, 256, 256, 16);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(5, 5, 246, 246, 13);
  ctx.stroke();

  const bright = (r * 299 + g * 587 + b * 114) / 1000;
  ctx.fillStyle = bright > 140 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(label, 244, 252);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

function loadIconOnTexture(tex: THREE.CanvasTexture, icon: string, label: string, color: number): Promise<void> {
  return new Promise((resolve) => {
    const canvas = tex.image as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    if (!icon) {
      const r = (color >> 16) & 0xff, g = (color >> 8) & 0xff, b = color & 0xff;
      const bright = (r * 299 + g * 587 + b * 114) / 1000;
      ctx.fillStyle = bright > 140 ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 60px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 118);
      tex.needsUpdate = true;
      return resolve();
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const s = 130, ox = (256-s)/2, oy = (256-s)/2 - 10;
      ctx.drawImage(img, ox, oy, s, s);
      tex.needsUpdate = true;
      resolve();
    };
    img.onerror = () => {
      const r = (color >> 16) & 0xff, g = (color >> 8) & 0xff, b = color & 0xff;
      const bright = (r * 299 + g * 587 + b * 114) / 1000;
      ctx.fillStyle = bright > 140 ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 52px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 118);
      tex.needsUpdate = true;
      resolve();
    };
    img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`;
  });
}

export async function initKeyboard() {
  const container = document.getElementById('keyboard-container');
  const scrollArea = document.getElementById('keyboard-scroll-area');
  const hovLabel = document.getElementById('hovered-key-label');
  if (!container || !scrollArea) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 7, 11);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x9999bb, 1.0));
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
  mainLight.position.set(3, 12, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);
  scene.add(new THREE.DirectionalLight(0x4488ff, 0.4).translateOnAxis(new THREE.Vector3(-5,4,-6).normalize(), 1));
  const underGlow = new THREE.PointLight(0x00f5ff, 0.5, 15);
  underGlow.position.set(0, -2, 3);
  scene.add(underGlow);
  const rimLight = new THREE.PointLight(0x0088ff, 0.5, 20);
  rimLight.position.set(0, 2, 8);
  scene.add(rimLight);

  const keyboard = new THREE.Group();

  // Base plate — visible dark gray
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(10.2, 0.35, 7.5),
    new THREE.MeshStandardMaterial({ color: 0x3d3d3d, metalness: 0.75, roughness: 0.28 })
  );
  base.position.y = -0.55;
  base.receiveShadow = true;
  keyboard.add(base);

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(10.5, 0.45, 7.8),
    new THREE.MeshStandardMaterial({ color: 0x303030, metalness: 0.8, roughness: 0.22, emissive: 0x001122, emissiveIntensity: 0.15 })
  );
  frame.position.y = -0.62;
  keyboard.add(frame);

  // Keycap sizing
  const bottomSize = 1.48;
  const topSize = 1.2;  // ~19% taper
  const keyH = 0.65;
  const gap = 0.2;
  const cols = 5, rows = 4;
  const startX = -((cols-1)*(bottomSize+gap))/2;
  const startZ = -((rows-1)*(bottomSize+gap))/2;

  const keycapGeo = createKeycapGeometry(bottomSize, bottomSize, topSize, topSize, keyH);
  const keyMeshes: THREE.Mesh[] = [];
  const iconPromises: Promise<void>[] = [];

  techs.forEach((tech) => {
    const topTex = makeTopTexture(tech.color, tech.label, renderer);
    const r = (tech.color >> 16) & 0xff, g = (tech.color >> 8) & 0xff, b = tech.color & 0xff;

    const sideMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(Math.max(r-50,0)/255, Math.max(g-50,0)/255, Math.max(b-50,0)/255),
      metalness: 0.35, roughness: 0.5,
    });
    const bottomMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 });
    const topMat = new THREE.MeshStandardMaterial({ map: topTex, metalness: 0.1, roughness: 0.5 });

    const mesh = new THREE.Mesh(keycapGeo, [sideMat, bottomMat, topMat]);
    mesh.castShadow = true;
    mesh.position.set(startX + tech.col*(bottomSize+gap), 0, startZ + tech.row*(bottomSize+gap));
    mesh.userData = { baseY: 0, label: tech.label, color: tech.color };
    keyboard.add(mesh);
    keyMeshes.push(mesh);
    iconPromises.push(loadIconOnTexture(topTex, tech.icon, tech.label, tech.color));
  });

  Promise.all(iconPromises);
  keyboard.rotation.x = -0.35;
  scene.add(keyboard);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-10, -10);
  let hoveredKey: THREE.Mesh | null = null;

  renderer.domElement.addEventListener('mousemove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });
  renderer.domElement.addEventListener('mouseleave', () => {
    mouse.set(-10, -10); hoveredKey = null;
    if (hovLabel) hovLabel.textContent = '';
  });

  let scrollProgress = 0;
  function updateScroll() {
    const rect = scrollArea!.getBoundingClientRect();
    const sh = scrollArea!.offsetHeight - window.innerHeight;
    scrollProgress = Math.max(0, Math.min(1, -rect.top / sh));
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  let animId: number;
  const defRim = new THREE.Color(0x0088ff), defUnder = new THREE.Color(0x00f5ff);

  function animate() {
    animId = requestAnimationFrame(animate);
    keyboard.rotation.x += ((-0.35 + scrollProgress*0.65) - keyboard.rotation.x) * 0.06;
    keyboard.rotation.y += ((scrollProgress * Math.PI * 0.4) - keyboard.rotation.y) * 0.06;

    raycaster.setFromCamera(mouse, camera);
    const its = raycaster.intersectObjects(keyMeshes);
    const prev = hoveredKey;
    hoveredKey = its.length > 0 ? its[0].object as THREE.Mesh : null;
    if (hoveredKey !== prev && hovLabel) hovLabel.textContent = hoveredKey ? hoveredKey.userData.label : '';

    keyMeshes.forEach((m) => {
      const tY = m === hoveredKey ? -0.2 : m.userData.baseY;
      m.position.y += (tY - m.position.y) * 0.15;
    });

    if (hoveredKey) {
      rimLight.color.setHex(hoveredKey.userData.color); rimLight.intensity = 1.5;
      underGlow.color.setHex(hoveredKey.userData.color); underGlow.intensity = 1.0;
    } else {
      rimLight.color.lerp(defRim, 0.05); rimLight.intensity += (0.5 - rimLight.intensity) * 0.05;
      underGlow.color.lerp(defUnder, 0.05); underGlow.intensity += (0.5 - underGlow.intensity) * 0.05;
    }
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);
}