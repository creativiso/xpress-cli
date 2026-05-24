import { Command } from 'commander';
import Table from 'cli-table3';
import { readConfig, setSite, removeSite, setDefault, getActiveSite } from '../config/store';
import { success } from '../output/print';

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
    .command('use <site>')
    .description('Set the default site')
    .action((site: string) => {
      setDefault(site);
      success(`Default site set to "${site}".`);
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
