import type { APIRoute } from 'astro';
import { getAllCodes, getNamespaces } from '../../lib/data';

export const GET: APIRoute = async () => {
  const [codes, namespaces] = await Promise.all([getAllCodes(), getNamespaces()]);

  const payload = {
    generated: new Date().toISOString(),
    namespaces,
    codes: codes.map(({ code, namespace, name, description, numeric, references }) => ({
      code,
      namespace,
      name,
      description,
      ...(numeric !== undefined && { numeric }),
      ...(references?.length && { references }),
    })),
  };

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
};
