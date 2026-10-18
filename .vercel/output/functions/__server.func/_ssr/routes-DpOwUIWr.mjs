import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Spade, c as Dices, d as Club, f as ChevronLeft, i as Star, l as Diamond, n as Volume2, o as Heart, s as Disc, t as VolumeX, u as Crown } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpOwUIWr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STARTING_CHIPS = 5e3;
var useCasino = create()(persist((set, get) => ({
	balance: STARTING_CHIPS,
	ofAge: false,
	muted: false,
	ledger: [],
	confirmAge: () => set({ ofAge: true }),
	toggleMute: () => set({ muted: !get().muted }),
	apply: (game, note, delta) => {
		const balance = get().balance;
		if (delta < 0 && balance + delta < 0) return false;
		const next = balance + delta;
		set({
			balance: next,
			ledger: [{
				id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e5).toString(36)}`,
				at: Date.now(),
				game,
				note,
				delta,
				balance: next
			}, ...get().ledger].slice(0, 20)
		});
		return true;
	},
	comp: () => {
		const balance = get().balance;
		if (balance >= 100) return false;
		const delta = STARTING_CHIPS - balance;
		set({
			balance: STARTING_CHIPS,
			ledger: [{
				id: `comp-${Date.now().toString(36)}`,
				at: Date.now(),
				game: "comp",
				note: "House comp",
				delta,
				balance: STARTING_CHIPS
			}, ...get().ledger].slice(0, 20)
		});
		return true;
	}
}), { name: "pp-players-v1" }));
function formatChips(n) {
	return new Intl.NumberFormat("en-AU").format(n);
}
function formatDelta(n) {
	const body = formatChips(Math.abs(n));
	if (n > 0) return `+${body}`;
	if (n < 0) return `−${body}`;
	return "0";
}
function AgeGate() {
	const confirmAge = useCasino((s) => s.confirmAge);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-midnight/75 p-4 sm:items-center",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "age-title",
			className: "w-full max-w-md rounded-card border border-line bg-graphite p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/star-icon-colour.svg",
					alt: "",
					className: "mb-4 size-12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-brand text-pink",
					children: "18+ LOUNGE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "age-title",
					className: "mt-2 font-display text-3xl font-semibold text-gold",
					children: "Play money only."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-mist",
					children: "Pornstar Players is a private floor for adults. Chips are entertainment, not currency — nothing here can be cashed, traded, or withdrawn. Confirm you are 18 or older to take a seat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": "enter",
					onClick: confirmAge,
					className: "mt-6 min-h-12 w-full rounded-full bg-pink text-sm font-semibold tracking-wide text-midnight",
					children: "I’m 18 or older — enter"
				})
			]
		})
	});
}
var MAP = {
	star: Star,
	crown: Crown,
	diamond: Diamond,
	heart: Heart,
	spade: Spade,
	chip: Disc,
	dice: Dices
};
function SymIcon({ sym, className }) {
	if (sym === "seven") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `font-display text-lg font-bold leading-none ${className ?? ""}`,
		children: "77"
	});
	if (sym === "lips") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lips, { className });
	if (sym === "card") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGlyph, { className });
	const Icon = MAP[sym];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.75,
		"aria-hidden": true
	});
}
function SuitMark({ suit, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(suit === "H" ? Heart : suit === "D" ? Diamond : suit === "S" ? Spade : Club, {
		className,
		strokeWidth: 2,
		"aria-hidden": true
	});
}
function Lips({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		fill: "none",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 15c2.2-3.4 5.2-4.6 8-2.2C13.4 11 16 10.2 16 10.2s2.6.8 4 2.6c2.8-2.4 5.8-1.2 8 2.2-3.2 4.6-7 7-12 7s-8.8-2.4-12-7Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 16.5c2.4 1.6 4.8 2.2 8 2.2s5.6-.6 8-2.2",
			stroke: "currentColor",
			strokeWidth: "1.4"
		})]
	});
}
function CardGlyph({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		fill: "none",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "4",
				width: "14",
				height: "20",
				rx: "2",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11",
				y: "8",
				width: "14",
				height: "20",
				rx: "2",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 16.5l2.2-2.2 2.2 2.2-2.2 2.2-2.2-2.2Z",
				fill: "currentColor"
			})
		]
	});
}
function symTone(sym) {
	if (sym === "star" || sym === "seven" || sym === "lips") return "text-pink";
	if (sym === "crown" || sym === "diamond") return "text-gold";
	return "text-mist";
}
var RANKS$1 = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K"
];
var SUITS$1 = [
	"S",
	"H",
	"D",
	"C"
];
var BJ_BETS = [
	50,
	100,
	200,
	500,
	1e3
];
function freshShoe(random = Math.random) {
	const deck = [];
	for (let copy = 0; copy < 6; copy += 1) for (const suit of SUITS$1) for (const rank of RANKS$1) deck.push({
		rank,
		suit
	});
	for (let i = deck.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1));
		const a = deck[i];
		const b = deck[j];
		deck[i] = b;
		deck[j] = a;
	}
	return deck;
}
function handTotal(cards) {
	let total = 0;
	let aces = 0;
	for (const card of cards) if (card.rank === "A") {
		aces += 1;
		total += 11;
	} else if (card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") total += 10;
	else total += Number(card.rank);
	while (total > 21 && aces > 0) {
		total -= 10;
		aces -= 1;
	}
	return {
		total,
		soft: aces > 0 && total <= 21
	};
}
function draw(shoe) {
	const next = shoe.slice();
	const card = next.pop();
	if (!card) throw new Error("Shoe empty");
	return {
		card,
		shoe: next
	};
}
function ensure(shoe, random) {
	return shoe.length < 40 ? freshShoe(random) : shoe;
}
function isNatural(cards) {
	return cards.length === 2 && handTotal(cards).total === 21;
}
function settle(dealer, hands) {
	const dealerTotal = handTotal(dealer).total;
	const bits = [];
	let awarded = 0;
	hands.forEach((hand, index) => {
		const label = hands.length > 1 ? index === 0 ? "Left" : "Right" : "";
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
	const pretty = bits.map((bit) => bit.charAt(0).toUpperCase() + bit.slice(1)).join(" · ");
	return {
		awarded,
		note: dealerTotal > 21 ? `Dealer busts · ${pretty}` : pretty
	};
}
function playDealer(shoe, dealer) {
	let nextShoe = shoe;
	const cards = dealer.slice();
	while (handTotal(cards).total < 17) {
		const drawn = draw(nextShoe);
		nextShoe = drawn.shoe;
		cards.push(drawn.card);
	}
	return {
		shoe: nextShoe,
		dealer: cards
	};
}
function finish(round) {
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
		awarded: result.awarded
	};
}
function advance(round) {
	const hands = round.hands.map((hand, index) => index === round.active ? {
		...hand,
		stood: true
	} : hand);
	const nextIndex = hands.findIndex((hand, index) => index > round.active && !hand.stood);
	if (nextIndex === -1) return finish({
		...round,
		hands
	});
	return {
		...round,
		hands,
		active: nextIndex
	};
}
function dealRound(shoeIn, bet, random = Math.random) {
	let shoe = ensure(shoeIn, random);
	const take = () => {
		const drawn = draw(shoe);
		shoe = drawn.shoe;
		return drawn.card;
	};
	const player = [take(), take()];
	const dealer = [take(), take()];
	const base = {
		id: `bj-${Date.now().toString(36)}-${Math.floor(random() * 1e6).toString(36)}`,
		shoe,
		dealer,
		hands: [{
			cards: player,
			bet,
			stood: false
		}],
		active: 0,
		phase: "player",
		hideHole: true,
		note: "Your hand",
		awarded: 0
	};
	const playerNatural = isNatural(player);
	const dealerNatural = isNatural(dealer);
	if (playerNatural || dealerNatural) {
		if (playerNatural && dealerNatural) return {
			...base,
			phase: "done",
			hideHole: false,
			active: -1,
			note: "Push — both blackjack",
			awarded: bet
		};
		if (playerNatural) return {
			...base,
			phase: "done",
			hideHole: false,
			active: -1,
			note: "Blackjack pays 3 to 2",
			awarded: bet * 5 / 2
		};
		return {
			...base,
			phase: "done",
			hideHole: false,
			active: -1,
			note: "Dealer blackjack",
			awarded: 0
		};
	}
	return base;
}
function canHit(round) {
	if (round.phase !== "player" || round.active < 0) return false;
	const hand = round.hands[round.active];
	return Boolean(hand && !hand.stood && handTotal(hand.cards).total < 21);
}
function canDouble(round) {
	if (!canHit(round)) return false;
	return round.hands[round.active].cards.length === 2;
}
function canSplit(round) {
	if (!canDouble(round) || round.hands.length > 1) return false;
	const hand = round.hands[round.active];
	return hand.cards[0].rank === hand.cards[1].rank;
}
function hitRound(round) {
	if (!canHit(round)) return round;
	const drawn = draw(round.shoe);
	const hands = round.hands.map((hand, index) => index === round.active ? {
		...hand,
		cards: [...hand.cards, drawn.card]
	} : hand);
	const next = {
		...round,
		shoe: drawn.shoe,
		hands
	};
	if (handTotal(hands[round.active].cards).total >= 21) return advance(next);
	return next;
}
function standRound(round) {
	if (round.phase !== "player" || round.active < 0) return round;
	return advance(round);
}
function doubleRound(round) {
	if (!canDouble(round)) return null;
	const drawn = draw(round.shoe);
	const hands = round.hands.map((hand, index) => index === round.active ? {
		...hand,
		bet: hand.bet * 2,
		cards: [...hand.cards, drawn.card],
		stood: true
	} : hand);
	return advance({
		...round,
		shoe: drawn.shoe,
		hands
	});
}
function splitRound(round) {
	if (!canSplit(round)) return null;
	const hand = round.hands[round.active];
	const leftDraw = draw(round.shoe);
	const rightDraw = draw(leftDraw.shoe);
	const aces = hand.cards[0].rank === "A";
	const left = {
		cards: [hand.cards[0], leftDraw.card],
		bet: hand.bet,
		stood: aces
	};
	const right = {
		cards: [hand.cards[1], rightDraw.card],
		bet: hand.bet,
		stood: aces
	};
	const hands = round.hands.slice();
	hands.splice(round.active, 1, left, right);
	const next = {
		...round,
		shoe: rightDraw.shoe,
		hands
	};
	if (aces) return finish(next);
	return next;
}
var CLOCK = {
	roulette: {
		cycle: 2e4,
		betting: 11e3,
		dealing: 0,
		action: 5500
	},
	blackjack: {
		cycle: 26e3,
		betting: 1e4,
		dealing: 2e3,
		action: 9e3
	},
	pokies: {
		cycle: 15e3,
		betting: 7e3,
		dealing: 0,
		action: 5e3
	},
	baccarat: {
		cycle: 22e3,
		betting: 12e3,
		dealing: 2e3,
		action: 4e3
	}
};
function liveState(id, now = Date.now()) {
	const clock = CLOCK[id];
	const round = Math.floor(now / clock.cycle);
	const elapsed = now % clock.cycle;
	const dealt = clock.betting + clock.dealing;
	const acted = dealt + clock.action;
	if (elapsed < clock.betting) return {
		round,
		phase: "betting",
		left: clock.betting - elapsed
	};
	if (elapsed < dealt) return {
		round,
		phase: "dealing",
		left: dealt - elapsed
	};
	if (elapsed < acted) return {
		round,
		phase: "action",
		left: acted - elapsed
	};
	return {
		round,
		phase: "result",
		left: clock.cycle - elapsed
	};
}
function phaseLabel(id, phase) {
	if (phase === "betting") return "Bets open";
	if (phase === "dealing") return "Dealing";
	if (phase === "result") return "Result";
	if (id === "roulette") return "Wheel";
	if (id === "pokies") return "Reels";
	if (id === "baccarat") return "The draw";
	return "Your play";
}
function formatClock(ms) {
	const s = Math.max(0, Math.ceil(ms / 1e3));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function roundSeed(table, round) {
	let h = 2166136261;
	const key = `${table}:${round}`;
	for (let i = 0; i < key.length; i += 1) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
	return h >>> 0;
}
function wheelPocket(round) {
	return Math.floor(mulberry32(roundSeed("roulette", round))() * 37);
}
var OUTSIDE = [
	"Red",
	"Black",
	"Odd",
	"Even",
	"1–18",
	"19–36"
];
var CHIPS$1 = [
	25,
	50,
	100,
	200
];
function rouletteSeats(round) {
	const rng = mulberry32(roundSeed("roulette-seats", round));
	return [
		"Mara",
		"Jules",
		"Sable"
	].map((name) => {
		if (rng() < .22) return {
			name,
			label: "Out",
			amount: 0
		};
		return {
			name,
			label: OUTSIDE[Math.floor(rng() * OUTSIDE.length)],
			amount: CHIPS$1[Math.floor(rng() * CHIPS$1.length)]
		};
	});
}
function take$2(shoe) {
	const card = shoe.pop();
	if (!card) throw new Error("Shoe empty");
	return card;
}
function blackjackSeats(round) {
	const shoe = freshShoe(mulberry32(roundSeed("bj-seats", round)));
	return ["Mara", "Jules"].map((name) => {
		const cards = [take$2(shoe), take$2(shoe)];
		while (handTotal(cards).total < 16 && shoe.length > 0) cards.push(take$2(shoe));
		const total = handTotal(cards).total;
		return {
			name,
			cards,
			note: total > 21 ? "Bust" : String(total)
		};
	});
}
var DEALERS = {
	roulette: "Noor Vale",
	blackjack: "Vesper Quinn",
	pokies: "Lumen Jae",
	baccarat: "Cleo March"
};
function useLiveClock(id) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(timer);
	}, []);
	return liveState(id, now);
}
function LiveRail({ table, dealer, call, live }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-midnight px-4 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 text-xs font-semibold tracking-brand text-pink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "live-dot",
					"aria-hidden": true
				}), "LIVE"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold text-ink",
				children: dealer
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 text-sm text-mist",
				children: call
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-auto text-sm font-semibold tabular-nums text-gold",
				children: [
					phaseLabel(table, live.phase),
					" · ",
					formatClock(live.left)
				]
			})
		]
	});
}
function SeatRail({ seats }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 grid grid-cols-2 gap-2",
		children: seats.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-md border border-line bg-midnight/60 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-brand text-mist",
				children: seat.name.toUpperCase()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm text-ink",
				children: seat.detail
			})]
		}, seat.name))
	});
}
function DealerStage({ art, dealer, name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "h-44 w-full object-cover sm:h-52"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-3 left-3 flex items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dealer,
					alt: "",
					className: "size-16 rounded-full border-2 border-gold object-cover sm:size-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "DEALER"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-xl text-ink",
						children: name
					})]
				})]
			})
		]
	});
}
var ctx = null;
function context() {
	if (typeof window === "undefined") return null;
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return null;
	if (!ctx) ctx = new AC();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function unlockAudio() {
	context();
}
function tone(freq, dur, type, gain, when = 0) {
	const audio = context();
	if (!audio) return;
	const start = audio.currentTime + when;
	const osc = audio.createOscillator();
	const amp = audio.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, start);
	amp.gain.setValueAtTime(gain, start);
	amp.gain.exponentialRampToValueAtTime(1e-4, start + dur);
	osc.connect(amp);
	amp.connect(audio.destination);
	osc.start(start);
	osc.stop(start + dur + .02);
}
function playClick(muted) {
	if (muted) return;
	tone(660, .05, "triangle", .03);
}
function playSpin(muted) {
	if (muted) return;
	tone(180, .12, "sawtooth", .02);
	tone(320, .08, "square", .015, .06);
}
function playTick(muted) {
	if (muted) return;
	tone(880, .04, "square", .02);
}
function playWin(muted, big) {
	if (muted) return;
	(big ? [
		523,
		659,
		784,
		1046
	] : [
		440,
		554,
		659
	]).forEach((freq, i) => tone(freq, big ? .22 : .14, "triangle", .04, i * .09));
}
function playLose(muted) {
	if (muted) return;
	tone(220, .16, "sine", .03);
	tone(160, .18, "sine", .02, .08);
}
var BACC_CHIPS = [
	25,
	50,
	100,
	250
];
var EMPTY_POT = {
	player: 0,
	banker: 0,
	tie: 0
};
function pip(rank) {
	if (rank === "A") return 1;
	if (rank === "10" || rank === "J" || rank === "Q" || rank === "K") return 0;
	return Number(rank);
}
function baccTotal(cards) {
	return cards.reduce((sum, card) => sum + pip(card.rank), 0) % 10;
}
function take$1(shoe) {
	const card = shoe.pop();
	if (!card) throw new Error("Shoe empty");
	return card;
}
function bankerDraws(total, third) {
	if (third === null) return total <= 5;
	if (total <= 2) return true;
	if (total === 3) return third !== 8;
	if (total === 4) return third >= 2 && third <= 7;
	if (total === 5) return third >= 4 && third <= 7;
	if (total === 6) return third === 6 || third === 7;
	return false;
}
function playCoup(round) {
	const shoe = freshShoe(mulberry32(roundSeed("baccarat", round)));
	const player = [take$1(shoe), take$1(shoe)];
	const banker = [take$1(shoe), take$1(shoe)];
	const playerTwo = baccTotal(player);
	const bankerTwo = baccTotal(banker);
	if (playerTwo < 8 && bankerTwo < 8) {
		let third = null;
		if (playerTwo <= 5) {
			const card = take$1(shoe);
			player.push(card);
			third = pip(card.rank);
		}
		if (bankerDraws(bankerTwo, third)) banker.push(take$1(shoe));
	}
	const playerFinal = baccTotal(player);
	const bankerFinal = baccTotal(banker);
	return {
		player,
		banker,
		winner: playerFinal > bankerFinal ? "player" : bankerFinal > playerFinal ? "banker" : "tie"
	};
}
function potStake(pot) {
	return pot.player + pot.banker + pot.tie;
}
/** Chips returned to the rack, including pushed player and banker bets on a tie. */
function settlePot(pot, winner) {
	let back = 0;
	if (winner === "tie") {
		back += pot.player + pot.banker;
		back += pot.tie * 9;
		return back;
	}
	if (winner === "player") back += pot.player * 2;
	if (winner === "banker") back += pot.banker + Math.floor(pot.banker * 95 / 100);
	return back;
}
function winnerWord(winner) {
	if (winner === "player") return "Player";
	if (winner === "banker") return "Banker";
	return "Tie";
}
var SIDES$1 = [
	{
		id: "player",
		label: "Player",
		pay: "1 to 1"
	},
	{
		id: "banker",
		label: "Banker",
		pay: "19 to 20"
	},
	{
		id: "tie",
		label: "Tie",
		pay: "8 to 1"
	}
];
function Baccarat() {
	const clock = useLiveClock("baccarat");
	const closed = clock.phase !== "betting";
	const [chip, setChip] = (0, import_react.useState)(50);
	const [pot, setPot] = (0, import_react.useState)(EMPTY_POT);
	const [banner, setBanner] = (0, import_react.useState)("Bets open. Player, banker, or the tie.");
	const potRef = (0, import_react.useRef)(pot);
	potRef.current = pot;
	const pending = (0, import_react.useRef)(null);
	const opened = (0, import_react.useRef)(null);
	const charged = (0, import_react.useRef)(null);
	const settled = (0, import_react.useRef)(null);
	const shownRound = clock.phase === "betting" ? Math.max(0, clock.round - 1) : clock.round;
	const shown = (0, import_react.useMemo)(() => playCoup(shownRound), [shownRound]);
	const road = (0, import_react.useMemo)(() => Array.from({ length: 12 }, (_, i) => playCoup(clock.round - i - (clock.phase === "result" ? 0 : 1)).winner), [clock.round, clock.phase]);
	(0, import_react.useEffect)(() => {
		return () => {
			const due = pending.current;
			if (!due) return;
			pending.current = null;
			const back = settlePot(due.pot, playCoup(due.round).winner);
			if (back > 0) useCasino.getState().apply("baccarat", "Shoe settled", back);
		};
	}, []);
	(0, import_react.useEffect)(() => {
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
			pending.current = {
				round,
				pot: live,
				stake
			};
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
	function add(side) {
		if (closed) return;
		unlockAudio();
		const next = {
			...pot,
			[side]: pot[side] + chip
		};
		if (potStake(next) > useCasino.getState().balance) {
			setBanner("That chip would overdraw the rack.");
			return;
		}
		setPot(next);
		setBanner(`${formatChips(potStake(next))} on the layout`);
	}
	const seats = ["Mara", "Jules"].map((name, index) => {
		const mark = road[index] ?? "player";
		return {
			name,
			detail: mark === "tie" ? "Tie" : mark === "banker" ? "Banker" : "Player"
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealerStage, {
				art: "/art/baccarat.jpg",
				dealer: "/art/dealer-cleo.jpg",
				name: DEALERS.baccarat
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "felt p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "PUNTO BANCO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "The Gold Shoe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRail, {
						table: "baccarat",
						dealer: DEALERS.baccarat,
						call: banner,
						live: clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoupSide, {
							label: "Player",
							cards: clock.phase === "betting" ? [] : shown.player
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoupSide, {
							label: "Banker",
							cards: clock.phase === "betting" ? [] : shown.banker
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-1",
						children: road.map((mark, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold ${mark === "player" ? "bg-ink text-midnight" : mark === "banker" ? "bg-pink text-midnight" : "bg-violet text-ink"}`,
							children: mark === "player" ? "P" : mark === "banker" ? "B" : "T"
						}, `${mark}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatRail, { seats }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: BACC_CHIPS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChip(value),
							className: `min-h-11 rounded-full px-4 text-sm font-semibold ${chip === value ? "bg-gold text-midnight" : "border border-line text-mist"}`,
							children: formatChips(value)
						}, value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: SIDES$1.map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: closed,
							onClick: () => add(side.id),
							className: "min-h-16 rounded-md border border-line bg-midnight/50 px-3 py-2 text-left disabled:opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold text-ink",
									children: side.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-mist",
									children: side.pay
								}),
								pot[side.id] > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm font-semibold text-gold",
									children: formatChips(pot[side.id])
								})
							]
						}, side.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: closed || potStake(pot) === 0,
							onClick: () => {
								setPot(EMPTY_POT);
								setBanner("Layout cleared.");
							},
							className: "min-h-12 rounded-full border border-line px-5 text-sm font-semibold text-mist disabled:opacity-40",
							children: "Clear"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex min-h-12 flex-1 items-center justify-center rounded-full bg-pink px-4 text-sm font-semibold text-midnight",
							children: closed ? "No more bets" : "Lay a side"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-ink/80",
						children: "Naturals stand. The banker draw follows the tableau. A tie pushes player and banker, and pays the tie at 8 to 1. Banker wins pay a five percent commission."
					})
				]
			})]
		})
	});
}
function CoupSide({ label, cards }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-brand text-mist",
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm tabular-nums text-ink",
			children: cards.length ? baccTotal(cards) : "—"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-24 gap-2",
		children: [cards.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-16 rounded-md border border-dashed border-white/30" }), cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, { card }, `${card.rank}${card.suit}-${index}`))]
	})] });
}
function MiniCard({ card }) {
	const red = card.suit === "H" || card.suit === "D";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `card-face flex h-24 w-16 flex-col justify-between rounded-md border bg-ink p-1.5 ${red ? "border-pink text-pink" : "border-line text-midnight"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-semibold leading-none",
			children: card.rank
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitMark, {
			suit: card.suit,
			className: "size-4 self-end"
		})]
	});
}
var SUIT = {
	S: "♠",
	H: "♥",
	D: "♦",
	C: "♣"
};
function cardLabel(card) {
	return `${card.rank}${SUIT[card.suit]}`;
}
function Blackjack() {
	const balance = useCasino((s) => s.balance);
	const clock = useLiveClock("blackjack");
	const [bet, setBet] = (0, import_react.useState)(50);
	const [queued, setQueued] = (0, import_react.useState)(false);
	const [round, setRound] = (0, import_react.useState)(null);
	const [banner, setBanner] = (0, import_react.useState)("Bets open. Vesper deals on the clock.");
	const roundRef = (0, import_react.useRef)(null);
	const queuedRef = (0, import_react.useRef)(false);
	const betRef = (0, import_react.useRef)(bet);
	queuedRef.current = queued;
	betRef.current = bet;
	const dealtRound = (0, import_react.useRef)(null);
	const paidRound = (0, import_react.useRef)(null);
	function remember(next) {
		roundRef.current = next;
		setRound(next);
	}
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
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
		detail: clock.phase === "betting" ? "Waiting" : `${seat.cards.map(cardLabel).join(" ")} · ${seat.note}`
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealerStage, {
				art: "/art/blackjack.jpg",
				dealer: "/art/dealer-vesper.jpg",
				name: DEALERS.blackjack
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "felt p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-brand text-pink",
							children: "SIX DECKS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-gold",
							children: "The Velvet Hand"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: "Blackjack 3:2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRail, {
						table: "blackjack",
						dealer: DEALERS.blackjack,
						call: clock.phase === "action" ? "Your decision" : clock.phase === "betting" ? "Place your bet" : "Hold",
						live: clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandRow, {
							label: "Dealer",
							cards: round?.dealer ?? [],
							hideHole: round?.hideHole ?? false,
							total: round ? round.hideHole ? `${handTotal([round.dealer[0]]).total}` : totalText(round.dealer) : "—"
						}), (round?.hands ?? [{
							cards: [],
							bet,
							stood: false
						}]).map((hand, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandRow, {
							label: round && round.hands.length > 1 ? index === 0 ? "Your left" : "Your right" : "You",
							cards: hand.cards,
							hideHole: false,
							total: hand.cards.length ? totalText(hand.cards) : "—",
							active: Boolean(inHand && round?.active === index)
						}, `${round?.id ?? "idle"}-${index}`))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatRail, { seats }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 min-h-6 text-center text-sm font-semibold text-gold",
						"aria-live": "polite",
						"data-testid": "bj-banner",
						children: banner
					}),
					liveRound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								label: "Hit",
								testid: "bj-hit",
								disabled: !canHit(liveRound),
								onClick: hit,
								primary: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								label: "Stand",
								testid: "bj-stand",
								disabled: false,
								onClick: stand
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								label: "Double",
								testid: "bj-double",
								disabled: !canDouble(liveRound) || balance < (liveRound.hands[liveRound.active]?.bet ?? 0),
								onClick: double
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								label: "Split",
								testid: "bj-split",
								disabled: !canSplit(liveRound) || balance < (liveRound.hands[liveRound.active]?.bet ?? 0),
								onClick: split
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: clock.phase !== "betting" || betIndex <= 0,
								onClick: () => setBet(BJ_BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-28 text-center text-sm font-semibold tabular-nums",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: clock.phase !== "betting" || betIndex >= BJ_BETS.length - 1,
								onClick: () => setBet(BJ_BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "bj-deal",
								disabled: !queued && balance < bet,
								onClick: () => {
									unlockAudio();
									setQueued((on) => !on);
								},
								className: "min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40",
								children: queued ? "You're in" : clock.phase === "betting" ? "Play this hand" : "Next hand"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm leading-relaxed text-mist",
			children: "The shoe deals on a clock. Play this hand while bets are open, or the seat stays empty. If your time runs out, you stand. One split, no resplit. Dealer stands on every 17. Blackjack pays 3 to 2."
		})]
	});
}
function totalText(cards) {
	const { total, soft } = handTotal(cards);
	if (total > 21) return `${total} bust`;
	if (soft && total !== 21) return `${total} soft`;
	return String(total);
}
function HandRow({ label, cards, hideHole, total, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-xs font-semibold tracking-brand ${active ? "text-pink" : "text-mist"}`,
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm tabular-nums text-ink",
			children: total
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-20 gap-2",
		children: [cards.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-14 rounded-md border border-dashed border-line sm:h-24 sm:w-16" }), cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
			card,
			hidden: hideHole && index === 1
		}, `${card.rank}${card.suit}-${index}`))]
	})] });
}
function PlayingCard({ card, hidden }) {
	if (hidden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-20 w-14 items-center justify-center rounded-md border border-gold bg-midnight sm:h-24 sm:w-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand/star-icon-colour.svg",
			alt: "",
			className: "size-8"
		})
	});
	const red = card.suit === "H" || card.suit === "D";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `card-face flex h-20 w-14 flex-col justify-between rounded-md border bg-ink p-1.5 sm:h-24 sm:w-16 ${red ? "border-pink text-pink" : "border-line text-midnight"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-semibold leading-none",
			children: card.rank
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitMark, {
			suit: card.suit,
			className: "size-4 self-end"
		})]
	});
}
function Action({ label, onClick, disabled, primary, testid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"data-testid": testid,
		disabled,
		onClick,
		className: primary ? "min-h-11 min-w-24 rounded-full bg-pink px-4 text-sm font-semibold text-midnight disabled:opacity-40" : "min-h-11 min-w-24 rounded-full border border-gold px-4 text-sm font-semibold text-gold disabled:opacity-40",
		children: label
	});
}
var RANKS = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K"
];
var SUITS = [
	"S",
	"H",
	"D",
	"C"
];
var TABLE_BETS = [
	10,
	25,
	50,
	100,
	250
];
function oneDeck(random = Math.random) {
	const deck = [];
	for (const suit of SUITS) for (const rank of RANKS) deck.push({
		rank,
		suit
	});
	for (let i = deck.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1));
		const a = deck[i];
		deck[i] = deck[j];
		deck[j] = a;
	}
	return deck;
}
function take(deck, n) {
	return {
		cards: deck.slice(0, n),
		deck: deck.slice(n)
	};
}
function value(rank) {
	return RANKS.indexOf(rank);
}
/** Coins returned per coin staked, including the stake. Royal is the full-pay 800. */
var POKER_PAY = {
	"Royal flush": 800,
	"Straight flush": 50,
	"Four of a kind": 25,
	"Full house": 9,
	Flush: 6,
	Straight: 4,
	"Three of a kind": 3,
	"Two pair": 2,
	"Jacks or better": 1
};
function scorePoker(cards) {
	const values = cards.map((card) => value(card.rank)).sort((a, b) => a - b);
	const suits = new Set(cards.map((card) => card.suit));
	const counts = /* @__PURE__ */ new Map();
	for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
	const groups = [...counts.values()].sort((a, b) => b - a);
	const flush = suits.size === 1;
	const unique = [...counts.keys()].sort((a, b) => a - b);
	const wheel = unique.join() === "0,1,2,3,12";
	const broadway = unique.join() === "0,9,10,11,12";
	const straight = unique.length === 5 && (unique[4] - unique[0] === 4 || wheel || broadway);
	const royal = flush && broadway;
	let name = "Nothing";
	if (royal) name = "Royal flush";
	else if (straight && flush) name = "Straight flush";
	else if (groups[0] === 4) name = "Four of a kind";
	else if (groups[0] === 3 && groups[1] === 2) name = "Full house";
	else if (flush) name = "Flush";
	else if (straight) name = "Straight";
	else if (groups[0] === 3) name = "Three of a kind";
	else if (groups[0] === 2 && groups[1] === 2) name = "Two pair";
	else if (groups[0] === 2) {
		const pair = [...counts.entries()].find(([, n]) => n === 2)?.[0] ?? 0;
		if (pair >= 10 || pair === 0) name = "Jacks or better";
	}
	return {
		name,
		mult: POKER_PAY[name] ?? 0
	};
}
/** Bust multiplier. About a 4% instant crash, otherwise (0.96 / roll). */
function crashPoint(random = Math.random) {
	const roll = random();
	if (roll < .04) return 1;
	const raw = .96 / (1 - roll);
	return Math.max(1.01, Math.min(500, Math.floor(raw * 100) / 100));
}
function climbAt(ms) {
	const mult = Math.exp(ms / 1e3 * .18);
	return Math.floor(mult * 100) / 100;
}
function hiloValue(rank) {
	return value(rank) + 1;
}
function rollPair(random = Math.random) {
	return [1 + Math.floor(random() * 6), 1 + Math.floor(random() * 6)];
}
function diceReturn(side, dice, stake) {
	const sum = dice[0] + dice[1];
	if (side === "low" && sum >= 2 && sum <= 6) return stake * 2;
	if (side === "high" && sum >= 8 && sum <= 12) return stake * 2;
	if (side === "seven" && sum === 7) return stake * 5;
	if (side === "pair" && dice[0] === dice[1]) return stake * 5;
	return 0;
}
function Crash() {
	const balance = useCasino((s) => s.balance);
	const [bet, setBet] = (0, import_react.useState)(25);
	const [mult, setMult] = (0, import_react.useState)(1);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [crashed, setCrashed] = (0, import_react.useState)(false);
	const [banner, setBanner] = (0, import_react.useState)("The star climbs. Cash out before it breaks.");
	const bust = (0, import_react.useRef)(1);
	const started = (0, import_react.useRef)(0);
	const cashed = (0, import_react.useRef)(false);
	const timer = (0, import_react.useRef)(null);
	const multRef = (0, import_react.useRef)(1);
	const betRef = (0, import_react.useRef)(bet);
	const runningRef = (0, import_react.useRef)(false);
	multRef.current = mult;
	betRef.current = bet;
	runningRef.current = running;
	(0, import_react.useEffect)(() => {
		return () => {
			if (timer.current) window.clearInterval(timer.current);
			if (!runningRef.current || cashed.current) return;
			cashed.current = true;
			const back = Math.floor(betRef.current * multRef.current);
			if (back > 0) useCasino.getState().apply("crash", "Left the climb", back);
		};
	}, []);
	function stop(at, didCrash) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/crash.jpg",
				alt: "",
				className: "h-40 w-full object-cover sm:h-48"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "CASH OUT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "Star Crash"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/star-icon-colour.svg",
								alt: "",
								className: "size-16",
								style: {
									transform: `scale(${Math.min(2.2, .8 + mult / 4)})`,
									opacity: crashed ? .35 : 1
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `mt-3 font-display text-6xl font-semibold tabular-nums ${crashed ? "text-pink" : "text-gold"}`,
								"data-testid": "crash-mult",
								children: [mult.toFixed(2), "×"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 min-h-6 text-sm font-semibold text-ink",
								"data-testid": "crash-banner",
								children: banner
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: running || betIndex <= 0,
								onClick: () => setBet(TABLE_BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-24 text-center text-sm font-semibold tabular-nums",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: running || betIndex >= TABLE_BETS.length - 1,
								onClick: () => setBet(TABLE_BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "+"
							}),
							running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "crash-cash",
								onClick: cash,
								className: "min-h-12 min-w-36 rounded-full bg-gold px-6 text-sm font-semibold text-midnight",
								children: "Cash out"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "crash-launch",
								disabled: balance < bet,
								onClick: launch,
								className: "min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40",
								children: "Launch"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-mist",
						children: "The star starts at 1.00 and climbs until it breaks. Cash out locks the multiplier. A break at 1.00 pays nothing. This table takes a thin edge on the break point."
					})
				]
			})]
		})
	});
}
var SIDES = [
	{
		id: "low",
		label: "Low 2–6",
		pay: "1 to 1"
	},
	{
		id: "high",
		label: "High 8–12",
		pay: "1 to 1"
	},
	{
		id: "seven",
		label: "Seven",
		pay: "4 to 1"
	},
	{
		id: "pair",
		label: "Any pair",
		pay: "4 to 1"
	}
];
function Dice() {
	const balance = useCasino((s) => s.balance);
	const [bet, setBet] = (0, import_react.useState)(25);
	const [side, setSide] = (0, import_react.useState)("seven");
	const [dice, setDice] = (0, import_react.useState)(null);
	const [banner, setBanner] = (0, import_react.useState)("Two dice. Low, high, seven, or a pair.");
	const [busy, setBusy] = (0, import_react.useState)(false);
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
			setBanner(back > 0 ? `${next[0]} and ${next[1]} · ${formatDelta(back - bet)}` : `${next[0]} and ${next[1]} · ${formatDelta(-bet)}`);
			setBusy(false);
		}, 420);
	}
	const betIndex = TABLE_BETS.indexOf(bet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/dice.jpg",
				alt: "",
				className: "h-40 w-full object-cover sm:h-48"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "TWO DICE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "Pink Dice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center gap-3",
						children: (dice ?? [null, null]).map((face, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-20 items-center justify-center rounded-md border border-pink bg-midnight font-display text-4xl font-semibold text-pink",
							children: face ?? "·"
						}, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 min-h-6 text-center text-sm font-semibold text-gold",
						"data-testid": "dice-banner",
						children: banner
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-2",
						children: SIDES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSide(item.id),
							className: `min-h-14 rounded-md border px-3 py-2 text-left ${side === item.id ? "border-gold bg-gold/10" : "border-line"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold text-ink",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-mist",
								children: item.pay
							})]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: busy || betIndex <= 0,
								onClick: () => setBet(TABLE_BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-24 text-center text-sm font-semibold tabular-nums",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: busy || betIndex >= TABLE_BETS.length - 1,
								onClick: () => setBet(TABLE_BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "dice-roll",
								disabled: busy || balance < bet,
								onClick: roll,
								className: "min-h-12 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40",
								children: busy ? "Rolling" : "Roll"
							})
						]
					})
				]
			})]
		})
	});
}
function Hilo() {
	const balance = useCasino((s) => s.balance);
	const [bet, setBet] = (0, import_react.useState)(25);
	const [deck, setDeck] = (0, import_react.useState)([]);
	const [card, setCard] = (0, import_react.useState)(null);
	const [pot, setPot] = (0, import_react.useState)(0);
	const [banner, setBanner] = (0, import_react.useState)("Higher or lower. A tie loses. Cash whenever you like.");
	function start() {
		unlockAudio();
		if (!useCasino.getState().apply("hilo", `Climb ${formatChips(bet)}`, -bet)) {
			setBanner("Not enough chips.");
			return;
		}
		playClick(useCasino.getState().muted);
		const dealt = take(oneDeck(), 1);
		setDeck(dealt.deck);
		setCard(dealt.cards[0]);
		setPot(bet);
		setBanner("Call it.");
	}
	function guess(side) {
		if (!card || pot <= 0 || deck.length === 0) return;
		unlockAudio();
		const drawn = take(deck, 1);
		const next = drawn.cards[0];
		const now = hiloValue(card.rank);
		const then = hiloValue(next.rank);
		setDeck(drawn.deck);
		setCard(next);
		const win = side === "higher" ? then > now : then < now;
		const tie = then === now;
		if (win) {
			const nextPot = pot * 2;
			setPot(nextPot);
			playWin(useCasino.getState().muted, false);
			setBanner(`Right. The climb is ${formatChips(nextPot)}.`);
			return;
		}
		playLose(useCasino.getState().muted);
		setPot(0);
		setBanner(tie ? "Tie. The climb drops." : "Wrong. The climb drops.");
	}
	function cash() {
		if (pot <= 0) return;
		unlockAudio();
		useCasino.getState().apply("hilo", "Cash the climb", pot);
		playClick(useCasino.getState().muted);
		setBanner(`Cashed ${formatChips(pot)}.`);
		setPot(0);
	}
	const value = card ? hiloValue(card.rank) : 0;
	const betIndex = TABLE_BETS.indexOf(bet);
	const live = pot > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/hilo.jpg",
				alt: "",
				className: "h-40 w-full object-cover sm:h-48"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "ONE DECK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "Higher"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center",
						children: card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `card-face flex h-36 w-24 flex-col justify-between rounded-md border bg-ink p-2 ${card.suit === "H" || card.suit === "D" ? "border-pink text-pink" : "border-line text-midnight"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-semibold leading-none",
								children: card.rank
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitMark, {
								suit: card.suit,
								className: "size-6 self-end"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-36 w-24 items-center justify-center rounded-md border border-dashed border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/star-icon-colour.svg",
								alt: "",
								className: "size-10 opacity-70"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 min-h-6 text-center text-sm font-semibold text-gold",
						"data-testid": "hilo-banner",
						children: banner
					}),
					live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "hilo-higher",
								disabled: value === 13,
								onClick: () => guess("higher"),
								className: "min-h-12 rounded-full border border-gold px-5 text-sm font-semibold text-gold disabled:opacity-40",
								children: "Higher"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-testid": "hilo-cash",
								onClick: cash,
								className: "min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-midnight",
								children: ["Cash ", formatChips(pot)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "hilo-lower",
								disabled: value === 1,
								onClick: () => guess("lower"),
								className: "min-h-12 rounded-full border border-gold px-5 text-sm font-semibold text-gold disabled:opacity-40",
								children: "Lower"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: betIndex <= 0,
								onClick: () => setBet(TABLE_BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-24 text-center text-sm font-semibold tabular-nums",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: betIndex >= TABLE_BETS.length - 1,
								onClick: () => setBet(TABLE_BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "hilo-start",
								disabled: balance < bet,
								onClick: start,
								className: "min-h-12 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40",
								children: "Start the climb"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-mist",
						children: "Ace is low, king is high. A matching rank loses the climb. Each correct call doubles what is on the table. Cash returns it to the rack."
					})
				]
			})]
		})
	});
}
function Poker() {
	const balance = useCasino((s) => s.balance);
	const [bet, setBet] = (0, import_react.useState)(25);
	const [hand, setHand] = (0, import_react.useState)([]);
	const [holds, setHolds] = (0, import_react.useState)([
		false,
		false,
		false,
		false,
		false
	]);
	const [deck, setDeck] = (0, import_react.useState)([]);
	const [phase, setPhase] = (0, import_react.useState)("deal");
	const [banner, setBanner] = (0, import_react.useState)("Jacks or better. Hold what you want, then draw.");
	function deal() {
		unlockAudio();
		if (!useCasino.getState().apply("poker", `Deal ${formatChips(bet)}`, -bet)) {
			setBanner("Not enough chips.");
			return;
		}
		playClick(useCasino.getState().muted);
		const dealt = take(oneDeck(), 5);
		setDeck(dealt.deck);
		setHand(dealt.cards);
		setHolds([
			false,
			false,
			false,
			false,
			false
		]);
		setPhase("draw");
		setBanner("Hold, then draw.");
	}
	function draw() {
		unlockAudio();
		const need = holds.filter((held) => !held).length;
		const drawn = take(deck, need);
		let cursor = 0;
		const next = hand.map((card, index) => holds[index] ? card : drawn.cards[cursor++]);
		const scored = scorePoker(next);
		const back = scored.mult * bet;
		if (back > 0) useCasino.getState().apply("poker", scored.name, back);
		if (scored.mult > 1) playWin(useCasino.getState().muted, scored.mult >= 25);
		else playLose(useCasino.getState().muted);
		setHand(next);
		setDeck(drawn.deck);
		setPhase("deal");
		const net = back - bet;
		setBanner(scored.mult > 0 ? `${scored.name} · ${formatDelta(net)}` : `${scored.name} · ${formatDelta(-bet)}`);
	}
	const betIndex = TABLE_BETS.indexOf(bet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/poker.jpg",
				alt: "",
				className: "h-40 w-full object-cover sm:h-48"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "JACKS OR BETTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "Royal Velvet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 min-h-6 text-sm font-semibold text-gold",
						"data-testid": "poker-banner",
						children: banner
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: (hand.length ? hand : Array.from({ length: 5 }, () => null)).map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: phase !== "draw" || !card,
							onClick: () => setHolds((prev) => prev.map((held, i) => i === index ? !held : held)),
							className: "relative",
							children: [card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, { card }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-20 items-center justify-center rounded-md border border-dashed border-line sm:h-32 sm:w-24",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/brand/star-icon-colour.svg",
									alt: "",
									className: "size-8 opacity-60"
								})
							}), phase === "draw" && holds[index] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-pink px-2 text-xs font-semibold text-midnight",
								children: "Hold"
							})]
						}, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: phase === "draw" || betIndex <= 0,
								onClick: () => setBet(TABLE_BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-24 text-center text-sm font-semibold tabular-nums",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: phase === "draw" || betIndex >= TABLE_BETS.length - 1,
								onClick: () => setBet(TABLE_BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg disabled:opacity-40",
								children: "+"
							}),
							phase === "deal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "poker-deal",
								disabled: balance < bet,
								onClick: deal,
								className: "min-h-12 min-w-32 rounded-full bg-pink px-6 text-sm font-semibold text-midnight disabled:opacity-40",
								children: "Deal"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "poker-draw",
								onClick: draw,
								className: "min-h-12 min-w-32 rounded-full bg-pink px-6 text-sm font-semibold text-midnight",
								children: "Draw"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid grid-cols-2 gap-x-4 text-sm text-mist sm:grid-cols-3",
						children: [
							["Royal flush", "800"],
							["Straight flush", "50"],
							["Four of a kind", "25"],
							["Full house", "9"],
							["Flush", "6"],
							["Straight", "4"],
							["Three of a kind", "3"],
							["Two pair", "2"],
							["Jacks or better", "1"]
						].map(([name, mult]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3 border-b border-line py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-gold",
								children: mult
							})]
						}, name))
					})
				]
			})]
		})
	});
}
function Face({ card }) {
	const red = card.suit === "H" || card.suit === "D";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `card-face flex h-28 w-20 flex-col justify-between rounded-md border bg-ink p-1.5 sm:h-32 sm:w-24 ${red ? "border-pink text-pink" : "border-line text-midnight"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl font-semibold leading-none",
			children: card.rank
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitMark, {
			suit: card.suit,
			className: "size-5 self-end"
		})]
	});
}
var WHEEL = [
	0,
	32,
	15,
	19,
	4,
	21,
	2,
	25,
	17,
	34,
	6,
	27,
	13,
	36,
	11,
	30,
	8,
	23,
	10,
	5,
	24,
	16,
	33,
	1,
	20,
	14,
	31,
	9,
	22,
	18,
	29,
	7,
	28,
	12,
	35,
	3,
	26
];
var REDS = /* @__PURE__ */ new Set([
	1,
	3,
	5,
	7,
	9,
	12,
	14,
	16,
	18,
	19,
	21,
	23,
	25,
	27,
	30,
	32,
	34,
	36
]);
var CHIPS = [
	10,
	25,
	100,
	500
];
function toneOf(n) {
	if (n === 0) return "zero";
	return REDS.has(n) ? "red" : "black";
}
var range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
function straightBet(n, amount) {
	return {
		id: `n-${n}`,
		kind: "straight",
		numbers: [n],
		odds: 35,
		label: `${n}`,
		amount
	};
}
function outsideBet(kind, amount) {
	const spec = {
		red: {
			numbers: [...REDS],
			label: "Red"
		},
		black: {
			numbers: range(1, 36).filter((n) => !REDS.has(n)),
			label: "Black"
		},
		odd: {
			numbers: range(1, 36).filter((n) => n % 2 === 1),
			label: "Odd"
		},
		even: {
			numbers: range(1, 36).filter((n) => n % 2 === 0),
			label: "Even"
		},
		low: {
			numbers: range(1, 18),
			label: "1–18"
		},
		high: {
			numbers: range(19, 36),
			label: "19–36"
		}
	}[kind];
	return {
		id: kind,
		kind,
		numbers: spec.numbers,
		odds: 1,
		label: spec.label,
		amount
	};
}
function dozenBet(index, amount) {
	const start = index * 12 + 1;
	return {
		id: `d-${index}`,
		kind: "dozen",
		numbers: range(start, start + 11),
		odds: 2,
		label: `${start}–${start + 11}`,
		amount
	};
}
function columnBet(index, amount) {
	const numbers = range(1, 36).filter((n) => (n - 1) % 3 === index);
	return {
		id: `c-${index}`,
		kind: "column",
		numbers,
		odds: 2,
		label: `Column ${index + 1}`,
		amount
	};
}
function stackBet(bets, next) {
	if (!bets.find((bet) => bet.id === next.id)) return [...bets, next];
	return bets.map((bet) => bet.id === next.id ? {
		...bet,
		amount: bet.amount + next.amount
	} : bet);
}
function stakeOf(bets) {
	return bets.reduce((sum, bet) => sum + bet.amount, 0);
}
function settleWheel(bets, result) {
	let payout = 0;
	const winners = [];
	for (const bet of bets) {
		if (!bet.numbers.includes(result)) continue;
		payout += bet.amount * (bet.odds + 1);
		winners.push(bet.label);
	}
	return {
		payout,
		winners
	};
}
/** Absolute wheel rotation (degrees) that parks `result` under the top pointer. */
function rotationFor(result, current) {
	const idx = WHEEL.indexOf(result);
	const slice = 360 / WHEEL.length;
	const desired = (-idx * slice % 360 + 360) % 360;
	let next = (Math.floor(current / 360) + 5) * 360 + desired;
	if (next <= current + 180) next += 360;
	return next;
}
var TABLES = [
	{
		id: "pokies",
		kicker: "Three reel",
		name: "Neon 77",
		copy: "Five lines, a wild star, and sevens that pay anywhere.",
		meta: "From 10 chips",
		art: "/art/pokies.jpg",
		pace: "live"
	},
	{
		id: "blackjack",
		kicker: "Six decks",
		name: "The Velvet Hand",
		copy: "Dealer stands on 17. Blackjack pays three to two.",
		meta: "From 50 chips",
		art: "/art/blackjack.jpg",
		pace: "live"
	},
	{
		id: "roulette",
		kicker: "Single zero",
		name: "Midnight Wheel",
		copy: "European wheel. Straights, dozens, and the outside.",
		meta: "Chips from 10",
		art: "/art/roulette.jpg",
		pace: "live"
	},
	{
		id: "baccarat",
		kicker: "Punto banco",
		name: "The Gold Shoe",
		copy: "Player, banker, or the tie. Commission on the banker.",
		meta: "From 25 chips",
		art: "/art/baccarat.jpg",
		pace: "live"
	},
	{
		id: "poker",
		kicker: "Jacks or better",
		name: "Royal Velvet",
		copy: "Five cards. Hold the star hand. A royal pays 800.",
		meta: "From 10 chips",
		art: "/art/poker.jpg",
		pace: "private"
	},
	{
		id: "crash",
		kicker: "Cash out",
		name: "Star Crash",
		copy: "The star climbs. Take the multiplier before it breaks.",
		meta: "From 10 chips",
		art: "/art/crash.jpg",
		pace: "private"
	},
	{
		id: "hilo",
		kicker: "One deck",
		name: "Higher",
		copy: "Call the next card. A tie drops the climb.",
		meta: "From 10 chips",
		art: "/art/hilo.jpg",
		pace: "private"
	},
	{
		id: "dice",
		kicker: "Two dice",
		name: "Pink Dice",
		copy: "Low, high, seven, or any pair.",
		meta: "From 10 chips",
		art: "/art/dice.jpg",
		pace: "private"
	}
];
var GAME_LABEL = {
	pokies: "Neon 77",
	blackjack: "Velvet Hand",
	roulette: "Midnight Wheel",
	baccarat: "Gold Shoe",
	poker: "Royal Velvet",
	crash: "Star Crash",
	hilo: "Higher",
	dice: "Pink Dice",
	comp: "House"
};
function Lobby({ onPlay }) {
	const ledger = useCasino((s) => s.ledger);
	const balance = useCasino((s) => s.balance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-frame relative isolate flex flex-col justify-end overflow-hidden rounded-card border border-gold/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/art/hero.jpg",
						alt: "",
						className: "hero-still absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/20 sm:bg-gradient-to-r sm:from-midnight sm:via-midnight/75 sm:to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative px-6 py-8 sm:px-10 sm:py-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/wordmark-full-colour.svg",
								alt: "Pornstar Players",
								className: "h-16 w-auto max-w-xs sm:h-24"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs font-semibold tracking-brand text-pink",
								children: "LIVE FLOOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 max-w-xl font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gold-text",
									children: "Real stars."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block",
									children: "The tables are live."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-ink sm:text-base",
								children: [formatChips(balance), " chips on the rack. Rounds close on a clock. Sit in, or watch them go by."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-semibold tracking-brand text-gold",
								children: "REAL STARS. REAL GAMES. REAL REWARDS."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: TABLES.map((table) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onPlay(table.id),
									className: "min-h-11 rounded-full border border-gold/70 bg-midnight/50 px-4 text-sm font-semibold text-gold backdrop-blur-sm hover:bg-gold hover:text-midnight",
									children: table.name
								}, table.id))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorTape, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: TABLES.map((table) => table.pace === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCard, {
					table,
					onPlay
				}, table.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivateCard, {
					table,
					onPlay
				}, table.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-gold",
					children: "Latest slips"
				}), ledger.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-mist",
					children: "No hands yet. The rack starts at five thousand chips."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line rounded-card border border-line",
					children: ledger.slice(0, 6).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-3 px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-ink",
								children: GAME_LABEL[row.game]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block truncate text-mist",
								children: row.note
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: row.delta >= 0 ? "shrink-0 font-semibold text-gold" : "shrink-0 text-mist",
							children: formatDelta(row.delta)
						})]
					}, row.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-card border border-line bg-graphite p-5 text-sm leading-relaxed text-mist",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "House notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 list-disc space-y-2 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Rounds close on a clock. An empty seat just watches." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Chips have no cash value. They cannot be redeemed or transferred." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "If the rack drops under 100, the house comps you back to 5,000." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Outcomes are decided in your browser. Nothing is staked with a third party." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "18+ only. If the floor stops being fun, leave the table." })
						]
					})]
				})]
			})
		]
	});
}
function FloorTape() {
	const wheel = useLiveClock("roulette");
	const shoe = useLiveClock("blackjack");
	const reels = useLiveClock("pokies");
	const gold = useLiveClock("baccarat");
	const pocket = wheelPocket(wheel.phase === "result" ? wheel.round : Math.max(0, wheel.round - 1));
	const tone = toneOf(pocket);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tape, {
				label: "Midnight Wheel",
				value: `${phaseLabel("roulette", wheel.phase)} · ${formatClock(wheel.left)}`,
				extra: tone === "zero" ? `${pocket} zero` : `${pocket} ${tone}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tape, {
				label: "Velvet Hand",
				value: `${phaseLabel("blackjack", shoe.phase)} · ${formatClock(shoe.left)}`,
				extra: "Six decks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tape, {
				label: "Neon 77",
				value: `${phaseLabel("pokies", reels.phase)} · ${formatClock(reels.left)}`,
				extra: "Studio spin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tape, {
				label: "Gold Shoe",
				value: `${phaseLabel("baccarat", gold.phase)} · ${formatClock(gold.left)}`,
				extra: "Punto banco"
			})
		]
	});
}
function Tape({ label, value, extra }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-full border border-line bg-graphite px-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 text-xs font-semibold tracking-brand text-pink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "live-dot",
				"aria-hidden": true
			}), label.toUpperCase()]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-right text-xs text-mist",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-semibold text-gold",
				children: value
			}), extra]
		})]
	});
}
function LiveCard({ table, onPlay }) {
	const live = useLiveClock(table.id);
	const history = table.id === "roulette" ? Array.from({ length: 8 }, (_, i) => wheelPocket(live.round - i - (live.phase === "result" ? 0 : 1))) : [];
	const road = table.id === "baccarat" ? Array.from({ length: 8 }, (_, i) => playCoup(live.round - i - (live.phase === "result" ? 0 : 1)).winner) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col overflow-hidden rounded-card border border-line bg-graphite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: table.art,
				alt: "",
				className: "h-44 w-full object-cover sm:h-52"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-midnight/80 px-3 py-1 text-xs font-semibold tracking-brand text-pink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "live-dot",
					"aria-hidden": true
				}), "LIVE"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold tracking-brand text-pink",
					children: [
						phaseLabel(table.id, live.phase).toUpperCase(),
						" · ",
						formatClock(live.left)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-semibold text-gold",
					children: table.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 flex-1 text-sm leading-relaxed text-mist",
					children: table.copy
				}),
				road.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1",
					children: road.map((mark, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold ${mark === "player" ? "bg-ink text-midnight" : mark === "banker" ? "bg-pink text-midnight" : "bg-violet text-ink"}`,
						children: mark === "player" ? "P" : mark === "banker" ? "B" : "T"
					}, `${mark}-${i}`))
				}),
				history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1",
					children: history.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold ${toneOf(n) === "red" ? "bg-pink text-midnight" : toneOf(n) === "zero" ? "bg-violet text-ink" : "bg-midnight text-ink"}`,
						children: n
					}, `${n}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-semibold tracking-wide text-gold",
					children: table.meta
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": `open-${table.id}`,
					onClick: () => onPlay(table.id),
					className: "mt-4 min-h-11 rounded-full border border-gold text-sm font-semibold text-gold hover:bg-gold hover:text-midnight",
					children: "Join table"
				})
			]
		})]
	});
}
function PrivateCard({ table, onPlay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col overflow-hidden rounded-card border border-line bg-graphite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: table.art,
				alt: "",
				className: "h-44 w-full object-cover sm:h-52"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-3 left-3 rounded-full bg-midnight/80 px-3 py-1 text-xs font-semibold tracking-brand text-gold",
				children: "TABLE"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-brand text-pink",
					children: table.kicker.toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-semibold text-gold",
					children: table.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 flex-1 text-sm leading-relaxed text-mist",
					children: table.copy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-semibold tracking-wide text-gold",
					children: table.meta
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": `open-${table.id}`,
					onClick: () => onPlay(table.id),
					className: "mt-4 min-h-11 rounded-full border border-gold text-sm font-semibold text-gold hover:bg-gold hover:text-midnight",
					children: "Take a seat"
				})
			]
		})]
	});
}
/** Pair, then three-of-a-kind, as multiples of the line stake. */
var PAY = {
	star: [10, 160],
	seven: [6, 80],
	crown: [4, 60],
	diamond: [4, 40],
	lips: [2, 32],
	heart: [2, 24],
	spade: [0, 22],
	chip: [0, 18],
	dice: [0, 18],
	card: [0, 12]
};
var SYMBOL_LABEL = {
	star: "Star",
	seven: "Seven",
	crown: "Crown",
	diamond: "Diamond",
	lips: "Lips",
	heart: "Heart",
	spade: "Spade",
	chip: "Chip",
	dice: "Dice",
	card: "Ace"
};
/** Five lines on a 3×3 window. Row 0 is the top. */
var LINES = [
	[
		1,
		1,
		1
	],
	[
		0,
		0,
		0
	],
	[
		2,
		2,
		2
	],
	[
		0,
		1,
		2
	],
	[
		2,
		1,
		0
	]
];
var REELS = [
	[
		"card",
		"card",
		"chip",
		"chip",
		"heart",
		"spade",
		"dice",
		"lips",
		"card",
		"chip",
		"diamond",
		"heart",
		"seven",
		"card",
		"spade",
		"crown",
		"chip",
		"dice",
		"star",
		"heart",
		"card",
		"lips",
		"chip",
		"spade",
		"diamond",
		"card",
		"seven",
		"heart",
		"crown",
		"chip"
	],
	[
		"chip",
		"card",
		"heart",
		"card",
		"spade",
		"dice",
		"chip",
		"lips",
		"heart",
		"card",
		"diamond",
		"spade",
		"card",
		"seven",
		"chip",
		"crown",
		"heart",
		"dice",
		"card",
		"star",
		"spade",
		"chip",
		"lips",
		"heart",
		"card",
		"diamond",
		"spade",
		"seven",
		"chip",
		"crown"
	],
	[
		"heart",
		"card",
		"chip",
		"spade",
		"card",
		"dice",
		"lips",
		"heart",
		"chip",
		"card",
		"diamond",
		"spade",
		"seven",
		"card",
		"crown",
		"chip",
		"heart",
		"star",
		"dice",
		"card",
		"spade",
		"lips",
		"chip",
		"heart",
		"card",
		"diamond",
		"crown",
		"chip",
		"seven",
		"spade"
	]
];
var BETS = [
	10,
	25,
	50,
	100,
	250,
	500
];
var STARTER = [
	[
		"crown",
		"star",
		"heart"
	],
	[
		"seven",
		"diamond",
		"chip"
	],
	[
		"lips",
		"crown",
		"card"
	]
];
function windowAt(strip, stop) {
	return [
		0,
		1,
		2
	].map((k) => strip[(stop + k) % strip.length]);
}
function spinGrid(random = Math.random) {
	return REELS.map((strip) => windowAt(strip, Math.floor(random() * strip.length)));
}
function resolveLine(cells) {
	let target = null;
	for (const sym of cells) if (sym !== "star") {
		target = sym;
		break;
	}
	const paySym = target ?? "star";
	let count = 0;
	for (const sym of cells) if (sym === paySym || sym === "star") count += 1;
	else break;
	if (count < 2) return null;
	if (count === 2 && PAY[paySym][0] === 0) return null;
	return {
		sym: paySym,
		count
	};
}
function evaluate(grid, totalBet, free) {
	const lineBet = totalBet / LINES.length;
	const boost = free ? 2 : 1;
	const hits = [];
	LINES.forEach((rows, index) => {
		const hit = resolveLine(rows.map((row, reel) => grid[reel][row]));
		if (!hit) return;
		const amount = (hit.count === 2 ? PAY[hit.sym][0] : PAY[hit.sym][1]) * lineBet * boost;
		if (amount <= 0) return;
		hits.push({
			index,
			sym: hit.sym,
			count: hit.count,
			amount,
			cells: rows.slice(0, hit.count).map((row, reel) => ({
				reel,
				row
			}))
		});
	});
	const scatters = [];
	grid.forEach((reel, r) => {
		reel.forEach((sym, row) => {
			if (sym === "seven") scatters.push({
				reel: r,
				row
			});
		});
	});
	let freeAward = 0;
	if (scatters.length >= 3) {
		freeAward = 5;
		hits.push({
			index: -1,
			sym: "seven",
			count: scatters.length,
			amount: totalBet * 4 * boost,
			cells: scatters
		});
	}
	const total = hits.reduce((sum, hit) => sum + hit.amount, 0);
	const parts = [];
	const lineHits = hits.filter((hit) => hit.index >= 0);
	if (lineHits.length === 1) {
		const hit = lineHits[0];
		parts.push(`${SYMBOL_LABEL[hit.sym]} ×${hit.count}`);
	} else if (lineHits.length > 1) parts.push(`${lineHits.length} lines`);
	if (freeAward) parts.push(`${scatters.length} sevens · +${freeAward} free`);
	if (free) parts.push("free ×2");
	if (total >= totalBet * 15) parts.unshift("Starlight");
	const banner = total > 0 || freeAward > 0 ? parts.join(" · ") : "No line";
	return {
		hits,
		total,
		freeAward,
		banner
	};
}
var ORDER = [
	"star",
	"seven",
	"crown",
	"diamond",
	"lips",
	"heart",
	"spade",
	"chip",
	"dice",
	"card"
];
function Pokies() {
	const clock = useLiveClock("pokies");
	const [bet, setBet] = (0, import_react.useState)(25);
	const [queued, setQueued] = (0, import_react.useState)(false);
	const [grid, setGrid] = (0, import_react.useState)(STARTER);
	const [locked, setLocked] = (0, import_react.useState)([
		true,
		true,
		true
	]);
	const [hits, setHits] = (0, import_react.useState)([]);
	const [banner, setBanner] = (0, import_react.useState)("One spin for the whole studio. Ride it, or watch.");
	const [freeLeft, setFreeLeft] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const timers = (0, import_react.useRef)([]);
	const pending = (0, import_react.useRef)(null);
	const lock = (0, import_react.useRef)(false);
	const spun = (0, import_react.useRef)(null);
	const queuedRef = (0, import_react.useRef)(false);
	const freeRef = (0, import_react.useRef)(0);
	const betRef = (0, import_react.useRef)(bet);
	queuedRef.current = queued;
	freeRef.current = freeLeft;
	betRef.current = bet;
	function settlePending() {
		const due = pending.current;
		if (!due) return;
		pending.current = null;
		if (due.amount > 0) useCasino.getState().apply("pokies", due.note, due.amount);
	}
	(0, import_react.useEffect)(() => {
		return () => {
			timers.current.forEach((id) => window.clearTimeout(id));
			settlePending();
		};
	}, []);
	const betIndex = BETS.indexOf(bet);
	function beginSpin(result, stakeAmount, free) {
		if (lock.current) return;
		settlePending();
		lock.current = true;
		setBusy(true);
		const scored = stakeAmount > 0 ? evaluate(result, stakeAmount, free) : null;
		pending.current = scored ? {
			amount: scored.total,
			note: scored.banner
		} : null;
		setGrid(result);
		setHits([]);
		setLocked([
			false,
			false,
			false
		]);
		setBanner(stakeAmount > 0 ? free ? "Free spin" : "Reels live" : "Watching the studio");
		playSpin(useCasino.getState().muted);
		const gaps = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? [
			40,
			40,
			40
		] : [
			480,
			860,
			1240
		];
		timers.current.forEach((id) => window.clearTimeout(id));
		timers.current = gaps.map((ms, reel) => window.setTimeout(() => {
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
				setBanner(scored.total > 0 || scored.freeAward > 0 ? `${scored.banner} · ${formatDelta(scored.total)}` : scored.banner);
				if (scored.freeAward) setFreeLeft((n) => Math.min(48, n + scored.freeAward));
				if (scored.total > 0) playWin(useCasino.getState().muted, scored.total >= stakeAmount * 15);
			} else setBanner("Studio spin. You sat this one out.");
			lock.current = false;
			setBusy(false);
		}, ms));
	}
	(0, import_react.useEffect)(() => {
		if (clock.phase === "betting") {
			if (spun.current === clock.round) return;
			setBanner(freeRef.current > 0 ? `${freeRef.current} free · they ride themselves` : queuedRef.current ? `Riding ${formatChips(betRef.current)} · closes ${formatClock(clock.left)}` : "Bets open. Ride this spin, or watch.");
			return;
		}
		if (clock.phase !== "action" || spun.current === clock.round) return;
		spun.current = clock.round;
		const result = spinGrid(mulberry32(roundSeed("pokies", clock.round)));
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
			if (!useCasino.getState().apply("pokies", `Spin ${formatChips(stakeAmount)}`, -stakeAmount)) {
				setBanner("Not enough chips. Watching.");
				beginSpin(result, 0, false);
				return;
			}
		}
		beginSpin(result, stakeAmount, free);
	}, [clock.phase, clock.round]);
	const hot = new Set(hits.flatMap((hit) => hit.cells.map((cell) => `${cell.reel}:${cell.row}`)));
	const riderRng = mulberry32(roundSeed("pokies-seats", clock.round));
	const riders = [
		"Ivo",
		"Nia",
		"Cal"
	].map((name) => {
		if (riderRng() < .3) return {
			name,
			detail: "Watching"
		};
		const amount = [
			25,
			50,
			100
		][Math.floor(riderRng() * 3)];
		return {
			name,
			detail: `Riding ${formatChips(amount)}`
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealerStage, {
				art: "/art/pokies.jpg",
				dealer: "/art/dealer-lumen.jpg",
				name: DEALERS.pokies
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-brand text-pink",
							children: "NEON 77"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-gold",
							children: "Pokies"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-right text-sm text-mist",
							"aria-live": "polite",
							children: freeLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-pink",
								children: [freeLeft, " free"]
							}) : `${LINES.length} lines`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRail, {
						table: "pokies",
						dealer: DEALERS.pokies,
						call: clock.phase === "betting" ? "Bets open" : "Same spin for every seat",
						live: clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2 rounded-card border border-line bg-midnight p-2 sm:gap-3 sm:p-3",
						children: grid.map((reel, reelIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `reel-window h-60 rounded-md bg-graphite sm:h-72 ${locked[reelIndex] ? "" : "reel-spin"}`,
							children: locked[reelIndex] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: busy ? "" : "reel-land",
								children: reel.map((sym, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Symbol, {
									sym,
									hot: hot.has(`${reelIndex}:${row}`)
								}, `${reelIndex}-${row}`))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "reel-strip",
								children: [...ORDER, ...ORDER].map((sym, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Symbol, { sym }, `${reelIndex}-s-${row}`))
							})
						}, reelIndex))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatRail, { seats: riders }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 min-h-6 text-center text-sm font-semibold text-gold",
						"aria-live": "polite",
						"data-testid": "pokies-banner",
						children: banner
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Lower stake",
								disabled: clock.phase !== "betting" || betIndex <= 0,
								onClick: () => setBet(BETS[betIndex - 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg text-ink disabled:opacity-40",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "min-w-28 text-center text-sm font-semibold tabular-nums text-ink",
								children: [formatChips(bet), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs font-medium tracking-brand text-mist",
									children: "STAKE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Raise stake",
								disabled: clock.phase !== "betting" || betIndex >= BETS.length - 1,
								onClick: () => setBet(BETS[betIndex + 1]),
								className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-lg text-ink disabled:opacity-40",
								children: "+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "spin",
								disabled: freeLeft > 0,
								onClick: () => {
									unlockAudio();
									setQueued((on) => !on);
								},
								className: "min-h-12 min-w-36 rounded-full bg-pink px-6 text-sm font-semibold tracking-wide text-midnight disabled:opacity-40",
								children: freeLeft > 0 ? "Free spins ride" : queued ? "Riding" : "Ride this spin"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "mt-4 rounded-card border border-line bg-graphite/70 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "text-sm font-semibold text-gold",
					children: ["Paytable · line stake ", formatChips(bet / LINES.length)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-mist",
					children: "Five lines, left to right. The star stands in for any symbol. Stars, sevens, crowns, diamonds, lips and hearts also pay as a pair. Three or more sevens anywhere pay 4× the stake and award 5 free spins at double, up to 48 waiting."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: ORDER.map((sym) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-2 ${symTone(sym)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymIcon, {
								sym,
								className: "size-5"
							}), SYMBOL_LABEL[sym]]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-mist",
							children: [
								PAY[sym][0] === 0 ? "—" : formatChips(PAY[sym][0] * (bet / LINES.length)),
								" / ",
								formatChips(PAY[sym][1] * (bet / LINES.length))
							]
						})]
					}, sym))
				})
			]
		})]
	});
}
function Symbol({ sym, hot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `reel-cell flex h-20 items-center justify-center sm:h-24 ${hot ? "win-cell" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: symTone(sym),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymIcon, {
				sym,
				className: "size-9 sm:size-11"
			})
		})
	});
}
var SLICE = 360 / WHEEL.length;
function toneName(n) {
	const tone = toneOf(n);
	if (tone === "zero") return "zero";
	return tone === "red" ? "red" : "black";
}
function Roulette() {
	const clock = useLiveClock("roulette");
	const closed = clock.phase !== "betting";
	const [chip, setChip] = (0, import_react.useState)(25);
	const [bets, setBets] = (0, import_react.useState)([]);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [banner, setBanner] = (0, import_react.useState)("Bets open. The wheel does not wait.");
	const betsRef = (0, import_react.useRef)(bets);
	betsRef.current = bets;
	const pending = (0, import_react.useRef)(null);
	const opened = (0, import_react.useRef)(null);
	const spun = (0, import_react.useRef)(null);
	const settled = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			const due = pending.current;
			if (!due) return;
			pending.current = null;
			const { payout, winners } = settleWheel(due.bets, wheelPocket(due.round));
			if (payout > 0) useCasino.getState().apply("roulette", `${due.round} · ${winners.join(", ")}`, payout);
		};
	}, []);
	(0, import_react.useEffect)(() => {
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
			pending.current = {
				round,
				bets: live,
				stake
			};
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
	const history = Array.from({ length: 10 }, (_, i) => wheelPocket(clock.round - i - (clock.phase === "result" ? 0 : 1)));
	function add(next) {
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
	function amountFor(id) {
		return bets.find((bet) => bet.id === id)?.amount ?? 0;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 pb-24 lg:grid-cols-[280px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-card border border-gold/40 bg-graphite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealerStage, {
				art: "/art/roulette.jpg",
				dealer: "/art/dealer-noor.jpg",
				name: DEALERS.roulette
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-brand text-pink",
						children: "SINGLE ZERO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "Midnight Wheel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRail, {
						table: "roulette",
						dealer: DEALERS.roulette,
						call: banner,
						live: clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto mt-4 aspect-square w-full max-w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 200 200",
							className: "h-full w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "wheel-rotor",
								style: {
									transform: `rotate(${rotation}deg)`,
									transition: spinning ? "transform 4.4s cubic-bezier(0.12, 0.7, 0.08, 1)" : void 0
								},
								children: [WHEEL.map((n, i) => {
									const tone = toneOf(n);
									const hot = result === n && !spinning;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										transform: `translate(100 100) rotate(${i * SLICE})`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: wedge(SLICE, 94),
											className: tone === "zero" ? "fill-violet" : tone === "red" ? "fill-pink" : "fill-midnight",
											stroke: hot ? "#F6E3A1" : "#3A3A46",
											strokeWidth: hot ? 1.6 : .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											y: -72,
											textAnchor: "middle",
											className: "fill-ink font-sans",
											fontSize: "7.5",
											fontWeight: "700",
											children: n
										})]
									}, `${n}-${i}`);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "100",
									cy: "100",
									r: "26",
									className: "fill-graphite stroke-gold",
									strokeWidth: "2"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "100,6 93,20 107,20",
								className: "fill-gold"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/star-icon-colour.svg",
							alt: "",
							className: "pointer-events-none absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 min-h-12 text-center text-sm font-semibold text-gold",
						"aria-live": "polite",
						"data-testid": "roulette-banner",
						children: banner
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-1",
						children: history.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold ${toneOf(n) === "red" ? "bg-pink text-midnight" : toneOf(n) === "zero" ? "bg-violet text-ink" : "bg-midnight text-ink"}`,
							children: n
						}, `${n}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatRail, { seats: seats.map((seat) => ({
						name: seat.name,
						detail: seat.amount > 0 ? `${seat.label} · ${formatChips(seat.amount)}` : "Sitting out"
					})) })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2",
				children: [CHIPS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setChip(value),
					className: `min-h-11 rounded-full px-4 text-sm font-semibold ${chip === value ? "bg-gold text-midnight" : "border border-line text-mist"}`,
					children: formatChips(value)
				}, value)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ml-auto text-sm text-mist",
					children: ["On felt ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-ink",
						children: formatChips(stake)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: closed,
					onClick: () => add(straightBet(0, chip)),
					className: "col-span-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-violet text-sm font-semibold text-ink",
					children: ["0", amountFor("n-0") > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipBadge, { amount: amountFor("n-0") })]
				}), Array.from({ length: 12 }, (_, row) => [
					1,
					2,
					3
				].map((col) => {
					const n = row * 3 + col;
					const tone = toneOf(n);
					const laid = amountFor(`n-${n}`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: closed,
						onClick: () => add(straightBet(n, chip)),
						className: `relative flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-ink ${tone === "red" ? "bg-pink" : "bg-midnight border border-line"} ${result === n ? "ring-2 ring-gold" : ""}`,
						children: [n, laid > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-1 bottom-0.5 text-xs font-semibold text-gold",
							children: formatChips(laid)
						})]
					}, n);
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-3 gap-1",
				children: [[
					0,
					1,
					2
				].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltButton, {
					disabled: closed,
					label: dozenBet(index, chip).label,
					amount: amountFor(`d-${index}`),
					onClick: () => add(dozenBet(index, chip))
				}, `d-${index}`)), [
					0,
					1,
					2
				].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltButton, {
					disabled: closed,
					label: `Col ${index + 1}`,
					amount: amountFor(`c-${index}`),
					onClick: () => add(columnBet(index, chip))
				}, `c-${index}`))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3",
				children: [
					["red", "Red"],
					["black", "Black"],
					["odd", "Odd"],
					["even", "Even"],
					["low", "1–18"],
					["high", "19–36"]
				].map(([kind, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltButton, {
					disabled: closed,
					label,
					amount: amountFor(kind),
					tone: kind === "red" ? "red" : kind === "black" ? "black" : "plain",
					onClick: () => add(outsideBet(kind, chip))
				}, kind))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: closed || bets.length === 0,
					onClick: () => {
						setBets([]);
						setBanner("Felt cleared.");
					},
					className: "min-h-12 rounded-full border border-line px-5 text-sm font-semibold text-mist disabled:opacity-40",
					children: "Clear"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-testid": "roulette-spin",
					className: "flex min-h-12 flex-1 items-center justify-center rounded-full bg-pink px-4 text-sm font-semibold text-midnight",
					children: closed ? "No more bets" : `Closes ${formatClock(clock.left)}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-mist",
				children: "The wheel spins on a clock. Chips on the felt ride the next pocket. An empty felt watches. Straights pay 35 to 1. Dozens and columns pay 2 to 1. Pink pockets are the reds."
			})
		] })]
	});
}
function wedge(slice, r) {
	const half = slice * Math.PI / 180 / 2;
	const x0 = Math.sin(-half) * r;
	const y0 = -Math.cos(-half) * r;
	const x1 = Math.sin(half) * r;
	const y1 = -Math.cos(half) * r;
	return `M 0 0 L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}
function ChipBadge({ amount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-semibold text-gold",
		children: formatChips(amount)
	});
}
function FeltButton({ label, amount, onClick, disabled, tone = "plain" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick,
		className: `flex min-h-11 items-center justify-center gap-2 rounded-md border border-line text-sm font-semibold ${tone === "red" ? "bg-pink text-ink" : tone === "black" ? "bg-midnight text-ink" : "bg-graphite text-ink"}`,
		children: [label, amount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-gold",
			children: formatChips(amount)
		})]
	});
}
function Shell({ children, title, onBack }) {
	const balance = useCasino((s) => s.balance);
	const muted = useCasino((s) => s.muted);
	const toggleMute = useCasino((s) => s.toggleMute);
	const comp = useCasino((s) => s.comp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "floor text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-midnight/85 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
					children: [
						onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onBack,
							className: "inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-3 text-sm text-mist hover:border-gold hover:text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								className: "size-4",
								"aria-hidden": true
							}), "Floor"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/star-icon-colour.svg",
							alt: "",
							className: "size-8 shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-lg font-semibold text-gold",
								children: title
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/wordmark-simplified-colour.svg",
								alt: "Pornstar Players",
								className: "h-8 w-auto max-w-full sm:h-10"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-testid": "balance",
							className: "rounded-full border border-gold/50 bg-graphite px-3 py-2 text-sm font-semibold tabular-nums text-gold",
							children: [formatChips(balance), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 hidden font-medium tracking-brand text-mist sm:inline",
								children: "CHIPS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": muted ? "Unmute" : "Mute",
							onClick: () => {
								unlockAudio();
								playClick(!muted);
								toggleMute();
							},
							className: "inline-flex size-11 items-center justify-center rounded-full border border-line text-mist hover:text-ink",
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 py-6",
				children
			}),
			balance < 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-graphite/95 px-4 py-3 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Rack’s light. The house will comp you back to five thousand."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => comp(),
						className: "min-h-11 shrink-0 rounded-full bg-pink px-4 text-sm font-semibold text-midnight",
						children: "Take comp"
					})]
				})
			})
		]
	});
}
var TITLES = {
	pokies: "Neon 77",
	blackjack: "The Velvet Hand",
	roulette: "Midnight Wheel",
	baccarat: "The Gold Shoe",
	poker: "Royal Velvet",
	crash: "Star Crash",
	hilo: "Higher",
	dice: "Pink Dice"
};
function Home() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [floor, setFloor] = (0, import_react.useState)(null);
	const ofAge = useCasino((s) => s.ofAge);
	(0, import_react.useEffect)(() => {
		const finish = () => setHydrated(true);
		if (useCasino.persist.hasHydrated()) finish();
		return useCasino.persist.onFinishHydration(finish);
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "floor flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand/wordmark-full-colour.svg",
			alt: "Pornstar Players",
			className: "h-24 w-auto max-w-[80vw]"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: floor ? TITLES[floor] : void 0,
		onBack: floor ? () => setFloor(null) : void 0,
		children: [
			floor === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lobby, { onPlay: setFloor }),
			floor === "pokies" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pokies, {}),
			floor === "blackjack" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blackjack, {}),
			floor === "roulette" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roulette, {}),
			floor === "baccarat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baccarat, {}),
			floor === "poker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poker, {}),
			floor === "crash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crash, {}),
			floor === "hilo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hilo, {}),
			floor === "dice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dice, {}),
			!ofAge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeGate, {})
		]
	});
}
//#endregion
export { Home as component };
