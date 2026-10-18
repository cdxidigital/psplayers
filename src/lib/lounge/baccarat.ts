import { freshShoe, type Card, type Rank } from "@/lib/lounge/blackjack";
import { mulberry32, roundSeed } from "@/lib/lounge/live";

export const BACC_CHIPS = [25, 50, 100, 250] as const;
export type BaccSide = "player" | "banker" | "tie";
export type Pot = Record<BaccSide, number>;

export const EMPTY_POT: Pot = { player: 0, banker: 0, tie: 0 };

export type Coup = {
  player: Card[];
  banker: Card[];
  winner: BaccSide;
};

function pip(rank: Rank): number {
  if (rank === "A") return 1;
  if (rank === "10" || rank === "J" || rank === "Q" || rank === "K") return 0;
  return Number(rank);
}

export function baccTotal(cards: Card[]): number {
  return cards.reduce((sum, card) => sum + pip(card.rank), 0) % 10;
}

function take(shoe: Card[]): Card {
  const card = shoe.pop();
  if (!card) throw new Error("Shoe empty");
  return card;
}

function bankerDraws(total: number, third: number | null): boolean {
  if (third === null) return total <= 5;
  if (total <= 2) return true;
  if (total === 3) return third !== 8;
  if (total === 4) return third >= 2 && third <= 7;
  if (total === 5) return third >= 4 && third <= 7;
  if (total === 6) return third === 6 || third === 7;
  return false;
}

export function playCoup(round: number): Coup {
  const shoe = freshShoe(mulberry32(roundSeed("baccarat", round)));
  const player = [take(shoe), take(shoe)];
  const banker = [take(shoe), take(shoe)];
  const playerTwo = baccTotal(player);
  const bankerTwo = baccTotal(banker);
  if (playerTwo < 8 && bankerTwo < 8) {
    let third: number | null = null;
    if (playerTwo <= 5) {
      const card = take(shoe);
      player.push(card);
      third = pip(card.rank);
    }
    if (bankerDraws(bankerTwo, third)) banker.push(take(shoe));
  }
  const playerFinal = baccTotal(player);
  const bankerFinal = baccTotal(banker);
  const winner: BaccSide = playerFinal > bankerFinal ? "player" : bankerFinal > playerFinal ? "banker" : "tie";
  return { player, banker, winner };
}

export function potStake(pot: Pot): number {
  return pot.player + pot.banker + pot.tie;
}

/** Chips returned to the rack, including pushed player and banker bets on a tie. */
export function settlePot(pot: Pot, winner: BaccSide): number {
  let back = 0;
  if (winner === "tie") {
    back += pot.player + pot.banker;
    back += pot.tie * 9;
    return back;
  }
  if (winner === "player") back += pot.player * 2;
  if (winner === "banker") back += pot.banker + Math.floor((pot.banker * 95) / 100);
  return back;
}

export function winnerWord(winner: BaccSide): string {
  if (winner === "player") return "Player";
  if (winner === "banker") return "Banker";
  return "Tie";
}
