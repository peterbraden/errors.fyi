import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

export interface NamespaceMeta {
  namespace: string;
  title: string;
  description: string;
  references?: string[];
}

export interface CodeEntry {
  code: string;
  namespace: string;
  name: string;
  description: string;
  numeric?: number;
  references?: string[];
}

const DATA_DIR = join(process.cwd(), 'data');

async function readNamespaceDir(namespace: string): Promise<{ meta: NamespaceMeta; codes: CodeEntry[] }> {
  const dir = join(DATA_DIR, namespace);
  const files = await readdir(dir);

  const indexFile = files.find((f) => f === '_index.md');
  if (!indexFile) throw new Error(`Missing _index.md in data/${namespace}`);

  const indexContent = await readFile(join(dir, '_index.md'), 'utf-8');
  const { data: indexData } = matter(indexContent);
  const meta: NamespaceMeta = {
    namespace,
    title: indexData.title,
    description: indexData.description,
    references: indexData.references,
  };

  const codeFiles = files.filter((f) => f !== '_index.md' && f.endsWith('.md'));
  const codes = await Promise.all(
    codeFiles.map(async (file) => {
      const content = await readFile(join(dir, file), 'utf-8');
      const { data } = matter(content);
      return {
        code: file.replace(/\.md$/, ''),
        namespace,
        name: data.name,
        description: data.description,
        numeric: data.numeric,
        references: data.references,
      } satisfies CodeEntry;
    })
  );

  codes.sort((a, b) => {
    const na = parseInt(a.code, 10);
    const nb = parseInt(b.code, 10);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.code.localeCompare(b.code);
  });

  return { meta, codes };
}

async function loadAll(): Promise<{ namespaces: NamespaceMeta[]; codes: CodeEntry[] }> {
  const entries = await readdir(DATA_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const results = await Promise.all(dirs.map((ns) => readNamespaceDir(ns)));
  return {
    namespaces: results.map((r) => r.meta).sort((a, b) => a.title.localeCompare(b.title)),
    codes: results.flatMap((r) => r.codes),
  };
}

export async function getNamespaces(): Promise<NamespaceMeta[]> {
  return (await loadAll()).namespaces;
}

export async function getNamespace(namespace: string): Promise<{ meta: NamespaceMeta; codes: CodeEntry[] }> {
  return readNamespaceDir(namespace);
}

export async function getAllCodes(): Promise<CodeEntry[]> {
  return (await loadAll()).codes;
}

// Returns all entries for a given code string (e.g. "404" or "ENOENT").
export async function getEntriesForCode(code: string): Promise<CodeEntry[]> {
  const all = await getAllCodes();
  return all.filter((c) => c.code === code);
}

// Returns all entries whose numeric field matches the given value.
export async function getEntriesForNumeric(numeric: number): Promise<CodeEntry[]> {
  const all = await getAllCodes();
  return all.filter((c) => c.numeric === numeric);
}

// Returns every path that should be rendered: direct codes + numeric aliases
// that don't already have a direct file.
export async function getAllCodePaths(): Promise<Array<{ code: string; isAlias: boolean }>> {
  const all = await getAllCodes();
  const directCodes = new Set(all.map((c) => c.code));

  const paths: Array<{ code: string; isAlias: boolean }> = [...directCodes].map((code) => ({
    code,
    isAlias: false,
  }));

  // Collect numeric aliases that don't already have a direct code file.
  const numericsSeen = new Set<number>();
  for (const entry of all) {
    if (entry.numeric !== undefined && !numericsSeen.has(entry.numeric)) {
      numericsSeen.add(entry.numeric);
      if (!directCodes.has(String(entry.numeric))) {
        paths.push({ code: String(entry.numeric), isAlias: true });
      }
    }
  }

  return paths;
}
