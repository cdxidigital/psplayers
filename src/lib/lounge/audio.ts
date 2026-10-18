let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  context();
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0) {
  const audio = context();
  if (!audio) return;
  const start = audio.currentTime + when;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  amp.gain.setValueAtTime(gain, start);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(amp);
  amp.connect(audio.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export function playClick(muted: boolean) {
  if (muted) return;
  tone(660, 0.05, "triangle", 0.03);
}

export function playSpin(muted: boolean) {
  if (muted) return;
  tone(180, 0.12, "sawtooth", 0.02);
  tone(320, 0.08, "square", 0.015, 0.06);
}

export function playTick(muted: boolean) {
  if (muted) return;
  tone(880, 0.04, "square", 0.02);
}

export function playWin(muted: boolean, big: boolean) {
  if (muted) return;
  const notes = big ? [523, 659, 784, 1046] : [440, 554, 659];
  notes.forEach((freq, i) => tone(freq, big ? 0.22 : 0.14, "triangle", 0.04, i * 0.09));
}

export function playLose(muted: boolean) {
  if (muted) return;
  tone(220, 0.16, "sine", 0.03);
  tone(160, 0.18, "sine", 0.02, 0.08);
}
