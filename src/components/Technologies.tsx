import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { siteData } from "../data/siteData";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { WaveDivider } from "./ui/WaveDivider";

// Orbiter labels component
const TechOrbiter: React.FC<{
  name: string;
  position: [number, number, number];
  onHover: (name: string | null) => void;
  hoveredTech: string | null;
}> = ({ name, position, onHover, hoveredTech }) => {
  const isHovered = hoveredTech === name;

  return (
    <group position={position}>
      {/* Invisible anchor point in 3D */}
      <mesh>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      
      {/* HTML Tag Projected in 3D */}
      <Html distanceFactor={6} center>
        <button
          onMouseEnter={() => onHover(name)}
          onMouseLeave={() => onHover(null)}
          className={`whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
            isHovered
              ? "border-blue-400 bg-blue-500/10 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)] scale-110"
              : "border-white/30 bg-zinc-950/80 text-zinc-400 hover:border-white/60 hover:text-white"
          }`}
        >
          {name}
        </button>
      </Html>
    </group>
  );
};

// Core Orbit Group containing central sphere and orbiting labels
const OrbitGroup: React.FC<{
  techs: string[];
  hoveredTech: string | null;
  setHoveredTech: (name: string | null) => void;
  prefersReducedMotion: boolean;
}> = ({ techs, hoveredTech, setHoveredTech, prefersReducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);

  // Distribute tags uniformly across a sphere using the Fibonacci Sphere algorithm
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const numPoints = techs.length;
    const radius = 2.2; // Orbit radius
    
    for (let i = 0; i < numPoints; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / numPoints);
      const theta = Math.PI * (1 + 5 ** 0.5) * k;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      pts.push([x, y, z]);
    }
    return pts;
  }, [techs]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Rotate core sphere
    if (coreSphereRef.current) {
      coreSphereRef.current.rotation.y += delta * 0.4;
      coreSphereRef.current.rotation.x += delta * 0.2;
    }

    // Rotate orbiting group
    if (groupRef.current && !prefersReducedMotion) {
      // Slow down orbit speed if a tag is hovered
      const speed = hoveredTech ? 0.03 : 0.2;
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
    }
  });

  return (
    <group>
      {/* Central Tech Core Mesh */}
      <mesh ref={coreSphereRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color="#0d0e15"
          emissive="#0070f3"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main Orbiting Group */}
      <group ref={groupRef}>
        {techs.map((name, idx) => (
          <TechOrbiter
            key={name}
            name={name}
            position={points[idx]}
            onHover={setHoveredTech}
            hoveredTech={hoveredTech}
          />
        ))}
        
        {/* Orbital rings lines */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.18, 2.22, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

export const Technologies: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const techs = siteData.technologies;

  return (
    <section className="relative w-full bg-bg-dark pb-24 md:pb-32 overflow-hidden">
      <WaveDivider fromColor="#ffffff" toColor="#000000" flip={true} className="mb-14 md:mb-20" />
      {/* Spotlight behind canvas */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Column: Heading and explanation */}
          <div className="text-left max-w-xl">
            <h2 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
              Technology Stack
            </h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Futuristic <span className="hero-text-gradient">Engine</span>
            </h3>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              We leverage modern and robust software engineering frameworks to ensure page responsiveness, high lighthouse index, and reliable backend infrastructure.
            </p>
            <p className="mt-4 text-xs font-mono text-zinc-500">
              * Interact with the orbiting nodes on the right. Hover to view a specific technology core anchor.
            </p>
          </div>

          {/* Right Column: Orbit Canvas */}
          <div className="relative h-[350px] w-full sm:h-[450px]">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#0070f3" />
              <OrbitGroup
                techs={techs}
                hoveredTech={hoveredTech}
                setHoveredTech={setHoveredTech}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
};
