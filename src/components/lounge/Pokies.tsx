import { useEffect, useRef, useState } from "react";
import { SymIcon, symTone } from "@/components/lounge/Icons";
import { DealerStage, LiveRail, SeatRail, useLiveClock } from "@/components/lounge/LiveChrome";
import { playSpin, playTick, playWin, unlockAudio } from "@/lib/lounge/audio";
import { DEALERS, formatClock, mulberry32, roundSeed } from "@/lib/lounge/live";
import {
  BETS,
  LINES,
  PAY,
  STARTER,
  SYMBOL_LABEL,
  evaluate,
  spinGrid,
  type LineHit,
  type Sym,
} from "@/lib/lounge/slots";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

const ORDER: Sym[] = ["star", "seven", "crown", "diamond", "lips", "heart", "spade", "chip", "dice", "card"];

export function Pokies() {
  const clock = useLiveClock("pokies");
  const [bet, setBet] = useState<(typeof BETS)[number]>(25);
  const [queued, setQueued] = useState(false);
  const [grid, setGrid] = useState<Sym[][]>(STARTER);
  const [locked, setLocked] = useState([true, true, true]);
  const [hits, setHits] = useState<LineHit[]>([]);
  const [banner, setBanner] = useState("One spin for the whole studio. Ride it, or watch.");
  const [freeLeft, setFreeLeft] = useState(0);
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const pending = useRef<{ amount: number; note: string } | null>(null);
  const lock = useRef(false);
  const spun = useRef<number | null>(null);
  const queuedRef = useRef(false);
  const freeRef = useRef(0);
  const betRef = useRef(bet);
  queuedRef.current = queued;
  freeRef.current = freeLeft;
  betRef.current = bet;

  function settlePending() {
    const due = pending.current;
    if (!due) return;
    pending.current = null;
    if (due.amount > 0) useCasino.getState().apply("pokies", due.note, due.amount);
  }

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      settlePending();
    };
  }, []);

  const betIndex = BETS.indexOf(bet);

  function beginSpin(result: Sym[][], stakeAmount: number, free: boolean) {
    if (lock.current) return;
    settlePending();
    lock.current = true;
    setBusy(true);
    const scored = stakeAmount > 0 ? evaluate(result, stakeAmount, free) : null;
    pending.current = scored ? { amount: scored.total, note: scored.banner } : null;
    setGrid(result);
    setHits([]);
    setLocked([false, false, false]);
    setBanner(stakeAmount > 0 ? (free ? "Free spin" : "Reels live") : "Watching the studio");
    playSpin(useCasino.getState().muted);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gaps = reduced ? [40, 40, 40] : [480, 860, 1240];
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = gaps.map((ms, reel) =>
      window.setTimeout(() => {
        playTick(useCasino.getState().muted);
        setLocked((prev) => {
          const next = [...prev];
          next[reel] = true;
          return next;
        });
        if (reel !== 2) return;
        settlePending();
        if (scored && stakeAmount > 0) {
          setHits(scored.hits);
          setBanner(
            scored.total > 0 || scored.freeAward > 0 ? `${scored.banner} · ${formatDelta(scored.total)}` : scored.banner,
          );
          if (scored.freeAward) setFreeLeft((n) => Math.min(48, n + scored.freeAward));
          if (scored.total > 0) playWin(useCasino.getState().muted, scored.total >= stakeAmount * 15);
        } else {
          setBanner("Studio spin. You sat this one out.");
        }
        lock.current = false;
        setBusy(false);
      }, ms),
    );
  }

  useEffect(() => {
    if (clock.phase === "betting") {
      if (spun.current === clock.round) return;
      setBanner(
        freeRef.current > 0
          ? `${freeRef.current} free · they ride themselves`
          : queuedRef.current
            ? `Riding ${formatChips(betRef.current)} · closes ${formatClock(clock.left)}`
            : "Bets open. Ride this spin, or watch.",
      );
      return;
    }
    if (clock.phase !== "action" || spun.current === clock.round) return;
    spun.current = clock.round;
    const rng = mulberry32(roundSeed("pokies", clock.round));
    const result = spinGrid(rng);
    const free = freeRef.current > 0;
    const riding = queuedRef.current || free;
    const stakeAmount = betRef.current;
    if (!riding) {
      beginSpin(result, 0, false);
      return;
    }
    if (free) setFreeLeft((n) => Math.max(0, n - 1));
    else {
      setQueued(false);
      const ok = useCasino.getState().apply("pokies", `Spin ${formatChips(stakeAmount)}`, -stakeAmount);
      if (!ok) {
        setBanner("Not enough chips. Watching.");
        beginSpin(result, 0, false);
        return;
      }
    }
    beginSpin(result, stakeAmount, free);
  }, [clock.phase, clock.round]);

  const hot = new Set(hits.flatMap((hit) => hit.cells.map((cell) => `${cell.reel}:${cell.row}`)));
  const riderRng = mulberry32(roundSeed("pokies-seats", clock.round));
  const riders = ["Ivo", "Nia", "Cal"].map((name) => {
    if (riderRng() < 0.3) return { name, detail: "Watching" };
    const amount = [25, 50, 100][Math.floor(riderRng() * 3)]!;
    return { name, detail: `Riding ${formatChips(amount)}` };
  });

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <DealerStage art="/art/pokies.jpg" dealer="/art/dealer-lumen.jpg" name={DEALERS.pokies} />
        <div className="p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-brand text-pink">NEON 77</p>
            <p className="font-display text-2xl text-gold">Pokies</p>
          </div>
          <p className="text-right text-sm text-mist" aria-live="polite">
            {freeLeft > 0 ? <span className="font-semibold text-pink">{freeLeft} free</span> : `${LINES.length} lines`}
          </p>
        </div>
        <LiveRail table="pokies" dealer={DEALERS.pokies} call={clock.phase === "betting" ? "Bets open" : "Same spin for every seat"} live={clock} />

        <div className="grid grid-cols-3 gap-2 rounded-card border border-line bg-midnight p-2 sm:gap-3 sm:p-3">
          {grid.map((reel, reelIndex) => (
            <div
              key={reelIndex}
              className={`reel-window h-60 rounded-md bg-graphite sm:h-72 ${locked[reelIndex] ? "" : "reel-spin"}`}
            >
              {locked[reelIndex] ? (
                <div className={busy ? "" : "reel-land"}>
                  {reel.map((sym, row) => (
                    <Symbol key={`${reelIndex}-${row}`} sym={sym} hot={hot.has(`${reelIndex}:${row}`)} />
                  ))}
                </div>
              ) : (
                <div className="reel-strip">
                  {[...ORDER, ...ORDER].map((sym, row) => (
                    <Symbol key={`${reelIndex}-s-${row}`} sym={sym} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <SeatRail seats={riders} />

        <p className="mt-4 min-h-6 text-center text-sm font-semibold text-gold" aria-live="polite" data-testid="pokies-banner">
          {banner}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Lower stake"
            disabled={clock.phase !== "betting" || betIndex <= 0}
            onClick={() => setBet(BETS[betIndex - 1]!)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg text-ink disabled:opacity-40"
          >
            −
          </button>
          <p className="min-w-28 text-center text-sm font-semibold tabular-nums text-ink">
            {formatChips(bet)}
            <span className="mt-0.5 block text-xs font-medium tracking-brand text-mist">STAKE</span>
          </p>
          <button
            type="button"
            aria-label="Raise stake"
            disabled={clock.phase !== "betting" || betIndex >= BETS.length - 1}
            onClick={() => setBet(BETS[betIndex + 1]!)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg text-ink disabled:opacity-40"
          >
            +
          </button>
          <button
            type="button"
            data-testid="spin"
            disabled={freeLeft > 0}
            onClick={() => {
              unlockAudio();
              setQueued((on) => !on);
            }}
            className="min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold tracking-wide text-midnight disabled:opacity-40"
          >
            {freeLeft > 0 ? "Free spins ride" : queued ? "Riding" : "Ride this spin"}
          </button>
        </div>
        </div>
      </div>

      <details className="mt-4 rounded-card border border-line bg-graphite/70 p-4">
        <summary className="text-sm font-semibold text-gold">Paytable · line stake {formatChips(bet / LINES.length)}</summary>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Five lines, left to right. The star stands in for any symbol. Stars, sevens, crowns, diamonds, lips and
          hearts also pay as a pair. Three or more sevens anywhere pay 4× the stake and award 5 free spins at
          double, up to 48 waiting.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ORDER.map((sym) => (
            <li key={sym} className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-sm">
              <span className={`inline-flex items-center gap-2 ${symTone(sym)}`}>
                <SymIcon sym={sym} className="size-5" />
                {SYMBOL_LABEL[sym]}
              </span>
              <span className="tabular-nums text-mist">
                {PAY[sym][0] === 0 ? "—" : formatChips(PAY[sym][0] * (bet / LINES.length))}
                {" / "}
                {formatChips(PAY[sym][1] * (bet / LINES.length))}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Symbol({ sym, hot = false }: { sym: Sym; hot?: boolean }) {
  return (
    <div className={`reel-cell flex h-20 items-center justify-center sm:h-24 ${hot ? "win-cell" : ""}`}>
      <span className={symTone(sym)}>
        <SymIcon sym={sym} className="size-9 sm:size-11" />
      </span>
    </div>
  );
}
