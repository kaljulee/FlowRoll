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
  WORK: 'WORK',
  WARMUP: 'WARMUP',
  COOLDOWN: 'COOLDOWN',
};

export const PHASE_COLORS = () => {
  const colors = {};
  colors[PHASES.WORK] = COLORS.RED;
  colors[PHASES.WARMUP] = COLORS.CREAM;
  colors[PHASES.COOLDOWN] = COLORS.LIGHTBLUE;
  return colors;
};
