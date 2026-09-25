import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight holographic globe with orbiting "knowledge nodes".
 * Absolutely positioned inside its parent; sized to parent to avoid layout shift.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---------- Scene / Camera ----------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090a, 0.06);

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 9.5);

    const GOLD = new THREE.Color(0xd4af37);
    const AMBER = new THREE.Color(0xe5a93c);

    // ---------- Globe group ----------
    const globe = new THREE.Group();
    scene.add(globe);

    // Inner dark core (gives depth behind wireframe)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(2.36, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0c0e11, transparent: true, opacity: 0.85 })
    );
    globe.add(core);

    // Wireframe lat/long shell
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 28, 20),
      new THREE.MeshBasicMaterial({
        color: GOLD,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      })
    );
    globe.add(wire);

    // Surface dot field (simulated "continent" distribution via Fibonacci sphere)
    const dotCount = 1400;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Pseudo landmass: noise-like gating to create clusters
      const n = Math.sin(x * 4.2 + z * 2.1) * Math.cos(y * 5.3 + x * 1.7) + Math.sin(z * 3.3 - y * 2.4) * 0.6;
      const land = n > 0.25;
      const radius = 2.42;
      dotPositions[i * 3] = x * radius;
      dotPositions[i * 3 + 1] = y * radius;
      dotPositions[i * 3 + 2] = z * radius;
      dotSizes[i] = land ? 1 : 0.35;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("aScale", new THREE.BufferAttribute(dotSizes, 1));

    const dotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: AMBER },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.75 + 0.25 * sin(uTime * 1.5 + position.x * 3.0 + position.y * 2.0);
          gl_PointSize = (aScale * 3.2 + 0.6) * uPixelRatio * twinkle * (10.0 / -mv.z);
          // Fade dots facing away from camera
          vec3 nrm = normalize(normalMatrix * normalize(position));
          vAlpha = smoothstep(-0.2, 0.6, nrm.z) * (aScale > 0.5 ? 0.95 : 0.35);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.15, d) * vAlpha;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globe.add(dots);

    // Atmosphere glow (fresnel)
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(2.75, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: GOLD } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float f = pow(1.0 - abs(dot(vNormal, vView)), 3.2);
            gl_FragColor = vec4(uColor, f * 0.55);
          }
        `,
      })
    );
    globe.add(glow);

    // Equator + tilted rings
    const ringMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 });
    const makeRing = (radius: number, tiltX: number, tiltZ: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
      line.rotation.x = tiltX;
      line.rotation.z = tiltZ;
      return line;
    };
    const ringA = makeRing(3.3, 0.35, 0.2);
    const ringB = makeRing(3.9, -0.6, 0.9);
    const ringC = makeRing(4.5, 1.15, -0.4);
    scene.add(ringA, ringB, ringC);

    // ---------- Knowledge nodes (History, Geography, Civics, Economics) ----------
    type Node = {
      pivot: THREE.Group;
      mesh: THREE.Mesh;
      halo: THREE.Sprite;
      speed: number;
    };

    const haloTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255, 225, 150, 1)");
      g.addColorStop(0.3, "rgba(229, 169, 60, 0.6)");
      g.addColorStop(1, "rgba(229, 169, 60, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const t = new THREE.CanvasTexture(c);
      return t;
    })();

    const nodeGeos: THREE.BufferGeometry[] = [
      new THREE.OctahedronGeometry(0.16, 0), // History
      new THREE.IcosahedronGeometry(0.15, 0), // Geography
      new THREE.BoxGeometry(0.22, 0.22, 0.22), // Civics
      new THREE.TetrahedronGeometry(0.19, 0), // Economics
    ];
    const rings = [ringA, ringB, ringC, ringA];
    const radii = [3.3, 3.9, 4.5, 3.3];
    const nodes: Node[] = nodeGeos.map((geo, i) => {
      const pivot = new THREE.Group();
      pivot.rotation.copy(rings[i].rotation);
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: i % 2 ? AMBER : GOLD, wireframe: true, transparent: true, opacity: 0.9 })
      );
      mesh.position.x = radii[i];
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: haloTex, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })
      );
      halo.scale.setScalar(0.7);
      halo.position.copy(mesh.position);
      pivot.add(mesh, halo);
      pivot.rotation.y += (i * Math.PI) / 2;
      scene.add(pivot);
      return { pivot, mesh, halo, speed: 0.12 + i * 0.05 };
    });

    // ---------- Ambient particle field ----------
    const pCount = 500;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 5 + Math.random() * 9;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      pPos[i * 3 + 2] = r * Math.cos(p) - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 0.035,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    // ---------- Interaction ----------
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      dotMat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Pause when off-screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    // ---------- Loop ----------
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const speed = prefersReduced ? 0 : 1;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      globe.rotation.y = t * 0.08 * speed + current.x * 0.35;
      globe.rotation.x = 0.28 + current.y * 0.2;

      ringA.rotation.y = t * 0.05 * speed;
      ringB.rotation.y = -t * 0.04 * speed;
      ringC.rotation.y = t * 0.03 * speed;

      nodes.forEach((n, i) => {
        n.pivot.rotation.y += 0.0025 * (i % 2 ? -1 : 1) * (1 + i * 0.25) * speed;
        n.mesh.rotation.x += 0.01;
        n.mesh.rotation.y += 0.014;
        const s = 0.6 + 0.15 * Math.sin(t * 2 + i);
        n.halo.scale.setScalar(s);
      });

      particles.rotation.y = t * 0.012 * speed;
      dotMat.uniforms.uTime.value = t;

      camera.position.x += (current.x * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-current.y * 0.4 + 0.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const m = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m.dispose();
        }
        if (obj instanceof THREE.Sprite) obj.material.dispose();
      });
      haloTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
