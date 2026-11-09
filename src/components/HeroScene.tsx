import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Floating Web mockup component
const FloatingCard: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  color: string;
}> = ({ position, rotation, width, height, color }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        {/* Main Card Background - Frosted Glass */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
            ior={1.2}
            thickness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Card Border */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            wireframe
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mock UI Elements: Header Bar */}
        <mesh position={[0, height / 2 - 0.15, 0.02]}>
          <planeGeometry args={[width - 0.2, 0.1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>

        {/* Mock UI Elements: Dot Controls */}
        {[-0.4, 0, 0.4].map((x, idx) => (
          <mesh key={idx} position={[x * (width / 4), height / 2 - 0.15, 0.03]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}

        {/* Mock UI Elements: Main Grid Box */}
        <mesh position={[-width / 4, -0.1, 0.02]}>
          <planeGeometry args={[width / 2.5, height / 1.8]} />
          <meshBasicMaterial color="#7928ca" transparent opacity={0.1} />
        </mesh>

        {/* Mock UI Elements: Content Lines */}
        {[0.1, -0.1, -0.3].map((y, idx) => (
          <mesh key={idx} position={[width / 4, y, 0.02]}>
            <planeGeometry args={[width / 2.5, 0.05]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Orbiting Ring around the core
const OrbitingRing: React.FC<{
  radius: number;
  rotationX: number;
  rotationY: number;
  speed: number;
}> = ({ radius, rotationX, rotationY, speed }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[rotationX, rotationY, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial
        color="#0070f3"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Particles Field Background
const ParticleField: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Position particles in a large sphere
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

// Interactive Scene Controller (Parallax + Rotation)
const SceneController: React.FC<{
  children: React.ReactNode;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}> = ({ children, isMobile, prefersReducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Slow continuous rotation
    groupRef.current.rotation.y += 0.001;

    if (!isMobile) {
      // Gentle parallax effect tracking mouse pointer (-1 to 1)
      const targetX = pointer.x * 0.25;
      const targetY = pointer.y * 0.2;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Central Technology Core
const TechCore: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.15;
      meshRef.current.rotation.z = elapsed * 0.1;
      
      // Dynamic scaling/breathing effect
      const scale = 1 + Math.sin(elapsed * 1.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y = -elapsed * 0.08;
      outerWireframeRef.current.rotation.x = elapsed * 0.05;
    }
  });

  return (
    <group>
      {/* Glow Point Light inside the Core */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#0070f3" distance={5} />
      
      {/* Inner Glowing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, isMobile ? 1 : 2]} />
        <meshPhysicalMaterial
          color="#0d0e15"
          emissive="#7928ca"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          transmission={0.8}
          thickness={1.5}
          ior={1.4}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={outerWireframeRef}>
        <icosahedronGeometry args={[1.35, isMobile ? 1 : 2]} />
        <meshBasicMaterial
          color="#0070f3"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
};

interface HeroSceneProps {
  isMobile?: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ isMobile = false }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const particleCount = isMobile ? 200 : 700;

  return (
    <div className="relative h-full w-full">
      {/* Soft overlay gradient for styling */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#030303_100%] pointer-events-none z-10"></div>
      
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 2]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#7928ca" />
        
        {/* Soft background blue light */}
        <pointLight position={[-2, 1, 3]} intensity={1.0} color="#00f2fe" distance={10} />

        <SceneController isMobile={isMobile} prefersReducedMotion={prefersReducedMotion}>
          {/* Central Technology Core */}
          <TechCore isMobile={isMobile} />

          {/* Orbiting Rings */}
          {!isMobile && (
            <>
              <OrbitingRing radius={1.7} rotationX={1.2} rotationY={0.5} speed={0.15} />
              <OrbitingRing radius={1.9} rotationX={0.4} rotationY={1.3} speed={-0.1} />
            </>
          )}

          {/* Floating UI Mockups */}
          <FloatingCard
            position={isMobile ? [-1.0, 1.2, -0.5] : [-1.8, 0.8, 0.5]}
            rotation={[0.1, 0.4, -0.1]}
            width={1.2}
            height={0.8}
            color="#0070f3"
          />
          <FloatingCard
            position={isMobile ? [1.1, -1.2, -0.5] : [1.9, -0.7, 0.3]}
            rotation={[-0.15, -0.3, 0.1]}
            width={0.9}
            height={1.3}
            color="#7928ca"
          />

          {/* Particles */}
          <ParticleField count={particleCount} />
        </SceneController>
      </Canvas>
    </div>
  );
};
