export type CharacterId = "cleo" | "lumen" | "noor" | "vesper";
export type CharacterMoment = "win" | "loss" | "commission";

export type AICharacter = {
  id: CharacterId;
  name: string;
  age: string;
  title: string;
  style: string;
  anchor: string;
};

const RAW_ART = "https://raw.githubusercontent.com/cdxidigital/psplayers/main/public/art";

export const AI_CHARACTERS: AICharacter[] = [
  {
    id: "cleo",
    name: "Cleo",
    age: "Fictional adult · 29+",
    title: "The velvet tease",
    style: "Warm, playful, and always one beat ahead.",
    anchor: `${RAW_ART}/dealer-cleo.jpg`,
  },
  {
    id: "lumen",
    name: "Lumen",
    age: "Fictional adult · 28+",
    title: "The after-hours star",
    style: "Cool confidence with a mischievous streak.",
    anchor: `${RAW_ART}/dealer-lumen.jpg`,
  },
  {
    id: "noor",
    name: "Noor",
    age: "Fictional adult · 30+",
    title: "The golden-hour gambler",
    style: "Elegant, composed, and quietly daring.",
    anchor: `${RAW_ART}/dealer-noor.jpg`,
  },
  {
    id: "vesper",
    name: "Vesper",
    age: "Fictional adult · 31+",
    title: "The midnight dealer",
    style: "A polished provocateur with a dry smile.",
    anchor: `${RAW_ART}/dealer-vesper.jpg`,
  },
];

export function getAICharacter(id: CharacterId): AICharacter {
  return AI_CHARACTERS.find((character) => character.id === id) ?? AI_CHARACTERS[0]!;
}
