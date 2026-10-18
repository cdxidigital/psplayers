import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import type { ReactNode } from "react";
import { formatChips, useCasino } from "@/lib/lounge/store";
import { playClick, unlockAudio } from "@/lib/lounge/audio";

export function Shell({
  children,
  title,
  onBack,
}: {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}) {
  const balance = useCasino((s) => s.balance);
  const muted = useCasino((s) => s.muted);
  const toggleMute = useCasino((s) => s.toggleMute);
  const comp = useCasino((s) => s.comp);

  return (
    <div className="floor text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-midnight/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-3 text-sm text-mist hover:border-gold hover:text-ink"
            >
              <ChevronLeft className="size-4" aria-hidden />
              Floor
            </button>
          ) : (
            <img src="/brand/star-icon-colour.svg" alt="" className="size-8 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            {title ? (
              <p className="truncate font-display text-lg font-semibold text-gold">{title}</p>
            ) : (
              <img
                src="/brand/wordmark-simplified-colour.svg"
                alt="Pornstar Players"
                className="h-8 w-auto max-w-full sm:h-10"
              />
            )}
          </div>
          <p
            data-testid="balance"
            className="rounded-full border border-gold/50 bg-graphite px-3 py-2 text-sm font-semibold tabular-nums text-gold"
          >
            {formatChips(balance)}
            <span className="ml-1 hidden font-medium tracking-brand text-mist sm:inline">CHIPS</span>
          </p>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => {
              unlockAudio();
              playClick(!muted);
              toggleMute();
            }}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-mist hover:text-ink"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      {balance < 100 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-graphite/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <p className="text-sm text-mist">Rack’s light. The house will comp you back to five thousand.</p>
            <button
              type="button"
              onClick={() => comp()}
              className="min-h-11 shrink-0 rounded-full bg-pink px-4 text-sm font-semibold text-midnight"
            >
              Take comp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
