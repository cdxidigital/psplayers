import { useCasino } from "@/lib/lounge/store";

export function AgeGate() {
  const confirmAge = useCasino((s) => s.confirmAge);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-midnight/75 p-4 sm:items-center" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-title"
        className="w-full max-w-md rounded-card border border-line bg-graphite p-6 shadow-2xl"
      >
        <img src="/brand/star-icon-colour.svg" alt="" className="mb-4 size-12" />
        <p className="text-xs font-semibold tracking-brand text-pink">18+ LOUNGE</p>
        <h2 id="age-title" className="mt-2 font-display text-3xl font-semibold text-gold">
          Play money only.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Pornstar Players is a private floor for adults. Chips are entertainment, not currency — nothing here
          can be cashed, traded, or withdrawn. Confirm you are 18 or older to take a seat.
        </p>
        <button
          type="button"
          data-testid="enter"
          onClick={confirmAge}
          className="mt-6 min-h-12 w-full rounded-full bg-pink text-sm font-semibold tracking-wide text-midnight"
        >
          I’m 18 or older — enter
        </button>
      </div>
    </div>
  );
}
