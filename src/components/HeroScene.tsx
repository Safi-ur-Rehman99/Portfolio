import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function DistortedSphere({ pointer }: { pointer: { x: number; y: number } }) {
  const mesh = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAccent: { value: new THREE.Color("#ff5b1f") },
      uBase: { value: new THREE.Color("#0a0a0a") },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!mesh.current || !matRef.current) return;
    uniforms.uTime.value += delta;
    uniforms.uPointer.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.06,
    );
    mesh.current.rotation.y += delta * 0.08;
    mesh.current.rotation.x = pointer.y * 0.3;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.6, 64]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uPointer;
          varying vec3 vNormal;
          varying float vNoise;

          // simplex-ish cheap noise
          vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
          vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
          vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
          float snoise(vec3 v){
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
          }

          void main() {
            vNormal = normal;
            float n = snoise(position * 1.2 + vec3(uTime * 0.25));
            float n2 = snoise(position * 2.8 + vec3(uTime * 0.4));
            float disp = n * 0.28 + n2 * 0.08;
            disp += (uPointer.x + uPointer.y) * 0.05;
            vNoise = disp;
            vec3 displaced = position + normal * disp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uAccent;
          uniform vec3 uBase;
          varying vec3 vNormal;
          varying float vNoise;

          void main() {
            vec3 viewDir = vec3(0.0, 0.0, 1.0);
            float rim = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);
            vec3 base = mix(uBase, vec3(0.08, 0.08, 0.08), 0.5 + vNoise);
            vec3 color = mix(base, uAccent, rim * 0.85);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function Fallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 60% 50%, #ff5b1f22 0%, #0a0a0a 55%)",
      }}
    />
  );
}

export default function HeroScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) return <Fallback />;

  return (
    <div
      className="h-full w-full"
      onPointerMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        setPointer({ x, y });
      }}
    >
      <Suspense fallback={<Fallback />}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff5b1f" />
          <pointLight position={[-5, -3, -2]} intensity={0.4} color="#ffffff" />
          <DistortedSphere pointer={pointer} />
        </Canvas>
      </Suspense>
    </div>
  );
}
