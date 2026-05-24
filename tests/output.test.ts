describe('buildParams', () => {
  const { buildParams } = require('../src/commands/_shared');

  it('omits undefined values', () => {
    const result = buildParams({ a: 1, b: undefined, c: 'hello', d: null });
    expect(result).toEqual({ a: 1, c: 'hello' });
  });

  it('omits empty string values', () => {
    const result = buildParams({ a: '', b: 'x' });
    expect(result).toEqual({ b: 'x' });
  });

  it('keeps zero and false', () => {
    const result = buildParams({ a: 0, b: false });
    expect(result).toEqual({ a: 0, b: false });
  });
});

describe('parseJson', () => {
  const { parseJson } = require('../src/commands/_shared');

  it('parses valid JSON', () => {
    const result = parseJson('{"x":1}', 'test');
    expect(result).toEqual({ x: 1 });
  });

  it('exits on invalid JSON', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
    const stderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    expect(() => parseJson('not-json', 'test')).toThrow('exit');
    expect(exit).toHaveBeenCalledWith(1);
    exit.mockRestore();
    stderr.mockRestore();
  });
});
