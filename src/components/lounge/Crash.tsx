import { useEffect, useRef, useState } from "react";
import { playLose, playWin, unlockAudio } from "@/lib/lounge/audio";
import { TABLE_BETS, climbAt, crashPoint } from "@/lib/lounge/originals";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

export function Crash() {
  const balance = useCasino((s) => s.balance);
  const [bet, setBet] = useState<(typeof TABLE_BETS)[number]>(25);
  const [mult, setMult] = useState(1);
  const [running, setRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [banner, setBanner] = useState("The star climbs. Cash out before it breaks.");
  const bust = useRef(1);
  const started = useRef(0);
  const cashed = useRef(false);
  const timer = useRef<number | null>(null);
  const multRef = useRef(1);
  const betRef = useRef(bet);
  const runningRef = useRef(false);
  multRef.current = mult;
  betRef.current = bet;
  runningRef.current = running;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      if (!runningRef.current || cashed.current) return;
      cashed.current = true;
      const back = Math.floor(betRef.current * multRef.current);
      if (back > 0) useCasino.getState().apply("crash", "Left the climb", back);
    };
  }, []);

  function stop(at: number, didCrash: boolean) {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
    setMult(at);
    setCrashed(didCrash);
    if (cashed.current) return;
    cashed.current = true;
    if (didCrash) {
      playLose(useCasino.getState().muted);
      setBanner(`Broke at ${at.toFixed(2)} · ${formatDelta(-bet)}`);
      return;
    }
    const back = Math.floor(bet * at);
    useCasino.getState().apply("crash", `Cash ${at.toFixed(2)}×`, back);
    playWin(useCasino.getState().muted, at >= 5);
    setBanner(`Cashed ${at.toFixed(2)}× · ${formatDelta(back - bet)}`);
  }

  function launch() {
    if (running) return;
    unlockAudio();
    if (!useCasino.getState().apply("crash", `Launch ${formatChips(bet)}`, -bet)) {
      setBanner("Not enough chips.");
      return;
    }
    bust.current = crashPoint();
    cashed.current = false;
    started.current = performance.now();
    setCrashed(false);
    setRunning(true);
    setMult(1);
    setBanner("Climbing.");
    timer.current = window.setInterval(() => {
      const next = climbAt(performance.now() - started.current);
      if (next >= bust.current) {
        stop(bust.current, true);
        return;
      }
      setMult(next);
    }, 80);
  }

  function cash() {
    if (!running || cashed.current) return;
    stop(mult, false);
  }

  const betIndex = TABLE_BETS.indexOf(bet);

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <img src="/art/crash.jpg" alt="" className="h-40 w-full object-cover sm:h-48" />
        <div className="p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-brand text-pink">CASH OUT</p>
          <h2 className="font-display text-2xl text-gold">Star Crash</h2>
          <div className="mt-6 flex flex-col items-center">
            <img
              src="/brand/star-icon-colour.svg"
              alt=""
              className="size-16"
              style={{ transform: `scale(${Math.min(2.2, 0.8 + mult / 4)})`, opacity: crashed ? 0.35 : 1 }}
            />
            <p
              className={`mt-3 font-display text-6xl font-semibold tabular-nums ${crashed ? "text-pink" : "text-gold"}`}
              data-testid="crash-mult"
            >
              {mult.toFixed(2)}×
            </p>
            <p className="mt-2 min-h-6 text-sm font-semibold text-ink" data-testid="crash-banner">
              {banner}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Lower stake"
              disabled={running || betIndex <= 0}
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
              disabled={running || betIndex >= TABLE_BETS.length - 1}
              onClick={() => setBet(TABLE_BETS[betIndex + 1]!)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
            >
              +
            </button>
            {running ? (
              <button
                type="button"
                data-testid="crash-cash"
                onClick={cash}
                className="min-h-12 min-w-36 rounded-full bg-gold px-6 text-sm font-semibold text-midnight"
              >
                Cash out
              </button>
            ) : (
              <button
                type="button"
                data-testid="crash-launch"
                disabled={balance < bet}
                onClick={launch}
                className="min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40"
              >
                Launch
              </button>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            The star starts at 1.00 and climbs until it breaks. Cash out locks the multiplier. A break at 1.00
            pays nothing. This table takes a thin edge on the break point.
          </p>
        </div>
      </div>
    </div>
  );
}
