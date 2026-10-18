import { useEffect, useRef, useState } from "react";
import { DealerStage, LiveRail, SeatRail, useLiveClock } from "@/components/lounge/LiveChrome";
import { playLose, playSpin, playWin, unlockAudio } from "@/lib/lounge/audio";
import { DEALERS, formatClock, rouletteSeats, wheelPocket } from "@/lib/lounge/live";
import {
  CHIPS,
  WHEEL,
  columnBet,
  dozenBet,
  outsideBet,
  rotationFor,
  settleWheel,
  stakeOf,
  stackBet,
  straightBet,
  toneOf,
  type BetKind,
  type RouletteBet,
} from "@/lib/lounge/roulette";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

const SLICE = 360 / WHEEL.length;

function toneName(n: number): string {
  const tone = toneOf(n);
  if (tone === "zero") return "zero";
  return tone === "red" ? "red" : "black";
}

export function Roulette() {
  const clock = useLiveClock("roulette");
  const closed = clock.phase !== "betting";
  const [chip, setChip] = useState<(typeof CHIPS)[number]>(25);
  const [bets, setBets] = useState<RouletteBet[]>([]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [banner, setBanner] = useState("Bets open. The wheel does not wait.");
  const betsRef = useRef(bets);
  betsRef.current = bets;
  const pending = useRef<{ round: number; bets: RouletteBet[]; stake: number } | null>(null);
  const opened = useRef<number | null>(null);
  const spun = useRef<number | null>(null);
  const settled = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      const due = pending.current;
      if (!due) return;
      pending.current = null;
      const { payout, winners } = settleWheel(due.bets, wheelPocket(due.round));
      if (payout > 0) useCasino.getState().apply("roulette", `${due.round} · ${winners.join(", ")}`, payout);
    };
  }, []);

  useEffect(() => {
    const due = pending.current;
    if (due && due.round !== clock.round) {
      pending.current = null;
      const missed = wheelPocket(due.round);
      const { payout, winners } = settleWheel(due.bets, missed);
      if (payout > 0) useCasino.getState().apply("roulette", `${missed} · ${winners.join(", ")}`, payout);
    }

    const { phase, round } = clock;
    if (phase === "betting") {
      if (opened.current === round) return;
      opened.current = round;
      setBets([]);
      setSpinning(false);
      setResult(round > 0 ? wheelPocket(round - 1) : null);
      setBanner("Bets open. The wheel does not wait.");
      return;
    }

    if (phase === "action") {
      if (spun.current === round) return;
      spun.current = round;
      const live = betsRef.current.slice();
      const n = wheelPocket(round);
      setResult(null);
      setSpinning(true);
      setRotation((current) => rotationFor(n, current));
      playSpin(useCasino.getState().muted);
      const stake = stakeOf(live);
      if (stake <= 0) {
        pending.current = null;
        setBanner("No more bets.");
        return;
      }
      if (!useCasino.getState().apply("roulette", `Stake ${formatChips(stake)}`, -stake)) {
        pending.current = null;
        setBets([]);
        setBanner("Not enough chips. Watching the wheel.");
        return;
      }
      pending.current = { round, bets: live, stake };
      setBanner("No more bets.");
      return;
    }

    if (phase === "result") {
      if (settled.current === round) return;
      settled.current = round;
      const n = wheelPocket(round);
      setSpinning(false);
      setResult(n);
      const due = pending.current;
      pending.current = null;
      if (!due || due.round !== round) {
        setBanner(`${n} ${toneName(n)}`);
        return;
      }
      const { payout, winners } = settleWheel(due.bets, n);
      if (payout > 0) useCasino.getState().apply("roulette", `${n} · ${winners.join(", ")}`, payout);
      const net = payout - due.stake;
      if (payout > 0) playWin(useCasino.getState().muted, payout >= due.stake * 10);
      else playLose(useCasino.getState().muted);
      setBanner(payout > 0 ? `${n} hits · ${winners.join(" · ")} · ${formatDelta(net)}` : `${n} ${toneName(n)} · house takes the felt`);
      setBets([]);
    }
  }, [clock.phase, clock.round]);

  const stake = stakeOf(bets);
  const seats = rouletteSeats(clock.phase === "betting" ? clock.round : clock.round);
  const history = Array.from({ length: 10 }, (_, i) =>
    wheelPocket(clock.round - i - (clock.phase === "result" ? 0 : 1)),
  );

  function add(next: RouletteBet) {
    if (closed) return;
    unlockAudio();
    const stacked = stackBet(bets, next);
    if (stakeOf(stacked) > useCasino.getState().balance) {
      setBanner("That chip would overdraw the rack.");
      return;
    }
    setBets(stacked);
    setBanner(`${formatChips(stakeOf(stacked))} on the felt · closes ${formatClock(clock.left)}`);
  }

  function amountFor(id: string) {
    return bets.find((bet) => bet.id === id)?.amount ?? 0;
  }

  return (
    <div className="grid gap-6 pb-24 lg:grid-cols-[280px_1fr]">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <DealerStage art="/art/roulette.jpg" dealer="/art/dealer-noor.jpg" name={DEALERS.roulette} />
        <div className="p-4">
        <p className="text-xs font-semibold tracking-brand text-pink">SINGLE ZERO</p>
        <h2 className="font-display text-2xl text-gold">Midnight Wheel</h2>
        <LiveRail table="roulette" dealer={DEALERS.roulette} call={banner} live={clock} />
        <div className="relative mx-auto mt-4 aspect-square w-full max-w-72">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <g
              className="wheel-rotor"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4.4s cubic-bezier(0.12, 0.7, 0.08, 1)" : undefined,
              }}
            >
              {WHEEL.map((n, i) => {
                const tone = toneOf(n);
                const hot = result === n && !spinning;
                return (
                  <g key={`${n}-${i}`} transform={`translate(100 100) rotate(${i * SLICE})`}>
                    <path
                      d={wedge(SLICE, 94)}
                      className={tone === "zero" ? "fill-violet" : tone === "red" ? "fill-pink" : "fill-midnight"}
                      stroke={hot ? "#F6E3A1" : "#3A3A46"}
                      strokeWidth={hot ? 1.6 : 0.4}
                    />
                    <text
                      y={-72}
                      textAnchor="middle"
                      className="fill-ink font-sans"
                      fontSize="7.5"
                      fontWeight="700"
                    >
                      {n}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="26" className="fill-graphite stroke-gold" strokeWidth="2" />
            </g>
            <polygon points="100,6 93,20 107,20" className="fill-gold" />
          </svg>
          <img
            src="/brand/star-icon-colour.svg"
            alt=""
            className="pointer-events-none absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <p className="mt-3 min-h-12 text-center text-sm font-semibold text-gold" aria-live="polite" data-testid="roulette-banner">
          {banner}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {history.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold ${toneOf(n) === "red" ? "bg-pink text-midnight" : toneOf(n) === "zero" ? "bg-violet text-ink" : "bg-midnight text-ink"}`}
            >
              {n}
            </span>
          ))}
        </div>
        <SeatRail
          seats={seats.map((seat) => ({
            name: seat.name,
            detail: seat.amount > 0 ? `${seat.label} · ${formatChips(seat.amount)}` : "Sitting out",
          }))}
        />
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {CHIPS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setChip(value)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${chip === value ? "bg-gold text-midnight" : "border border-line text-mist"}`}
            >
              {formatChips(value)}
            </button>
          ))}
          <p className="ml-auto text-sm text-mist">
            On felt <span className="font-semibold text-ink">{formatChips(stake)}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            disabled={closed}
            onClick={() => add(straightBet(0, chip))}
            className="col-span-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-violet text-sm font-semibold text-ink"
          >
            0
            {amountFor("n-0") > 0 && <ChipBadge amount={amountFor("n-0")} />}
          </button>
          {Array.from({ length: 12 }, (_, row) =>
            [1, 2, 3].map((col) => {
              const n = row * 3 + col;
              const tone = toneOf(n);
              const laid = amountFor(`n-${n}`);
              return (
                <button
                  key={n}
                  type="button"
                  disabled={closed}
                  onClick={() => add(straightBet(n, chip))}
                  className={`relative flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-ink ${tone === "red" ? "bg-pink" : "bg-midnight border border-line"} ${result === n ? "ring-2 ring-gold" : ""}`}
                >
                  {n}
                  {laid > 0 && (
                    <span className="absolute right-1 bottom-0.5 text-xs font-semibold text-gold">{formatChips(laid)}</span>
                  )}
                </button>
              );
            }),
          )}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1">
          {([0, 1, 2] as const).map((index) => (
            <FeltButton
              key={`d-${index}`}
              disabled={closed}
              label={dozenBet(index, chip).label}
              amount={amountFor(`d-${index}`)}
              onClick={() => add(dozenBet(index, chip))}
            />
          ))}
          {([0, 1, 2] as const).map((index) => (
            <FeltButton
              key={`c-${index}`}
              disabled={closed}
              label={`Col ${index + 1}`}
              amount={amountFor(`c-${index}`)}
              onClick={() => add(columnBet(index, chip))}
            />
          ))}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
          {(
            [
              ["red", "Red"],
              ["black", "Black"],
              ["odd", "Odd"],
              ["even", "Even"],
              ["low", "1–18"],
              ["high", "19–36"],
            ] as const
          ).map(([kind, label]) => (
            <FeltButton
              key={kind}
              disabled={closed}
              label={label}
              amount={amountFor(kind)}
              tone={kind === "red" ? "red" : kind === "black" ? "black" : "plain"}
              onClick={() => add(outsideBet(kind as Exclude<BetKind, "straight" | "dozen" | "column">, chip))}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={closed || bets.length === 0}
            onClick={() => {
              setBets([]);
              setBanner("Felt cleared.");
            }}
            className="min-h-12 rounded-full border border-line px-5 text-sm font-semibold text-mist disabled:opacity-40"
          >
            Clear
          </button>
          <p
            data-testid="roulette-spin"
            className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-pink px-4 text-sm font-semibold text-midnight"
          >
            {closed ? "No more bets" : `Closes ${formatClock(clock.left)}`}
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          The wheel spins on a clock. Chips on the felt ride the next pocket. An empty felt watches. Straights
          pay 35 to 1. Dozens and columns pay 2 to 1. Pink pockets are the reds.
        </p>
      </div>
    </div>
  );
}

function wedge(slice: number, r: number): string {
  const half = ((slice * Math.PI) / 180) / 2;
  const x0 = Math.sin(-half) * r;
  const y0 = -Math.cos(-half) * r;
  const x1 = Math.sin(half) * r;
  const y1 = -Math.cos(half) * r;
  return `M 0 0 L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function ChipBadge({ amount }: { amount: number }) {
  return <span className="text-xs font-semibold text-gold">{formatChips(amount)}</span>;
}

function FeltButton({
  label,
  amount,
  onClick,
  disabled,
  tone = "plain",
}: {
  label: string;
  amount: number;
  onClick: () => void;
  disabled: boolean;
  tone?: "plain" | "red" | "black";
}) {
  const toneClass =
    tone === "red" ? "bg-pink text-ink" : tone === "black" ? "bg-midnight text-ink" : "bg-graphite text-ink";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-11 items-center justify-center gap-2 rounded-md border border-line text-sm font-semibold ${toneClass}`}
    >
      {label}
      {amount > 0 && <span className="text-xs text-gold">{formatChips(amount)}</span>}
    </button>
  );
}
