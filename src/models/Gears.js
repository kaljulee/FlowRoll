import { COLORS } from '../constants/styleValues';

export const Gears = {
  NEUTRAL: 'NEUTRAL',
  FULL_CYCLE: 'FULL_CYCLE',
  TRUNCATE: 'TRUNCATE',
  SHRINK_TO_FIT: 'SHRINK_TO_FIT',
};

export function getPhaseColor(phase) {
  const colors = PHASE_COLORS();
  return colors[phase];
}

export const PHASES = {
  ROUND: 'ROUND',
  WARMUP: 'WARMUP',
  COOLDOWN: 'COOLDOWN',
};

export const PHASE_COLORS = () => {
  const colors = {};
  colors[PHASES.ROUND] = COLORS.RED;
  colors[PHASES.WARMUP] = COLORS.CREAM;
  colors[PHASES.COOLDOWN] = COLORS.LIGHTBLUE;
  return colors;
};
