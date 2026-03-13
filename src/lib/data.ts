import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface ErrorCode {
  code: string;
  name: string;
  description: string;
  references?: string[];
}

export interface Namespace {
  namespace: string;
  title: string;
  description: string;
  references?: string[];
  codes: ErrorCode[];
}

const DATA_DIR = join(process.cwd(), 'data');

export async function getNamespaces(): Promise<Namespace[]> {
  const files = await readdir(DATA_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  const namespaces = await Promise.all(
    jsonFiles.map(async (file) => {
      const content = await readFile(join(DATA_DIR, file), 'utf-8');
      return JSON.parse(content) as Namespace;
    })
  );

  return namespaces.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getNamespace(slug: string): Promise<Namespace | undefined> {
  const namespaces = await getNamespaces();
  return namespaces.find((ns) => ns.namespace === slug);
}
