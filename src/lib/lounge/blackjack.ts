export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type Suit = "S" | "H" | "D" | "C";
export type Card = { rank: Rank; suit: Suit };

export type BJHand = {
  cards: Card[];
  bet: number;
  stood: boolean;
};

export type BJRound = {
  id: string;
  shoe: Card[];
  dealer: Card[];
  hands: BJHand[];
  active: number;
  phase: "player" | "done";
  hideHole: boolean;
  note: string;
  awarded: number;
};

const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Suit[] = ["S", "H", "D", "C"];

export const BJ_BETS = [50, 100, 200, 500, 1000] as const;

export function freshShoe(random: () => number = Math.random): Card[] {
  const deck: Card[] = [];
  for (let copy = 0; copy < 6; copy += 1) {
    for (const suit of SUITS) {
      for (const rank of RANKS) deck.push({ rank, suit });
    }
  }
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = deck[i]!;
    const b = deck[j]!;
    deck[i] = b;
    deck[j] = a;
  }
  return deck;
}

export function handTotal(cards: Card[]): { total: number; soft: boolean } {
  let total = 0;
  let aces = 0;
  for (const card of cards) {
    if (card.rank === "A") {
      aces += 1;
      total += 11;
    } else if (card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
      total += 10;
    } else {
      total += Number(card.rank);
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return { total, soft: aces > 0 && total <= 21 };
}

function draw(shoe: Card[]): { card: Card; shoe: Card[] } {
  const next = shoe.slice();
  const card = next.pop();
  if (!card) throw new Error("Shoe empty");
  return { card, shoe: next };
}

function ensure(shoe: Card[], random: () => number): Card[] {
  return shoe.length < 40 ? freshShoe(random) : shoe;
}

function isNatural(cards: Card[]): boolean {
  return cards.length === 2 && handTotal(cards).total === 21;
}

function settle(dealer: Card[], hands: BJHand[]): { awarded: number; note: string } {
  const dealerTotal = handTotal(dealer).total;
  const bits: string[] = [];
  let awarded = 0;
  hands.forEach((hand, index) => {
    const label = hands.length > 1 ? (index === 0 ? "Left" : "Right") : "";
    const prefix = label ? `${label} ` : "";
    const total = handTotal(hand.cards).total;
    if (total > 21) {
      bits.push(`${prefix}bust`.trim());
      return;
    }
    if (dealerTotal > 21 || total > dealerTotal) {
      awarded += hand.bet * 2;
      bits.push(`${prefix}win`.trim());
      return;
    }
    if (total === dealerTotal) {
      awarded += hand.bet;
      bits.push(`${prefix}push`.trim());
      return;
    }
    bits.push(`${prefix}lose`.trim());
  });
  const pretty = bits
    .map((bit) => bit.charAt(0).toUpperCase() + bit.slice(1))
    .join(" · ");
  return { awarded, note: dealerTotal > 21 ? `Dealer busts · ${pretty}` : pretty };
}

function playDealer(shoe: Card[], dealer: Card[]): { shoe: Card[]; dealer: Card[] } {
  let nextShoe = shoe;
  const cards = dealer.slice();
  while (handTotal(cards).total < 17) {
    const drawn = draw(nextShoe);
    nextShoe = drawn.shoe;
    cards.push(drawn.card);
  }
  return { shoe: nextShoe, dealer: cards };
}

function finish(round: BJRound): BJRound {
  const anyLive = round.hands.some((hand) => handTotal(hand.cards).total <= 21);
  let shoe = round.shoe;
  let dealer = round.dealer;
  if (anyLive) {
    const played = playDealer(shoe, dealer);
    shoe = played.shoe;
    dealer = played.dealer;
  }
  const result = settle(dealer, round.hands);
  return {
    ...round,
    shoe,
    dealer,
    phase: "done",
    hideHole: false,
    active: -1,
    note: result.note,
    awarded: result.awarded,
  };
}

function advance(round: BJRound): BJRound {
  const hands = round.hands.map((hand, index) =>
    index === round.active ? { ...hand, stood: true } : hand,
  );
  const nextIndex = hands.findIndex((hand, index) => index > round.active && !hand.stood);
  if (nextIndex === -1) {
    return finish({ ...round, hands });
  }
  return { ...round, hands, active: nextIndex };
}

export function dealRound(shoeIn: Card[], bet: number, random: () => number = Math.random): BJRound {
  let shoe = ensure(shoeIn, random);
  const take = () => {
    const drawn = draw(shoe);
    shoe = drawn.shoe;
    return drawn.card;
  };
  const player = [take(), take()];
  const dealer = [take(), take()];
  const id = `bj-${Date.now().toString(36)}-${Math.floor(random() * 1e6).toString(36)}`;
  const base: BJRound = {
    id,
    shoe,
    dealer,
    hands: [{ cards: player, bet, stood: false }],
    active: 0,
    phase: "player",
    hideHole: true,
    note: "Your hand",
    awarded: 0,
  };

  const playerNatural = isNatural(player);
  const dealerNatural = isNatural(dealer);
  if (playerNatural || dealerNatural) {
    if (playerNatural && dealerNatural) {
      return { ...base, phase: "done", hideHole: false, active: -1, note: "Push — both blackjack", awarded: bet };
    }
    if (playerNatural) {
      return {
        ...base,
        phase: "done",
        hideHole: false,
        active: -1,
        note: "Blackjack pays 3 to 2",
        awarded: (bet * 5) / 2,
      };
    }
    return { ...base, phase: "done", hideHole: false, active: -1, note: "Dealer blackjack", awarded: 0 };
  }
  return base;
}

export function canHit(round: BJRound): boolean {
  if (round.phase !== "player" || round.active < 0) return false;
  const hand = round.hands[round.active];
  return Boolean(hand && !hand.stood && handTotal(hand.cards).total < 21);
}

export function canDouble(round: BJRound): boolean {
  if (!canHit(round)) return false;
  const hand = round.hands[round.active]!;
  return hand.cards.length === 2;
}

export function canSplit(round: BJRound): boolean {
  if (!canDouble(round) || round.hands.length > 1) return false;
  const hand = round.hands[round.active]!;
  return hand.cards[0]!.rank === hand.cards[1]!.rank;
}

export function hitRound(round: BJRound): BJRound {
  if (!canHit(round)) return round;
  const drawn = draw(round.shoe);
  const hands = round.hands.map((hand, index) =>
    index === round.active ? { ...hand, cards: [...hand.cards, drawn.card] } : hand,
  );
  const next: BJRound = { ...round, shoe: drawn.shoe, hands };
  const total = handTotal(hands[round.active]!.cards).total;
  if (total >= 21) return advance(next);
  return next;
}

export function standRound(round: BJRound): BJRound {
  if (round.phase !== "player" || round.active < 0) return round;
  return advance(round);
}

export function doubleRound(round: BJRound): BJRound | null {
  if (!canDouble(round)) return null;
  const drawn = draw(round.shoe);
  const hands = round.hands.map((hand, index) =>
    index === round.active
      ? { ...hand, bet: hand.bet * 2, cards: [...hand.cards, drawn.card], stood: true }
      : hand,
  );
  return advance({ ...round, shoe: drawn.shoe, hands });
}

export function splitRound(round: BJRound): BJRound | null {
  if (!canSplit(round)) return null;
  const hand = round.hands[round.active]!;
  const leftDraw = draw(round.shoe);
  const rightDraw = draw(leftDraw.shoe);
  const aces = hand.cards[0]!.rank === "A";
  const left: BJHand = {
    cards: [hand.cards[0]!, leftDraw.card],
    bet: hand.bet,
    stood: aces,
  };
  const right: BJHand = {
    cards: [hand.cards[1]!, rightDraw.card],
    bet: hand.bet,
    stood: aces,
  };
  const hands = round.hands.slice();
  hands.splice(round.active, 1, left, right);
  const next: BJRound = { ...round, shoe: rightDraw.shoe, hands };
  if (aces) return finish(next);
  return next;
}

export function visibleDealer(round: BJRound): { card: Card; hidden: boolean }[] {
  return round.dealer.map((card, index) => ({
    card,
    hidden: round.hideHole && index === 1,
  }));
}
