"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Coordinates below are the logo's own (1920 canvas), recentred and scaled. */
const K = 1 / 686;
const px = (x: number) => (x - 960) * K;
const py = (y: number) => (960 - y) * K;

function polygon(points: [number, number][]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? shape.lineTo(px(x), py(y)) : shape.moveTo(px(x), py(y))));
  shape.closePath();
  return shape;
}

/** A band of the logo's ring between two cut edges. */
function ringPiece(
  outer: [[number, number], [number, number]],
  inner: [[number, number], [number, number]]
) {
  const cx = 942;
  const cy = 957;
  const angle = ([x, y]: [number, number]) => Math.atan2(cy - y, x - cx);
  const arc = (from: number, to: number, radius: number) => {
    const out: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const a = from + ((to - from) * i) / 40;
      out.push([cx + Math.cos(a) * radius, cy - Math.sin(a) * radius]);
    }
    return out;
  };
  const sweep = (a: number, b: number) => {
    let end = b;
    while (end > a) end -= Math.PI * 2;
    return end;
  };
  const o0 = angle(outer[0]);
  const i0 = angle(inner[0]);
  const o1 = sweep(o0, angle(outer[1]));
  const i1 = sweep(i0, angle(inner[1]));
  return polygon([...arc(o0, o1, 686), ...arc(i1, i0, 514)]);
}

const PIECES: { shape: () => THREE.Shape; from: [number, number, number]; spin: [number, number] }[] = [
  {
    shape: () => ringPiece([[258, 980], [1017, 275]], [[452, 800], [822, 457]]),
    from: [-1.5, 1.5, 1.2],
    spin: [0.9, -1.4],
  },
  {
    shape: () =>
      polygon([[1246, 276], [1574, 276], [631, 1152], [1123, 1646], [806, 1646], [307, 1147]]),
    from: [3.2, 0, 1.8],
    spin: [0.2, 1.8],
  },
  {
    shape: () => polygon([[1019, 1004], [1661, 1646], [1344, 1646], [856, 1158]]),
    from: [1.4, -2.2, 1],
    spin: [-1.2, 0.8],
  },
  {
    shape: () => ringPiece([[1500, 558], [1534, 1303]], [[1373, 677], [1407, 1177]]),
    from: [2.2, 1, -1.4],
    spin: [0.6, 1.5],
  },
];

const VIOLET = new THREE.Color("#8b54ff");
const STEEL = new THREE.Color("#4a84b4");
const GREEN = new THREE.Color("#00c06a");
const brandColor = (t: number, out = new THREE.Color()) =>
  t < 0.5 ? out.lerpColors(VIOLET, STEEL, t * 2) : out.lerpColors(STEEL, GREEN, t * 2 - 1);

function roundedRect(half: number, radius: number) {
  const shape = new THREE.Shape();
  const a = half - radius;
  shape.moveTo(-a, -half);
  shape.lineTo(a, -half);
  shape.absarc(a, -a, radius, -Math.PI / 2, 0, false);
  shape.lineTo(half, a);
  shape.absarc(a, a, radius, 0, Math.PI / 2, false);
  shape.lineTo(-a, half);
  shape.absarc(-a, a, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(-half, -a);
  shape.absarc(-a, -a, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
}

/** Soft-box studio: white from the front, brand colours from the sides. */
function studio(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e6dffa");
  const box = (
    color: string,
    power: number,
    size: [number, number],
    at: [number, number, number]
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...size),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(power),
        side: THREE.DoubleSide,
      })
    );
    mesh.position.set(...at);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };
  box("#ffc93c", 2.2, [4, 8], [7, 0, 2]);
  box("#2dd4a4", 1.8, [4, 8], [-7, 0, 2]);
  box("#ffffff", 7, [8, 3], [0, 7, 3]);
  box("#ffffff", 5, [6, 4], [2, 3, 8]);
  box("#a78bfa", 1.6, [9, 3], [0, -7, 2]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.035).texture;
  pmrem.dispose();
  scene.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  return env;
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 4);

export default function MarkScene({ onReady }: { onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const ready = useRef(onReady);

  useEffect(() => {
    ready.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the static mark behind this stays.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#6d28d9", 8, 15);
    const env = studio(renderer);
    scene.environment = env;
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.z = 7.4;

    const key = new THREE.DirectionalLight("#ffffff", 2.1);
    key.position.set(1.5, 2.4, 5);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(small ? 512 : 1024);
    key.shadow.camera.left = key.shadow.camera.bottom = -2.6;
    key.shadow.camera.right = key.shadow.camera.top = 2.6;
    key.shadow.radius = 5;
    key.shadow.normalBias = 0.03;
    scene.add(key, key.target);

    // ── The mark ─────────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    const porcelain = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.06,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 0.75,
    });
    const extrude = {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.022,
      bevelSegments: 5,
      curveSegments: 40,
    };
    const pieces = PIECES.map(({ shape, from, spin }) => {
      const geometry = new THREE.ExtrudeGeometry(shape(), extrude);
      geometry.translate(0, 0, -0.13);
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox!.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);
      const mesh = new THREE.Mesh(geometry, porcelain);
      mesh.position.copy(center);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return { mesh, home: center, from: new THREE.Vector3(...from), spin };
    });

    // Navy tile the mark stands on, as on the company's posts.
    const tileGeometry = new THREE.ExtrudeGeometry(roundedRect(1.37, 0.31), {
      ...extrude,
      depth: 0.2,
    });
    tileGeometry.translate(0, 0, -0.5);
    const tileMaterial = new THREE.MeshPhysicalMaterial({
      color: "#0d0826",
      roughness: 0.55,
      clearcoat: 0.25,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.16,
    });
    const tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.receiveShadow = true;
    group.add(tile);

    const ringShape = roundedRect(1.39, 0.29);
    ringShape.holes.push(roundedRect(1.335, 0.24));
    const ringGeometry = new THREE.ExtrudeGeometry(ringShape, {
      ...extrude,
      depth: 0.1,
      bevelThickness: 0.016,
      bevelSize: 0.012,
    });
    ringGeometry.translate(0, 0, -0.26);
    {
      const pos = ringGeometry.attributes.position;
      const colors = new Float32Array(pos.count * 3);
      const c = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        brandColor((pos.getX(i) + 1.4) / 2.8, c).toArray(colors, i * 3);
      }
      ringGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }
    const ringMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.35,
      roughness: 0.25,
      envMapIntensity: 1.3,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    group.add(ring);

    // ── A current of small chevrons, all heading forward (left) ───────────
    const count = small ? 46 : 110;
    const chevron = new THREE.ExtrudeGeometry(
      (() => {
        const s = new THREE.Shape();
        s.moveTo(0.12, 0.5);
        s.lineTo(0.5, 0.5);
        s.lineTo(-0.12, 0);
        s.lineTo(0.5, -0.5);
        s.lineTo(0.12, -0.5);
        s.lineTo(-0.5, 0);
        s.closePath();
        return s;
      })(),
      { depth: 0.12, bevelEnabled: false }
    );
    const swarmMaterial = new THREE.MeshStandardMaterial({ roughness: 0.5, envMapIntensity: 0.9 });
    const swarm = new THREE.InstancedMesh(chevron, swarmMaterial, count);
    const bits = Array.from({ length: count }, () => {
      const z = -6.5 + Math.random() * 6;
      return {
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 8,
        z,
        size: 0.04 + Math.random() * 0.11,
        speed: 0.25 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
      };
    });
    const PARTY = ["#ffc93c", "#2dd4a4", "#ff7a59", "#22d3ee", "#a78bfa", "#ffffff"].map((c) => new THREE.Color(c));
    bits.forEach((_, i) => swarm.setColorAt(i, PARTY[i % PARTY.length]));
    scene.add(swarm);

    // Glossy balls orbiting the mark.
    const ballGeometry = new THREE.SphereGeometry(1, 40, 32);
    const balls = [
      { color: "#ffb300", size: 0.25, at: [1.5, 1.02, 0.45], speed: 0.7 },
      { color: "#0fc98d", size: 0.16, at: [-1.4, 1.12, 0.4], speed: 0.95 },
      { color: "#ff5630", size: 0.21, at: [-1.3, -1.2, 0.5], speed: 0.8 },
      { color: "#06b9e8", size: 0.12, at: [1.42, -1.02, 0.6], speed: 1.2 },
    ].map(({ color, size, at, speed }, i) => {
      const material = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.42,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.32,
      });
      const mesh = new THREE.Mesh(ballGeometry, material);
      group.add(mesh);
      return { mesh, material, size, at: new THREE.Vector3(...(at as [number, number, number])), speed, phase: i * 1.6 };
    });

    // ── Frame ────────────────────────────────────────────────────────────
    let width = 1;
    let height = 1;
    const base = new THREE.Vector3();
    let baseScale = 1;
    const resize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const worldH = 2 * Math.tan(THREE.MathUtils.degToRad(16)) * camera.position.z;
      const worldW = worldH * camera.aspect;
      if (width >= 1024) {
        base.set(-worldW * 0.235, 0.06, 0);
        baseScale = Math.min(0.94, worldW * 0.128);
      } else {
        base.set(0, worldH * 0.25, 0);
        baseScale = Math.min(0.48, worldW * 0.215);
      }
    };
    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduce) draw(10, 0);
    });
    observer.observe(el);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const dummy = new THREE.Object3D();
    let scrollNow = 0;

    function draw(time: number, dt: number) {
      const target = reduce ? 0 : Math.min(1.2, window.scrollY / Math.max(1, height));
      scrollNow += (target - scrollNow) * Math.min(1, dt * 7);
      const p = scrollNow;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 4);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 4);

      pieces.forEach(({ mesh, home, from, spin }, i) => {
        const arrive = easeOut((time - 0.15 - i * 0.13) / 1.5);
        const away = 1 - arrive;
        const burst = p * 1.25;
        const dir = home.length() > 0.01 ? home.clone().normalize() : new THREE.Vector3(1, 0, 0);
        mesh.position.set(
          home.x + from.x * away + dir.x * burst - burst * 0.5,
          home.y + from.y * away + dir.y * burst,
          home.z + from.z * away + burst * (0.4 + i * 0.25)
        );
        mesh.rotation.set(spin[0] * away + burst * spin[0] * 0.35, spin[1] * away + burst * spin[1] * 0.35, 0);
      });

      const ringIn = easeOut((time - 0.7) / 1.5);
      ring.scale.setScalar(0.6 + 0.4 * ringIn + p * 0.5);
      ring.rotation.z = (1 - ringIn) * -1.2 - p * 0.35;
      ring.rotation.y = (1 - ringIn) * 2.4;

      group.position.set(base.x - p * 0.8, base.y + Math.sin(time * 0.8) * 0.06 + p * 0.5, 0);
      group.scale.setScalar(baseScale);
      group.rotation.y = -0.2 + pointer.x * 0.36 + Math.sin(time * 0.45) * 0.1 + p * 0.6;
      group.rotation.x = 0.08 + pointer.y * 0.26;
      key.target.position.copy(group.position);
      key.position.set(group.position.x + 1.2 + pointer.x * 2, group.position.y + 2.2 - pointer.y * 1.6, 5);

      const tileIn = easeOut((time - 0.05) / 1.3);
      tile.scale.setScalar(0.5 + 0.5 * tileIn + p * 0.12);
      tile.rotation.z = (1 - tileIn) * 0.9 + p * 0.25;
      balls.forEach(({ mesh, size, at, speed, phase }, i) => {
        const grow = easeOut((time - 0.9 - i * 0.14) / 1.1);
        mesh.scale.setScalar(size * grow);
        mesh.position.set(
          at.x * (1 + p * 0.7) + Math.cos(time * speed * 0.6 + phase) * 0.07,
          at.y * (1 + p * 0.7) + Math.sin(time * speed + phase) * 0.14,
          at.z + p * 0.8
        );
      });

      bits.forEach((bit, i) => {
        bit.x -= bit.speed * dt * (1 + p * 3);
        if (bit.x < -9) bit.x += 18;
        dummy.position.set(
          bit.x + pointer.x * bit.z * 0.06,
          bit.y + Math.sin(time * 0.6 + bit.phase) * 0.16 - pointer.y * bit.z * 0.04,
          bit.z
        );
        dummy.rotation.set(Math.sin(time * 0.5 + bit.phase) * 0.4, Math.cos(time * 0.4 + bit.phase) * 0.5, 0);
        dummy.scale.setScalar(bit.size);
        dummy.updateMatrix();
        swarm.setMatrixAt(i, dummy.matrix);
      });
      swarm.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }

    // Only runs while the hero is on screen and the tab is visible.
    let frame = 0;
    let last = 0;
    let clock = 0;
    let onScreen = true;
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      clock += dt;
      draw(clock, dt);
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!reduce && onScreen && !document.hidden) frame = requestAnimationFrame(loop);
    };
    // By scroll, not by intersection: the hero is sticky under the page.
    const onScroll = () => {
      const now = window.scrollY < height * 1.1;
      if (now === onScreen) return;
      onScreen = now;
      sync();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);

    if (reduce) draw(10, 0);
    else {
      onScreen = window.scrollY < height * 1.1;
      sync();
    }
    ready.current();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      pieces.forEach(({ mesh }) => mesh.geometry.dispose());
      [ringGeometry, tileGeometry, ballGeometry, chevron].forEach((g) => g.dispose());
      [porcelain, ringMaterial, tileMaterial, swarmMaterial, ...balls.map((x) => x.material)].forEach((m) => m.dispose());
      swarm.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="absolute inset-0" aria-hidden />;
}
