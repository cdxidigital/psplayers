export type Sym =
  | "star"
  | "seven"
  | "crown"
  | "diamond"
  | "lips"
  | "heart"
  | "spade"
  | "chip"
  | "dice"
  | "card";

/** Pair, then three-of-a-kind, as multiples of the line stake. */
export const PAY: Record<Sym, readonly [number, number]> = {
  star: [10, 160],
  seven: [6, 80],
  crown: [4, 60],
  diamond: [4, 40],
  lips: [2, 32],
  heart: [2, 24],
  spade: [0, 22],
  chip: [0, 18],
  dice: [0, 18],
  card: [0, 12],
};

export const SYMBOL_LABEL: Record<Sym, string> = {
  star: "Star",
  seven: "Seven",
  crown: "Crown",
  diamond: "Diamond",
  lips: "Lips",
  heart: "Heart",
  spade: "Spade",
  chip: "Chip",
  dice: "Dice",
  card: "Ace",
};

/** Five lines on a 3×3 window. Row 0 is the top. */
export const LINES: readonly (readonly [number, number, number])[] = [
  [1, 1, 1],
  [0, 0, 0],
  [2, 2, 2],
  [0, 1, 2],
  [2, 1, 0],
];

const A: Sym[] = [
  "card", "card", "chip", "chip", "heart", "spade", "dice", "lips", "card", "chip", "diamond", "heart", "seven",
  "card", "spade", "crown", "chip", "dice", "star", "heart", "card", "lips", "chip", "spade", "diamond", "card",
  "seven", "heart", "crown", "chip",
];

const B: Sym[] = [
  "chip", "card", "heart", "card", "spade", "dice", "chip", "lips", "heart", "card", "diamond", "spade", "card",
  "seven", "chip", "crown", "heart", "dice", "card", "star", "spade", "chip", "lips", "heart", "card", "diamond",
  "spade", "seven", "chip", "crown",
];

const C: Sym[] = [
  "heart", "card", "chip", "spade", "card", "dice", "lips", "heart", "chip", "card", "diamond", "spade", "seven",
  "card", "crown", "chip", "heart", "star", "dice", "card", "spade", "lips", "chip", "heart", "card", "diamond",
  "crown", "chip", "seven", "spade",
];

export const REELS: readonly (readonly Sym[])[] = [A, B, C];

export const BETS = [10, 25, 50, 100, 250, 500] as const;

export const STARTER: Sym[][] = [
  ["crown", "star", "heart"],
  ["seven", "diamond", "chip"],
  ["lips", "crown", "card"],
];

export type Cell = { reel: number; row: number };

export type LineHit = {
  index: number;
  sym: Sym;
  count: number;
  amount: number;
  cells: Cell[];
};

function windowAt(strip: readonly Sym[], stop: number): Sym[] {
  return [0, 1, 2].map((k) => strip[(stop + k) % strip.length]!);
}

export function spinGrid(random: () => number = Math.random): Sym[][] {
  return REELS.map((strip) => windowAt(strip, Math.floor(random() * strip.length)));
}

function resolveLine(cells: Sym[]): { sym: Sym; count: number } | null {
  let target: Sym | null = null;
  for (const sym of cells) {
    if (sym !== "star") {
      target = sym;
      break;
    }
  }
  const paySym: Sym = target ?? "star";
  let count = 0;
  for (const sym of cells) {
    if (sym === paySym || sym === "star") count += 1;
    else break;
  }
  if (count < 2) return null;
  if (count === 2 && PAY[paySym][0] === 0) return null;
  return { sym: paySym, count };
}

export function evaluate(grid: Sym[][], totalBet: number, free: boolean) {
  const lineBet = totalBet / LINES.length;
  const boost = free ? 2 : 1;
  const hits: LineHit[] = [];

  LINES.forEach((rows, index) => {
    const symbols = rows.map((row, reel) => grid[reel]![row]!);
    const hit = resolveLine(symbols);
    if (!hit) return;
    const mult = hit.count === 2 ? PAY[hit.sym][0] : PAY[hit.sym][1];
    const amount = mult * lineBet * boost;
    if (amount <= 0) return;
    hits.push({
      index,
      sym: hit.sym,
      count: hit.count,
      amount,
      cells: rows.slice(0, hit.count).map((row, reel) => ({ reel, row })),
    });
  });

  const scatters: Cell[] = [];
  grid.forEach((reel, r) => {
    reel.forEach((sym, row) => {
      if (sym === "seven") scatters.push({ reel: r, row });
    });
  });

  let freeAward = 0;
  if (scatters.length >= 3) {
    freeAward = 5;
    hits.push({
      index: -1,
      sym: "seven",
      count: scatters.length,
      amount: totalBet * 4 * boost,
      cells: scatters,
    });
  }

  const total = hits.reduce((sum, hit) => sum + hit.amount, 0);
  const parts: string[] = [];
  const lineHits = hits.filter((hit) => hit.index >= 0);
  if (lineHits.length === 1) {
    const hit = lineHits[0]!;
    parts.push(`${SYMBOL_LABEL[hit.sym]} ×${hit.count}`);
  } else if (lineHits.length > 1) {
    parts.push(`${lineHits.length} lines`);
  }
  if (freeAward) parts.push(`${scatters.length} sevens · +${freeAward} free`);
  if (free) parts.push("free ×2");
  if (total >= totalBet * 15) parts.unshift("Starlight");

  const banner = total > 0 || freeAward > 0 ? parts.join(" · ") : "No line";
  return { hits, total, freeAward, banner };
}
