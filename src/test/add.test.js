

const {add} = require('../functionality/add')

describe('add', () => {
  test('returns 0 for an empty string', () => {
    expect(add("")).toBe(0);
  });

  test('returns the sum of comma-separated numbers', () => {
    expect(add("1,2,3")).toBe(6);
  });

  test('handles new lines as delimiters', () => {
    expect(add("1,2\n3,1")).toBe(7);
  });

  test('handles custom delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test('throws an error when negative numbers are provided', () => {
    expect(() => add("1,-2,3")).toThrow("Negative numbers are not allowed: -2");
  });

  test('ignores non-numeric input', () => {
    expect(add("1,a,2")).toBe(3);
  });
});
