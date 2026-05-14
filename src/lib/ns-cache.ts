import { getNamespace } from './data';
import type { NamespaceMeta, CodeEntry } from './data';

// Module-level cache: namespace data read once per build worker.
const cache = new Map<string, Promise<{ meta: NamespaceMeta; codes: CodeEntry[] }>>();

export function getCachedNamespace(namespace: string): Promise<{ meta: NamespaceMeta; codes: CodeEntry[] }> {
  if (!cache.has(namespace)) {
    cache.set(namespace, getNamespace(namespace));
  }
  return cache.get(namespace)!;
}
