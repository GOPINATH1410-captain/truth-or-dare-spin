import { useState } from "react";
import Spinner from "@/components/Spinner";
import PlayerList from "@/components/PlayerList";
import TruthOrDare from "@/components/TruthOrDare";

const Index = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [phase, setPhase] = useState<"spin" | "choose">("spin");
  const [spinning, setSpinning] = useState(false);

  const handleResult = (player: string) => {
    setSelectedPlayer(player);
    setPhase("choose");
  };

  const handleDone = () => {
    setSelectedPlayer(null);
    setPhase("spin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-card/50 p-2">
        <PlayerList selectedPlayer={selectedPlayer} />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
        <h1 className="font-display text-5xl md:text-7xl text-primary text-glow-primary">
          Truth or Dare 🎉
        </h1>

        {phase === "spin" ? (
          <Spinner onResult={handleResult} spinning={spinning} setSpinning={setSpinning} />
        ) : (
          selectedPlayer && <TruthOrDare player={selectedPlayer} onDone={handleDone} />
        )}
      </main>
    </div>
  );
};

export default Index;
