import { PLAYERS } from "@/data/gameData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlayerListProps {
  selectedPlayer: string | null;
}

export default function PlayerList({ selectedPlayer }: PlayerListProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 h-full">
      <h2 className="font-display text-2xl text-primary text-glow-primary mb-3">
        🎮 Players ({PLAYERS.length})
      </h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-1 pr-3">
          {PLAYERS.map((player) => (
            <div
              key={player}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                selectedPlayer === player
                  ? "bg-primary text-primary-foreground glow-primary scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {player}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
