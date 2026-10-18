import type { Card, Rank, Suit } from "@/lib/lounge/blackjack";

const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Suit[] = ["S", "H", "D", "C"];

export const TABLE_BETS = [10, 25, 50, 100, 250] as const;

export function oneDeck(random: () => number = Math.random): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ rank, suit });
  }
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = deck[i]!;
    deck[i] = deck[j]!;
    deck[j] = a;
  }
  return deck;
}

export function take(deck: Card[], n: number): { cards: Card[]; deck: Card[] } {
  return { cards: deck.slice(0, n), deck: deck.slice(n) };
}

function value(rank: Rank): number {
  return RANKS.indexOf(rank);
}

/** Coins returned per coin staked, including the stake. Royal is the full-pay 800. */
const POKER_PAY: Record<string, number> = {
  "Royal flush": 800,
  "Straight flush": 50,
  "Four of a kind": 25,
  "Full house": 9,
  Flush: 6,
  Straight: 4,
  "Three of a kind": 3,
  "Two pair": 2,
  "Jacks or better": 1,
};

export function scorePoker(cards: Card[]): { name: string; mult: number } {
  const values = cards.map((card) => value(card.rank)).sort((a, b) => a - b);
  const suits = new Set(cards.map((card) => card.suit));
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const groups = [...counts.values()].sort((a, b) => b - a);
  const flush = suits.size === 1;
  const unique = [...counts.keys()].sort((a, b) => a - b);
  const wheel = unique.join() === "0,1,2,3,12";
  const broadway = unique.join() === "0,9,10,11,12";
  const straight = unique.length === 5 && (unique[4]! - unique[0]! === 4 || wheel || broadway);
  const royal = flush && broadway;
  let name = "Nothing";
  if (royal) name = "Royal flush";
  else if (straight && flush) name = "Straight flush";
  else if (groups[0] === 4) name = "Four of a kind";
  else if (groups[0] === 3 && groups[1] === 2) name = "Full house";
  else if (flush) name = "Flush";
  else if (straight) name = "Straight";
  else if (groups[0] === 3) name = "Three of a kind";
  else if (groups[0] === 2 && groups[1] === 2) name = "Two pair";
  else if (groups[0] === 2) {
    const pair = [...counts.entries()].find(([, n]) => n === 2)?.[0] ?? 0;
    if (pair >= 10 || pair === 0) name = "Jacks or better";
  }
  return { name, mult: POKER_PAY[name] ?? 0 };
}

/** Bust multiplier. About a 4% instant crash, otherwise (0.96 / roll). */
export function crashPoint(random: () => number = Math.random): number {
  const roll = random();
  if (roll < 0.04) return 1;
  const raw = 0.96 / (1 - roll);
  return Math.max(1.01, Math.min(500, Math.floor(raw * 100) / 100));
}

export function climbAt(ms: number): number {
  const mult = Math.exp(ms / 1000 * 0.18);
  return Math.floor(mult * 100) / 100;
}

export function hiloValue(rank: Rank): number {
  return value(rank) + 1;
}

export function rollPair(random: () => number = Math.random): [number, number] {
  return [1 + Math.floor(random() * 6), 1 + Math.floor(random() * 6)];
}

export type DiceSide = "low" | "high" | "seven" | "pair";

export function diceReturn(side: DiceSide, dice: [number, number], stake: number): number {
  const sum = dice[0] + dice[1];
  if (side === "low" && sum >= 2 && sum <= 6) return stake * 2;
  if (side === "high" && sum >= 8 && sum <= 12) return stake * 2;
  if (side === "seven" && sum === 7) return stake * 5;
  if (side === "pair" && dice[0] === dice[1]) return stake * 5;
  return 0;
}
