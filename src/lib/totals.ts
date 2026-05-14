import { getNamespaces, getAllCodes } from './data';

// Module-level cache so data is read once per build worker.
let totalsPromise: Promise<{ nsCount: number; codeCount: number }> | null = null;

export function getTotals(): Promise<{ nsCount: number; codeCount: number }> {
  if (!totalsPromise) {
    totalsPromise = Promise.all([getNamespaces(), getAllCodes()]).then(([ns, codes]) => ({
      nsCount: ns.length,
      codeCount: codes.length,
    }));
  }
  return totalsPromise;
}
