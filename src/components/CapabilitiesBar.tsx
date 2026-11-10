import React from "react";

export const CapabilitiesBar: React.FC = () => {
  const techs = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Three.js",
    "MongoDB",
    "MySQL",
    "AWS",
  ];

  // Double the array for seamless infinite looping scroll
  const scrollTechs = [...techs, ...techs];

  return (
    <section className="relative w-full border-y border-white/5 bg-black/40 py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-8 mb-6">
        <h2 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          We Build With Modern Technology
        </h2>
      </div>
      
      {/* Loop Track */}
      <div className="relative flex w-full select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
        <div className="flex gap-16 min-w-full shrink-0 animate-scroll hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:justify-center py-2">
          {scrollTechs.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-300 transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0"></div>
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
