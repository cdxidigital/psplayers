import { freshShoe, handTotal, type Card } from "@/lib/lounge/blackjack";

export type TableId = "pokies" | "blackjack" | "roulette" | "baccarat";
export type LivePhase = "betting" | "dealing" | "action" | "result";

const CLOCK: Record<TableId, { cycle: number; betting: number; dealing: number; action: number }> = {
  roulette: { cycle: 20000, betting: 11000, dealing: 0, action: 5500 },
  blackjack: { cycle: 26000, betting: 10000, dealing: 2000, action: 9000 },
  pokies: { cycle: 15000, betting: 7000, dealing: 0, action: 5000 },
  baccarat: { cycle: 22000, betting: 12000, dealing: 2000, action: 4000 },
};

export type LiveSnap = {
  round: number;
  phase: LivePhase;
  left: number;
};

export function liveState(id: TableId, now = Date.now()): LiveSnap {
  const clock = CLOCK[id];
  const round = Math.floor(now / clock.cycle);
  const elapsed = now % clock.cycle;
  const dealt = clock.betting + clock.dealing;
  const acted = dealt + clock.action;
  if (elapsed < clock.betting) return { round, phase: "betting", left: clock.betting - elapsed };
  if (elapsed < dealt) return { round, phase: "dealing", left: dealt - elapsed };
  if (elapsed < acted) return { round, phase: "action", left: acted - elapsed };
  return { round, phase: "result", left: clock.cycle - elapsed };
}

export function phaseLabel(id: TableId, phase: LivePhase): string {
  if (phase === "betting") return "Bets open";
  if (phase === "dealing") return "Dealing";
  if (phase === "result") return "Result";
  if (id === "roulette") return "Wheel";
  if (id === "pokies") return "Reels";
  if (id === "baccarat") return "The draw";
  return "Your play";
}

export function formatClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function roundSeed(table: string, round: number): number {
  let h = 2166136261;
  const key = `${table}:${round}`;
  for (let i = 0; i < key.length; i += 1) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function wheelPocket(round: number): number {
  return Math.floor(mulberry32(roundSeed("roulette", round))() * 37);
}

const OUTSIDE = ["Red", "Black", "Odd", "Even", "1–18", "19–36"] as const;
const CHIPS = [25, 50, 100, 200] as const;

export function rouletteSeats(round: number): { name: string; label: string; amount: number }[] {
  const rng = mulberry32(roundSeed("roulette-seats", round));
  return ["Mara", "Jules", "Sable"].map((name) => {
    if (rng() < 0.22) return { name, label: "Out", amount: 0 };
    const label = OUTSIDE[Math.floor(rng() * OUTSIDE.length)]!;
    const amount = CHIPS[Math.floor(rng() * CHIPS.length)]!;
    return { name, label, amount };
  });
}

function take(shoe: Card[]): Card {
  const card = shoe.pop();
  if (!card) throw new Error("Shoe empty");
  return card;
}

export function blackjackSeats(round: number): { name: string; cards: Card[]; note: string }[] {
  const rng = mulberry32(roundSeed("bj-seats", round));
  const shoe = freshShoe(rng);
  return ["Mara", "Jules"].map((name) => {
    const cards = [take(shoe), take(shoe)];
    while (handTotal(cards).total < 16 && shoe.length > 0) cards.push(take(shoe));
    const total = handTotal(cards).total;
    return { name, cards, note: total > 21 ? "Bust" : String(total) };
  });
}

export const DEALERS: Record<TableId, string> = {
  roulette: "Noor Vale",
  blackjack: "Vesper Quinn",
  pokies: "Lumen Jae",
  baccarat: "Cleo March",
};
