import timeline from './voiceTimeline.json';

export type AcousticEvent = keyof typeof timeline.events;

export const ACOUSTIC_EVENTS = timeline.events;

export const SHOT_RANGES = {
  shot01: { start: 0, duration: 380 },
  shot02: { start: 350, duration: 300 },
  shot03: { start: 620, duration: 870 },
  shot04: { start: 1460, duration: 270 },
  shot05: { start: 1700, duration: 485 },
  shot06: { start: 2155, duration: 206 },
} as const;

/**
 * Returns global absolute frame (0 - 2361) for an acoustic event.
 */
export function getAcousticTrigger(event: AcousticEvent): number {
  return timeline.events[event];
}

/**
 * Returns shot-local frame for an acoustic event within a shot sequence.
 */
export function getLocalAcousticTrigger(
  shot: keyof typeof SHOT_RANGES,
  event: AcousticEvent
): number {
  const globalFrame = timeline.events[event];
  const shotStart = SHOT_RANGES[shot].start;
  return globalFrame - shotStart;
}
