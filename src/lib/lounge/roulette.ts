export const WHEEL = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
] as const;

export const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export const CHIPS = [10, 25, 100, 500] as const;

export type PocketTone = "zero" | "red" | "black";

export function toneOf(n: number): PocketTone {
  if (n === 0) return "zero";
  return REDS.has(n) ? "red" : "black";
}

export type BetKind = "straight" | "red" | "black" | "odd" | "even" | "low" | "high" | "dozen" | "column";

export type RouletteBet = {
  id: string;
  kind: BetKind;
  numbers: number[];
  odds: number;
  label: string;
  amount: number;
};

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

export function straightBet(n: number, amount: number): RouletteBet {
  return { id: `n-${n}`, kind: "straight", numbers: [n], odds: 35, label: `${n}`, amount };
}

export function outsideBet(kind: Exclude<BetKind, "straight" | "dozen" | "column">, amount: number): RouletteBet {
  const map: Record<typeof kind, { numbers: number[]; label: string }> = {
    red: { numbers: [...REDS], label: "Red" },
    black: { numbers: range(1, 36).filter((n) => !REDS.has(n)), label: "Black" },
    odd: { numbers: range(1, 36).filter((n) => n % 2 === 1), label: "Odd" },
    even: { numbers: range(1, 36).filter((n) => n % 2 === 0), label: "Even" },
    low: { numbers: range(1, 18), label: "1–18" },
    high: { numbers: range(19, 36), label: "19–36" },
  };
  const spec = map[kind];
  return { id: kind, kind, numbers: spec.numbers, odds: 1, label: spec.label, amount };
}

export function dozenBet(index: 0 | 1 | 2, amount: number): RouletteBet {
  const start = index * 12 + 1;
  return {
    id: `d-${index}`,
    kind: "dozen",
    numbers: range(start, start + 11),
    odds: 2,
    label: `${start}–${start + 11}`,
    amount,
  };
}

export function columnBet(index: 0 | 1 | 2, amount: number): RouletteBet {
  const numbers = range(1, 36).filter((n) => (n - 1) % 3 === index);
  return { id: `c-${index}`, kind: "column", numbers, odds: 2, label: `Column ${index + 1}`, amount };
}

export function stackBet(bets: RouletteBet[], next: RouletteBet): RouletteBet[] {
  const existing = bets.find((bet) => bet.id === next.id);
  if (!existing) return [...bets, next];
  return bets.map((bet) => (bet.id === next.id ? { ...bet, amount: bet.amount + next.amount } : bet));
}

export function stakeOf(bets: RouletteBet[]): number {
  return bets.reduce((sum, bet) => sum + bet.amount, 0);
}

export function settleWheel(bets: RouletteBet[], result: number): { payout: number; winners: string[] } {
  let payout = 0;
  const winners: string[] = [];
  for (const bet of bets) {
    if (!bet.numbers.includes(result)) continue;
    payout += bet.amount * (bet.odds + 1);
    winners.push(bet.label);
  }
  return { payout, winners };
}

/** Absolute wheel rotation (degrees) that parks `result` under the top pointer. */
export function rotationFor(result: number, current: number): number {
  const idx = WHEEL.indexOf(result as (typeof WHEEL)[number]);
  const slice = 360 / WHEEL.length;
  const desired = ((-idx * slice) % 360 + 360) % 360;
  const laps = Math.floor(current / 360);
  let next = (laps + 5) * 360 + desired;
  if (next <= current + 180) next += 360;
  return next;
}
