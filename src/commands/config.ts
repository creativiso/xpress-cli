import { Command } from 'commander';
import * as readline from 'readline';
import chalk from 'chalk';
import Table from 'cli-table3';
import { readConfig, setSite, removeSite, setDefault, getActiveSite } from '../config/store';
import { success } from '../output/print';

async function pickSite(names: string[], current?: string): Promise<string | null> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return null;
  }

  let idx = current ? Math.max(0, names.indexOf(current)) : 0;
  const count = names.length;

  process.stdout.write('\x1B[?25l');

  const render = (first: boolean) => {
    if (!first) process.stdout.write(`\x1B[${count}A`);
    for (let i = 0; i < count; i++) {
      const isCurrent = names[i] === current;
      const isHighlighted = i === idx;
      const prefix = isHighlighted ? '❯ ' : '  ';
      const label = names[i] + (isCurrent ? chalk.dim(' (current)') : '');
      process.stdout.write((isHighlighted ? chalk.cyan(prefix + label) : prefix + label) + '\n');
    }
  };

  process.stdout.write(`\nUse arrow keys to select a site, Enter to confirm, Ctrl+C to cancel.\n\n`);
  render(true);

  return new Promise((resolve) => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    const cleanup = (result: string | null) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\x1B[?25h');
      process.stdout.write(`\x1B[${count}A\x1B[0J`);
      resolve(result);
    };

    const onKey = (_: unknown, key: { name: string; ctrl: boolean } | undefined) => {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        process.stdin.removeListener('keypress', onKey);
        cleanup(null);
      } else if (key.name === 'up') {
        idx = (idx - 1 + count) % count;
        render(false);
      } else if (key.name === 'down') {
        idx = (idx + 1) % count;
        render(false);
      } else if (key.name === 'return') {
        process.stdin.removeListener('keypress', onKey);
        cleanup(names[idx]);
      }
    };

    process.stdin.on('keypress', onKey);
  });
}

export function register(program: Command): void {
  const group = program.command('config').description('Manage CLI configuration and sites');

  group
    .command('list')
    .description('List all configured sites')
    .action(() => {
      const cfg = readConfig();
      const names = Object.keys(cfg.sites);
      if (names.length === 0) {
        process.stdout.write('No sites configured. Run `xpress login` to add one.\n');
        return;
      }
      const table = new Table({ head: ['SITE', 'URL', 'DEFAULT'] });
      for (const name of names) {
        const site = cfg.sites[name];
        table.push([name, site.baseUrl ?? '(not set)', cfg.default === name ? '✔' : '']);
      }
      process.stdout.write(table.toString() + '\n');
    });

  group
    .command('show [site]')
    .description('Show details for a site (defaults to active site)')
    .action((site?: string) => {
      const cfg = readConfig();
      const name = site ?? cfg.default ?? '';
      const s = getActiveSite(cfg, name);
      const display = {
        site: name,
        baseUrl: s.baseUrl ?? '(not set)',
        token: s.token ? s.token.slice(0, 8) + '...' : '(not set)',
        defaultLang: s.defaultLang ?? '(not set)',
        isDefault: cfg.default === name,
      };
      process.stdout.write(JSON.stringify(display, null, 2) + '\n');
    });

  group
    .command('use [site]')
    .description('Set the default site (interactive picker when no argument given)')
    .action(async (site?: string) => {
      if (site) {
        setDefault(site);
        success(`Default site set to "${site}".`);
        return;
      }
      const cfg = readConfig();
      const names = Object.keys(cfg.sites);
      if (names.length === 0) {
        process.stderr.write('No sites configured. Run `xpress login` to add one.\n');
        process.exit(1);
      }
      const chosen = await pickSite(names, cfg.default);
      if (!chosen) {
        process.stderr.write('Cancelled.\n');
        process.exit(0);
      }
      setDefault(chosen);
      success(`Default site set to "${chosen}".`);
    });

  group
    .command('remove <site>')
    .description('Remove a site from config')
    .action((site: string) => {
      removeSite(site);
      success(`Site "${site}" removed.`);
    });

  group
    .command('set-lang <lang>')
    .description('Set the default language for the active (or specified) site')
    .option('-s, --site <site>', 'Target site name')
    .action((lang: string, opts: { site?: string }) => {
      const cfg = readConfig();
      const name = opts.site ?? cfg.default;
      if (!name) {
        console.error('Error: No site specified and no default site configured.');
        process.exit(1);
      }
      const site = getActiveSite(cfg, name);
      setSite(name, { ...site, defaultLang: lang });
      success(`Default language for "${name}" set to "${lang}".`);
    });
}
