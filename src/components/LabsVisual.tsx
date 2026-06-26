import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.y += delta * 0.12;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#ff5b1f"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff5b1f"
          size={0.02}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </>
  );
}

function Fallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(255,91,31,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

export default function LabsVisual() {
  const reduced = useReducedMotion();
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

  if (!supported || reduced) return <Fallback />;

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div className="h-full w-full" style={{ minHeight: 300 }}>
        <Suspense fallback={<Fallback />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 4], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <WireframeShape />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
