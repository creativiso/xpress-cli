import chalk from 'chalk';
import Table from 'cli-table3';
import { Paginated, PaginationMeta } from '../types/api';

export interface OutputOptions {
  json?: boolean;
  quiet?: boolean;
}

const MAX_CELL = 60;

function truncate(str: string): string {
  return str.length > MAX_CELL ? str.slice(0, MAX_CELL - 1) + '…' : str;
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') return chalk.dim('—');
  if (typeof value === 'boolean') return value ? chalk.green('yes') : chalk.red('no');
  if (typeof value === 'object') return truncate(JSON.stringify(value));
  return truncate(String(value));
}

export function printData(data: unknown, opts: OutputOptions = {}): void {
  if (opts.json) {
    process.stdout.write(JSON.stringify(data, null, 2) + '\n');
    return;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      process.stderr.write(chalk.dim('(empty)\n'));
      return;
    }
    const columns = Object.keys(data[0] as object);
    const table = new Table({ head: columns.map((c) => chalk.cyan(c)) });
    for (const row of data) {
      table.push(columns.map((c) => formatCell((row as Record<string, unknown>)[c])));
    }
    process.stdout.write(table.toString() + '\n');
  } else if (data !== null && typeof data === 'object') {
    const table = new Table({ style: { head: [] } });
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      table.push({ [chalk.cyan(key)]: formatCell(value) });
    }
    process.stdout.write(table.toString() + '\n');
  } else {
    process.stdout.write(String(data) + '\n');
  }
}

export function printPaginated<T>(
  result: Paginated<T>,
  columns: (keyof T)[],
  opts: OutputOptions = {}
): void {
  if (opts.json) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return;
  }

  const { data, meta } = result;

  if (data.length === 0) {
    process.stderr.write(chalk.dim('(no results)\n'));
  } else {
    const table = new Table({ head: (columns as string[]).map((c) => chalk.cyan(c)) });
    for (const row of data) {
      table.push(
        (columns as string[]).map((c) => formatCell((row as Record<string, unknown>)[c]))
      );
    }
    process.stdout.write(table.toString() + '\n');
  }

  if (!opts.quiet) {
    printMeta(meta);
  }
}

function printMeta(meta: PaginationMeta): void {
  const end = Math.min(meta.offset + meta.limit, meta.total);
  process.stderr.write(
    chalk.dim(`Showing ${meta.offset + 1}–${end} of ${meta.total} (limit ${meta.limit})\n`)
  );
}

export function success(msg: string, opts: OutputOptions = {}): void {
  if (!opts.quiet) {
    process.stderr.write(chalk.green('✓ ') + msg + '\n');
  }
}

export function warn(msg: string): void {
  process.stderr.write(chalk.yellow('⚠ ') + msg + '\n');
}
