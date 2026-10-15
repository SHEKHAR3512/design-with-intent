export interface ContrastResult {
  ratio: number;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
  uiComponentAA: boolean;
}

export interface TargetSizeResult {
  width: number;
  height: number;
  wcag22AA: boolean;
  mobileRecommended: boolean;
  status: string;
}

export function calculateContrast(color1: string, color2: string): ContrastResult;
export function checkTargetSize(width: number | string, height: number | string, isMobilePrimary?: boolean): TargetSizeResult;

export function getSkillPath(): string;
export function getSkillDir(): string;
export function getSkillContent(): string;
export function getReference(name: 'visual-system' | 'repair' | 'web' | 'research' | 'design-record' | string): string;
export function getSchema(name: 'design-record' | 'evaluation' | 'findings' | string): Record<string, unknown>;
export function getDesignRecordTemplate(overrides?: {
  product?: string;
  audience?: string;
  primary_task?: string;
  mode?: 'create' | 'repair' | 'audit';
}): string;
