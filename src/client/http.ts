import axios, { AxiosInstance } from 'axios';
import createDebug from 'debug';
import { readConfig, getActiveSite } from '../config/store';

const debug = createDebug('xpress:http');

export interface ClientOptions {
  site?: string;
  token?: string;
  baseUrl?: string;
  verbose?: boolean;
}

export function createClient(opts: ClientOptions = {}): AxiosInstance {
  debug('createClient opts=%o', opts);
  const config = readConfig();
  debug('config=%o', config);

  let token = opts.token;
  let baseUrl = opts.baseUrl;

  if (!token || !baseUrl) {
    const site = getActiveSite(config, opts.site);
    debug('resolved site=%o', site);
    token = token ?? site.token;
    baseUrl = baseUrl ?? site.baseUrl;
  }

  debug('token=%s baseUrl=%s', token ? token.slice(0, 8) + '…' : '(none)', baseUrl);

  if (!token) {
    process.stderr.write('Error: No token configured. Run: xpress login\n');
    process.exit(1);
  }

  if (!baseUrl) {
    process.stderr.write('Error: No base URL configured. Run: xpress login\n');
    process.exit(1);
  }

  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 30000,
  });

  if (opts.verbose) {
    client.interceptors.request.use((req) => {
      process.stderr.write(`→ ${req.method?.toUpperCase()} ${req.baseURL}${req.url}\n`);
      if (req.params && Object.keys(req.params).length) {
        process.stderr.write(`  params: ${JSON.stringify(req.params)}\n`);
      }
      if (req.data) {
        process.stderr.write(`  body: ${JSON.stringify(req.data)}\n`);
      }
      return req;
    });
  }

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      debug('response error=%o', err);
      if (err.response) {
        debug('response status=%s data=%o', err.response.status, err.response.data);
        const { status, data } = err.response;
        if (status === 401) {
          process.stderr.write('Error: Unauthorized. Run: xpress login\n');
        } else if (status === 403) {
          process.stderr.write('Error: Permission denied.\n');
        } else if (status === 404) {
          process.stderr.write('Error: Not found.\n');
        } else if (status === 429) {
          process.stderr.write('Error: Rate limit exceeded. Please wait and try again.\n');
        } else {
          const detail = data?.detail ?? data?.title ?? `HTTP ${status}`;
          process.stderr.write(`Error: ${detail}\n`);
        }
      } else if (err.code === 'ECONNREFUSED' || (err.cause && (err.cause as NodeJS.ErrnoException).code === 'ECONNREFUSED')) {
        process.stderr.write(`Error: Connection refused. Is the base URL correct? (${baseUrl})\n`);
      } else {
        process.stderr.write(`Error: ${err.message || err.code || 'Unknown network error'}\n`);
      }
      process.exit(1);
    }
  );

  return client;
}
