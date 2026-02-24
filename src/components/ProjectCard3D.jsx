// src/components/ProjectCard3D.jsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { load as loadFont } from "opentype.js";

// ── Module-level singletons ───────────────────────────────────────────────
const CARD_SHAPE = (() => {
    const W = 6.6, H = 8.8, R = 0.7, a = W / 2, c = H / 2;
    const s = new THREE.Shape();
    s.moveTo(-a + R, -c);
    s.lineTo(a - R, -c);
    s.absarc(a - R, -c + R, R, -Math.PI / 2, 0, false);
    s.lineTo(a, c - R);
    s.absarc(a - R, c - R, R, 0, Math.PI / 2, false);
    s.lineTo(-a + R, c);
    s.absarc(-a + R, c - R, R, Math.PI / 2, Math.PI, false);
    s.lineTo(-a, -c + R);
    s.absarc(-a + R, -c + R, R, Math.PI, (3 * Math.PI) / 2, false);
    return s;
})();

const EXTRUDE_SETTINGS = {
    depth: 0.25, bevelEnabled: true,
    bevelSize: 0.04, bevelThickness: 0.04,
    bevelSegments: 3, curveSegments: 8,
};

const CARD_GEO = new THREE.ExtrudeGeometry(CARD_SHAPE, EXTRUDE_SETTINGS);

const SHARED_TIME = { value: 0 };

// Pre-computed float values — written once per frame by the FIRST active card
// All other cards just read from this object (no redundant sin/cos calls)
const FLOAT = { y: 0, rx: 0, rz: 0 };

// ── Shared shader materials ───────────────────────────────────────────────
const VERT = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 wPos = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-wPos.xyz);
    gl_Position = projectionMatrix * wPos;
  }
`;

const capFrontMat = new THREE.ShaderMaterial({
    uniforms: { uTime: SHARED_TIME },
    transparent: true, depthWrite: false, side: THREE.FrontSide,
    vertexShader: VERT,
    fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.0);
      float wave    = 0.5 + 0.5 * sin(vUv.y * 6.0 + uTime * 0.8);
      vec3  tint    = mix(vec3(0.35, 0.55, 0.95), vec3(0.65, 0.35, 0.95), wave);
      vec3  base    = mix(vec3(0.85, 0.90, 1.00), tint, 0.25);
      float streak  = 0.35 * smoothstep(0.04, 0.0, abs(vUv.x - 0.72));
      gl_FragColor  = vec4(base + streak, mix(0.18, 0.55, fresnel) + 0.05);
    }
  `,
});

const capBackMat = new THREE.ShaderMaterial({
    uniforms: { uTime: SHARED_TIME },
    transparent: true, depthWrite: false, side: THREE.BackSide,
    vertexShader: VERT,
    fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.0);
      float b   = 0.5 + 0.5 * sin(12.0 * (vUv.x + vUv.y) - 1.3 * uTime);
      vec3  col = mix(vec3(0.10, 0.18, 0.45), vec3(0.55, 0.20, 0.80), b);
      gl_FragColor = vec4(col, mix(0.22, 0.6, fresnel));
    }
  `,
});

const sideMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.4, 0.6, 1.0),
    metalness: 0.1, roughness: 0.05,
    transparent: true, opacity: 0.3, side: THREE.DoubleSide,
});

const TEXT_MAT = new THREE.MeshPhysicalMaterial({
    color: "#ffffff", metalness: 0.2, roughness: 0.1,
    transparent: true, opacity: 0.75,
});

// ── opentype helper ──────────────────────────────────────────────────────
function opentypeToShapes(otPath) {
    const sp = new THREE.ShapePath();
    for (const cmd of otPath.commands) {
        if (cmd.type === "M") sp.moveTo(cmd.x, cmd.y);
        else if (cmd.type === "L") sp.lineTo(cmd.x, cmd.y);
        else if (cmd.type === "C") sp.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        else if (cmd.type === "Q") sp.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        else if (cmd.type === "Z") sp.currentPath.closePath();
    }
    return sp.toShapes(true);
}

// One font fetch, shared across all cards
let fontPromise = null;
function loadSharedFont() {
    if (!fontPromise)
        fontPromise = new Promise(res =>
            loadFont("/fonts/kenpixel.ttf", (err, f) => res(err ? null : f))
        );
    return fontPromise;
}

// ── CardMesh ─────────────────────────────────────────────────────────────
// isLeader = the first card, responsible for updating SHARED_TIME and FLOAT
const CardMesh = ({ index, font, flipped, isLeader, invalidate }) => {
    const groupRef = useRef();
    const currentY = useRef(0);

    const textGeo = useMemo(() => {
        if (!font) return null;
        const text = (index + 1).toString().padStart(2, "0");
        const path = font.getPath(text, 0, 0, 120);
        const geo = new THREE.ExtrudeGeometry(opentypeToShapes(path), {
            depth: 0.04, bevelEnabled: false, curveSegments: 3,
        });
        geo.computeBoundingBox();
        const { min, max } = geo.boundingBox;
        geo.translate(-(min.x + max.x) * 0.5, -(min.y + max.y) * 0.5, 0);
        return geo;
    }, [font, index]);

    useEffect(() => () => textGeo?.dispose(), [textGeo]);

    useFrame(({ clock }, delta) => {
        if (!groupRef.current) return;

        // Leader writes shared values once — followers just read
        if (isLeader) {
            const t = clock.getElapsedTime();
            SHARED_TIME.value = t;
            FLOAT.y = Math.sin(t * 1.2) * 0.18;
            FLOAT.rx = Math.cos(t * 0.9) * 0.06;
            FLOAT.rz = Math.sin(t * 0.65) * 0.04;
            capFrontMat.needsUpdate = false; // uniforms update via reference, no needsUpdate needed
            capBackMat.needsUpdate = false;
        }

        const g = groupRef.current;
        g.position.y = FLOAT.y;
        g.rotation.x = FLOAT.rx;
        g.rotation.z = FLOAT.rz;

        // Delta-time lerp — frame-rate independent flip
        const target = flipped ? Math.PI : 0;
        currentY.current += (target - currentY.current) * Math.min(1, delta * 6);
        g.rotation.y = currentY.current;
    });

    return (
        <group ref={groupRef}>
            <mesh geometry={CARD_GEO}>
                <primitive object={capFrontMat} attach="material-0" />
                <primitive object={sideMat} attach="material-1" />
            </mesh>
            <mesh geometry={CARD_GEO}>
                <primitive object={capBackMat} attach="material-0" />
                <meshBasicMaterial attach="material-1" transparent opacity={0} />
            </mesh>
            {textGeo && (
                <mesh geometry={textGeo} position={[0, 2.8, 0.14]} scale={[0.01, -0.01, 1]}>
                    <primitive object={TEXT_MAT} attach="material" />
                </mesh>
            )}
        </group>
    );
};

// ── CardScene ─────────────────────────────────────────────────────────────
const CardScene = ({ index, font, isLeader }) => {
    const [flipped, setFlipped] = useState(false);
    const toggle = useCallback(() => setFlipped(f => !f), []);

    return (
        <Canvas
            onClick={toggle}
            camera={{ position: [0, 0, 16], fov: 42 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
            style={{ cursor: "pointer" }}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 12]} intensity={2.0} color="#b0c4ff" />
            <pointLight position={[-8, -6, 10]} intensity={1.2} color="#a080ff" />
            <CardMesh index={index} font={font} flipped={flipped} isLeader={isLeader} />
        </Canvas>
    );
};

// ── ProjectCard3D ─────────────────────────────────────────────────────────
const ProjectCard3D = ({ index, isLeader }) => {
    const [font, setFont] = useState(null);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef();

    // Load font once (shared via module promise)
    useEffect(() => { loadSharedFont().then(setFont); }, []);

    // Pause render (unmount Canvas) when card is off-screen
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            {visible && <CardScene index={index} font={font} isLeader={isLeader} />}
        </div>
    );
};

export default ProjectCard3D;
