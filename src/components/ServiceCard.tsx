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

  // Dynamically resolve icon component
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string }>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // 3D rotation transform based on coordinates
  const tiltStyle = !prefersReducedMotion && isHovered
    ? {
        transform: `perspective(1000px) rotateX(${-coords.y * 15}deg) rotateY(${coords.x * 15}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
      }
    : {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative flex h-full min-h-[320px] flex-col justify-between rounded-2xl border p-8 glass-panel transition-all duration-300 ${
        isHovered
          ? "border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          : "border-white/5"
      }`}
    >
      {/* Glow Highlight Effect */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.12)_0%,transparent_50%)]"
          style={{
            // Pass cursor position as custom properties
            "--x": `${(coords.x + 0.5) * 100}%`,
            "--y": `${(coords.y + 0.5) * 100}%`,
          } as React.CSSProperties}
        ></div>
      )}

      <div>
        {/* Card Header: Number and Icon */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-zinc-600">
            {number}
          </span>
          {IconComponent && (
            <div
              className={`rounded-lg p-2.5 transition-all duration-300 ${
                isHovered
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-white/5 text-zinc-400"
              }`}
            >
              <IconComponent className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Card Title */}
        <h3 className="mt-8 text-xl font-bold tracking-tight text-white">
          {title}
        </h3>

        {/* Card Description */}
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      {/* Explore anchor link indicator */}
      <a
        href={`/solutions?service=${id}`}
        className="mt-8 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-blue-400"
      >
        <span>Learn More</span>
        <Icons.ChevronRight className={`h-3 w-3 transition-transform duration-300 ${
          isHovered ? "translate-x-1 text-blue-400" : ""
        }`} />
      </a>
    </div>
  );
};
