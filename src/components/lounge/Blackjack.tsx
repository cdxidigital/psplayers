import { useEffect, useRef, useState } from "react";
import { SuitMark } from "@/components/lounge/Icons";
import { DealerStage, LiveRail, SeatRail, useLiveClock } from "@/components/lounge/LiveChrome";
import { playClick, playLose, playWin, unlockAudio } from "@/lib/lounge/audio";
import {
  BJ_BETS,
  canDouble,
  canHit,
  canSplit,
  dealRound,
  doubleRound,
  freshShoe,
  handTotal,
  hitRound,
  splitRound,
  standRound,
  type BJRound,
  type Card,
  type Suit,
} from "@/lib/lounge/blackjack";
import { DEALERS, blackjackSeats, formatClock, mulberry32, roundSeed } from "@/lib/lounge/live";
import { formatChips, formatDelta, useCasino } from "@/lib/lounge/store";

const SUIT: Record<Suit, string> = { S: "♠", H: "♥", D: "♦", C: "♣" };

function cardLabel(card: Card): string {
  return `${card.rank}${SUIT[card.suit]}`;
}

export function Blackjack() {
  const balance = useCasino((s) => s.balance);
  const clock = useLiveClock("blackjack");
  const [bet, setBet] = useState<(typeof BJ_BETS)[number]>(50);
  const [queued, setQueued] = useState(false);
  const [round, setRound] = useState<BJRound | null>(null);
  const [banner, setBanner] = useState("Bets open. Vesper deals on the clock.");
  const roundRef = useRef<BJRound | null>(null);
  const queuedRef = useRef(false);
  const betRef = useRef(bet);
  queuedRef.current = queued;
  betRef.current = bet;
  const dealtRound = useRef<number | null>(null);
  const paidRound = useRef<number | null>(null);

  function remember(next: BJRound) {
    roundRef.current = next;
    setRound(next);
  }

  useEffect(() => {
    return () => {
      const id = dealtRound.current;
      const current = roundRef.current;
      if (id === null || !current || paidRound.current === id) return;
      let done = current;
      while (done.phase === "player") done = standRound(done);
      paidRound.current = id;
      if (done.awarded > 0) useCasino.getState().apply("blackjack", done.note, done.awarded);
    };
  }, []);

  useEffect(() => {
    const { phase, round: id } = clock;
    if (phase === "betting") {
      const prev = dealtRound.current;
      const open = roundRef.current;
      if (prev !== null && prev !== id && open && paidRound.current !== prev) {
        let done = open;
        while (done.phase === "player") done = standRound(done);
        paidRound.current = prev;
        if (done.awarded > 0) useCasino.getState().apply("blackjack", done.note, done.awarded);
      }
      if (dealtRound.current !== id) {
        roundRef.current = null;
        setRound(null);
        setBanner(queuedRef.current ? `Down for ${formatChips(betRef.current)}` : "Bets open. Sit this hand or watch.");
      }
      return;
    }
    if (dealtRound.current !== id) {
      dealtRound.current = id;
      if (!queuedRef.current) {
        roundRef.current = null;
        setRound(null);
        setBanner("Sitting out. The shoe still moves.");
      } else {
        const stake = betRef.current;
        setQueued(false);
        if (!useCasino.getState().apply("blackjack", `Bet ${formatChips(stake)}`, -stake)) {
          roundRef.current = null;
          setRound(null);
          setBanner("Not enough chips. Watching.");
        } else {
          const rng = mulberry32(roundSeed("blackjack", id));
          const dealt = dealRound(freshShoe(rng), stake, rng);
          remember(dealt);
          setBanner(dealt.phase === "done" ? `${dealt.note}. Pays at the close.` : "Your hand. No action stands you.");
          playClick(useCasino.getState().muted);
        }
      }
    }
    if (phase === "result" && paidRound.current !== id) {
      paidRound.current = id;
      let current = roundRef.current;
      if (!current) return;
      while (current.phase === "player") current = standRound(current);
      remember(current);
      const staked = current.hands.reduce((sum, hand) => sum + hand.bet, 0);
      if (current.awarded > 0) {
        useCasino.getState().apply("blackjack", current.note, current.awarded);
        playWin(useCasino.getState().muted, current.note.includes("Blackjack"));
      } else playLose(useCasino.getState().muted);
      setBanner(`${current.note} · ${formatDelta(current.awarded - staked)}`);
    }
  }, [clock.phase, clock.round]);

  const liveRound = round && round.phase === "player" && clock.phase === "action" ? round : null;
  const inHand = Boolean(liveRound);
  const betIndex = BJ_BETS.indexOf(bet);
  const seats = blackjackSeats(clock.round).map((seat) => ({
    name: seat.name,
    detail: clock.phase === "betting" ? "Waiting" : `${seat.cards.map(cardLabel).join(" ")} · ${seat.note}`,
  }));

  function hit() {
    if (!inHand || !roundRef.current) return;
    unlockAudio();
    playClick(useCasino.getState().muted);
    remember(hitRound(roundRef.current));
  }

  function stand() {
    if (!inHand || !roundRef.current) return;
    unlockAudio();
    playClick(useCasino.getState().muted);
    const next = standRound(roundRef.current);
    remember(next);
    if (next.phase === "done") setBanner(`${next.note}. Pays at the close.`);
  }

  function double() {
    if (!inHand || !roundRef.current) return;
    const extra = roundRef.current.hands[roundRef.current.active]?.bet ?? 0;
    if (!useCasino.getState().apply("blackjack", "Double", -extra)) {
      setBanner("Not enough chips to double.");
      return;
    }
    const next = doubleRound(roundRef.current);
    if (!next) {
      useCasino.getState().apply("blackjack", "Double returned", extra);
      return;
    }
    playClick(useCasino.getState().muted);
    remember(next);
    if (next.phase === "done") setBanner(`${next.note}. Pays at the close.`);
  }

  function split() {
    if (!inHand || !roundRef.current) return;
    const extra = roundRef.current.hands[roundRef.current.active]?.bet ?? 0;
    if (!useCasino.getState().apply("blackjack", "Split", -extra)) {
      setBanner("Not enough chips to split.");
      return;
    }
    const next = splitRound(roundRef.current);
    if (!next) {
      useCasino.getState().apply("blackjack", "Split returned", extra);
      return;
    }
    playClick(useCasino.getState().muted);
    remember(next);
    if (next.phase === "done") setBanner(`${next.note}. Pays at the close.`);
  }

  return (
    <div className="pb-24">
      <div className="overflow-hidden rounded-card border border-gold/40 bg-graphite">
        <DealerStage art="/art/blackjack.jpg" dealer="/art/dealer-vesper.jpg" name={DEALERS.blackjack} />
        <div className="felt p-4 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-brand text-pink">SIX DECKS</p>
            <h2 className="font-display text-2xl text-gold">The Velvet Hand</h2>
          </div>
          <p className="text-sm text-mist">Blackjack 3:2</p>
        </div>
        <LiveRail
          table="blackjack"
          dealer={DEALERS.blackjack}
          call={clock.phase === "action" ? "Your decision" : clock.phase === "betting" ? "Place your bet" : "Hold"}
          live={clock}
        />

        <div className="mt-6 space-y-6">
          <HandRow
            label="Dealer"
            cards={round?.dealer ?? []}
            hideHole={round?.hideHole ?? false}
            total={
              round
                ? round.hideHole
                  ? `${handTotal([round.dealer[0]!]).total}`
                  : totalText(round.dealer)
                : "—"
            }
          />
          {(round?.hands ?? [{ cards: [], bet, stood: false }]).map((hand, index) => (
            <HandRow
              key={`${round?.id ?? "idle"}-${index}`}
              label={round && round.hands.length > 1 ? (index === 0 ? "Your left" : "Your right") : "You"}
              cards={hand.cards}
              hideHole={false}
              total={hand.cards.length ? totalText(hand.cards) : "—"}
              active={Boolean(inHand && round?.active === index)}
            />
          ))}
        </div>
        <SeatRail seats={seats} />

        <p className="mt-6 min-h-6 text-center text-sm font-semibold text-gold" aria-live="polite" data-testid="bj-banner">
          {banner}
        </p>

        {liveRound ? (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Action label="Hit" testid="bj-hit" disabled={!canHit(liveRound)} onClick={hit} primary />
            <Action label="Stand" testid="bj-stand" disabled={false} onClick={stand} />
            <Action
              label="Double"
              testid="bj-double"
              disabled={!canDouble(liveRound) || balance < (liveRound.hands[liveRound.active]?.bet ?? 0)}
              onClick={double}
            />
            <Action
              label="Split"
              testid="bj-split"
              disabled={!canSplit(liveRound) || balance < (liveRound.hands[liveRound.active]?.bet ?? 0)}
              onClick={split}
            />
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Lower stake"
              disabled={clock.phase !== "betting" || betIndex <= 0}
              onClick={() => setBet(BJ_BETS[betIndex - 1]!)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
            >
              −
            </button>
            <p className="min-w-28 text-center text-sm font-semibold tabular-nums">
              {formatChips(bet)}
              <span className="mt-0.5 block text-xs font-medium tracking-brand text-mist">STAKE</span>
            </p>
            <button
              type="button"
              aria-label="Raise stake"
              disabled={clock.phase !== "betting" || betIndex >= BJ_BETS.length - 1}
              onClick={() => setBet(BJ_BETS[betIndex + 1]!)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40"
            >
              +
            </button>
            <button
              type="button"
              data-testid="bj-deal"
              disabled={!queued && balance < bet}
              onClick={() => {
                unlockAudio();
                setQueued((on) => !on);
              }}
              className="min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40"
            >
              {queued ? "You're in" : clock.phase === "betting" ? "Play this hand" : "Next hand"}
            </button>
          </div>
        )}
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-mist">
        The shoe deals on a clock. Play this hand while bets are open, or the seat stays empty. If your time
        runs out, you stand. One split, no resplit. Dealer stands on every 17. Blackjack pays 3 to 2.
      </p>
    </div>
  );
}

function totalText(cards: Card[]): string {
  const { total, soft } = handTotal(cards);
  if (total > 21) return `${total} bust`;
  if (soft && total !== 21) return `${total} soft`;
  return String(total);
}

function HandRow({
  label,
  cards,
  hideHole,
  total,
  active,
}: {
  label: string;
  cards: Card[];
  hideHole: boolean;
  total: string;
  active?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className={`text-xs font-semibold tracking-brand ${active ? "text-pink" : "text-mist"}`}>{label.toUpperCase()}</p>
        <p className="text-sm tabular-nums text-ink">{total}</p>
      </div>
      <div className="flex min-h-20 gap-2">
        {cards.length === 0 && <div className="h-20 w-14 rounded-md border border-dashed border-line sm:h-24 sm:w-16" />}
        {cards.map((card, index) => (
          <PlayingCard key={`${card.rank}${card.suit}-${index}`} card={card} hidden={hideHole && index === 1} />
        ))}
      </div>
    </div>
  );
}

function PlayingCard({ card, hidden }: { card: Card; hidden: boolean }) {
  if (hidden) {
    return (
      <div className="flex h-20 w-14 items-center justify-center rounded-md border border-gold bg-midnight sm:h-24 sm:w-16">
        <img src="/brand/star-icon-colour.svg" alt="" className="size-8" />
      </div>
    );
  }
  const red = card.suit === "H" || card.suit === "D";
  return (
    <div
      className={`card-face flex h-20 w-14 flex-col justify-between rounded-md border bg-ink p-1.5 sm:h-24 sm:w-16 ${red ? "border-pink text-pink" : "border-line text-midnight"}`}
    >
      <span className="font-display text-lg font-semibold leading-none">{card.rank}</span>
      <SuitMark suit={card.suit as Suit} className="size-4 self-end" />
    </div>
  );
}

function Action({
  label,
  onClick,
  disabled,
  primary,
  testid,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  primary?: boolean;
  testid: string;
}) {
  return (
    <button
      type="button"
      data-testid={testid}
      disabled={disabled}
      onClick={onClick}
      className={
        primary
          ? "min-h-11 min-w-24 rounded-full bg-pink px-4 text-sm font-semibold text-midnight disabled:opacity-40"
          : "min-h-11 min-w-24 rounded-full border border-gold px-4 text-sm font-semibold text-gold disabled:opacity-40"
      }
    >
      {label}
    </button>
  );
}
