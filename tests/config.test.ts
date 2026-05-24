import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const TMP_DIR = os.tmpdir();
const TMP_CONFIG = path.join(TMP_DIR, '.xpress-cli.json');

jest.mock('os', () => ({
  ...jest.requireActual('os'),
  homedir: () => TMP_DIR,
}));

describe('config store', () => {
  beforeEach(() => {
    jest.resetModules();
    if (fs.existsSync(TMP_CONFIG)) fs.unlinkSync(TMP_CONFIG);
  });

  afterAll(() => {
    if (fs.existsSync(TMP_CONFIG)) fs.unlinkSync(TMP_CONFIG);
  });

  describe('readConfig', () => {
    it('returns empty sites object when file does not exist', () => {
      const { readConfig } = require('../src/config/store');
      expect(readConfig()).toEqual({ sites: {} });
    });

    it('parses valid multi-site config', () => {
      const cfg = {
        default: 'mysite',
        sites: { mysite: { token: 'abc', baseUrl: 'http://x.com', defaultLang: 'en' } },
      };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const { readConfig } = require('../src/config/store');
      expect(readConfig()).toEqual(cfg);
    });

    it('auto-migrates legacy flat config to multi-site format', () => {
      const legacy = { token: 'abc', baseUrl: 'http://x.com', defaultLang: 'en' };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(legacy));
      const { readConfig } = require('../src/config/store');
      const result = readConfig();
      expect(result).toEqual({
        default: 'default',
        sites: {
          default: { token: 'abc', baseUrl: 'http://x.com', defaultLang: 'en' },
        },
      });
      // migration written back to disk
      const onDisk = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(onDisk.sites.default.token).toBe('abc');
    });
  });

  describe('writeConfig', () => {
    it('writes multi-site config as JSON with 0o600 permissions', () => {
      const { writeConfig } = require('../src/config/store');
      const cfg = { default: 'mysite', sites: { mysite: { token: 'tok123' } } };
      writeConfig(cfg);
      const written = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(written).toEqual(cfg);
      const mode = fs.statSync(TMP_CONFIG).mode & 0o777;
      expect(mode).toBe(0o600);
    });
  });

  describe('setSite', () => {
    it('adds a new site entry', () => {
      const { setSite, readConfig } = require('../src/config/store');
      setSite('mysite', { token: 'tok', baseUrl: 'http://x.com' });
      const cfg = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(cfg.sites.mysite).toEqual({ token: 'tok', baseUrl: 'http://x.com' });
    });

    it('updates an existing site entry', () => {
      const cfg = { default: 'mysite', sites: { mysite: { token: 'old' } } };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const { setSite } = require('../src/config/store');
      setSite('mysite', { token: 'new', baseUrl: 'http://x.com' });
      const updated = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(updated.sites.mysite.token).toBe('new');
    });
  });

  describe('setDefault', () => {
    it('updates the default site', () => {
      const cfg = {
        default: 'a',
        sites: { a: { token: 'ta' }, b: { token: 'tb' } },
      };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const { setDefault } = require('../src/config/store');
      setDefault('b');
      const updated = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(updated.default).toBe('b');
    });

    it('exits if site does not exist', () => {
      const cfg = { default: 'a', sites: { a: { token: 'ta' } } };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
      const { setDefault } = require('../src/config/store');
      expect(() => setDefault('nonexistent')).toThrow('exit');
      mockExit.mockRestore();
    });
  });

  describe('removeSite', () => {
    it('removes a non-default site', () => {
      const cfg = {
        default: 'a',
        sites: { a: { token: 'ta' }, b: { token: 'tb' } },
      };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const { removeSite } = require('../src/config/store');
      removeSite('b');
      const updated = JSON.parse(fs.readFileSync(TMP_CONFIG, 'utf8'));
      expect(updated.sites.b).toBeUndefined();
    });

    it('exits when trying to remove the default site', () => {
      const cfg = { default: 'a', sites: { a: { token: 'ta' } } };
      fs.writeFileSync(TMP_CONFIG, JSON.stringify(cfg));
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
      const { removeSite } = require('../src/config/store');
      expect(() => removeSite('a')).toThrow('exit');
      mockExit.mockRestore();
    });
  });

  describe('getActiveSite', () => {
    it('returns the default site when no name given', () => {
      const { getActiveSite } = require('../src/config/store');
      const cfg = {
        default: 'mysite',
        sites: { mysite: { token: 'tok', baseUrl: 'http://x.com' } },
      };
      expect(getActiveSite(cfg)).toEqual({ token: 'tok', baseUrl: 'http://x.com' });
    });

    it('returns named site when name given', () => {
      const { getActiveSite } = require('../src/config/store');
      const cfg = {
        default: 'a',
        sites: {
          a: { token: 'ta' },
          b: { token: 'tb', baseUrl: 'http://b.com' },
        },
      };
      expect(getActiveSite(cfg, 'b')).toEqual({ token: 'tb', baseUrl: 'http://b.com' });
    });

    it('exits when site is not found', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
      const { getActiveSite } = require('../src/config/store');
      expect(() => getActiveSite({ sites: {} }, 'missing')).toThrow('exit');
      mockExit.mockRestore();
    });
  });
});
