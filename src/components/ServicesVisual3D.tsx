import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { siteData } from "../data/siteData";

// R3F Central Core that changes based on active category
const VisualCore: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const sphereRef = useRef<THREE.Mesh>(null);

  // Map indices to core colors
  const colorMap = [
    "#0070f3", // WEB - blue
    "#00f2fe", // AI - cyan
    "#7928ca", // MOBILE - purple
    "#3b82f6", // CLOUD - slate blue
    "#ec4899", // DATA - pink
    "#10b981", // AUTOMATION - emerald
  ];

  const currentColor = colorMap[activeIndex] || "#0070f3";

  useFrame((state) => {
    if (sphereRef.current) {
      // Rotate the sphere slowly
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={currentColor} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
      
      {/* Morphing Sphere */}
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={currentColor}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2.0}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Orbiting particles overlay */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2.2 + Math.sin(i) * 0.3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={currentColor} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

export const ServicesVisual3D: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = siteData.servicesVisual.categories;

  return (
    <section className="relative w-full bg-bg-darker py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%) pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-left md:max-w-2xl mb-16">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
            Technology Ecosystem
          </h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Interactive System <span className="hero-text-gradient">Architecture</span>
          </h3>
          <p className="mt-4 text-sm text-zinc-400">
            Hover over a node to query the services and components connected to our tech core.
          </p>
        </div>

        {/* Interactive layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: Category list - 5 cols */}
          <div className="flex flex-col gap-4 lg:col-span-5 order-2 lg:order-1">
            {categories.map((category, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={category.name}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group relative flex flex-col justify-start rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-blue-500/30 bg-white/5 shadow-md shadow-blue-500/5"
                      : "border-white/5 bg-transparent hover:border-white/10"
                  }`}
                >
                  {/* Category Name & Indicator */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-blue-400 scale-125 shadow-[0_0_8px_#0070f3]"
                          : "bg-zinc-600"
                      }`}
                    ></div>
                    <span
                      className={`text-sm font-bold tracking-widest transition-colors ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* Description container */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isActive ? "max-h-20 mt-3 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center: Connective Circuit SVG lines - 2 cols */}
          <div className="hidden lg:flex h-full items-center justify-center lg:col-span-2 order-2 z-10 pointer-events-none">
            <svg className="w-full h-80 overflow-visible" viewBox="0 0 100 200">
              {/* Dynamic Connecting Circuit Line */}
              <motion.path
                key={activeIndex}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.5 }}
                d={`M 10,${40 + activeIndex * 36} L 50,${40 + activeIndex * 36} L 90,100`}
                fill="none"
                stroke={
                  activeIndex === 0
                    ? "#0070f3"
                    : activeIndex === 1
                    ? "#00f2fe"
                    : activeIndex === 2
                    ? "#7928ca"
                    : activeIndex === 3
                    ? "#3b82f6"
                    : activeIndex === 4
                    ? "#ec4899"
                    : "#10b981"
                }
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <motion.circle
                key={`dot-${activeIndex}`}
                initial={{ offset: 0 }}
                animate={{
                  cx: [10, 50, 90],
                  cy: [40 + activeIndex * 36, 40 + activeIndex * 36, 100],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                r="3"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Right: 3D Core Canvas - 5 cols */}
          <div className="relative h-[300px] w-full sm:h-[400px] lg:col-span-5 order-1 lg:order-3">
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_70%) pointer-events-none"></div>
            <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
              <VisualCore activeIndex={activeIndex} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};
