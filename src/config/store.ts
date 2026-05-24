import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export interface XpressSite {
  token?: string;
  baseUrl?: string;
  defaultLang?: string;
}

export interface XpressConfig {
  default?: string;
  sites: Record<string, XpressSite>;
}

/** Legacy flat config shape written by versions < 0.2.0 */
interface LegacyConfig {
  token?: string;
  baseUrl?: string;
  defaultLang?: string;
}

const CONFIG_PATH = path.join(os.homedir(), '.xpress-cli.json');

function isLegacyConfig(raw: unknown): raw is LegacyConfig {
  if (typeof raw !== 'object' || raw === null) return false;
  const obj = raw as Record<string, unknown>;
  return !('sites' in obj) && ('token' in obj || 'baseUrl' in obj || 'defaultLang' in obj);
}

export function readConfig(): XpressConfig {
  try {
    const raw = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    if (isLegacyConfig(raw)) {
      const migrated: XpressConfig = {
        default: 'default',
        sites: {
          default: {
            token: raw.token,
            baseUrl: raw.baseUrl,
            defaultLang: raw.defaultLang,
          },
        },
      };
      writeConfig(migrated);
      return migrated;
    }
    return raw as XpressConfig;
  } catch {
    return { sites: {} };
  }
}

export function writeConfig(config: XpressConfig): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', { mode: 0o600 });
}

export function getActiveSite(config: XpressConfig, siteName?: string): XpressSite {
  const name = siteName ?? config.default;
  if (!name) {
    console.error('Error: No site specified and no default site configured. Run `xpress login` first.');
    process.exit(1);
  }
  const site = config.sites[name];
  if (!site) {
    console.error(`Error: Site "${name}" not found. Run \`xpress config list\` to see available sites.`);
    process.exit(1);
  }
  return site;
}

export function setSite(name: string, site: XpressSite): void {
  const config = readConfig();
  config.sites[name] = site;
  writeConfig(config);
}

export function removeSite(name: string): void {
  const config = readConfig();
  if (config.default === name) {
    console.error(`Error: Cannot remove "${name}" because it is the default site. Run \`xpress config use <site>\` to change the default first.`);
    process.exit(1);
  }
  if (!config.sites[name]) {
    console.error(`Error: Site "${name}" not found.`);
    process.exit(1);
  }
  delete config.sites[name];
  writeConfig(config);
}

export function setDefault(name: string): void {
  const config = readConfig();
  if (!config.sites[name]) {
    console.error(`Error: Site "${name}" not found. Run \`xpress config list\` to see available sites.`);
    process.exit(1);
  }
  config.default = name;
  writeConfig(config);
}
