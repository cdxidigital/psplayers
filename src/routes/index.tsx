import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AgeGate } from "@/components/lounge/AgeGate";
import { Baccarat } from "@/components/lounge/Baccarat";
import { Blackjack } from "@/components/lounge/Blackjack";
import { Crash } from "@/components/lounge/Crash";
import { Dice } from "@/components/lounge/Dice";
import { Hilo } from "@/components/lounge/Hilo";
import { Poker } from "@/components/lounge/Poker";
import { Lobby, type Floor } from "@/components/lounge/Lobby";
import { Pokies } from "@/components/lounge/Pokies";
import { Roulette } from "@/components/lounge/Roulette";
import { Shell } from "@/components/lounge/Shell";
import { useCasino } from "@/lib/lounge/store";

export const Route = createFileRoute("/")({ component: Home });

const TITLES: Record<Floor, string> = {
  pokies: "Neon 77",
  blackjack: "The Velvet Hand",
  roulette: "Midnight Wheel",
  baccarat: "The Gold Shoe",
  poker: "Royal Velvet",
  crash: "Star Crash",
  hilo: "Higher",
  dice: "Pink Dice",
};

function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [floor, setFloor] = useState<Floor | null>(null);
  const ofAge = useCasino((s) => s.ofAge);

  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useCasino.persist.hasHydrated()) finish();
    return useCasino.persist.onFinishHydration(finish);
  }, []);

  if (!hydrated) {
    return (
      <main className="floor flex min-h-screen items-center justify-center px-6">
        <img src="/brand/wordmark-full-colour.svg" alt="Pornstar Players" className="h-24 w-auto max-w-[80vw]" />
      </main>
    );
  }

  return (
    <Shell title={floor ? TITLES[floor] : undefined} onBack={floor ? () => setFloor(null) : undefined}>
      {floor === null && <Lobby onPlay={setFloor} />}
      {floor === "pokies" && <Pokies />}
      {floor === "blackjack" && <Blackjack />}
      {floor === "roulette" && <Roulette />}
      {floor === "baccarat" && <Baccarat />}
      {floor === "poker" && <Poker />}
      {floor === "crash" && <Crash />}
      {floor === "hilo" && <Hilo />}
      {floor === "dice" && <Dice />}
      {!ofAge && <AgeGate />}
    </Shell>
  );
}
