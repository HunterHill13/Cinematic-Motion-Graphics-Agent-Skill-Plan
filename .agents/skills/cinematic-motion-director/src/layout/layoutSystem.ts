export interface SafeZone {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const EDITORIAL_SAFE_ZONE: SafeZone = {
  top: 60,
  bottom: 60,
  left: 100,
  right: 100,
};

export interface MotionDensityBudget {
  primaryActors: number;
  secondaryActors: number;
  decorativeActors: number;
  cameraCurves: number;
  simultaneousImpacts: number;
}

export const DEFAULT_V13_BUDGET: MotionDensityBudget = {
  primaryActors: 1,
  secondaryActors: 2,
  decorativeActors: 0,
  cameraCurves: 1,
  simultaneousImpacts: 1,
};

export interface GridColumn {
  index: number;
  left: number;
  width: number;
  right: number;
}

/**
 * 12-COLUMN EDITORIAL GRID SYSTEM (1920x1080)
 */
export function calculate12ColumnGrid(
  totalWidth: number = 1920,
  safeZone: SafeZone = EDITORIAL_SAFE_ZONE,
  gutter: number = 24
): GridColumn[] {
  const usableWidth = totalWidth - safeZone.left - safeZone.right;
  const numColumns = 12;
  const columnWidth = (usableWidth - (numColumns - 1) * gutter) / numColumns;

  const cols: GridColumn[] = [];
  for (let i = 0; i < numColumns; i++) {
    const left = safeZone.left + i * (columnWidth + gutter);
    cols.push({
      index: i,
      left,
      width: columnWidth,
      right: left + columnWidth,
    });
  }
  return cols;
}

/**
 * VALIDATE MOTION BUDGET
 * Ensures no shot over-populates the screen with arbitrary actors.
 */
export function validateMotionBudget(
  actual: Partial<MotionDensityBudget>,
  budget: MotionDensityBudget = DEFAULT_V13_BUDGET
): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  if ((actual.primaryActors ?? 0) > budget.primaryActors) {
    warnings.push(`Primary actors exceed budget (${actual.primaryActors} > ${budget.primaryActors})`);
  }
  if ((actual.secondaryActors ?? 0) > budget.secondaryActors) {
    warnings.push(`Secondary actors exceed budget (${actual.secondaryActors} > ${budget.secondaryActors})`);
  }
  if ((actual.decorativeActors ?? 0) > budget.decorativeActors) {
    warnings.push(`Decorative actors forbidden in V13 (${actual.decorativeActors} > 0)`);
  }
  if ((actual.cameraCurves ?? 0) > budget.cameraCurves) {
    warnings.push(`Camera curves must be exactly 1 per shot (${actual.cameraCurves} > ${budget.cameraCurves})`);
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}
