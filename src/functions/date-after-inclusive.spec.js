import dateAfterInclusive from './date-after-inclusive';

describe('dateAfterInclusive', () => {
  it('dateAfterInclusive should return true if left is greater than the right.', () => {
    const examine = '01/02/1975';
    const constraint = '01/01/1975';
    const expected = true;
    const actual = dateAfterInclusive(examine, [constraint]);
    expect(actual).toEqual(expected);
  });

  it('dateAfterInclusive should return true for equal dates', () => {
    const examine = '01/02/1975';
    const constraint = '01/02/1975';
    const expected = true;
    const actual = dateAfterInclusive(examine, [constraint]);
    expect(actual).toEqual(expected);
  });

  it('dateAfterInclusive should return false for a date greater than the left date.', () => {
    const examine = '01/02/1975';
    const constraint = '01/03/1975';
    const expected = false;
    const actual = dateAfterInclusive(examine, [constraint]);
    expect(actual).toEqual(expected);
  });

  it('dateAfterInclusive should throw an error for invalid arguments.', () => {
    const nonDateString = 'not a date';
    const number = 3513513155;
    const bool = true;
    const valid = '01/01/1975';
    expect(() => dateAfterInclusive(nonDateString, [valid])).toThrow('date-after-inclusive: Left and right must both be date formatted strings');
    expect(() => dateAfterInclusive(number, [valid])).toThrow('date-after-inclusive: Left and right must both be date formatted strings');
    expect(() => dateAfterInclusive(bool, [valid])).toThrow('date-after-inclusive: Left and right must both be date formatted strings');
  });

  it('dateAfterInclusive should throw if there is no input and/or no params', () => {
    const input = undefined;
    const args = [''];
    expect(() => dateAfterInclusive(input, args)).toThrow('date-after-inclusive: Left and right are both required for the date-after-inclusive predicate');
  });

  it('dateAfterInclusive should throw if either left or only right are undefined', () => {
    expect(() => dateAfterInclusive(undefined, '01/02/1975')).toThrow('date-after-inclusive: Left and right are both required for the date-after-inclusive predicate');
    expect(() => dateAfterInclusive('01/02/1975', undefined)).toThrow('date-after-inclusive: Left and right are both required for the date-after-inclusive predicate');
  });
});
