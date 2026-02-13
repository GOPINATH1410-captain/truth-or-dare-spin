import { useState, useRef } from "react";
import { PLAYERS } from "@/data/gameData";

interface SpinnerProps {
  onResult: (player: string) => void;
  spinning: boolean;
  setSpinning: (v: boolean) => void;
}

const COLORS = [
  "hsl(180, 100%, 50%)",
  "hsl(320, 100%, 60%)",
  "hsl(50, 100%, 55%)",
  "hsl(150, 80%, 45%)",
  "hsl(270, 80%, 60%)",
  "hsl(10, 90%, 55%)",
  "hsl(200, 90%, 50%)",
  "hsl(340, 90%, 55%)",
];

export default function Spinner({ onResult, spinning, setSpinning }: SpinnerProps) {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const total = PLAYERS.length;
  const sliceAngle = 360 / total;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const extraSpins = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = totalRotation % 360;
      // The pointer is at top (0 degrees). The wheel rotates clockwise.
      // We need to find which slice is at the top.
      const adjustedAngle = (360 - normalizedAngle + 90) % 360;
      const index = Math.floor(adjustedAngle / sliceAngle) % total;
      onResult(PLAYERS[index]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-primary text-3xl drop-shadow-lg"
          style={{ filter: "drop-shadow(0 0 8px hsl(180, 100%, 50%))" }}>
          ▼
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-72 h-72 md:w-96 md:h-96 rounded-full relative overflow-hidden border-4 border-primary glow-primary"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {PLAYERS.map((player, i) => {
              const startAngle = i * sliceAngle - 90;
              const endAngle = startAngle + sliceAngle;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 100 + 100 * Math.cos(startRad);
              const y1 = 100 + 100 * Math.sin(startRad);
              const x2 = 100 + 100 * Math.cos(endRad);
              const y2 = 100 + 100 * Math.sin(endRad);
              const largeArc = sliceAngle > 180 ? 1 : 0;
              const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
              const textX = 100 + 62 * Math.cos(midAngle);
              const textY = 100 + 62 * Math.sin(midAngle);
              const textRotation = (startAngle + endAngle) / 2;
              const color = COLORS[i % COLORS.length];
              const firstName = player.split(" ")[0];

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={color}
                    stroke="hsl(240, 15%, 9%)"
                    strokeWidth="0.5"
                    opacity={0.85}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    fill="hsl(240, 15%, 9%)"
                    fontSize="3.8"
                    fontWeight="bold"
                    fontFamily="Poppins, sans-serif"
                  >
                    {firstName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="px-8 py-3 rounded-full font-display text-2xl tracking-wider bg-primary text-primary-foreground glow-primary hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {spinning ? "SPINNING..." : "🎯 SPIN!"}
      </button>
    </div>
  );
}
