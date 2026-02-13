import { useState } from "react";
import { TRUTHS, DARES } from "@/data/gameData";

interface TruthOrDareProps {
  player: string;
  onDone: () => void;
}

export default function TruthOrDare({ player, onDone }: TruthOrDareProps) {
  const [choice, setChoice] = useState<"truth" | "dare" | null>(null);
  const [question, setQuestion] = useState("");

  const handleChoice = (type: "truth" | "dare") => {
    setChoice(type);
    const list = type === "truth" ? TRUTHS : DARES;
    setQuestion(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="animate-bounce-in flex flex-col items-center gap-6 text-center">
      <h2 className="font-display text-3xl md:text-4xl text-accent text-glow-accent">
        🎯 {player}
      </h2>

      {!choice ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-muted-foreground">Choose your fate!</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleChoice("truth")}
              className="px-8 py-4 rounded-xl font-display text-3xl bg-primary text-primary-foreground glow-primary hover:scale-110 transition-transform"
            >
              🤔 TRUTH
            </button>
            <button
              onClick={() => handleChoice("dare")}
              className="px-8 py-4 rounded-xl font-display text-3xl bg-secondary text-secondary-foreground glow-secondary hover:scale-110 transition-transform"
            >
              🔥 DARE
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-bounce-in flex flex-col items-center gap-6 max-w-md">
          <span
            className={`font-display text-5xl ${
              choice === "truth" ? "text-primary text-glow-primary" : "text-secondary text-glow-secondary"
            }`}
          >
            {choice === "truth" ? "🤔 TRUTH" : "🔥 DARE"}
          </span>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
            {question}
          </p>
          <button
            onClick={onDone}
            className="mt-4 px-6 py-3 rounded-full font-display text-xl bg-accent text-accent-foreground glow-accent hover:scale-105 transition-transform"
          >
            ✅ DONE – NEXT SPIN!
          </button>
        </div>
      )}
    </div>
  );
}
