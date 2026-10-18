import { useState } from "react";
import { playLose, playWin, unlockAudio } from "@/lib/lounge/audio";
import { TABLE_BETS, diceReturn, rollPair, type DiceSide } from "@/lib/lounge/originals";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

const SIDES: { id: DiceSide; label: string; pay: string }[] = [
  { id: "low", label: "Low 2–6", pay: "1 to 1" },
  { id: "high", label: "High 8–12", pay: "1 to 1" },
  { id: "seven", label: "Seven", pay: "4 to 1" },
  { id: "pair", label: "Any pair", pay: "4 to 1" },
];

export function Dice() {
  const balance = useCasino((s) => s.balance);
  const [bet, setBet] = useState<(typeof TABLE_BETS)[number]>(25);
  const [side, setSide] = useState<DiceSide>("seven");
  const [dice, setDice] = useState<[number, number] | null>(null);
  const [banner, setBanner] = useState("Two dice. Low, high, seven, or a pair.");
  const [busy, setBusy] = useState(false);

  function roll() {
    if (busy) return;
    unlockAudio();
    if (!useCasino.getState().apply("dice", `${side} ${formatChips(bet)}`, -bet)) {
      setBanner("Not enough chips.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      const next = rollPair();
      const back = diceReturn(side, next, bet);
      if (back > 0) {
        useCasino.getState().apply("dice", `${next[0]} · ${next[1]}`, back);
        playWin(useCasino.getState().muted, side === "seven" || side === "pair");
      } else playLose(useCasino.getState().muted);
      setDice(next);
      setBanner(
        back > 0
          ? `${next[0]} and ${next[1]} · ${formatDelta(back - bet)}`
          : `${next[0]} and ${next[1]} · ${formatDelta(-bet)}`,
      );
      setBusy(false);
    }, 420);
  }

  const betIndex = TABLE_BETS.indexOf(bet);

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <img src="/art/dice.jpg" alt="" className="h-40 w-full object-cover sm:h-48" />
        <div className="p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-brand text-pink">TWO DICE</p>
          <h2 className="font-display text-2xl text-gold">Pink Dice</h2>
          <div className="mt-6 flex justify-center gap-3">
            {(dice ?? [null, null]).map((face, index) => (
              <div
                key={index}
                className="flex size-20 items-center justify-center rounded-md border border-pink bg-midnight font-display text-4xl font-semibold text-pink"
              >
                {face ?? "·"}
              </div>
            ))}
          </div>
          <p className="mt-4 min-h-6 text-center text-sm font-semibold text-gold" data-testid="dice-banner">
            {banner}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {SIDES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSide(item.id)}
                className={`min-h-14 rounded-md border px-3 py-2 text-left ${side === item.id ? "border-gold bg-gold/10" : "border-line"}`}
              >
                <span className="block text-sm font-semibold text-ink">{item.label}</span>
                <span className="text-xs text-mist">{item.pay}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Lower stake"
              disabled={busy || betIndex <= 0}
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
              disabled={busy || betIndex >= TABLE_BETS.length - 1}
              onClick={() => setBet(TABLE_BETS[betIndex + 1]!)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
            >
              +
            </button>
            <button
              type="button"
              data-testid="dice-roll"
              disabled={busy || balance < bet}
              onClick={roll}
              className="min-h-12 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40"
            >
              {busy ? "Rolling" : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
