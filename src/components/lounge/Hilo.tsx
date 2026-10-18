import { useState } from "react";
import { SuitMark } from "@/components/lounge/Icons";
import { playClick, playLose, playWin, unlockAudio } from "@/lib/lounge/audio";
import type { Card, Rank, Suit } from "@/lib/lounge/blackjack";
import { TABLE_BETS, hiloValue, oneDeck, take } from "@/lib/lounge/originals";
import { formatChips, useCasino } from "@/lib/lounge/store";

export function Hilo() {
  const balance = useCasino((s) => s.balance);
  const [bet, setBet] = useState<(typeof TABLE_BETS)[number]>(25);
  const [deck, setDeck] = useState<Card[]>([]);
  const [card, setCard] = useState<Card | null>(null);
  const [pot, setPot] = useState(0);
  const [banner, setBanner] = useState("Higher or lower. A tie loses. Cash whenever you like.");

  function start() {
    unlockAudio();
    if (!useCasino.getState().apply("hilo", `Climb ${formatChips(bet)}`, -bet)) {
      setBanner("Not enough chips.");
      return;
    }
    playClick(useCasino.getState().muted);
    const fresh = oneDeck();
    const dealt = take(fresh, 1);
    setDeck(dealt.deck);
    setCard(dealt.cards[0]!);
    setPot(bet);
    setBanner("Call it.");
  }

  function guess(side: "higher" | "lower") {
    if (!card || pot <= 0 || deck.length === 0) return;
    unlockAudio();
    const drawn = take(deck, 1);
    const next = drawn.cards[0]!;
    const now = hiloValue(card.rank as Rank);
    const then = hiloValue(next.rank);
    setDeck(drawn.deck);
    setCard(next);
    const win = side === "higher" ? then > now : then < now;
    const tie = then === now;
    if (win) {
      const nextPot = pot * 2;
      setPot(nextPot);
      playWin(useCasino.getState().muted, false);
      setBanner(`Right. The climb is ${formatChips(nextPot)}.`);
      return;
    }
    playLose(useCasino.getState().muted);
    setPot(0);
    setBanner(tie ? "Tie. The climb drops." : "Wrong. The climb drops.");
  }

  function cash() {
    if (pot <= 0) return;
    unlockAudio();
    useCasino.getState().apply("hilo", "Cash the climb", pot);
    playClick(useCasino.getState().muted);
    setBanner(`Cashed ${formatChips(pot)}.`);
    setPot(0);
  }

  const value = card ? hiloValue(card.rank as Rank) : 0;
  const betIndex = TABLE_BETS.indexOf(bet);
  const live = pot > 0;

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <img src="/art/hilo.jpg" alt="" className="h-40 w-full object-cover sm:h-48" />
        <div className="p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-brand text-pink">ONE DECK</p>
          <h2 className="font-display text-2xl text-gold">Higher</h2>
          <div className="mt-6 flex justify-center">
            {card ? (
              <div
                className={`card-face flex h-36 w-24 flex-col justify-between rounded-md border bg-ink p-2 ${card.suit === "H" || card.suit === "D" ? "border-pink text-pink" : "border-line text-midnight"}`}
              >
                <span className="font-display text-3xl font-semibold leading-none">{card.rank}</span>
                <SuitMark suit={card.suit as Suit} className="size-6 self-end" />
              </div>
            ) : (
              <div className="flex h-36 w-24 items-center justify-center rounded-md border border-dashed border-line">
                <img src="/brand/star-icon-colour.svg" alt="" className="size-10 opacity-70" />
              </div>
            )}
          </div>
          <p className="mt-4 min-h-6 text-center text-sm font-semibold text-gold" data-testid="hilo-banner">
            {banner}
          </p>
          {live ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                data-testid="hilo-higher"
                disabled={value === 13}
                onClick={() => guess("higher")}
                className="min-h-12 rounded-full border border-gold px-5 text-sm font-semibold text-gold disabled:opacity-40"
              >
                Higher
              </button>
              <button
                type="button"
                data-testid="hilo-cash"
                onClick={cash}
                className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-midnight"
              >
                Cash {formatChips(pot)}
              </button>
              <button
                type="button"
                data-testid="hilo-lower"
                disabled={value === 1}
                onClick={() => guess("lower")}
                className="min-h-12 rounded-full border border-gold px-5 text-sm font-semibold text-gold disabled:opacity-40"
              >
                Lower
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Lower stake"
                disabled={betIndex <= 0}
                onClick={() => setBet(TABLE_BETS[betIndex - 1]!)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
              >
                −
              </button>
              <p className="min-w-24 text-center text-sm font-semibold tabular-nums">
                {formatChips(bet)}
                <span className="mt-0.5 block text-xs font-medium tracking-brand text-mist">STAKE</span>
              </p>
              <button
                type="button"
                aria-label="Raise stake"
                disabled={betIndex >= TABLE_BETS.length - 1}
                onClick={() => setBet(TABLE_BETS[betIndex + 1]!)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
              >
                +
              </button>
              <button
                type="button"
                data-testid="hilo-start"
                disabled={balance < bet}
                onClick={start}
                className="min-h-12 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40"
              >
                Start the climb
              </button>
            </div>
          )}
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Ace is low, king is high. A matching rank loses the climb. Each correct call doubles what is on the
            table. Cash returns it to the rack.
          </p>
        </div>
      </div>
    </div>
  );
}
