import { useEffect, useState } from "react";
import {
  formatClock,
  liveState,
  phaseLabel,
  type LiveSnap,
  type TableId,
} from "@/lib/lounge/live";

export function useLiveClock(id: TableId): LiveSnap {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, []);
  return liveState(id, now);
}

export function LiveRail({
  table,
  dealer,
  call,
  live,
}: {
  table: TableId;
  dealer: string;
  call: string;
  live: LiveSnap;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-midnight px-4 py-2">
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-brand text-pink">
        <span className="live-dot" aria-hidden />
        LIVE
      </span>
      <span className="text-sm font-semibold text-ink">{dealer}</span>
      <span className="min-w-0 text-sm text-mist">{call}</span>
      <span className="ml-auto text-sm font-semibold tabular-nums text-gold">
        {phaseLabel(table, live.phase)} · {formatClock(live.left)}
      </span>
    </div>
  );
}

export function SeatRail({ seats }: { seats: { name: string; detail: string }[] }) {
  return (
    <ul className="mt-3 grid grid-cols-2 gap-2">
      {seats.map((seat) => (
        <li key={seat.name} className="rounded-md border border-line bg-midnight/60 px-3 py-2">
          <p className="text-xs font-semibold tracking-brand text-mist">{seat.name.toUpperCase()}</p>
          <p className="truncate text-sm text-ink">{seat.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function DealerStage({ art, dealer, name }: { art: string; dealer: string; name: string }) {
  return (
    <div className="relative">
      <img src={art} alt="" className="h-44 w-full object-cover sm:h-52" />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
      <div className="absolute right-3 bottom-3 left-3 flex items-end gap-3">
        <img src={dealer} alt="" className="size-16 rounded-full border-2 border-gold object-cover sm:size-20" />
        <div className="min-w-0 pb-1">
          <p className="text-xs font-semibold tracking-brand text-pink">DEALER</p>
          <p className="truncate font-display text-xl text-ink">{name}</p>
        </div>
      </div>
    </div>
  );
}
