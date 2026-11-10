import React, { useState, useRef } from "react";
import * as Icons from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface ServiceCardProps {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: keyof typeof Icons;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  number,
  title,
  description,
  iconName,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string }>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const tiltStyle = !prefersReducedMotion && isHovered
    ? {
        transform: `perspective(1000px) rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg) scale3d(1.025, 1.025, 1.025)`,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }
    : {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s ease-out, box-shadow 0.3s ease",
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
        isHovered
          ? "border-blue-500/40 bg-[rgba(10,10,20,0.75)] shadow-[0_0_40px_rgba(59,130,246,0.12)]"
          : "border-white/[0.07] bg-[rgba(10,10,16,0.6)]"
      } backdrop-blur-xl`}
    >
      {/* Radial cursor glow */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(59,130,246,0.14) 0%, transparent 55%)`,
          }}
        />
      )}

      {/* Animated bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-transparent transition-all duration-500 ${
          isHovered ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />

      <div>
        {/* Header: number badge + icon orb */}
        <div className="flex items-start justify-between">
          {/* Glowing number badge */}
          <span
            className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 font-mono text-xs font-bold transition-all duration-300 ${
              isHovered
                ? "bg-blue-500/15 text-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.3)]"
                : "bg-white/5 text-zinc-600"
            }`}
          >
            {number}
          </span>

          {/* Icon orb with gradient background */}
          {IconComponent && (
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                isHovered
                  ? "bg-gradient-to-br from-blue-600/30 to-blue-900/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] text-blue-300"
                  : "bg-white/5 text-zinc-500"
              }`}
            >
              <IconComponent className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className={`mt-7 text-lg font-bold tracking-tight transition-colors duration-300 ${
            isHovered ? "text-white" : "text-zinc-100"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Learn more link */}
      <a
        href={`/solutions?service=${id}`}
        className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-all duration-300 hover:text-blue-400 group-hover:text-zinc-400"
      >
        <span>Learn More</span>
        <Icons.ArrowRight
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            isHovered ? "translate-x-1 text-blue-400" : ""
          }`}
        />
      </a>
    </div>
  );
};
