import { Command } from 'commander';
import { createClient } from '../client/http';
import { readConfig } from '../config/store';
import { OutputOptions, warn } from '../output/print';
import { AxiosInstance } from 'axios';

export interface GlobalOpts extends OutputOptions {
  site?: string;
  token?: string;
  url?: string;
  verbose?: boolean;
  lang?: string;
}

export function getGlobalOpts(cmd: Command): GlobalOpts {
  return cmd.optsWithGlobals() as GlobalOpts;
}

export function getClientFromCmd(cmd: Command): AxiosInstance {
  const opts = getGlobalOpts(cmd);
  return createClient({
    site: opts.site,
    token: opts.token,
    baseUrl: opts.url,
    verbose: opts.verbose,
  });
}

export interface PaginationOpts {
  limit?: string;
  offset?: string;
  page?: string;
  pageSize?: string;
}

export function resolvePagination(opts: PaginationOpts): { limit: string; offset: string } {
  const limit = opts.pageSize ?? opts.limit ?? '20';
  if (parseInt(limit, 10) > 100) {
    warn('Page size exceeds the API maximum of 100. Results will be capped at 100.');
  }
  const offset = opts.page
    ? String((parseInt(opts.page, 10) - 1) * parseInt(limit, 10))
    : (opts.offset ?? '0');
  return { limit, offset };
}

export function buildParams(pairs: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(pairs)) {
    if (v !== undefined && v !== null && v !== '') {
      out[k] = v;
    }
  }
  return out;
}

export function parseJson<T>(raw: string, label: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    process.stderr.write(`Error: Invalid JSON for ${label}: ${raw}\n`);
    process.exit(1);
  }
}

export function langParam(opts: GlobalOpts): Record<string, unknown> {
  const config = readConfig();
  const activeSite = config.default ? config.sites[config.default] : undefined;
  const lang = opts.lang ?? activeSite?.defaultLang;
  return lang ? { lang } : {};
}
