import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function DistortionPlane({
  imageUrl,
  hovered,
}: {
  imageUrl: string;
  hovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Load texture
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uAccent: { value: new THREE.Color("#ff5b1f") },
    }),
    [texture]
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    uniforms.uTime.value += delta;
    // Smoothly transition hover state
    const target = hovered ? 1 : 0;
    uniforms.uHover.value += (target - uniforms.uHover.value) * 0.05;
  });

  const aspect = texture.image
    ? texture.image.width / texture.image.height
    : 16 / 9;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.width / aspect, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uHover;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Liquid distortion on hover
            float wave = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.y * 3.0 + uTime * 1.5);
            pos.z += wave * uHover * 0.15;
            pos.x += sin(pos.y * 5.0 + uTime * 3.0) * uHover * 0.03;
            pos.y += cos(pos.x * 4.0 + uTime * 2.5) * uHover * 0.03;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uHover;
          uniform vec3 uAccent;
          varying vec2 vUv;
          
          void main() {
            // UV distortion
            vec2 uv = vUv;
            float distort = uHover * 0.02;
            uv.x += sin(uv.y * 10.0 + uTime * 2.0) * distort;
            uv.y += cos(uv.x * 10.0 + uTime * 2.5) * distort;
            
            vec4 tex = texture2D(uTexture, uv);
            
            // Subtle color aberration toward accent
            float aberration = uHover * 0.008;
            float r = texture2D(uTexture, uv + vec2(aberration, 0.0)).r;
            float g = tex.g;
            float b = texture2D(uTexture, uv - vec2(aberration, 0.0)).b;
            
            vec3 color = vec3(r, g, b);
            
            // Blend toward accent on distortion peaks
            float accentMix = uHover * 0.08 * sin(uv.x * 8.0 + uTime);
            color = mix(color, uAccent, max(accentMix, 0.0));
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

type Props = {
  imageUrl: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function DistortionImage({
  imageUrl,
  alt,
  className = "",
  width = 1600,
  height = 1200,
}: Props) {
  const [hovered, setHovered] = useState(false);
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

  const fallbackImg = (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className="h-full w-full object-cover"
    />
  );

  if (!supported || reduced) {
    return <div className={className}>{fallbackImg}</div>;
  }

  return (
    <ErrorBoundary fallback={<div className={className}>{fallbackImg}</div>}>
      <div
        className={`relative ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <Suspense fallback={fallbackImg}>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false }}
            style={{ position: "absolute", inset: 0 }}
          >
            <DistortionPlane imageUrl={imageUrl} hovered={hovered} />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
