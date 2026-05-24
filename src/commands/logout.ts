import * as readline from 'readline';
import { Command } from 'commander';
import { readConfig, writeConfig, removeSite, setDefault } from '../config/store';
import { success } from '../output/print';

function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

export function register(program: Command): void {
  program
    .command('logout')
    .description('Remove a site\'s credentials (interactive)')
    .action(async () => {
      const config = readConfig();
      const names = Object.keys(config.sites);

      if (names.length === 0) {
        process.stderr.write('No sites configured.\n');
        process.exit(0);
      }

      process.stdout.write('Select a site to log out from:\n\n');
      names.forEach((name, i) => {
        const site = config.sites[name];
        const tag = config.default === name ? ' (default)' : '';
        process.stdout.write(`  ${i + 1}) ${name}${tag} — ${site.baseUrl ?? '(no URL)'}\n`);
      });
      process.stdout.write('\n');

      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

      const rawChoice = await prompt(rl, `Choice [1–${names.length}]: `);
      const index = parseInt(rawChoice.trim(), 10) - 1;

      if (isNaN(index) || index < 0 || index >= names.length) {
        rl.close();
        process.stderr.write('Invalid choice. Aborted.\n');
        process.exit(1);
      }

      const name = names[index];
      const isDefault = config.default === name;

      if (isDefault && names.length > 1) {
        process.stdout.write(`\n"${name}" is the default site. Pick a new default before removing:\n\n`);
        const others = names.filter((n) => n !== name);
        others.forEach((n, i) => {
          process.stdout.write(`  ${i + 1}) ${n} — ${config.sites[n].baseUrl ?? '(no URL)'}\n`);
        });
        process.stdout.write('\n');

        const rawNew = await prompt(rl, `New default [1–${others.length}]: `);
        const newIndex = parseInt(rawNew.trim(), 10) - 1;

        if (isNaN(newIndex) || newIndex < 0 || newIndex >= others.length) {
          rl.close();
          process.stderr.write('Invalid choice. Aborted.\n');
          process.exit(1);
        }

        setDefault(others[newIndex]);
        process.stdout.write(`\n`);
      }

      const confirm = await prompt(rl, `Remove "${name}"? (y/N): `);
      rl.close();

      if (confirm.trim().toLowerCase() !== 'y') {
        process.stderr.write('Aborted.\n');
        process.exit(0);
      }

      if (names.length === 1) {
        writeConfig({ sites: {} });
      } else {
        removeSite(name);
      }
      success(`Logged out of "${name}".`);
    });
}
