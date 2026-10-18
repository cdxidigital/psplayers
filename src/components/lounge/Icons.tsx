import {
  Club,
  Crown,
  Diamond,
  Dices,
  Disc,
  Heart,
  Spade,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { Sym } from "@/lib/lounge/slots";
import type { Suit } from "@/lib/lounge/blackjack";

const MAP: Record<Exclude<Sym, "seven" | "lips" | "card">, LucideIcon> = {
  star: Star,
  crown: Crown,
  diamond: Diamond,
  heart: Heart,
  spade: Spade,
  chip: Disc,
  dice: Dices,
};

export function SymIcon({ sym, className }: { sym: Sym; className?: string }) {
  if (sym === "seven") {
    return <span className={`font-display text-lg font-bold leading-none ${className ?? ""}`}>77</span>;
  }
  if (sym === "lips") return <Lips className={className} />;
  if (sym === "card") return <CardGlyph className={className} />;
  const Icon = MAP[sym];
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

export function SuitMark({ suit, className }: { suit: Suit; className?: string }) {
  const Icon = suit === "H" ? Heart : suit === "D" ? Diamond : suit === "S" ? Spade : Club;
  return <Icon className={className} strokeWidth={2} aria-hidden />;
}

function Lips({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M4 15c2.2-3.4 5.2-4.6 8-2.2C13.4 11 16 10.2 16 10.2s2.6.8 4 2.6c2.8-2.4 5.8-1.2 8 2.2-3.2 4.6-7 7-12 7s-8.8-2.4-12-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 16.5c2.4 1.6 4.8 2.2 8 2.2s5.6-.6 8-2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CardGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <rect x="7" y="4" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11" y="8" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 16.5l2.2-2.2 2.2 2.2-2.2 2.2-2.2-2.2Z" fill="currentColor" />
    </svg>
  );
}

export function symTone(sym: Sym): string {
  if (sym === "star" || sym === "seven" || sym === "lips") return "text-pink";
  if (sym === "crown" || sym === "diamond") return "text-gold";
  return "text-mist";
}
