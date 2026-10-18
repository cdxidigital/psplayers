import { create } from "zustand";
import { persist } from "zustand/middleware";

export const STARTING_CHIPS = 5000;

export type GameId = "pokies" | "blackjack" | "roulette" | "baccarat" | "poker" | "crash" | "hilo" | "dice" | "comp";

export type Ledger = {
  id: string;
  at: number;
  game: GameId;
  note: string;
  delta: number;
  balance: number;
};

type State = {
  balance: number;
  ofAge: boolean;
  muted: boolean;
  ledger: Ledger[];
  confirmAge: () => void;
  toggleMute: () => void;
  apply: (game: GameId, note: string, delta: number) => boolean;
  comp: () => boolean;
};

export const useCasino = create<State>()(
  persist(
    (set, get) => ({
      balance: STARTING_CHIPS,
      ofAge: false,
      muted: false,
      ledger: [],
      confirmAge: () => set({ ofAge: true }),
      toggleMute: () => set({ muted: !get().muted }),
      apply: (game, note, delta) => {
        const balance = get().balance;
        if (delta < 0 && balance + delta < 0) return false;
        const next = balance + delta;
        const entry: Ledger = {
          id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e5).toString(36)}`,
          at: Date.now(),
          game,
          note,
          delta,
          balance: next,
        };
        set({ balance: next, ledger: [entry, ...get().ledger].slice(0, 20) });
        return true;
      },
      comp: () => {
        const balance = get().balance;
        if (balance >= 100) return false;
        const delta = STARTING_CHIPS - balance;
        const entry: Ledger = {
          id: `comp-${Date.now().toString(36)}`,
          at: Date.now(),
          game: "comp",
          note: "House comp",
          delta,
          balance: STARTING_CHIPS,
        };
        set({ balance: STARTING_CHIPS, ledger: [entry, ...get().ledger].slice(0, 20) });
        return true;
      },
    }),
    { name: "pp-players-v1" },
  ),
);

export function formatChips(n: number): string {
  return new Intl.NumberFormat("en-AU").format(n);
}

export function formatDelta(n: number): string {
  const body = formatChips(Math.abs(n));
  if (n > 0) return `+${body}`;
  if (n < 0) return `−${body}`;
  return "0";
}
