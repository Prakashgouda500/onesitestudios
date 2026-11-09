import React from "react";

export interface WaveDividerProps {
  /**
   * Background color of the section immediately above the wave.
   * e.g. "#050608", "#ffffff", "#f8fafc", "#1d2737"
   */
  fromColor?: string;
  /**
   * Background color of the section immediately below the wave (fill of the wave).
   * e.g. "#ffffff", "#050608", "#090a0f", "#010101"
   */
  toColor?: string;
  /**
   * Flip the wave horizontally to alternate wave direction between transitions.
   */
  flip?: boolean;
  /**
   * Custom height classes (default: "h-8 sm:h-12 md:h-16 lg:h-20")
   */
  heightClass?: string;
  /**
   * Optional custom classes on wrapper
   */
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fromColor = "#050608",
  toColor = "#ffffff",
  flip = false,
  heightClass = "h-8 sm:h-12 md:h-16 lg:h-20",
  className = "",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{ backgroundColor: fromColor }}
      aria-hidden="true"
    >
      {/* Animated dark-blue shimmer strip */}
      <div
        className="wave-shimmer-strip"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(29,78,216,0.22) 50%, transparent 100%)",
          backgroundSize: "40% 100%",
          backgroundRepeat: "no-repeat",
          animation: "wave-shimmer 4s linear infinite",
        }}
      />

      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`relative z-10 w-full block ${heightClass} ${flip ? "-scale-x-100" : ""}`}
      >
        <path
          d="M0,23 C220,53 420,53 600,45 C780,37 980,45 1160,52 C1280,55 1380,45 1440,38 L1440,80 L0,80 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};

