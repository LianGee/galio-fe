import { ReactNode } from 'react';

export interface StepContent {
  title: string,
  icon: ReactNode,
}

export function mergeProgress(progress: any, data: any) {
  const existedProgress = progress.filter((item: any) => item.current !== data.current);
  existedProgress.push(data);
  return existedProgress;
}
