describe('createClient', () => {
  let axiosCreateSpy: jest.SpyInstance;
  let mockInstance: { interceptors: { request: { use: jest.Mock }; response: { use: jest.Mock } } };

  const multiSiteConfig = {
    default: 'default',
    sites: {
      default: { token: 'test-token', baseUrl: 'http://example.com/pub/api/v1' },
      other: { token: 'other-token', baseUrl: 'http://other.com/pub/api/v1' },
    },
  };

  beforeEach(() => {
    jest.resetModules();
    mockInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    };
    const axios = require('axios');
    axiosCreateSpy = jest.spyOn(axios, 'create').mockReturnValue(mockInstance);

    jest.doMock('../src/config/store', () => ({
      readConfig: jest.fn(() => multiSiteConfig),
      getActiveSite: jest.fn((cfg: typeof multiSiteConfig, name?: string) => {
        const siteName = name ?? cfg.default ?? '';
        const site = (cfg.sites as Record<string, unknown>)[siteName];
        if (!site) { process.exit(1); }
        return site;
      }),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('creates an axios instance with auth header and baseURL from default site', () => {
    const { createClient } = require('../src/client/http');
    createClient();
    expect(axiosCreateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'http://example.com/pub/api/v1',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      })
    );
  });

  it('uses the named site when --site is given', () => {
    const { createClient } = require('../src/client/http');
    createClient({ site: 'other' });
    expect(axiosCreateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'http://other.com/pub/api/v1',
        headers: expect.objectContaining({
          Authorization: 'Bearer other-token',
        }),
      })
    );
  });

  it('exits if no token is configured for the active site', () => {
    jest.doMock('../src/config/store', () => ({
      readConfig: jest.fn(() => ({
        default: 'default',
        sites: { default: { baseUrl: 'http://example.com' } },
      })),
      getActiveSite: jest.fn(() => ({ baseUrl: 'http://example.com' })),
    }));
    jest.resetModules();
    const exit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
    const stderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    const { createClient } = require('../src/client/http');
    expect(() => createClient()).toThrow('exit');
    expect(exit).toHaveBeenCalledWith(1);
    exit.mockRestore();
    stderr.mockRestore();
  });
});
