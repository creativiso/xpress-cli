import * as readline from 'readline';
import { Command } from 'commander';
import { readConfig, setSite, setDefault } from '../config/store';
import { success } from '../output/print';

function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function promptHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    const chars: string[] = [];

    const onData = (buf: Buffer) => {
      const char = buf.toString();
      if (char === '\r' || char === '\n') {
        process.stdin.removeListener('data', onData);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\n');
        resolve(chars.join(''));
      } else if (char === '') {
        process.stdout.write('\n');
        process.exit(1);
      } else if (char === '' || char === '\b') {
        if (chars.length > 0) {
          chars.pop();
          process.stdout.write('\b \b');
        }
      } else {
        chars.push(char);
        process.stdout.write('•');
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', onData);
  });
}

export function register(program: Command): void {
  program
    .command('login')
    .description('Add or update a site (interactive)')
    .action(async () => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

      const config = readConfig();

      const rawName = await prompt(rl, 'Site name [default]: ');
      const name = rawName.trim() || 'default';

      if (config.sites[name]) {
        const overwrite = await prompt(rl, `Site "${name}" already exists. Overwrite? (y/N): `);
        if (overwrite.trim().toLowerCase() !== 'y') {
          rl.close();
          console.error('Aborted.');
          process.exit(0);
        }
      }

      const rawUrl = await prompt(rl, 'Base URL (domain or full URL): ');
      let baseUrl = rawUrl.trim().replace(/\/+$/, '');
      if (!/^https?:\/\//i.test(baseUrl)) {
        baseUrl = 'https://' + baseUrl;
      }
      if (!/\/pub\/api\/v\d+$/.test(baseUrl)) {
        baseUrl = baseUrl + '/pub/api/v1';
      }
      process.stdout.write(`  → ${baseUrl}\n`);

      rl.close();

      const token = await promptHidden('API token: ');

      const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
      const hasDefault = !!config.default;
      const defaultPrompt = hasDefault
        ? `Set "${name}" as default site? (y/N): `
        : `Set "${name}" as default site? (Y/n): `;
      const rawDefault = await prompt(rl2, defaultPrompt);
      rl2.close();

      const makeDefault = hasDefault
        ? rawDefault.trim().toLowerCase() === 'y'
        : rawDefault.trim().toLowerCase() !== 'n';

      setSite(name, { token, baseUrl });
      if (makeDefault) setDefault(name);

      success(`Site "${name}" saved.`);
    });
}
