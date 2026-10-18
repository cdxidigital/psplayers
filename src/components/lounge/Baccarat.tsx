import { useEffect, useMemo, useRef, useState } from "react";
import { SuitMark } from "@/components/lounge/Icons";
import { DealerStage, LiveRail, SeatRail, useLiveClock } from "@/components/lounge/LiveChrome";
import { playLose, playWin, unlockAudio } from "@/lib/lounge/audio";
import {
  BACC_CHIPS,
  EMPTY_POT,
  baccTotal,
  playCoup,
  potStake,
  settlePot,
  winnerWord,
  type BaccSide,
  type Pot,
} from "@/lib/lounge/baccarat";
import type { Card, Suit } from "@/lib/lounge/blackjack";
import { DEALERS } from "@/lib/lounge/live";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

const SIDES: { id: BaccSide; label: string; pay: string }[] = [
  { id: "player", label: "Player", pay: "1 to 1" },
  { id: "banker", label: "Banker", pay: "19 to 20" },
  { id: "tie", label: "Tie", pay: "8 to 1" },
];

export function Baccarat() {
  const clock = useLiveClock("baccarat");
  const closed = clock.phase !== "betting";
  const [chip, setChip] = useState<(typeof BACC_CHIPS)[number]>(50);
  const [pot, setPot] = useState<Pot>(EMPTY_POT);
  const [banner, setBanner] = useState("Bets open. Player, banker, or the tie.");
  const potRef = useRef(pot);
  potRef.current = pot;
  const pending = useRef<{ round: number; pot: Pot; stake: number } | null>(null);
  const opened = useRef<number | null>(null);
  const charged = useRef<number | null>(null);
  const settled = useRef<number | null>(null);

  const shownRound = clock.phase === "betting" ? Math.max(0, clock.round - 1) : clock.round;
  const shown = useMemo(() => playCoup(shownRound), [shownRound]);
  const road = useMemo(
    () => Array.from({ length: 12 }, (_, i) => playCoup(clock.round - i - (clock.phase === "result" ? 0 : 1)).winner),
    [clock.round, clock.phase],
  );

  useEffect(() => {
    return () => {
      const due = pending.current;
      if (!due) return;
      pending.current = null;
      const back = settlePot(due.pot, playCoup(due.round).winner);
      if (back > 0) useCasino.getState().apply("baccarat", "Shoe settled", back);
    };
  }, []);

  useEffect(() => {
    const due = pending.current;
    if (due && due.round !== clock.round) {
      pending.current = null;
      const back = settlePot(due.pot, playCoup(due.round).winner);
      if (back > 0) useCasino.getState().apply("baccarat", "Shoe settled", back);
    }
    const { phase, round } = clock;
    if (phase === "betting") {
      if (opened.current === round) return;
      opened.current = round;
      setPot(EMPTY_POT);
      setBanner("Bets open. Player, banker, or the tie.");
      return;
    }
    if (phase === "action" || phase === "dealing") {
      if (charged.current === round) return;
      charged.current = round;
      const live = { ...potRef.current };
      const stake = potStake(live);
      if (stake <= 0) {
        pending.current = null;
        setBanner("No more bets.");
        return;
      }
      if (!useCasino.getState().apply("baccarat", `Stake ${formatChips(stake)}`, -stake)) {
        pending.current = null;
        setPot(EMPTY_POT);
        setBanner("Not enough chips. Watching the shoe.");
        return;
      }
      pending.current = { round, pot: live, stake };
      setBanner("No more bets.");
      return;
    }
    if (phase === "result") {
      if (settled.current === round) return;
      settled.current = round;
      const coup = playCoup(round);
      const held = pending.current;
      pending.current = null;
      if (!held || held.round !== round) {
        setBanner(winnerWord(coup.winner));
        return;
      }
      const back = settlePot(held.pot, coup.winner);
      if (back > 0) useCasino.getState().apply("baccarat", winnerWord(coup.winner), back);
      const net = back - held.stake;
      if (net > 0) playWin(useCasino.getState().muted, net >= held.stake);
      else if (net < 0) playLose(useCasino.getState().muted);
      setBanner(`${winnerWord(coup.winner)} · ${formatDelta(net)}`);
      setPot(EMPTY_POT);
    }
  }, [clock.phase, clock.round]);

  function add(side: BaccSide) {
    if (closed) return;
    unlockAudio();
    const next = { ...pot, [side]: pot[side] + chip };
    if (potStake(next) > useCasino.getState().balance) {
      setBanner("That chip would overdraw the rack.");
      return;
    }
    setPot(next);
    setBanner(`${formatChips(potStake(next))} on the layout`);
  }

  const seats = ["Mara", "Jules"].map((name, index) => {
    const mark = road[index] ?? "player";
    return { name, detail: mark === "tie" ? "Tie" : mark === "banker" ? "Banker" : "Player" };
  });

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <DealerStage art="/art/baccarat.jpg" dealer="/art/dealer-cleo.jpg" name={DEALERS.baccarat} />
        <div className="felt p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-brand text-pink">PUNTO BANCO</p>
          <h2 className="font-display text-2xl text-gold">The Gold Shoe</h2>
          <LiveRail table="baccarat" dealer={DEALERS.baccarat} call={banner} live={clock} />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <CoupSide label="Player" cards={clock.phase === "betting" ? [] : shown.player} />
            <CoupSide label="Banker" cards={clock.phase === "betting" ? [] : shown.banker} />
          </div>

          <div className="mt-4 flex flex-wrap gap-1">
            {road.map((mark, i) => (
              <span
                key={`${mark}-${i}`}
                className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold ${mark === "player" ? "bg-ink text-midnight" : mark === "banker" ? "bg-pink text-midnight" : "bg-violet text-ink"}`}
              >
                {mark === "player" ? "P" : mark === "banker" ? "B" : "T"}
              </span>
            ))}
          </div>
          <SeatRail seats={seats} />

          <div className="mt-4 flex flex-wrap gap-2">
            {BACC_CHIPS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setChip(value)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ${chip === value ? "bg-gold text-midnight" : "border border-line text-mist"}`}
              >
                {formatChips(value)}
              </button>
            ))}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {SIDES.map((side) => (
              <button
                key={side.id}
                type="button"
                disabled={closed}
                onClick={() => add(side.id)}
                className="min-h-16 rounded-md border border-line bg-midnight/50 px-3 py-2 text-left disabled:opacity-50"
              >
                <span className="block text-sm font-semibold text-ink">{side.label}</span>
                <span className="text-xs text-mist">{side.pay}</span>
                {pot[side.id] > 0 && (
                  <span className="mt-1 block text-sm font-semibold text-gold">{formatChips(pot[side.id])}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={closed || potStake(pot) === 0}
              onClick={() => {
                setPot(EMPTY_POT);
                setBanner("Layout cleared.");
              }}
              className="min-h-12 rounded-full border border-line px-5 text-sm font-semibold text-mist disabled:opacity-40"
            >
              Clear
            </button>
            <p className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-pink px-4 text-sm font-semibold text-midnight">
              {closed ? "No more bets" : "Lay a side"}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Naturals stand. The banker draw follows the tableau. A tie pushes player and banker, and pays the tie
            at 8 to 1. Banker wins pay a five percent commission.
          </p>
        </div>
      </div>
    </div>
  );
}

function CoupSide({ label, cards }: { label: string; cards: Card[] }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-xs font-semibold tracking-brand text-mist">{label.toUpperCase()}</p>
        <p className="text-sm tabular-nums text-ink">{cards.length ? baccTotal(cards) : "—"}</p>
      </div>
      <div className="flex min-h-24 gap-2">
        {cards.length === 0 && <div className="h-24 w-16 rounded-md border border-dashed border-white/30" />}
        {cards.map((card, index) => (
          <MiniCard key={`${card.rank}${card.suit}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}

function MiniCard({ card }: { card: Card }) {
  const red = card.suit === "H" || card.suit === "D";
  return (
    <div className={`card-face flex h-24 w-16 flex-col justify-between rounded-md border bg-ink p-1.5 ${red ? "border-pink text-pink" : "border-line text-midnight"}`}>
      <span className="font-display text-lg font-semibold leading-none">{card.rank}</span>
      <SuitMark suit={card.suit as Suit} className="size-4 self-end" />
    </div>
  );
}
